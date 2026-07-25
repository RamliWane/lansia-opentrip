"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Compass } from "lucide-react";

const links = [
  { name: "Beranda", href: "/" },
  { name: "Destinasi Trip", href: "/destinasi" },
  { name: "Private Trip", href: "/private" },
  { name: "Hubungi Kami", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-[#df7224] text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <span>Lansia<span className="text-[#df7224]">OpenTrip</span></span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="font-medium text-sm text-gray-600 hover:text-[#df7224] transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#df7224] hover:bg-[#c8601b] text-white transition-colors"
            >
              Daftar
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-sm text-gray-700 hover:bg-[#fff7f2] hover:text-[#df7224] transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg text-sm font-medium bg-[#df7224] hover:bg-[#c8601b] text-white transition-colors"
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;