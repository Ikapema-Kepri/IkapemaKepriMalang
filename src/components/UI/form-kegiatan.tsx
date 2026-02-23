"use client";

import { useState, useRef } from "react";
import { Pencil, Trash2, Plus, X, ImageUp } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { sampleKegiatan, KegiatanItem } from "@/data/sampleData";

type ModalMode = "add" | "edit";

interface ModalState {
  open: boolean;
  mode: ModalMode;
  item: KegiatanItem | null;
}

const emptyForm = { title: "", description: "", label: "", photoUrl: "" };

export function FormKegiatan() {
  const [items, setItems] = useState<KegiatanItem[]>(sampleKegiatan);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => {
    setForm(emptyForm);
    setPreview(null);
    setModal({ open: true, mode: "add", item: null });
  };

  const openEdit = (item: KegiatanItem) => {
    setForm({ title: item.title, description: item.description, label: item.label, photoUrl: item.photoUrl });
    setPreview(item.photoUrl);
    setModal({ open: true, mode: "edit", item });
  };

  const closeModal = () => {
    setModal({ open: false, mode: "add", item: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (modal.mode === "add") {
      const newItem: KegiatanItem = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        label: form.label,
        photoUrl: preview ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((k) =>
          k.id === modal.item!.id
            ? { ...k, title: form.title, description: form.description, label: form.label, photoUrl: preview ?? k.photoUrl }
            : k
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setItems((prev) => prev.filter((k) => k.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Kelola Kegiatan</h2>
          </div>
        </div>

        {/* Table: 1 col, 1 row */}
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="py-6">
                <div className="grid grid-cols-3 gap-4">

                  {/* Kegiatan Cards */}
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                      <div className="relative w-full aspect-video overflow-hidden bg-muted">
                        <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 flex-1">
                        <span className="inline-block self-start rounded-full bg-[#00CCFF]/10 text-[#00CCFF] text-xs font-medium px-2.5 py-0.5">
                          {item.label}
                        </span>
                        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                      <div className="flex border-t border-border">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <div className="w-px bg-border" />
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Tambah Kegiatan */}
                  <button
                    type="button"
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground transition-colors aspect-[4/3] min-h-[200px]"
                  >
                    <Plus size={28} />
                    <span className="text-sm font-medium">Tambah Kegiatan</span>
                  </button>

                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-card border border-border shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">
                {modal.mode === "add" ? "Tambah Kegiatan" : "Edit Kegiatan"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-5 flex flex-col gap-4">

              {/* Upload Foto */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Foto Kegiatan</label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative w-full aspect-video rounded-sm border-2 border-dashed border-border hover:border-[#00CCFF] bg-[#F7F5F0] overflow-hidden transition-colors"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-[#00CCFF] transition-colors">
                      <ImageUp size={24} />
                      <span className="text-xs font-medium">Klik untuk upload foto</span>
                      <span className="text-xs">PNG, JPG, WEBP — maks. 5MB</span>
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
                    Hapus foto
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>

              {/* Nama Kegiatan */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Nama Kegiatan</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Masukkan nama kegiatan..."
                  className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                />
              </div>

              {/* Label Departemen */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Label Departemen</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  placeholder="cth. Departemen Kominfo"
                  className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                />
              </div>

              {/* Deskripsi */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Deskripsi Kegiatan</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Masukkan deskripsi kegiatan..."
                  rows={3}
                  className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
              >
                {modal.mode === "add" ? "Tambah" : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative z-10 w-full max-w-sm mx-4 rounded-xl bg-card border border-border shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">Hapus Kegiatan</h3>
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm text-foreground">
                Apakah Anda yakin ingin menghapus kegiatan{" "}
                <span className="font-semibold">
                  &ldquo;{items.find((k) => k.id === deleteId)?.title}&rdquo;
                </span>?
              </p>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium rounded-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

