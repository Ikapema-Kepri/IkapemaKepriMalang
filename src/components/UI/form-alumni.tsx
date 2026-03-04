"use client";

import { useState, useRef, useCallback, memo } from "react";
import { Pencil, Trash2, Plus, Briefcase, User } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { sampleAlumniShowcase, AlumniShowcaseItem } from "@/data/sampleData";
import {
  FormInput,
  FormTextarea,
  ImageUploadField,
  ModalHeader,
  ModalFooter,
  DeleteConfirmModal,
} from "@/components/UI/form-shared";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalMode = "add" | "edit";

interface ModalState {
  open: boolean;
  mode: ModalMode;
  item: AlumniShowcaseItem | null;
}

interface AlumniCardProps {
  item: AlumniShowcaseItem;
  onEdit: (item: AlumniShowcaseItem) => void;
  onDelete: (id: number) => void;
}

// ─── AlumniCard (memoized) ────────────────────────────────────────────────────

const AlumniCard = memo(function AlumniCard({ item, onEdit, onDelete }: AlumniCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col md:grid md:grid-cols-3 flex-1">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={item.photoUrl} alt={item.nama} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-2 flex flex-col justify-center gap-2 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <User size={13} className="text-[#00CCFF] shrink-0" />
            <p className="text-xs md:text-sm font-semibold text-foreground leading-snug line-clamp-1">{item.nama}</p>
          </div>
          <div className="flex items-start gap-1.5">
            <Briefcase size={13} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-[10px] md:text-xs text-muted-foreground leading-snug line-clamp-2">{item.tempatBekerja}</p>
          </div>
          <p className="text-[10px] md:text-xs text-foreground/70 italic leading-relaxed line-clamp-3 border-l-2 border-[#00CCFF]/40 pl-2.5">
            &ldquo;{item.testimoni}&rdquo;
          </p>
        </div>
      </div>
      <div className="flex border-t border-border">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] md:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Pencil size={13} /> Edit
        </button>
        <div className="w-px bg-border" />
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] md:text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={13} /> Hapus
        </button>
      </div>
    </div>
  );
});

// ─── FormAlumni ───────────────────────────────────────────────────────────────

export function FormAlumni() {
  const [items, setItems] = useState<AlumniShowcaseItem[]>(sampleAlumniShowcase);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });

  // Individual state per field
  const [formNama, setFormNama] = useState("");
  const [formTempatBekerja, setFormTempatBekerja] = useState("");
  const [formTestimoni, setFormTestimoni] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setFormNama("");
    setFormTempatBekerja("");
    setFormTestimoni("");
    setPreview(null);
    setModal({ open: true, mode: "add", item: null });
  }, []);

  const openEdit = useCallback((item: AlumniShowcaseItem) => {
    setFormNama(item.nama);
    setFormTempatBekerja(item.tempatBekerja);
    setFormTestimoni(item.testimoni);
    setPreview(item.photoUrl);
    setModal({ open: true, mode: "edit", item });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, mode: "add", item: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }, []);

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSave = useCallback(() => {
    if (!formNama.trim()) return;
    if (modal.mode === "add") {
      const newItem: AlumniShowcaseItem = {
        id: Date.now(),
        nama: formNama,
        tempatBekerja: formTempatBekerja,
        testimoni: formTestimoni,
        photoUrl: preview ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formNama)}`,
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((a) =>
          a.id === modal.item!.id
            ? { ...a, nama: formNama, tempatBekerja: formTempatBekerja, testimoni: formTestimoni, photoUrl: preview ?? a.photoUrl }
            : a
        )
      );
    }
    closeModal();
  }, [formNama, formTempatBekerja, formTestimoni, preview, modal, closeModal]);

  const handleDelete = useCallback((id: number) => setDeleteId(id), []);
  const cancelDelete = useCallback(() => setDeleteId(null), []);
  const confirmDelete = useCallback(() => {
    if (deleteId !== null) {
      setItems((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);
    }
  }, [deleteId]);

  const deleteName = items.find((a) => a.id === deleteId)?.nama ?? "";

  return (
    <>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Kelola Alumni</h2>
        </div>

        {/* Table */}
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="py-6">
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item) => (
                    <AlumniCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
                  ))}
                  <button
                    type="button"
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground transition-colors min-h-[250px]"
                  >
                    <Plus size={28} />
                    <span className="text-xs md:text-sm font-medium">Tambah Alumni</span>
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
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-card border border-border shadow-xl">
            <ModalHeader
              title={modal.mode === "add" ? "Tambah Alumni" : "Edit Alumni"}
              onClose={closeModal}
            />
            <div className="px-5 py-5 flex flex-col gap-4">
              <ImageUploadField
                label="Foto Alumni"
                preview={preview}
                onUploadClick={() => fileInputRef.current?.click()}
                onRemove={handleRemoveImage}
                fileInputRef={fileInputRef}
                onFileChange={handleImageChange}
                aspectRatio="square"
                compact
                uploadHint="Maks. 5MB — Rasio 1:1 disarankan"
              />
              <FormInput
                label="Nama Alumni"
                type="text"
                value={formNama}
                onChange={(e) => setFormNama(e.target.value)}
                placeholder="Masukkan nama alumni..."
              />
              <FormInput
                label="Tempat Bekerja"
                type="text"
                value={formTempatBekerja}
                onChange={(e) => setFormTempatBekerja(e.target.value)}
                placeholder="cth. Software Engineer — Gojek"
              />
              <FormTextarea
                label="Testimoni"
                value={formTestimoni}
                onChange={(e) => setFormTestimoni(e.target.value)}
                placeholder="Tuliskan testimoni atau kesan selama bergabung di Ikapema..."
                rows={3}
              />
            </div>
            <ModalFooter
              onCancel={closeModal}
              onSave={handleSave}
              saveLabel={modal.mode === "add" ? "Tambah" : "Simpan Perubahan"}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <DeleteConfirmModal
          title="Hapus Alumni"
          description={
            <>
              Apakah Anda yakin ingin menghapus alumni{" "}
              <span className="font-semibold">&ldquo;{deleteName}&rdquo;</span>{" "}
              dari tampilan beranda?
            </>
          }
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
