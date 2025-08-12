import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarClientWrapper from "../components/NavbarClientWrapper/NavbarClientWrapper";
import Footer from "../components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IKAPEMA Kepri—Malang",
  description: "Website Resmi IKAPEMA Kepri-Malang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full max-w-[100vw] overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-[100vw] overflow-x-hidden min-h-screen`}>
        <AuthProvider>
          <NavbarClientWrapper />
          <main className="w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
