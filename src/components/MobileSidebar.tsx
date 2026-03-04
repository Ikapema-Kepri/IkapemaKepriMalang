"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { memo } from "react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
}

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  mainMenuItems: MenuItem[];
  kelolaWebsiteItems: MenuItem[];
  onLogout: () => void;
  displayName?: string;
  photoURL?: string | null;
}

const MobileSidebar = memo(function MobileSidebar({
  isOpen,
  onClose,
  mainMenuItems,
  kelolaWebsiteItems,
  onLogout,
  displayName = "Admin",
  photoURL,
}: MobileSidebarProps) {
  return (

    <aside
      className={`
        lg:hidden fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72
        bg-[#002933] text-white
        transition-transform duration-300 ease-in-out will-change-transform
        shadow-2xl overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">

        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#005266]">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00CCFF]/40 shrink-0">
            {photoURL ? (
              <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#005266] flex items-center justify-center text-[#00CCFF] font-bold text-sm select-none">
                {(displayName[0] ?? "A").toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">{displayName}</span>
            <span className="text-xs text-gray-400">Admin Dashboard</span>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-1">

          <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#00CCFF]/60">
            Main
          </p>
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors duration-200
                  ${
                    item.isActive
                      ? "bg-[#005266] text-[#00CCFF] font-semibold"
                      : "text-gray-300 hover:bg-[#005266]/40 hover:text-white"
                  }
                `}
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CCFF] shrink-0" />
                )}
              </Link>
            );
          })}

          <div className="border-t border-[#005266] my-2 mx-1" />

          <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#00CCFF]/60">
            Kelola Website
          </p>
          {kelolaWebsiteItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors duration-200
                  ${
                    item.isActive
                      ? "bg-[#005266] text-[#00CCFF] font-semibold"
                      : "text-gray-300 hover:bg-[#005266]/40 hover:text-white"
                  }
                `}
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CCFF] shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pt-2 pb-5 border-t border-[#005266]">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm
              transition-colors duration-200 text-gray-300 hover:text-white hover:bg-red-600/80"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-3">
            Ikapema Kepri &copy; 2025 &middot; v1.0.0
          </p>
        </div>

      </div>
    </aside>
  );
});

export default MobileSidebar;


