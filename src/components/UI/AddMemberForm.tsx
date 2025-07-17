// components/AddMemberForm.tsx

"use client";
import React, { useState } from 'react';
import { Anggota, ApiResponse } from '../../types';

interface AddMemberFormProps {
  onSuccess?: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onSuccess }) => {
  const [namaAnggota, setNamaAnggota] = useState<string>('');
  const [universitas, setUniversitas] = useState<string>('');
  const [programStudi, setProgramStudi] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const newMember: Anggota = { namaAnggota, universitas, programStudi, photoURL: photoURL || null };
      const response = await fetch('/api/anggota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menambahkan anggota.');
      }

      setMessage(data.message);
      setNamaAnggota('');
      setUniversitas('');
      setProgramStudi('');
      setPhotoURL('');
      if (onSuccess) onSuccess(); // <-- panggil callback refresh
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Gagal menambahkan anggota.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#005266]">Tambah Anggota Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Anggota</label>
          <input
            type="text"
            value={namaAnggota}
            onChange={(e) => setNamaAnggota(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
            placeholder="Masukkan nama anggota"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Universitas</label>
          <select
            value={universitas}
            onChange={(e) => setUniversitas(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition bg-white"
          >
            <option value="" disabled>
              Pilih universitas
            </option>
            <option value="UB">UB</option>
            <option value="UM">UM</option>
            <option value="UMM">UMM</option>
            <option value="Polinema">Polinema</option>
            <option value="UIN">UIN</option>
            <option value="Binus">Binus</option>
            <option value="UNISMA">UNISMA</option>
            <option value="UNMER">UNMER</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program Studi</label>
          <input
            type="text"
            value={programStudi}
            onChange={(e) => setProgramStudi(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
            placeholder="Masukkan program studi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Opsional)</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
            placeholder="Masukkan URL foto"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold py-2 rounded-lg shadow hover:from-[#00394d] hover:to-[#008fb3] transition"
        >
          Tambah Anggota
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default AddMemberForm;