"use client";

import { useState, useRef, useCallback, memo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { sampleKegiatan, KegiatanItem } from "@/data/sampleData";
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
  item: KegiatanItem | null;
}

interface KegiatanCardProps {
  item: KegiatanItem;
  onEdit: (item: KegiatanItem) => void;
  onDelete: (id: number) => void;
}

// ─── KegiatanCard (memoized) ──────────────────────────────────────────────────

const KegiatanCard = memo(function KegiatanCard({ item, onEdit, onDelete }: KegiatanCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <span className="inline-block self-start rounded-full bg-[#00CCFF]/10 text-[#00CCFF] text-[10px] md:text-xs font-medium px-2.5 py-0.5">
          {item.label}
        </span>
        <p className="text-xs md:text-sm font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
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

// ─── FormKegiatan ─────────────────────────────────────────────────────────────

export function FormKegiatan() {
  const [items, setItems] = useState<KegiatanItem[]>(sampleKegiatan);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });

  // Individual state per field
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLabel, setFormLabel] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setFormTitle("");
    setFormDescription("");
    setFormLabel("");
    setPreview(null);
    setModal({ open: true, mode: "add", item: null });
  }, []);

  const openEdit = useCallback((item: KegiatanItem) => {
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormLabel(item.label);
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
    if (!formTitle.trim()) return;
    if (modal.mode === "add") {
      const newItem: KegiatanItem = {
        id: Date.now(),
        title: formTitle,
        description: formDescription,
        label: formLabel,
        photoUrl: preview ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((k) =>
          k.id === modal.item!.id
            ? { ...k, title: formTitle, description: formDescription, label: formLabel, photoUrl: preview ?? k.photoUrl }
            : k
        )
      );
    }
    closeModal();
  }, [formTitle, formDescription, formLabel, preview, modal, closeModal]);

  const handleDelete = useCallback((id: number) => setDeleteId(id), []);
  const cancelDelete = useCallback(() => setDeleteId(null), []);
  const confirmDelete = useCallback(() => {
    if (deleteId !== null) {
      setItems((prev) => prev.filter((k) => k.id !== deleteId));
      setDeleteId(null);
    }
  }, [deleteId]);

  const deleteName = items.find((k) => k.id === deleteId)?.title ?? "";

  return (
    <>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Kelola Kegiatan</h2>
        </div>

        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <KegiatanCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
                  ))}
                  <button
                    type="button"
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground transition-colors min-h-[250px]"
                  >
                    <Plus size={28} />
                    <span className="text-xs md:text-sm font-medium">Tambah Kegiatan</span>
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
              title={modal.mode === "add" ? "Tambah Kegiatan" : "Edit Kegiatan"}
              onClose={closeModal}
            />
            <div className="px-5 py-5 flex flex-col gap-4">
              <ImageUploadField
                label="Foto Kegiatan"
                preview={preview}
                onUploadClick={() => fileInputRef.current?.click()}
                onRemove={handleRemoveImage}
                fileInputRef={fileInputRef}
                onFileChange={handleImageChange}
                uploadHint="PNG, JPG, WEBP — maks. 5MB"
              />
              <FormInput
                label="Nama Kegiatan"
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Masukkan nama kegiatan..."
              />
              <FormInput
                label="Label Departemen"
                type="text"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="cth. Departemen Kominfo"
              />
              <FormTextarea
                label="Deskripsi Kegiatan"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Masukkan deskripsi kegiatan..."
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
          title="Hapus Kegiatan"
          description={
            <>
              Apakah Anda yakin ingin menghapus kegiatan{" "}
              <span className="font-semibold">&ldquo;{deleteName}&rdquo;</span>?
            </>
          }
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}

