// src/app/components/ImageUploader.tsx

'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface UploadResult {
  imageUrl: string;
}

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Silakan pilih gambar terlebih dahulu.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal upload gambar.');
      }

      const data: UploadResult = await response.json();
      const imageUrl = data.imageUrl;
      setUploadedUrl(imageUrl);

      await addDoc(collection(db, 'images'), {
        url: imageUrl,
        uploadedAt: new Date(),
      });

      setSelectedFile(null);
    } catch (err: unknown) {
      console.error('Upload failed:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan tak terduga.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-6 text-center text-[#005266]">Upload Gambar ke Cloudinary</h2>
      <div className="flex flex-col items-center space-y-4">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-100 rounded-xl shadow cursor-pointer hover:bg-gray-200 transition">
          <span className="text-gray-600 font-medium mb-2">
            {selectedFile ? selectedFile.name : 'Pilih gambar'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-block px-3 py-1 bg-[#00A3CC] text-white rounded-lg text-sm mt-2">
            Pilih File
          </span>
        </label>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`w-full bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold py-2 rounded-lg shadow hover:from-[#00394d] hover:to-[#008fb3] transition ${(!selectedFile || uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
        {uploadedUrl && (
          <div className="mt-4 w-full text-center">
            <p className="text-green-600 font-semibold mb-2">Gambar berhasil diupload!</p>
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{uploadedUrl}</a>
            <img src={uploadedUrl} alt="Uploaded" className="mx-auto mt-4 rounded-xl shadow max-w-xs max-h-64 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;