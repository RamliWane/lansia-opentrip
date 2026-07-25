import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Lansia OpenTrip - Perjalanan Wisata Nyaman & Ramah Lansia",
  description: "Layanan open trip dan wisata privat terpercaya khusus untuk para senior & lansia dengan fasilitas ramah lansia, ritme perjalanan santai, dan pendampingan profesional.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;