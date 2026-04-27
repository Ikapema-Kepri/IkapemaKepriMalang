"use client";

import { memo } from "react";
import { X, ImageUp } from "lucide-react";
import Image from "next/image";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export interface ModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
}

export interface DeleteConfirmModalProps {
  title: string;
  description: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ConfirmModalProps {
  title: string;
  description: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "primary" | "cyan";
}

export interface ImageUploadFieldProps {
  label: string;
  preview: string | null;
  onUploadClick: () => void;
  onRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** "video" = aspect-video (default), "square" = aspect-square */
  aspectRatio?: "video" | "square";
  uploadHint?: string;
  /** Compact mode: small thumbnail on left + info on right (used in modals) */
  compact?: boolean;
}

// ─── Shared input class ───────────────────────────────────────────────────────

export const inputCls =
  "w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors";

// ─── TrashIcon ────────────────────────────────────────────────────────────────

export const TrashIcon = memo(function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
});

// ─── FormField ────────────────────────────────────────────────────────────────

export const FormField = memo(function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
});

// ─── FormInput ────────────────────────────────────────────────────────────────

export const FormInput = memo(function FormInput({ label, ...props }: FormInputProps) {
  const input = <input className={inputCls} {...props} />;
  return label ? <FormField label={label}>{input}</FormField> : input;
});

// ─── FormTextarea ─────────────────────────────────────────────────────────────

export const FormTextarea = memo(function FormTextarea({ label, ...props }: FormTextareaProps) {
  const ta = <textarea className={`${inputCls} resize-none`} {...props} />;
  return label ? <FormField label={label}>{ta}</FormField> : ta;
});

// ─── FormSelect ───────────────────────────────────────────────────────────────

export const FormSelect = memo(function FormSelect({ label, children, ...props }: FormSelectProps) {
  const sel = (
    <select className={inputCls} {...props}>
      {children}
    </select>
  );
  return label ? <FormField label={label}>{sel}</FormField> : sel;
});

// ─── ModalHeader ──────────────────────────────────────────────────────────────

export const ModalHeader = memo(function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <button
        type="button"
        onClick={onClose}
        className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
});

// ─── ModalFooter ──────────────────────────────────────────────────────────────

export const ModalFooter = memo(function ModalFooter({
  onCancel,
  onSave,
  saveLabel = "Simpan Perubahan",
  cancelLabel = "Batal",
}: ModalFooterProps) {
  return (
    <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
      >
        {saveLabel}
      </button>
    </div>
  );
});

// ─── DeleteConfirmModal ───────────────────────────────────────────────────────

export const DeleteConfirmModal = memo(function DeleteConfirmModal({
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-xl bg-card border border-border shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">
          <p className="text-sm text-foreground">{description}</p>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── ConfirmModal ─────────────────────────────────────────────────────────────

export const ConfirmModal = memo(function ConfirmModal({
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  confirmVariant = "primary",
}: ConfirmModalProps) {
  const confirmBtnClass =
    confirmVariant === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white border border-transparent"
      : confirmVariant === "cyan" 
      ? "bg-[#00CCFF] hover:bg-[#00b3e0] text-white border border-transparent"
      : "bg-primary hover:bg-primary/90 text-primary-foreground border border-transparent";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-xl bg-card border border-border shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">
          <div className="text-sm text-foreground">{description}</div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${confirmBtnClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── ImageUploadField ─────────────────────────────────────────────────────────

export const ImageUploadField = memo(function ImageUploadField({
  label,
  preview,
  onUploadClick,
  onRemove,
  fileInputRef,
  onFileChange,
  aspectRatio = "video",
  uploadHint,
  compact = false,
}: ImageUploadFieldProps) {
  const aspectCls = aspectRatio === "square" ? "aspect-square" : "aspect-video";

  const uploadButton = (
    <button
      type="button"
      onClick={onUploadClick}
      className={`group relative bg-[#F7F5F0] rounded-sm border-2 border-dashed border-border hover:border-[#00CCFF] transition-colors overflow-hidden ${
        compact ? "shrink-0 w-28 aspect-square" : `w-full ${aspectCls}`
      }`}
    >
      {preview ? (
        <Image src={preview} alt="Preview" fill className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-[#00CCFF] transition-colors">
          <ImageUp size={compact ? 20 : 24} />
          <span className={`font-medium text-center px-1 leading-tight ${compact ? "text-[10px]" : "text-xs"}`}>
            {compact ? "Klik untuk upload" : "Klik untuk upload foto"}
          </span>
          {!compact && uploadHint && <span className="text-xs">{uploadHint}</span>}
        </div>
      )}
    </button>
  );

  const removeButton = preview ? (
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center gap-1.5 self-start px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-md bg-red-50 hover:bg-red-100 hover:border-red-400 transition-colors"
    >
      <TrashIcon />
      Hapus foto
    </button>
  ) : null;

  const hiddenInput = (
    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
  );

  if (compact) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-start gap-4">
          {uploadButton}
          <div className="flex flex-col justify-center gap-2 pt-1">
            <p className="text-xs text-muted-foreground">Format: PNG, JPG, WEBP</p>
            {uploadHint && <p className="text-xs text-muted-foreground">{uploadHint}</p>}
            {removeButton}
          </div>
        </div>
        {hiddenInput}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {uploadButton}
      {removeButton}
      {hiddenInput}
    </div>
  );
});
