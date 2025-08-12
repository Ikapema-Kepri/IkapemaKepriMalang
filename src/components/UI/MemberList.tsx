// components/MemberList.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Anggota, ApiResponse } from '../../types';

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Anggota>>({});

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const response = await fetch('/api/anggota');
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Anggota[]> = await response.json();
      if (data.data) {
        setMembers(data.data);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Gagal memuat anggota.');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus anggota ini?')) return;
    try {
      const response = await fetch(`/api/anggota/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus anggota.');
      }
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal menghapus anggota.');
    }
  };

  const handleEditClick = (member: Anggota) => {
    setEditId(member.id ?? null);
    setEditData({
      namaAnggota: member.namaAnggota,
      universitas: member.universitas,
      programStudi: member.programStudi,
      photoURL: member.photoURL || '',
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      const response = await fetch(`/api/anggota/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengedit anggota.');
      setEditId(null);
      setEditData({});
      fetchMembers();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal mengedit anggota.');
    }
  };

  if (loading) return <p>Memuat anggota...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (members.length === 0) return <p>Belum ada anggota.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#005266]">Daftar Anggota</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-[20px] shadow-lg p-6 flex flex-col items-center transition hover:shadow-xl"
          >
            <div className="w-24 h-24 rounded-[20px] bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
              {member.photoURL ? (
                <img
                  src={member.photoURL}
                  alt={member.namaAnggota}
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-300"
                  fill="none"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="64" height="64" rx="16" fill="#e5e7eb" />
                  <path
                    d="M32 34c5.523 0 10-4.477 10-10S37.523 14 32 14s-10 4.477-10 10 4.477 10 10 10zm0 4c-6.627 0-20 3.314-20 10v4h40v-4c0-6.686-13.373-10-20-10z"
                    fill="#cbd5e1"
                  />
                </svg>
              )}
            </div>
            {editId === member.id ? (
              <form className="w-full" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="namaAnggota"
                  value={editData.namaAnggota || ''}
                  onChange={handleEditChange}
                  className="w-full mb-2 px-3 py-1 border rounded"
                  placeholder="Nama Anggota"
                  required
                />
                <select
                  name="universitas"
                  value={editData.universitas || ''}
                  onChange={handleEditChange}
                  className="w-full mb-2 px-3 py-1 border rounded"
                  required
                >
                  <option value="" disabled>Pilih universitas</option>
                  <option value="UB">UB</option>
                  <option value="UM">UM</option>
                  <option value="UMM">UMM</option>
                  <option value="Polinema">Polinema</option>
                  <option value="UIN">UIN</option>
                  <option value="Binus">Binus</option>
                  <option value="UNISMA">UNISMA</option>
                  <option value="UNMER">UNMER</option>
                </select>
                <input
                  type="text"
                  name="programStudi"
                  value={editData.programStudi || ''}
                  onChange={handleEditChange}
                  className="w-full mb-2 px-3 py-1 border rounded"
                  placeholder="Program Studi"
                  required
                />
                <input
                  type="text"
                  name="photoURL"
                  value={editData.photoURL || ''}
                  onChange={handleEditChange}
                  className="w-full mb-2 px-3 py-1 border rounded"
                  placeholder="Photo URL"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#00A3CC] text-white py-1 rounded hover:bg-[#005266] transition"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-300 text-gray-700 py-1 rounded hover:bg-gray-400 transition"
                    onClick={() => setEditId(null)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center w-full">
                <div className="font-semibold text-lg text-[#005266]">{member.namaAnggota}</div>
                <div className="text-sm text-gray-600 mt-1">{member.universitas}</div>
                <div className="text-xs text-gray-500">{member.programStudi}</div>
                <div className="flex gap-2 mt-4 justify-center">
                  <button
                    className="bg-[#00A3CC] text-white px-3 py-1 rounded hover:bg-[#005266] transition"
                    onClick={() => handleEditClick(member)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => member.id && handleDelete(member.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;