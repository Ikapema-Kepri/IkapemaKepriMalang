"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Newspaper,
  LogOut,
  Home,
  Phone,
  Settings,
  Lock,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import useSWR from "swr";
import { canAccessPath } from "@/lib/rbacConfig";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}


const MAIN_MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", href: "/adminaccess/dashboard", icon: LayoutDashboard },
];

const KELOLA_WEBSITE_ITEMS: MenuItem[] = [
  { name: "Beranda",         href: "/adminaccess/beranda",         icon: Home },
  { name: "Anggota",         href: "/adminaccess/anggota",         icon: Users },
  { name: "Alumni",          href: "/adminaccess/alumni",          icon: GraduationCap },
  { name: "Berita Kegiatan", href: "/adminaccess/berita-kegiatan", icon: Newspaper },
  { name: "Kontak",          href: "/adminaccess/kontak",          icon: Phone },
  { name: "Pengaturan",      href: "/adminaccess/pengaturan",      icon: Settings },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const MobileSidebar = dynamic(() => import("./MobileSidebar"), {
  ssr: false,
  loading: () => null,
});

const LogoutDialog = dynamic(() => import("./LogoutDialog"), {
  ssr: false,
  loading: () => null,
});

import { memo } from "react";

interface NavLinkProps {
  item: MenuItem;
  isActive: boolean;
  collapsed: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}

const NavLink = memo(function NavLink({ item, isActive, collapsed, isLocked, onClick }: NavLinkProps) {
  const Icon = item.icon;

  // ── Menu terkunci: tampil redup + ikon gembok, klik → /unauthorized ──
  if (isLocked) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={collapsed ? `${item.name} (Akses Terbatas)` : undefined}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
          transition-colors duration-200 cursor-pointer
          text-gray-500 hover:bg-red-900/20 hover:text-gray-400
          ${collapsed ? "justify-center" : ""}
        `}
      >
        <Icon size={20} className="shrink-0 opacity-50" />
        {!collapsed && (
          <span className="font-medium flex-1 text-left">{item.name}</span>
        )}
        {!collapsed && <Lock size={14} className="shrink-0 opacity-50" />}
      </button>
    );
  }

  // ── Menu normal ────────────────────────────────────────────────────
  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.name : undefined}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-colors duration-200
        ${isActive ? "bg-[#005266] text-[#00CCFF]" : "text-gray-300 hover:bg-[#005266]/40 hover:text-white"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <Icon size={20} className="shrink-0" />
      {!collapsed && <span className="font-medium">{item.name}</span>}
    </Link>
  );
});

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { collapsed } = useSidebar();
  const { logout, user, role } = useAuth();

  // SWR â€” revalidate admin profile (display name / photo from Firebase user token)
  const swrKey = user?.uid ? `/api/auth/profile?uid=${user.uid}` : null;
  const { data: adminProfile } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
    fallbackData: {
      displayName: user?.displayName ?? user?.email ?? "Admin",
      photoURL: user?.photoURL ?? null,
    },
  });

  // useMemo â€” compute active states once per pathname change
  const mainMenuWithActive = useMemo(
    () => MAIN_MENU_ITEMS.map((item) => ({
      ...item,
      isActive: pathname === item.href,
      isLocked: !canAccessPath(role, item.href),
    })),
    [pathname, role]
  );

  const kelolaMenuWithActive = useMemo(
    () => KELOLA_WEBSITE_ITEMS.map((item) => ({
      ...item,
      isActive: !!pathname?.startsWith(item.href),
      isLocked: !canAccessPath(role, item.href),
    })),
    [pathname, role]
  );

  // useCallback â€” stable references for handlers
  const handleLogout = useCallback(async () => {
    if (showLogoutDialog) {
      await logout();
      setShowLogoutDialog(false);
    } else {
      setShowLogoutDialog(true);
    }
  }, [showLogoutDialog, logout]);

  const cancelLogout = useCallback(() => setShowLogoutDialog(false), []);
  const openMobile = useCallback(() => setIsOpen(true), []);
  const closeMobile = useCallback(() => setIsOpen(false), []);

  // Handler untuk menu terkunci → redirect ke unauthorized
  const handleLockedClick = useCallback(() => {
    router.push('/adminaccess/unauthorized');
  }, [router]);

  return (
    <>
      {/* ── Mobile Top Navbar ──────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#002933] border-b border-[#005266] shadow-md flex items-center justify-between px-4">
        {/* Animated hamburger button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={isOpen ? closeMobile : openMobile}
          className="flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-[#005266]/60 transition-colors gap-[5px] shrink-0"
        >
          <span
            className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-1.75" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
              isOpen ? "w-0 opacity-0" : "w-5"
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-1.75" : ""
            }`}
          />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <Image src="/LogoIkapema.webp" alt="Ikapema" width={28} height={28} className="rounded-md" />
          <span className="text-white font-semibold text-sm tracking-wide">Ikapema Kepri—Malang</span>
        </div>

        {/* Admin avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#00CCFF]/40 shrink-0">
          {adminProfile?.photoURL ? (
            <Image
              src={adminProfile.photoURL}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#005266] flex items-center justify-center text-[#00CCFF] text-sm font-bold select-none">
              {(adminProfile?.displayName ?? "A")[0].toUpperCase()}
            </div>
          )}
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen bg-[#002933] text-white border-r border-gray-100
          transition-all duration-300 sticky top-0
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo + Admin Profile */}
          <div className="flex items-center justify-center py-4 border-b border-[#005266]">
            {!collapsed ? (
              <div className="flex items-center gap-2 px-2">
                <div className="rounded-lg flex items-center justify-center shrink-0">
                  {adminProfile?.photoURL ? (
                    <Image
                      src={adminProfile.photoURL}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <Image src="/LogoIkapema.webp" alt="Logo" width={32} height={32} />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-sm leading-tight truncate">
                    {adminProfile?.displayName ?? "Admin"}
                  </span>
                  <span className="font-normal text-xs text-gray-400 truncate">Admin Dashboard</span>
                </div>
              </div>
            ) : (
              <div className="rounded-lg flex items-center justify-center">
                <Image src="/LogoIkapema.webp" alt="Logo" width={32} height={32} />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
            {/* Main */}
            <div>
              {!collapsed && (
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Main
                </p>
              )}
              <div className="space-y-1">
                {mainMenuWithActive.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={item.isActive}
                    collapsed={collapsed}
                    isLocked={item.isLocked}
                    onClick={item.isLocked ? handleLockedClick : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Kelola Website */}
            <div>
              {!collapsed && (
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Kelola Website
                </p>
              )}
              {collapsed && <div className="border-t border-[#005266] mb-1" />}
              <div className="space-y-1">
                {kelolaMenuWithActive.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={item.isActive}
                    collapsed={collapsed}
                    isLocked={item.isLocked}
                    onClick={item.isLocked ? handleLockedClick : undefined}
                  />
                ))}
              </div>
            </div>
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

      {/* Mobile Sidebar — lazy loaded */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={closeMobile}
        onOpen={openMobile}
        mainMenuItems={mainMenuWithActive}
        kelolaWebsiteItems={kelolaMenuWithActive}
        onLogout={handleLogout}
        displayName={adminProfile?.displayName ?? undefined}
        photoURL={adminProfile?.photoURL ?? null}
      />

      {/* Overlay for mobile — smooth fade */}
      <div
        aria-hidden="true"
        onClick={closeMobile}
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Logout Dialog â€” lazy loaded */}
      {showLogoutDialog && (
        <LogoutDialog onConfirm={handleLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default AppSidebar;
