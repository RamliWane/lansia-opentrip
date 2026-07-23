export default function Footer() {
  const year = new Date().getFullYear();
  const A = "#df7224";

  return (
    <footer className="bottom-0 left-0 right-0 z-50 border-t border-gray-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: A }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
            Destinasi<span style={{ color: A }}>Wisata</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {year} DestinasWisata. Dibuat dengan{" "}
          <span style={{ color: A }}>♥</span> di Indonesia.
        </p>

        {/* Nav links */}
        <nav className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          {["Tentang", "Kontak", "Kebijakan"].map((label) => (
            <a
              key={label}
              href="#"
              className="transition-colors"
              onMouseEnter={e => (e.currentTarget ).style.color = A}
              onMouseLeave={e => (e.currentTarget ).style.color = ""}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
