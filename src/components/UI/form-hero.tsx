"use client";

import { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";
import { ImageUp } from "lucide-react";

export function FormHero() {
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Hero Section</h2>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Table with 1 row */}
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="align-top py-6">
              <div className="grid grid-cols-5 gap-8">

                {/* Upload Gambar — 3 kolom */}
                <div className="col-span-3 flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground">Gambar Hero</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative w-full aspect-video bg-[#F7F5F0] rounded-sm border-2 border-dashed border-border hover:border-[#00CCFF] transition-colors overflow-hidden"
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover"/>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-[#00CCFF] transition-colors">
                        <ImageUp size={28} />
                        <span className="text-xs font-medium">Klik untuk upload gambar</span>
                        <span className="text-xs">PNG, JPG, WEBP — maks. 5MB · Resolusi rekomendasi 1920×1080</span>
                      </div>
                    )}
                  </button>
                  {preview && (
                    <button
                      type="button"
                      onClick={() => { setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="flex items-center gap-1.5 self-start px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-md bg-red-50 hover:bg-red-100 hover:border-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Hapus gambar
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Title & Subtitle — 2 kolom */}
                <div className="col-span-2 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masukkan judul hero..."
                      className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Subtitle</label>
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Masukkan subjudul hero..."
                      rows={4}
                      className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors resize-none"
                    />
                  </div>
                </div>

              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
