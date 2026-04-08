"use client";

import { useState, memo } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/UI/table";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

interface ContactFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  description: string;
  type?: "text" | "email" | "tel" | "textarea";
  iconBgColor?: string;
  iconColor?: string;
}

const ContactField = memo(({ 
  icon, 
  label, 
  value, 
  onChange, 
  placeholder, 
  description, 
  type = "text",
  iconBgColor = "bg-[#00CCFF]/10",
  iconColor = "text-[#00CCFF]"
}: ContactFieldProps) => {
  return (
    <div className="flex gap-4">
      {/* Icon Container */}
      <div className={`shrink-0 w-12 h-12 rounded-lg ${iconBgColor} ${iconColor} flex items-center justify-center`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        
        {type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
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
        
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
});

ContactField.displayName = "ContactField";

export function FormKontak() {
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSave = () => {
    // TODO: Implement save logic
    console.log({ instagram, email, whatsapp, alamat });
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Informasi Kontak</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola informasi kontak yang ditampilkan di halaman publik
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>

      {/* Table */}
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="align-top py-6">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Instagram */}
                <ContactField
                  icon={<Instagram size={20} />}
                  label="Instagram"
                  value={instagram}
                  onChange={setInstagram}
                  placeholder="@ikapemakepri_malang"
                  description="Username Instagram organisasi"
                  iconBgColor="bg-gradient-to-br from-purple-100 to-pink-100"
                  iconColor="text-pink-600"
                />

                {/* Email */}
                <ContactField
                  icon={<Mail size={20} />}
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="contact@ikapemakepri.org"
                  description="Email resmi untuk komunikasi dan informasi"
                  type="email"
                  iconBgColor="bg-blue-50"
                  iconColor="text-blue-600"
                />

                {/* WhatsApp */}
                <ContactField
                  icon={<Phone size={20} />}
                  label="WhatsApp"
                  value={whatsapp}
                  onChange={setWhatsapp}
                  placeholder="+62 812 3456 7890"
                  description="Nomor WhatsApp aktif untuk dihubungi"
                  type="tel"
                  iconBgColor="bg-green-50"
                  iconColor="text-green-600"
                />

                {/* Alamat Kesekretariatan */}
                <ContactField
                  icon={<MapPin size={20} />}
                  label="Alamat Kesekretariatan"
                  value={alamat}
                  onChange={setAlamat}
                  placeholder="Jl. Contoh No. 123, Malang, Jawa Timur"
                  description="Alamat lengkap sekretariat organisasi"
                  type="textarea"
                  iconBgColor="bg-red-50"
                  iconColor="text-red-600"
                />

              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
