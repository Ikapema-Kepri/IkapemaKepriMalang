"use client";

import { useState, useRef } from "react";
import { Pencil, Trash2, Plus, X, ImageUp, Briefcase, User } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { sampleAlumniShowcase, AlumniShowcaseItem } from "@/data/sampleData";

type ModalMode = "add" | "edit";

interface ModalState {
  open: boolean;
  mode: ModalMode;
  item: AlumniShowcaseItem | null;
}

const emptyForm = { nama: "", tempatBekerja: "", testimoni: "", photoUrl: "" };

export function FormAlumni() {
  const [items, setItems] = useState<AlumniShowcaseItem[]>(sampleAlumniShowcase);
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

  const openEdit = (item: AlumniShowcaseItem) => {
    setForm({ nama: item.nama, tempatBekerja: item.tempatBekerja, testimoni: item.testimoni, photoUrl: item.photoUrl });
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
    if (!form.nama.trim()) return;
    if (modal.mode === "add") {
      const newItem: AlumniShowcaseItem = {
        id: Date.now(),
        nama: form.nama,
        tempatBekerja: form.tempatBekerja,
        testimoni: form.testimoni,
        photoUrl: preview ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(form.nama)}`,
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((a) =>
          a.id === modal.item!.id
            ? { ...a, nama: form.nama, tempatBekerja: form.tempatBekerja, testimoni: form.testimoni, photoUrl: preview ?? a.photoUrl }
            : a
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
      setItems((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Kelola Alumni</h2>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="py-6">
                <div className="grid grid-cols-2 gap-4">

                  {/* Alumni Cards */}
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                      {/* Card body: grid-cols-3 */}
                      <div className="grid grid-cols-3 flex-1">
                        {/* Col 1: Square Photo */}
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img
                            src={item.photoUrl}
                            alt={item.nama}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Col 2-3: Info */}
                        <div className="col-span-2 flex flex-col justify-center gap-2 px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <User size={13} className="text-[#00CCFF] shrink-0" />
                            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
                              {item.nama}
                            </p>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Briefcase size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                              {item.tempatBekerja}
                            </p>
                          </div>
                          <p className="text-xs text-foreground/70 italic leading-relaxed line-clamp-3 border-l-2 border-[#00CCFF]/40 pl-2.5">
                            &ldquo;{item.testimoni}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
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

                  {/* Tambah Alumni */}
                  <button
                    type="button"
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground transition-colors min-h-[120px]"
                  >
                    <Plus size={28} />
                    <span className="text-sm font-medium">Tambah Alumni</span>
                  </button>

                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-card border border-border shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">
                {modal.mode === "add" ? "Tambah Alumni" : "Edit Alumni"}
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

              {/* Upload Foto (1:1) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Foto Alumni</label>
                <div className="flex items-start gap-4">
                  {/* Square preview */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative shrink-0 w-28 aspect-square rounded-sm border-2 border-dashed border-border hover:border-[#00CCFF] bg-[#F7F5F0] overflow-hidden transition-colors"
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-1.5 text-muted-foreground group-hover:text-[#00CCFF] transition-colors">
                        <ImageUp size={20} />
                        <span className="text-[10px] font-medium text-center px-1 leading-tight">Klik untuk upload</span>
                      </div>
                    )}
                  </button>

                  {/* Upload info */}
                  <div className="flex flex-col justify-center gap-2 pt-1">
                    <p className="text-xs text-muted-foreground">Format: PNG, JPG, WEBP</p>
                    <p className="text-xs text-muted-foreground">Maks. 5MB — Rasio 1:1 disarankan</p>
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
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>

              {/* Nama Alumni */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Nama Alumni</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                  placeholder="Masukkan nama alumni..."
                  className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                />
              </div>

              {/* Tempat Bekerja */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Tempat Bekerja</label>
                <input
                  type="text"
                  value={form.tempatBekerja}
                  onChange={(e) => setForm((f) => ({ ...f, tempatBekerja: e.target.value }))}
                  placeholder="cth. Software Engineer — Gojek"
                  className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                />
              </div>

              {/* Testimoni */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Testimoni</label>
                <textarea
                  value={form.testimoni}
                  onChange={(e) => setForm((f) => ({ ...f, testimoni: e.target.value }))}
                  placeholder="Tuliskan testimoni atau kesan selama bergabung di Ikapema..."
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
              <h3 className="text-base font-semibold text-foreground">Hapus Alumni</h3>
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
                Apakah Anda yakin ingin menghapus alumni{" "}
                <span className="font-semibold">
                  &ldquo;{items.find((a) => a.id === deleteId)?.nama}&rdquo;
                </span>{" "}
                dari tampilan beranda?
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
