"use client";

import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";
import { ImageUp } from "lucide-react";
import { useAsrama } from "@/hooks/useAsrama";
import { useContactAsrama } from "@/hooks/useKontakAsrama";
import Image from "next/image";
import type { KontakAsrama } from "@/types";
import { triggerModal } from "@/store/useModalStore";
import StatusModal from "@/components/UI/status-modal";

interface AsramaFormProps {
  label: string;
}

function AsramaForm({ label }: AsramaFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const { asramaPutra, asramaPutri, updateAsrama, createAsrama, isSubmitting } = useAsrama({ isAdmin: true });

  const idAsrama = label === "Asrama Putra" ? "asramaPutra" : "asramaPutri";
  const asramaData = label === "Asrama Putra" ? asramaPutra : asramaPutri;

  useEffect(() => {
    if (asramaData) {
      setNama(asramaData.name || "");
      setAlamat(asramaData.address || "");
      if (asramaData.photoUrl && !selectedFile && !isImageDeleted) {
        setPreview(asramaData.photoUrl);
      }
    }
  }, [asramaData, selectedFile, isImageDeleted]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setIsImageDeleted(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setSelectedFile(null);
    setIsImageDeleted(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (nama) formData.append('name', nama);
    if (alamat) formData.append('address', alamat);
    if (selectedFile) formData.append('image', selectedFile);
    if (isImageDeleted && !selectedFile) formData.append('deleteImage', 'true');

    const res = asramaData 
        ? await updateAsrama(idAsrama, formData)
        : await createAsrama(idAsrama, formData);

    if (res.success) {
      triggerModal("success", `${label} berhasil disimpan!`);
      setSelectedFile(null);
      setIsImageDeleted(false);
    } else {
      triggerModal("error", `Gagal menyimpan ${label}: ` + res.message);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm h-fit">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{label}</h2>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 text-[clamp(12px,2vw,16px)] font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {/* Table with 1 row */}
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="align-top py-6">
              <div className="grid grid-row gap-8">

                {/* Grid 1 — Upload Foto Asrama (persegi) */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground">Foto Asrama</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative w-full aspect-video bg-[#F7F5F0] rounded-sm border-2 border-dashed border-border hover:border-[#00CCFF] transition-colors overflow-hidden"
                  >
                    {preview ? (
                      <Image src={preview} alt="Preview" fill className=" object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-[#00CCFF] transition-colors">
                        <ImageUp size={28} />
                        <span className="text-xs font-medium">Klik untuk upload foto</span>
                        <span className="text-xs">PNG, JPG, WEBP — maks. 5MB</span>
                      </div>
                    )}
                  </button>
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1.5 self-start px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-md bg-red-50 hover:bg-red-100 hover:border-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Hapus foto
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

                {/* Grid 2 — Nama & Alamat */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Nama Asrama</label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukkan nama asrama..."
                      className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Alamat Asrama</label>
                    <textarea
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder="Masukkan alamat lengkap asrama..."
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
      <StatusModal />
    </div>
  );
}

function KontakAsramaForm() {
  const { kontakAsrama, updateContactAsrama, createContactAsrama, isSubmitting, loading } = useContactAsrama({ isAdmin: true });
  
  const [buttonLabel, setButtonLabel] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (kontakAsrama) {
      setButtonLabel(kontakAsrama.buttonLabel || "");
      setWhatsappUrl(kontakAsrama.whatsappUrl || "");
      setIsActive(kontakAsrama.isActive ?? true);
    }
  }, [kontakAsrama]);

  const handleSubmit = async () => {
    const data: Omit<KontakAsrama, 'id'> = { buttonLabel, whatsappUrl, isActive };
    const res = kontakAsrama 
        ? await updateContactAsrama(data)
        : await createContactAsrama(data);

    if (res.success) {
      alert(`Kontak asrama berhasil disimpan!`);
    } else {
      alert(`Gagal menyimpan kontak asrama: ` + res.message);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm md:col-span-2">
      <div className="px-4 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Kontak Asrama (Tombol Hubung)</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Atur tombol kontak WhatsApp yang melayang/muncul pada asrama</p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || loading}
          className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
           <label className="text-sm font-medium text-foreground">Label Tombol</label>
           <input
             type="text"
             value={buttonLabel}
             onChange={(e) => setButtonLabel(e.target.value)}
             placeholder="Contoh: Hubungi Kami"
             className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
           />
        </div>
        <div className="flex flex-col gap-1.5">
           <label className="text-sm font-medium text-foreground">URL WhatsApp (wa.me/...)</label>
           <input
             type="text"
             value={whatsappUrl}
             onChange={(e) => setWhatsappUrl(e.target.value)}
             placeholder="Contoh: https://wa.me/628123456789"
             className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
           />
        </div>
        
        <div className="flex items-center gap-2 cursor-pointer md:col-span-2" onClick={() => setIsActive(!isActive)}>
          <input 
            type="checkbox" 
            checked={isActive} 
            readOnly
            className="w-4 h-4 text-[#00CCFF] bg-gray-100 border-gray-300 rounded focus:ring-[#00CCFF] accent-[#00CCFF]"
          />
          <label className="text-sm font-semibold text-foreground cursor-pointer">Tampilkan Tombol Kontak Asrama</label>
        </div>
      </div>
    </div>
  );
}

export function FormAsrama() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-6 items-start">
      <AsramaForm label="Asrama Putra" />
      <AsramaForm label="Asrama Putri" />
      <KontakAsramaForm />
    </div>
  );
}
