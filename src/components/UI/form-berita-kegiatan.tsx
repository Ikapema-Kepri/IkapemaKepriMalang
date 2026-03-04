"use client";

import { useState, useRef } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { Button } from "@/components/UI/button";
import { Pencil, Trash2, Plus, X, ImageUp} from "lucide-react";
import { sampleBeritaKegiatan, BeritaKegiatanItem} from "@/data/sampleData";

type ModalMode = "add" | "edit";

interface ModalState {
    open: boolean;
    mode: ModalMode;
    item: BeritaKegiatanItem | null;
}

const emptyForm = { title: "", description: "", date: "", label: "", photoUrl: "", status: "Draft" as "Published" | "Draft" };

const FormBeritaKegiatan = () => {
    const [items, setItems] = useState<BeritaKegiatanItem[]>(sampleBeritaKegiatan);
    const [modal, setModal] = useState<ModalState>({ open: false, mode: "add", item: null});
    const [form, setForm] = useState(emptyForm);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const openAdd = () => {
        setForm(emptyForm);
        setPreview(null);
        setModal({open: true, mode:"add", item: null});
    };

    const openEdit = (item: BeritaKegiatanItem) => {
        setForm({ title: item.title, description: item.description, date: item.date, label: item.label, photoUrl: item.photoUrl, status: item.status });
        setPreview(item.photoUrl);
        setModal({open:true, mode:"edit", item});
    };

    const closeModal = () => {
        setModal({open: false, mode: "add", item: null});
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    }

    const handleSave = () => {
        if (!form.title.trim()) return;
        if (modal.mode === "add") {
            const newItem: BeritaKegiatanItem= {
                id: Date.now(),
                title: form.title,
                description: form.description,
                label: form.label,
                photoUrl: preview || "",
                date: form.date,
                status: form.status,
            };
            setItems((prev) => [...prev, newItem]);
        } else if(modal.mode === "edit" && modal.item) {
            setItems((prev) =>
                prev.map((k) =>
                    k.id === modal.item!.id
                        ? { ...k, title: form.title, description: form.description, label: form.label, photoUrl: preview || k.photoUrl, date: form.date, status: form.status }
                        : k
        )
        );
        }
        closeModal();
    }

    const handleDelete = (id: number) => {
        setDeleteId(id);
    }
    const confirmDelete = () => {
        if(deleteId !== null) {
            setItems((prev) => prev.filter((k) => k.id !== deleteId));
            setDeleteId(null);
        }
    };

    return (
        <>
            <div className="rounded-lg border border-border bg-card shadow-sm">
                <div className="px-4 py-4 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Kelola Berita Kegiatan</h2>
                    </div>
                </div>

                <Table>
                    <TableBody>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="py-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                                            <div className="relative w-full aspect-video overflow-hidden bg-muted">
                                                <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover"/>
                                                <span className={`absolute top-4 right-4 px-2 py-1 rounded-sm text-[14px] font-medium tracking-wide ${
                                                    item.status === 'Published'
                                                        ? 'bg-green-50 text-success'
                                                        : 'bg-yellow-50 text-warning'
                                                }`}>
                                                    {item.status === 'Published' ? 'Terpublikasi' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1.5 p-3 flex-1 ">
                                                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                                            </div>
                                            <div className="flex flex-row p-3 justify-between">
                                                <p className="text-xs text-foreground flex items-center text-center">
                                                    {new Date(item.date).toLocaleDateString("en-GB",{
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>
                                                <div className="flex items-center justify-between gap-1.5">
                                                    <Button variant="primary" className="text-warning rounded-sm" onClick={() => openEdit(item)}>
                                                        <Pencil size={13}/>
                                                    </Button>
                                                    <Button variant="primary" className="text-alert rounded-sm" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 size={13}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={openAdd}
                                        className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border hover:border-[#00CCFF] hover:text-[#00CCFF] text-muted-foreground aspect-4/3 min-h-[200px]">
                                        
                                        <Plus size={28}/>
                                        <span className="text-sm font-medium">Tambah Berita Kegiatan</span>
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {modal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center"> 
                        <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

                        <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl bg-card border border-border shadow-xl"> 
                            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                                <h3 className="text-base font-semibold text-foreground">
                                    {modal.mode === "add" ? "Tambah Berita Kegiatan" : "Edit Berita Kegiatan"}
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="px-5 py-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Foto Berita Kegiatan</label>
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

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Judul Berita</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                        placeholder="Masukkan judul berita..."
                                        className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Label Kategori</label>
                                    <input
                                        type="text"
                                        value={form.label}
                                        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                                        placeholder="cth. Departemen Kominfo, Acara Sosial, dll"
                                        className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Deskripsi Berita</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                        placeholder="Masukkan deskripsi berita kegiatan..."
                                        rows={4}
                                        className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Tanggal Kegiatan</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                                        className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-foreground">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "Published" | "Draft" }))}
                                        className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Terpublikasi</option>
                                    </select>
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
                                <h3 className="text-base font-semibold text-foreground">Hapus Berita Kegiatan</h3>
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
                                    Apakah Anda yakin ingin menghapus berita{" "}
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

            </div>
        </>
    )


}

export default FormBeritaKegiatan;