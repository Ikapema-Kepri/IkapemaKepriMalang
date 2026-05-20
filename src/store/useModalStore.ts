import { create } from 'zustand';

type ModalStatus = 'success' | 'error' | 'info';

interface ModalState {
  isOpen: boolean;
  status: ModalStatus;
  message: string;
  imageUrl: string;
  openModal: (status: ModalStatus, title: string, message: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  status: 'success', // nilai default
  message: '',
  imageUrl: '',
  openModal: (status, message, imageUrl) => 
    set({ isOpen: true, status, message, imageUrl }),
  closeModal: () => 
    set({ isOpen: false }),
}));