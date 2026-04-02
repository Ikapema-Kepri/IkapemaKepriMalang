"use client";

import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

const AdminLayoutHeader: React.FC = () => {
  const pathname = usePathname();
  const { toggleCollapsed } = useSidebar();
  
  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/adminaccess") return "Dashboard";
    if (pathname?.startsWith("/adminaccess/dashboard")) return "Dashboard";
    if (pathname?.startsWith("/adminaccess/beranda")) return "Kelola Beranda";
    if (pathname?.startsWith("/adminaccess/anggota")) return "Manajemen Anggota";
    if (pathname?.startsWith("/adminaccess/alumni")) return "Manajemen Alumni";
    if (pathname?.startsWith("/adminaccess/berita-kegiatan")) return "Berita Kegiatan";
    if (pathname?.startsWith("/adminaccess/kontak")) return "Manajemen Kontak";
    if (pathname?.startsWith("/adminaccess/pengaturan")) return "Pengaturan";
    return "Admin Panel";
  };

  // Get current route name for breadcrumb
  const getCurrentRoute = () => {
    if (pathname === "/adminaccess") return "Dashboard";
    if (pathname?.startsWith("/adminaccess/dashboard")) return "Dashboard";
    if (pathname?.startsWith("/adminaccess/beranda")) return "Beranda";
    if (pathname?.startsWith("/adminaccess/anggota")) return "Anggota";
    if (pathname?.startsWith("/adminaccess/alumni")) return "Alumni";
    if (pathname?.startsWith("/adminaccess/berita-kegiatan")) return "Berita Kegiatan";
    if (pathname?.startsWith("/adminaccess/kontak")) return "Kontak";
    if (pathname?.startsWith("/adminaccess/pengaturan")) return "Pengaturan";
    return "Admin";
  };

  return (
    <header className="mt-14 lg:mt-0 bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex items-center justify-center p-2 rounded-md hover:bg-[#002933] transition-colors text-gray-600 hover:text-white"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft size={24} />
        </button>
        <div className="flex flex-col gap-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">{">"}</span>
            <span className="text-[#00CCFF]">{getCurrentRoute()}</span>
          </div>
          {/* Page Title */}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default AdminLayoutHeader;
