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
  title: "IKAPEMA Kepri - Ikatan Alumni Politeknik Elektronika Negeri Surabaya",
  description:
    "Website resmi IKAPEMA Kepulauan Riau - Ikatan Alumni Politeknik Elektronika Negeri Surabaya",
  keywords: "IKAPEMA, Kepri, Alumni, PENS, Politeknik Elektronika",
  authors: [{ name: "IKAPEMA Kepri" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="w-full max-w-[100vw] overflow-x-hidden">
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
