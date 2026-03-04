"use client";

import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { memo } from "react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  mainMenuItems: MenuItem[];
  kelolaWebsiteItems: MenuItem[];
  onLogout: () => void;
}

const MobileSidebar = memo(function MobileSidebar({
  isOpen,
  onClose,
  mainMenuItems,
  kelolaWebsiteItems,
  onLogout,
}: MobileSidebarProps) {
  return (
    <aside
      className={`
        lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IK</span>
            </div>
            <span className="font-semibold text-lg">Ikapema</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
          {/* Main */}
          <div>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Main
            </p>
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-200
                      ${item.isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                    `}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Kelola Website */}
          <div>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Kelola Website
            </p>
            <div className="space-y-1">
              {kelolaWebsiteItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-200
                      ${item.isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                    `}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gray-800">
          <button
            onClick={onLogout}
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
  );
});

export default MobileSidebar;
