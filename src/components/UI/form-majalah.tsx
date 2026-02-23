"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";

export function FormMajalah() {
  const [fileUrl, setFileUrl] = useState("");
  const [judul, setJudul] = useState("");

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Majalah Section</h2>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Table with 1 row, 1 col */}
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="align-top py-6">
              <div className="flex flex-col gap-6 max-w-xl">

                {/* URL File */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-foreground">
                    URL File (Google Drive)
                  </label>
                  <p className="text-xs text-muted-foreground -mt-0.5">
                    Masukkan link berbagi Google Drive yang dapat diakses publik.
                  </p>
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-border rounded-sm outline-none focus:border-[#00CCFF] transition-colors placeholder:text-muted-foreground"
                  />
                </div>

                {/* Judul Majalah */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-foreground">
                    Judul Majalah
                  </label>
                  <p className="text-xs text-muted-foreground -mt-0.5">
                    Nama atau edisi majalah yang akan ditampilkan.
                  </p>
                  <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Contoh: Majalah Ikapema Edisi 2025"
                    className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-border rounded-sm outline-none focus:border-[#00CCFF] transition-colors placeholder:text-muted-foreground"
                  />
                </div>

              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
