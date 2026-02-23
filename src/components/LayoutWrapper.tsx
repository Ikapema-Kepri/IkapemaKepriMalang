"use client";

import { usePathname } from "next/navigation";
import NavbarClientWrapper from "./NavbarClientWrapper";
import Footer from "./Footer";
import AppSidebar from "./AppSidebar";
import AdminLayoutHeader from "./AdminLayoutHeader";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

// Komponen untuk admin layout yang bisa akses sidebar context
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { collapsed } = useSidebar();
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F5F0]">
      {/* Sidebar - Fixed di kiri */}
      <AppSidebar />
      
      {/* Main Content Area - Kanan sidebar */}
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          collapsed ? "lg:ml-0" : "lg:ml-0"
        }`}
      >
        {/* Header - Fixed */}
        <AdminLayoutHeader />
        
        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const isAdminRoute = pathname?.startsWith("/adminaccess");

  if (isAdminRoute) {
    // Jika user belum login, tampilkan dengan Navbar dan Footer
    if (!isAuthenticated && !loading) {
      return (
        <>
          <NavbarClientWrapper />
          <main className="w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </>
      );
    }

    // Jika user sudah login, tampilkan dengan AppSidebar
    return (
      <SidebarProvider>
        <AdminLayout>{children}</AdminLayout>
      </SidebarProvider>
    );
  }

  // Default layout with Navbar and Footer
  return (
    <>
      <NavbarClientWrapper />
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
