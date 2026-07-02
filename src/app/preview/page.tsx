"use client";

import StatusModal from "@/components/UI/status-modal";
import { useModalStore } from "@/store/useModalStore";

export default function PreviewPage() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Status Modal Preview</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Status modal menggunakan state management (Zustand). Secara default, modal dalam kondisi tertutup (<code className="bg-gray-100 px-1 py-0.5 rounded text-red-500 font-mono">isOpen: false</code>).
          <br /><br />
          Gunakan tombol di bawah ini untuk memicu modal dan mencoba berbagai varian status:
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => openModal("success", "Selamat! Registrasi Anda berhasil dilakukan.", "")}
            className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition-all hover:bg-green-700 active:scale-98 shadow-md shadow-green-100"
          >
            Trigger Success Modal
          </button>
          
          <button
            onClick={() => openModal("error", "Gagal! Terjadi kesalahan koneksi sistem.", "")}
            className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all hover:bg-red-700 active:scale-98 shadow-md shadow-red-100"
          >
            Trigger Error Modal
          </button>

          <button
            onClick={() => openModal("info", "Informasi! Sesi Anda akan segera berakhir.", "")}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-100"
          >
            Trigger Info Modal
          </button>
        </div>
      </div>

      {/* Modal Container */}
      <StatusModal />
    </div>
  );
}