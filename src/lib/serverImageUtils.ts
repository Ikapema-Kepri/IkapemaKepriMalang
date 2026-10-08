import sharp from 'sharp';
import { Buffer } from 'buffer';

/**
 * Mengonversi gambar ke format WebP untuk optimasi ukuran sebelum diunggah (misal ke Cloudinary).
 * 
 * @param file - Objek File, Blob, atau Buffer yang berisi data gambar
 * @param quality - Kualitas kompresi gambar WebP (1-100), default 80
 * @returns Promise yang menghasilkan Buffer gambar dalam format WebP
 */
export async function optimizeImageToWebp(file: File | Blob | Buffer, quality: number = 80): Promise<Buffer> {
  let buffer: Buffer;

  // Konversi input ke Buffer jika input berasal dari FormData (berupa File/Blob)
  if (file instanceof Buffer) {
    buffer = file;
  } else {
    const arrayBuffer = await (file as File | Blob).arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  }

  // Gunakan sharp untuk mengonversi gambar menjadi format WebP
  const optimizedBuffer = await sharp(buffer)
    .webp({ quality })
    .toBuffer();

  return optimizedBuffer;
}
