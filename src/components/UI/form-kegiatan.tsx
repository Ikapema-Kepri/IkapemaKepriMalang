"use client";

import { useState, useCallback, memo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { useKegiatan } from "@/hooks/useKegiatan";
import { Kegiatan } from "@/types";
import {
  FormInput,
  FormTextarea,
  ImageUploadField,
  ModalHeader,
  ModalFooter,
  DeleteConfirmModal,
} from "@/components/UI/form-shared";
import Image from "next/image";
import { triggerModal } from "@/store/useModalStore";
import StatusModal from "@/components/UI/status-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalMode = "add" | "edit";

interface ModalState {
  open: boolean;
  mode: ModalMode;
  item: Kegiatan | null;
}

interface KegiatanCardProps {
  item: Kegiatan;
  onEdit: (item: Kegiatan) => void;
  onDelete: (id: string) => void;
}

// ─── KegiatanCard (memoized) ──────────────────────────────────────────────────

const KegiatanCard = memo(function KegiatanCard({ item, onEdit, onDelete }: KegiatanCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <Image src={item.photoUrl || ""} alt={item.title || "Kegiatan"} fill className="w-full h-full object-cover" />
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
          onClick={() => onDelete(item.id!)}
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
  const { kegiatan, createKegiatan, updateKegiatan, deleteKegiatan, isSubmitting } = useKegiatan({ isAdmin: true });
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });

  // Individual state per field
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLabel, setFormLabel] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onDrop = useCallback((file: File) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setIsImageDeleted(false);
  }, []);

  const openAdd = useCallback(() => {
    setFormTitle("");
    setFormDescription("");
    setFormLabel("");
    setPreview(null);
    setSelectedFile(null);
    setIsImageDeleted(false);
    setModal({ open: true, mode: "add", item: null });
  }, []);

  const openEdit = useCallback((item: Kegiatan) => {
    setFormTitle(item.title || "");
    setFormDescription(item.description || "");
    setFormLabel(item.label || "");
    setPreview(item.photoUrl || null);
    setSelectedFile(null);
    setIsImageDeleted(false);
    setModal({ open: true, mode: "edit", item });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, mode: "add", item: null });
    setPreview(null);
    setSelectedFile(null);
    setIsImageDeleted(false);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
    setIsImageDeleted(true);
  }, []);

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    
    // Disable form handling while saving
    if (isSubmitting) return;

    const formData = new FormData();
    formData.append('title', formTitle);
    if (formDescription) formData.append('description', formDescription);
    if (formLabel) formData.append('label', formLabel);
    if (selectedFile) formData.append('image', selectedFile);
    if (isImageDeleted && !selectedFile) formData.append('deleteImage', 'true');

    if (modal.mode === "add") {
      const res = await createKegiatan(formData);
      if (res.success) {
        triggerModal("success", "Berhasil menambah kegiatan");
      } else {
        triggerModal("error", "Gagal menambah kegiatan: " + res.message);
      }
    } else if (modal.mode === "edit" && modal.item?.id) {
      const res = await updateKegiatan(modal.item.id, formData);
      if (res.success) {
        triggerModal("success", "Kegiatan " + modal.item.title + " berhasil diupdate");
      } else {
        triggerModal("error", "Gagal mengupdate kegiatan " + modal.item.title + ": " + res.message);
      }
    }
    closeModal();
  };

  const handleDelete = useCallback((id: string) => setDeleteId(id), []);
  const cancelDelete = useCallback(() => setDeleteId(null), []);
  
  const confirmDelete = async () => {
    if (deleteId !== null) {
      const res = await deleteKegiatan(deleteId);
      if (res.success) {
        triggerModal("success", "Kegiatan " + deleteName + " berhasil dihapus");
      } else {
        triggerModal("error", "Gagal menghapus kegiatan " + deleteName + ": " + res.message);
      }
      setDeleteId(null);
    }
  };

  const deleteName = kegiatan.find((k) => k.id === deleteId)?.title ?? "";

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
                  {kegiatan.map((item) => (
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
        <StatusModal />
      </div>

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={isSubmitting ? undefined : closeModal} />
          <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-card border border-border shadow-xl">
            <ModalHeader
              title={modal.mode === "add" ? "Tambah Kegiatan" : "Edit Kegiatan"}
              onClose={isSubmitting ? () => {} : closeModal}
            />
            <div className="px-5 py-5 flex flex-col gap-4">
              <ImageUploadField
                label="Foto Kegiatan"
                preview={preview}
                onFileDrop={onDrop}
                onRemove={handleRemoveImage}
                uploadHint="PNG, JPG, WEBP — maks. 1MB"
                maxSize={1048576}
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
              saveLabel={isSubmitting ? "Menyimpan..." : (modal.mode === "add" ? "Tambah" : "Simpan Perubahan")}
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
