"use client";
import Image from "next/image";
import { Card } from "@/components/UI/card";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/UI/table";
import { useAlumni } from "@/hooks/useAlumni";
import { Search } from "lucide-react";
import React from "react";
import StatusModal from "@/components/UI/status-modal";

interface ListAlumniProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const ListAlumni: React.FC<ListAlumniProps> = ({ searchQuery = '', onSearchChange }) => {
    const {
        currentMembers,
        loading,
        error,
        editId,
        editData,
        currentPage,
        totalPages,
        totalItems,
        startIndex,
        endIndex,
        debouncedSearch,
        handleDelete,
        handleEditClick,
        handleEditChange,
        handleEditSubmit,
        cancelEdit,
        handlePageChange,
        handlePrevPage,
        handleNextPage,
        getPageNumbers,
        handleSearch,
        setEditData,
    } = useAlumni({ initialSearch: searchQuery });

    // Sync external search with internal state
    React.useEffect(() => {
        if (onSearchChange) {
            handleSearch(searchQuery);
        }
    }, [searchQuery, onSearchChange, handleSearch]);

    if (loading && !currentMembers.length) return <p className="text-center py-8">Memuat alumni...</p>;
    if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>;
    if (currentMembers.length === 0 && !debouncedSearch) return <p className="text-center py-8">Belum ada alumni.</p>;
    
    if (currentMembers.length === 0 && debouncedSearch) {
        return (
            <Card>
                <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada hasil</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Tidak ditemukan alumni dengan kata kunci &quot;{debouncedSearch}&quot;
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                    {debouncedSearch && (
                        <span className="inline-flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Hasil pencarian: &quot;{debouncedSearch}&quot;
                        </span>
                    )}
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Foto</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Universitas</TableHead>
                                <TableHead>Program Studi</TableHead>
                                <TableHead>Angkatan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentMembers.map((member) => (
                                <TableRow key={member.id}>
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
                                                        placeholder="Nama Alumni"
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
                                                <select
                                                    name="isActive"
                                                    value={editData.isActive ? 'true' : 'false'}
                                                    onChange={(e) => {
                                                        setEditData((prev) => ({ ...prev, isActive: e.target.value === 'true' }));
                                                    }}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                    required
                                                >
                                                    <option value="true">Aktif</option>
                                                    <option value="false">Alumni</option>     
                                                </select>
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
                                                        onClick={cancelEdit}
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    member.isActive !== false
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {member.isActive !== false ? 'Aktif' : 'Alumni'}
                                                </span>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                                        <span className="font-medium">{endIndex}</span> dari{' '}
                                        <span className="font-medium">{totalItems}</span> hasil
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
            </Card>
            <StatusModal />
        </div>
    );
};

export default ListAlumni;
