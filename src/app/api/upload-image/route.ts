// src/app/api/upload-image/route.ts (App Router)

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Buffer } from 'buffer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryUploadResult = {
  secure_url: string;
  [key: string]: unknown;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error: Error | null, result: CloudinaryUploadResult | undefined) => {
          if (error || !result) {
            reject(error ?? new Error('Unknown error'));
            return;
          }
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }
}