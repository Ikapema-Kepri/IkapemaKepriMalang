"use client";

import { useState, useRef, useCallback, memo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { Button } from "@/components/UI/button";
import { sampleBeritaKegiatan, BeritaKegiatanItem } from "@/data/sampleData";
import {
  FormInput,
  FormTextarea,
  FormSelect,
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
  item: BeritaKegiatanItem | null;
}

interface BeritaCardProps {
  item: BeritaKegiatanItem;
  onEdit: (item: BeritaKegiatanItem) => void;
  onDelete: (id: number) => void;
}

// ─── BeritaCard (memoized) ────────────────────────────────────────────────────

const BeritaCard = memo(function BeritaCard({ item, onEdit, onDelete }: BeritaCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
        <span
          className={`absolute top-4 right-4 px-2 py-1 rounded-sm text-[14px] font-medium tracking-wide ${
            item.status === "Published" ? "bg-green-50 text-success" : "bg-yellow-50 text-warning"
          }`}
        >
          {item.status === "Published" ? "Terpublikasi" : "Draft"}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
      </div>
      <div className="flex flex-row p-3 justify-between">
        <p className="text-xs text-foreground flex items-center text-center">
          {new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <div className="flex items-center justify-between gap-1.5">
          <Button variant="primary" className="text-warning rounded-sm" onClick={() => onEdit(item)}>
            <Pencil size={13} />
          </Button>
          <Button variant="primary" className="text-alert rounded-sm" onClick={() => onDelete(item.id)}>
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
});

// ─── FormBeritaKegiatan ───────────────────────────────────────────────────────

const FormBeritaKegiatan = () => {
  const [items, setItems] = useState<BeritaKegiatanItem[]>(sampleBeritaKegiatan);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });

  // Individual state per field
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formStatus, setFormStatus] = useState<"Published" | "Draft">("Draft");

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = useCallback(() => {
    setFormTitle("");
    setFormDescription("");
    setFormDate("");
    setFormLabel("");
    setFormStatus("Draft");
    setPreview(null);
    setModal({ open: true, mode: "add", item: null });
  }, []);

  const openEdit = useCallback((item: BeritaKegiatanItem) => {
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormDate(item.date);
    setFormLabel(item.label);
    setFormStatus(item.status);
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
      const newItem: BeritaKegiatanItem = {
        id: Date.now(),
        title: formTitle,
        description: formDescription,
        label: formLabel,
        photoUrl: preview || "",
        date: formDate,
        status: formStatus,
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((k) =>
          k.id === modal.item!.id
            ? { ...k, title: formTitle, description: formDescription, label: formLabel, photoUrl: preview || k.photoUrl, date: formDate, status: formStatus }
            : k
        )
      );
    }
    closeModal();
  }, [formTitle, formDescription, formLabel, preview, formDate, formStatus, modal, closeModal]);

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
          <h2 className="text-lg font-semibold text-foreground">Kelola Berita Kegiatan</h2>
        </div>

        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="py-6">
                <div className="grid grid-cols-3 gap-4">
                  {items.map((item) => (
                    <BeritaCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
                  ))}
                  <button
                    type="button"
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground aspect-4/3 min-h-[200px]"
                  >
                    <Plus size={28} />
                    <span className="text-sm font-medium">Tambah Berita Kegiatan</span>
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
              title={modal.mode === "add" ? "Tambah Berita Kegiatan" : "Edit Berita Kegiatan"}
              onClose={closeModal}
            />
            <div className="px-5 py-5 flex flex-col gap-4">
              <ImageUploadField
                label="Foto Berita Kegiatan"
                preview={preview}
                onUploadClick={() => fileInputRef.current?.click()}
                onRemove={handleRemoveImage}
                fileInputRef={fileInputRef}
                onFileChange={handleImageChange}
                uploadHint="PNG, JPG, WEBP — maks. 5MB"
              />
              <FormInput
                label="Judul Berita"
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Masukkan judul berita..."
              />
              <FormInput
                label="Label Kategori"
                type="text"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="cth. Departemen Kominfo, Acara Sosial, dll"
              />
              <FormTextarea
                label="Deskripsi Berita"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Masukkan deskripsi berita kegiatan..."
                rows={4}
              />
              <FormInput
                label="Tanggal Kegiatan"
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
              <FormSelect
                label="Status"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "Published" | "Draft")}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Terpublikasi</option>
              </FormSelect>
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
          title="Hapus Berita Kegiatan"
          description={
            <>
              Apakah Anda yakin ingin menghapus berita{" "}
              <span className="font-semibold">&ldquo;{deleteName}&rdquo;</span>?
            </>
          }
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default FormBeritaKegiatan;