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
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const response = await fetch('/api/anggota?limit=1000');
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
      // Reset to page 1 if current page becomes empty after deletion
      const newTotalPages = Math.ceil((members.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
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
      angkatan: member.angkatan,
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

  // Pagination calculations
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEditId(null); // Cancel any ongoing edit when changing pages
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setEditId(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setEditId(null);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) return <p>Memuat anggota...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (members.length === 0) return <p>Belum ada anggota.</p>;

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#005266]">Daftar Anggota</h2>
        <div className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, members.length)} dari {members.length} anggota
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#005266]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Foto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Universitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Program Studi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Angkatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  {editId === member.id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {editData.photoURL ? (
                              <Image
                                src={editData.photoURL}
                                alt={editData.namaAnggota || 'Preview'}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <svg
                                className="w-6 h-6 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </div>
                          <input
                            type="url"
                            name="photoURL"
                            value={editData.photoURL || ''}
                            onChange={handleEditChange}
                            className="w-32 px-2 py-1 border rounded text-xs"
                            placeholder="URL Foto"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <form onSubmit={handleEditSubmit} className="space-y-2">
                          <input
                            type="text"
                            name="namaAnggota"
                            value={editData.namaAnggota || ''}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Nama Anggota"
                            required
                          />
                        </form>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="universitas"
                          value={editData.universitas || ''}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border rounded text-sm"
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
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="programStudi"
                          value={editData.programStudi || ''}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="Program Studi"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="angkatan"
                          value={editData.angkatan || ''}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="Angkatan"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={handleEditSubmit}
                            className="bg-[#00A3CC] text-white px-3 py-1 rounded text-sm hover:bg-[#005266] transition"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition"
                          >
                            Batal
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {member.photoURL ? (
                                <Image
                                  src={member.photoURL}
                                  alt={member.namaAnggota}
                                  width={40}
                                  height={40}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <svg
                                className="w-6 h-6 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {member.namaAnggota}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.universitas}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.programStudi}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.angkatan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(member)}
                            className="bg-[#00A3CC] text-white px-3 py-1 rounded text-sm hover:bg-[#005266] transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => member.id && handleDelete(member.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  Sebelumnya
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  Selanjutnya
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai{' '}
                    <span className="font-medium">{Math.min(endIndex, members.length)}</span> dari{' '}
                    <span className="font-medium">{members.length}</span> hasil
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                          : 'text-gray-500 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
                        disabled={typeof page !== 'number'}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-[#005266] border-[#005266] text-white'
                            : typeof page === 'number'
                            ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            : 'bg-white border-gray-300 text-gray-400 cursor-default'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                          : 'text-gray-500 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;