// components/UI/add-member-form.tsx

"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { Anggota, ApiResponse } from "../../types";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UNIVERSITAS_OPTIONS = [
  "UB",
  "UM",
  "UMM",
  "Polinema",
  "UIN",
  "Binus",
  "UNISMA",
  "UNMER",
  "ITN",
];

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [namaAnggota, setNamaAnggota] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [programStudi, setProgramStudi] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setNamaAnggota("");
    setUniversitas("");
    setProgramStudi("");
    setAngkatan("");
    setIsActive(true);
    setPhotoFile(null);
    setPhotoPreview("");
    setMessage("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setUploading(true);

    try {
      let photoURL = "";
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const uploadRes = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.message || "Upload foto gagal.");
        photoURL = uploadData.imageUrl;
      }

      const newMember: Anggota = {
        namaAnggota,
        universitas,
        programStudi,
        angkatan,
        isActive,
        photoURL: photoURL || null,
      };

      const response = await fetch("/api/anggota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Gagal menambahkan anggota.");

      setMessage(data.message);
      resetForm();
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Gagal menambahkan anggota."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#005266]">
            Tambah Anggota Baru
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Foto */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-32 h-32 rounded-sm bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00CCFF] transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Preview foto"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-[#00CCFF] hover:underline"
            >
              {photoPreview ? "Ganti foto" : "Pilih foto"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Nama Anggota */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Anggota <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={namaAnggota}
              onChange={(e) => setNamaAnggota(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
              placeholder="Masukkan nama anggota"
            />
          </div>

          {/* Universitas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Universitas <span className="text-red-500">*</span>
            </label>
            <select
              value={universitas}
              onChange={(e) => setUniversitas(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition bg-white"
            >
              <option value="" disabled>
                Pilih universitas
              </option>
              {UNIVERSITAS_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Program Studi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Studi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={programStudi}
              onChange={(e) => setProgramStudi(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
              placeholder="Masukkan program studi"
            />
          </div>

          {/* Angkatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Angkatan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={angkatan}
              onChange={(e) => setAngkatan(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
              placeholder="Contoh: 2021"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={isActive === true}
                  onChange={() => setIsActive(true)}
                  className="accent-[#00A3CC]"
                />
                <span className="text-sm text-gray-700">Aktif</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={isActive === false}
                  onChange={() => setIsActive(false)}
                  className="accent-[#00A3CC]"
                />
                <span className="text-sm text-gray-700">Alumni</span>
              </label>
            </div>
          </div>

          {/* Feedback */}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold text-sm shadow hover:from-[#00394d] hover:to-[#008fb3] transition disabled:opacity-60"
            >
              {uploading ? "Menyimpan..." : "Tambah Anggota"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;