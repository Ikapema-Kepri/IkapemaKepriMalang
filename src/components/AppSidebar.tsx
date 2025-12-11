"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users,
  GraduationCap, 
  Newspaper,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { collapsed } = useSidebar();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/adminaccess/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Anggota",
      href: "/adminaccess/anggota",
      icon: Users,
    },
    {
      name: "Alumni",
      href: "/adminaccess/alumni",
      icon: GraduationCap,
    },
    {
      name: "Berita Kegiatan",
      href: "/adminaccess/berita-kegiatan",
      icon: Newspaper,
    },
  ];

  const handleLogout = async () => {
    if (showLogoutDialog) {
      await logout();
      setShowLogoutDialog(false);
    } else {
      setShowLogoutDialog(true);
    }
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen bg-[#002933] text-white border-r border-gray-100
          transition-all duration-300 sticky top-0
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b border-[#005266]">
            {!collapsed ? (
              <div className="flex items-center gap-2">
                <div className="rounded-lg flex items-center justify-center">
                  <Image src="/LogoIkapema.webp" alt="Logo" width={32} height={32} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Ikapema</span>
                  <span className="font-normal text-xs">Admin Dashboard</span>
                </div>
              </div>
            ) : (
              <div className="rounded-lg flex items-center justify-center">
                <Image src="/LogoIkapema.webp" alt="Logo" width={32} height={32} />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-[#005266] text-[#00CCFF]"
                        : "text-gray-300 hover:bg-[#005266]/40 hover:text-white"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-2 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
                transition-colors duration-200 text-gray-300 hover:text-white hover:bg-red-600
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? "Logout" : undefined}
            >
              <LogOut size={20} className="shrink-0" />
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
            {!collapsed && <p className="text-xs text-gray-400 text-center mt-2">v1.0.0</p>}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IK</span>
            </div>
            <span className="font-semibold text-lg">Ikapema</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-2 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
                transition-colors duration-200 text-gray-300 hover:text-white hover:bg-red-600"
            >
              <LogOut size={20} className="shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Konfirmasi Logout</h2>
            <p className="text-gray-600 mb-6">Anda yakin ingin keluar dari dashboard admin?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidebar;
