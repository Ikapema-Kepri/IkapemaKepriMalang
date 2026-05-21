"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useKontak } from "@/hooks/userKontak";
import { triggerModal } from "@/store/useModalStore";
import StatusModal from "@/components/UI/status-modal";

export function FormKontak() {
  const {
    kontakInstagram,
    kontakWhatsapp,
    kontakEmail,
    kontakSekretariat,
    loading,
    isSubmitting,
    updateKontak,
  } = useKontak({ isAdmin: true });

  const [instagram, setInstagram] = useState({ username: "", url: "", isActive: true });
  const [email, setEmail] = useState({ alamatEmail: "", isActive: true });
  const [whatsapp, setWhatsapp] = useState({ namaKontak: "", nomorKontak: "", nomorApi: "", departemen: "", pesanDefault: "", isActive: true });
  const [sekretariat, setSekretariat] = useState({ namaLokasi: "", alamat: "", mapsUrl: "", mapsEmbedUrl: "", jamOperasional: "", isActive: true });

  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (kontakInstagram) {
      setInstagram({
        username: kontakInstagram.username || "",
        url: kontakInstagram.url || "",
        isActive: kontakInstagram.isActive ?? true,
      });
    }
  }, [kontakInstagram]);

  useEffect(() => {
    if (kontakEmail) {
      setEmail({
        alamatEmail: kontakEmail.alamatEmail || "",
        isActive: kontakEmail.isActive ?? true,
      });
    }
  }, [kontakEmail]);

  useEffect(() => {
    if (kontakWhatsapp) {
      setWhatsapp({
        namaKontak: kontakWhatsapp.namaKontak || "",
        nomorKontak: kontakWhatsapp.nomorKontak || "",
        nomorApi: kontakWhatsapp.nomorApi || "",
        departemen: kontakWhatsapp.departemen || "",
        pesanDefault: kontakWhatsapp.pesanDefault || "",
        isActive: kontakWhatsapp.isActive ?? true,
      });
    }
  }, [kontakWhatsapp]);

  useEffect(() => {
    if (kontakSekretariat) {
      setSekretariat({
        namaLokasi: kontakSekretariat.namaLokasi || "",
        alamat: kontakSekretariat.alamat || "",
        mapsUrl: kontakSekretariat.mapsUrl || "",
        mapsEmbedUrl: kontakSekretariat.mapsEmbedUrl || "",
        jamOperasional: kontakSekretariat.jamOperasional || "",
        isActive: kontakSekretariat.isActive ?? true,
      });
    }
  }, [kontakSekretariat]);


  const handleSave = async () => {
    const updates = [
      updateKontak("instagram", instagram),
      updateKontak("email", email),
      updateKontak("whatsapp", whatsapp),
      updateKontak("sekretariat", sekretariat),
    ];

    const results = await Promise.all(updates);
    const allSuccess = results.every((r) => r?.success);

    if (allSuccess) {
      triggerModal("success", "Semua data kontak berhasil disimpan!");
    } else {
      const errMsg = results.find((r) => !r?.success)?.message || "Gagal menyimpan beberapa kontak.";
      triggerModal("error", errMsg);
    }
  };

  const renderInput = (label: string, value: string, onChange: (val: string) => void, placeholder: string = "", type: string = "text", rows?: number) => (
    <div className="flex flex-col gap-1.5 mt-3">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-sm border border-border bg-[#F7F5F0] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00CCFF]/40 focus:border-[#00CCFF] transition-colors"
        />
      )}
    </div>
  );

  const renderToggle = (label: string, checked: boolean, onChange: (checked: boolean) => void) => (
    <div className="flex items-center gap-2 mt-3 cursor-pointer" onClick={() => onChange(!checked)}>
      <input 
        type="checkbox" 
        checked={checked} 
        readOnly
        className="w-4 h-4 text-[#00CCFF] bg-gray-100 border-gray-300 rounded focus:ring-[#00CCFF] accent-[#00CCFF]"
      />
      <label className="text-sm font-semibold text-foreground cursor-pointer">{label}</label>
    </div>
  );

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Informasi Kontak & Detail</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola data dan status tampilan untuk setiap saluran komunikasi
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "success" && <span className="text-xs text-green-600 font-medium">{statusMessage}</span>}
          {saveStatus === "error" && <span className="text-xs text-red-500 font-medium">{statusMessage}</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting || loading}
            className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="px-4 py-8 flex items-center justify-center text-sm text-muted-foreground">
          Memuat data kontak...
        </div>
      )}

      {!loading && (
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="align-top py-6 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Instagram Section */}
                  <div className="flex flex-col border border-border p-5 rounded-lg bg-white shadow-sm hover:border-[#00CCFF]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 text-pink-600 flex items-center justify-center`}>
                          <Instagram size={20} />
                       </div>
                       <h3 className="text-base font-bold text-foreground">Instagram</h3>
                    </div>
                    {renderInput("Username", instagram.username, (val) => setInstagram({ ...instagram, username: val }), "@ikapemakepri_malang")}
                    {renderInput("URL Profile", instagram.url, (val) => setInstagram({ ...instagram, url: val }), "https://instagram.com/ikapemakepri_malang")}
                    {renderToggle("Tampilkan Info Instagram", instagram.isActive, (checked) => setInstagram({ ...instagram, isActive: checked }))}
                  </div>

                  {/* Email Section */}
                  <div className="flex flex-col border border-border p-5 rounded-lg bg-white shadow-sm hover:border-[#00CCFF]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center`}>
                          <Mail size={20} />
                       </div>
                       <h3 className="text-base font-bold text-foreground">Email</h3>
                    </div>
                    {renderInput("Alamat Email", email.alamatEmail, (val) => setEmail({ ...email, alamatEmail: val }), "contact@ikapemakepri.org", "email")}
                    {renderToggle("Tampilkan Info Email", email.isActive, (checked) => setEmail({ ...email, isActive: checked }))}
                  </div>

                  {/* WhatsApp Section */}
                  <div className="flex flex-col border border-border p-5 rounded-lg bg-white shadow-sm hover:border-[#00CCFF]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`shrink-0 w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center`}>
                          <Phone size={20} />
                       </div>
                       <h3 className="text-base font-bold text-foreground">WhatsApp Admin</h3>
                    </div>
                    {renderInput("Nama Kontak", whatsapp.namaKontak, (val) => setWhatsapp({ ...whatsapp, namaKontak: val }), "Humas Ikapema")}
                    <div className="grid grid-cols-2 gap-3">
                        {renderInput("Nomor Tampilan", whatsapp.nomorKontak, (val) => setWhatsapp({ ...whatsapp, nomorKontak: val }), "+62 812 3456 7890", "tel")}
                        {renderInput("Nomor API (wa.me)", whatsapp.nomorApi, (val) => setWhatsapp({ ...whatsapp, nomorApi: val }), "6281234567890")}
                    </div>
                    {renderInput("Departemen/Divisi", whatsapp.departemen, (val) => setWhatsapp({ ...whatsapp, departemen: val }), "Misal: Humas / Publikasi")}
                    {renderInput("Pesan Template (Default)", whatsapp.pesanDefault, (val) => setWhatsapp({ ...whatsapp, pesanDefault: val }), "Halo, saya ingin bertanya tentang ...", "textarea", 3)}
                    {renderToggle("Tampilkan WhatsApp", whatsapp.isActive, (checked) => setWhatsapp({ ...whatsapp, isActive: checked }))}
                  </div>

                  {/* Sekretariat Section */}
                  <div className="flex flex-col border border-border p-5 rounded-lg bg-white shadow-sm hover:border-[#00CCFF]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center`}>
                          <MapPin size={20} />
                       </div>
                       <h3 className="text-base font-bold text-foreground">Kesekretariatan</h3>
                    </div>
                    {renderInput("Nama Lokasi", sekretariat.namaLokasi, (val) => setSekretariat({ ...sekretariat, namaLokasi: val }), "Sekretariat Ikapema Kepri Malang")}
                    {renderInput("Alamat Lengkap", sekretariat.alamat, (val) => setSekretariat({ ...sekretariat, alamat: val }), "Jl. Contoh No. 123", "textarea", 3)}
                    {renderInput("URL Google Maps", sekretariat.mapsUrl, (val) => setSekretariat({ ...sekretariat, mapsUrl: val }), "https://maps.google.com/...")}
                    {renderInput("URL Google Maps Embed", sekretariat.mapsEmbedUrl, (val) => setSekretariat({ ...sekretariat, mapsEmbedUrl: val }), "https://maps.google.com/...")}
                    {renderInput("Jam Operasional", sekretariat.jamOperasional, (val) => setSekretariat({ ...sekretariat, jamOperasional: val }), "Senin - Jumat, 09:00 - 17:00")}
                    {renderToggle("Tampilkan Info Sekretariat", sekretariat.isActive, (checked) => setSekretariat({ ...sekretariat, isActive: checked }))}
                  </div>

                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <StatusModal />
    </div>
  );
}

