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
  title: {
    default: "Ikapema Kepri—Malang | Ikatan Pelajar & Mahasiswa Kepulauan Riau—Malang",
    template: "%s | Ikapema Kepri—Malang"
  },
  description: "Website resmi Ikapema Kepulauan Riau - Malang. Wadah berkumpul pelajar dan mahasiswa asal Kepulauan Riau yang berdomisili di Malang untuk berkarya dan mengembangkan potensi diri.",
  keywords: ["Ikapema", "Kepri", "Pelajar", "Mahasiswa", "Malang", "Kepulauan Riau", "Organisasi", "Ikatan"],
  authors: [{ name: "Ikapema Kepri—Malang" }],
  creator: "Ikapema Kepri—Malang",
  publisher: "Ikapema Kepri—Malang",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.ikapemakeprimalang.com',
    title: 'Ikapema Kepri—Malang | Ikatan Pelajar & Mahasiswa Kepulauan Riau',
    description: 'Website resmi Ikapema Kepulauan Riau - Malang. Wadah berkumpul pelajar dan mahasiswa asal Kepulauan Riau.',
    siteName: 'Ikapema Kepri—Malang',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ikapema Kepri—Malang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikapema Kepri—Malang | Ikatan Pelajar & Mahasiswa Kepulauan Riau',
    description: 'Website resmi Ikapema Kepulauan Riau - Malang.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Tambahkan Google Search Console verification
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
