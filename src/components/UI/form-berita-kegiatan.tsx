"use client";

import { useState, useRef, useCallback, memo } from "react";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { Button } from "@/components/UI/button";
import { berita, Berita } from "@/data/sampleData";
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
  item: Berita | null;
}

interface BeritaCardProps {
  item: Berita;
  onEdit: (item: Berita) => void;
  onDelete: (id: string) => void;
}

// ─── BeritaCard (memoized) ────────────────────────────────────────────────────

const BeritaCard = memo(function BeritaCard({ item, onEdit, onDelete }: BeritaCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm relative group hover:border-[#00CCFF]/30 transition-colors duration-200">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img src={item.thumbnail || "/LogoIkapema.webp"} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span
          className={`absolute top-4 right-4 px-2 py-1 rounded-[4px] text-[12px] font-medium tracking-wide ${
            item.status === "Published" ? "bg-green-50 text-success" : item.status === "Draft" ? "bg-yellow-50 text-warning" : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.status === "Published" ? "Terpublikasi" : item.status}
        </span>
        {item.is_featured && (
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-[4px] text-[11px] font-bold bg-[#00A3CC] text-white tracking-wide shadow-sm">
            FEATURED
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2" title={item.title}>{item.title}</p>
        <p className="text-[11px] font-bold text-[#00A3CC] tracking-wider mt-1">{item.category?.toUpperCase() || "UMUM"}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Oleh: <span className="font-medium text-foreground">{item.author || "Admin"}</span></p>
      </div>
      <div className="flex flex-col p-3 border-t border-border mt-auto">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[11px] text-muted-foreground font-medium">
            {item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) : "Belum dipublikasi"}
          </p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
            <Eye size={13} /> {item.views || 0}
          </p>
        </div>
        <div className="flex items-center justify-between gap-1.5 border-t border-transparent pt-1">
          <Button variant="primary" className="text-warning rounded-sm" onClick={() => onEdit(item)}>
            <Pencil size={13} />
          </Button>
          <Button variant="primary" className="text-alert rounded-sm" onClick={() => onDelete(item.id!)}>
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
});

// ─── FormBeritaKegiatan ───────────────────────────────────────────────────────

const FormBeritaKegiatan = () => {
  const [items, setItems] = useState<Berita[]>(berita);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null });

  // Individual state per field
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formAuthor, setFormAuthor] = useState("Admin");
  const [formStatus, setFormStatus] = useState<"Published" | "Draft" | "Archived">("Draft");

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = useCallback(() => {
    setFormTitle("");
    setFormDescription("");
    setFormDate("");
    setFormLabel("");
    setFormAuthor("Admin");
    setFormStatus("Draft");
    setPreview(null);
    setModal({ open: true, mode: "add", item: null });
  }, []);

  const openEdit = useCallback((item: Berita) => {
    setFormTitle(item.title);
    setFormDescription(item.summary || "");
    const d = item.published_at ? new Date(item.published_at) : null;
    setFormDate(d && !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "");
    setFormLabel(item.category || "");
    setFormAuthor(item.author || "Admin");
    setFormStatus(item.status);
    setPreview(item.thumbnail || null);
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
      const newItem: Berita = {
        id: Date.now().toString(),
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/ /g, "-"),
        summary: formDescription,
        content: formDescription,
        category: formLabel,
        thumbnail: preview || "",
        published_at: formDate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [],
        author: formAuthor,
        status: formStatus,
        views: 0,
        is_featured: false,
      };
      setItems((prev) => [...prev, newItem]);
    } else if (modal.mode === "edit" && modal.item) {
      setItems((prev) =>
        prev.map((k) =>
          k.id === modal.item!.id
            ? { ...k, title: formTitle, summary: formDescription, category: formLabel, thumbnail: preview || k.thumbnail, published_at: formDate, status: formStatus, author: formAuthor }
            : k
        )
      );
    }
    closeModal();
  }, [formTitle, formDescription, formLabel, formAuthor, preview, formDate, formStatus, modal, closeModal]);

  const handleDelete = useCallback((id: string) => setDeleteId(id), []);
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
                placeholder="cth. event, workshop, dll"
              />
              <FormInput
                label="Penulis"
                type="text"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                placeholder="cth. Departemen Kominfo"
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
                onChange={(e) => setFormStatus(e.target.value as "Published" | "Draft" | "Archived")}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Terpublikasi</option>
                <option value="Archived">Diarsipkan</option>
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