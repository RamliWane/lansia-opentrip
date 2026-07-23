import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { A } from "./helpers/constants";

export default function SuccessState({
  form,
  onReset,
}) {
  return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${A}18` }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request Terkirim!</h2>
            <p className="text-sm text-gray-500 mb-2">
              Tim kami akan menghubungi kamu di{" "}
              <strong className="text-gray-800">{form.phone}</strong> dalam 1×24 jam.
            </p>
            {form.selectedDestinasi && (
              <p className="text-sm text-gray-500 mb-6">
                Destinasi dipilih: <strong className="text-gray-800">{form.selectedDestinasi.title}</strong>
              </p>
            )}
            <button
              onClick={onReset}
              className="px-6 py-3 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
              style={{ backgroundColor: A }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c8631e")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = A)}
            >
              Buat Request Baru
            </button>
          </div>
        </main>
        <Footer />
      </>
  );
}