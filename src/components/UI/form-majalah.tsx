"use client";

import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";
import { ImageUploadField, FormInput } from "@/components/UI/form-shared";
import { useMajalah } from "@/hooks/useMajalah";

export function FormMajalah() {
  const { majalah, createOrUpdateMajalah, isSubmitting } = useMajalah({ isAdmin: true });

  const [fileUrl, setFileUrl] = useState("");
  const [judul, setJudul] = useState("");
  
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null as any);

  useEffect(() => {
    if (majalah) {
      setFileUrl(majalah.fileUrl || "");
      setJudul(majalah.title || "");
      if (majalah.photoUrl && !selectedFile && !isImageDeleted) {
        setPreview(majalah.photoUrl);
      }
    }
  }, [majalah, selectedFile, isImageDeleted]);

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
    if (!fileUrl) {
      alert("URL File Google Drive wajib diisi!");
      return;
    }
    
    if (isSubmitting) return;

    const formData = new FormData();
    if (judul) formData.append('title', judul);
    formData.append('fileUrl', fileUrl);
    if (selectedFile) formData.append('image', selectedFile);
    if (isImageDeleted && !selectedFile) formData.append('deleteImage', 'true');

    const res = await createOrUpdateMajalah(formData);
    if (res.success) {
      alert("Majalah berhasil disimpan!");
      setSelectedFile(null);
      setIsImageDeleted(false);
    } else {
      alert("Gagal menyimpan majalah: " + res.message);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Majalah Section</h2>
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

      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="align-top py-6">
              <div className="flex flex-col gap-6 max-w-xl">
                
                <ImageUploadField
                  label="Foto Cover Majalah"
                  preview={preview}
                  onUploadClick={() => fileInputRef.current?.click()}
                  onRemove={handleRemoveImage}
                  fileInputRef={fileInputRef}
                  onFileChange={handleImageChange}
                  uploadHint="PNG, JPG, WEBP — maks. 5MB"
                />

                <FormInput
                  label="Judul Majalah"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Majalah Ikapema Edisi 2025"
                />

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

              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
