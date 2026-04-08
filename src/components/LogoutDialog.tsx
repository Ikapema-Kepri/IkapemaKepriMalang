"use client";

import { memo } from "react";

interface LogoutDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutDialog = memo(function LogoutDialog({ onConfirm, onCancel }: LogoutDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Konfirmasi Logout</h2>
        <p className="text-gray-600 mb-6">Anda yakin ingin keluar dari dashboard admin?</p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
});

export default LogoutDialog;
