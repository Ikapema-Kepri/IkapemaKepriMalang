/**
 * Firebase Service Helper
 * Best practices untuk fetching data dari Firestore
 */

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs, 
  DocumentSnapshot,
  QueryConstraint 
} from 'firebase/firestore';
import { db } from './firebase';

export interface PaginationOptions {
  pageSize?: number;
  lastDoc?: DocumentSnapshot;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface FilterOptions {
  field: string;
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'array-contains';
  value: any;
}

/**
 * Fetch data dengan pagination yang efisien
 * Menggunakan cursor-based pagination untuk konsisten performance
 */
export async function fetchPaginatedData<T>(
  collectionName: string,
  options: PaginationOptions = {},
  filters: FilterOptions[] = []
): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null; hasMore: boolean }> {
  const {
    pageSize = 20,
    lastDoc = null,
    orderByField = 'createdAt',
    orderDirection = 'desc'
  } = options;

  try {
    // Build query constraints
    const constraints: QueryConstraint[] = [];

    // Add filters
    filters.forEach(filter => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });

    // Add ordering
    constraints.push(orderBy(orderByField, orderDirection));

    // Add pagination cursor
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    // Add limit
    constraints.push(limit(pageSize + 1)); // Fetch one extra to check if there's more

    // Execute query
    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getDocs(q);

    // Process results
    const hasMore = snapshot.docs.length > pageSize;
    const docs = hasMore ? snapshot.docs.slice(0, pageSize) : snapshot.docs;
    
    const data = docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;

    return {
      data,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error('Error fetching paginated data:', error);
    throw error;
  }
}

/**
 * Fetch single document dengan caching
 */
export async function fetchDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as T;
    }

    return null;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

/**
 * Count total documents (expensive operation - use sparingly)
 * Consider caching the count or using approximate count
 */
export async function countDocuments(
  collectionName: string,
  filters: FilterOptions[] = []
): Promise<number> {
  try {
    const { getCountFromServer } = await import('firebase/firestore');
    
    const constraints: QueryConstraint[] = filters.map(filter =>
      where(filter.field, filter.operator, filter.value)
    );

    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getCountFromServer(q);

    return snapshot.data().count;
  } catch (error) {
    console.error('Error counting documents:', error);
    throw error;
  }
}

/**
 * Batch write operations untuk efisiensi
 */
export async function batchWrite(operations: Array<{
  type: 'set' | 'update' | 'delete';
  collection: string;
  docId?: string;
  data?: any;
}>) {
  try {
    const { writeBatch, doc } = await import('firebase/firestore');
    const batch = writeBatch(db);

    operations.forEach(op => {
      const docRef = op.docId 
        ? doc(db, op.collection, op.docId)
        : doc(collection(db, op.collection));

      switch (op.type) {
        case 'set':
          batch.set(docRef, op.data);
          break;
        case 'update':
          batch.update(docRef, op.data);
          break;
        case 'delete':
          batch.delete(docRef);
          break;
      }
    });

    await batch.commit();
  } catch (error) {
    console.error('Error in batch write:', error);
    throw error;
  }
}

/**
 * Real-time listener dengan automatic cleanup
 */
export function subscribeToCollection<T>(
  collectionName: string,
  callback: (data: T[]) => void,
  filters: FilterOptions[] = [],
  options: PaginationOptions = {}
) {
  const { onSnapshot } = require('firebase/firestore');
  
  const constraints: QueryConstraint[] = [];

  // Add filters
  filters.forEach(filter => {
    constraints.push(where(filter.field, filter.operator, filter.value));
  });

  // Add ordering
  if (options.orderByField) {
    constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
  }

  // Add limit
  if (options.pageSize) {
    constraints.push(limit(options.pageSize));
  }

  const q = query(collection(db, collectionName), ...constraints);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      callback(data);
    },
    (error) => {
      console.error('Error in real-time listener:', error);
    }
  );

  // Return unsubscribe function
  return unsubscribe;
}

/**
 * Cache manager untuk Firestore data
 * Simple in-memory cache dengan TTL
 */
class FirestoreCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 60000; // 60 seconds default

  set(key: string, data: any, ttl?: number) {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + (ttl || this.ttl)
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export const firestoreCache = new FirestoreCache();
