import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Subs from "@/components/landing/Subs";

export default function ContactPage() {
    return (
        <div className="bg-white">
            <Navbar />
            <section
                className="relative bg-cover bg-center py-24 sm:py-42"
                style={{
                    backgroundImage: "url('/contact-hero.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                        Contact <span className="text-[#df7224]">Us</span>
                    </h1>
                </div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-16 bg-white"
                    style={{
                        clipPath: "polygon(0 100%, 100% 100%, 70% 10%, 50% 0, 10% 100%, 0 0)",
                    }}
                />
            </section>

            <section className="relative z-20 -mt-24 sm:-mt-32 pb-16 sm:pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12">
                        <div className="grid lg:grid-cols-2 gap-14">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    Hubungi Kami
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                                    Tim kami siap bantu kamu lewat kontak di bawah ini, atau
                                    langsung datang ke lokasi kantor kami.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                            <Phone size={16} className="text-[#df7224]" />
                                        </div>
                                        <a
                                            href="tel:+6281234567890"
                                            className="text-sm font-medium text-gray-700 hover:text-[#df7224] transition-colors"
                                        >
                                            +62 812-3456-7890
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                            <Mail size={16} className="text-[#df7224]" />
                                        </div>
                                        <a
                                            href="mailto:hello@opentrip.id"
                                            className="text-sm font-medium text-gray-700 hover:text-[#df7224] transition-colors"
                                        >
                                            hello@opentrip.id
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                            <MapPin size={16} className="text-[#df7224]" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            Jl. Merdeka No. 10, Bandung, Jawa Barat
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    Get In Touch
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                                    Ada pertanyaan soal trip, pembayaran, atau kerjasama? Isi
                                    form di bawah dan tim kami akan segera menghubungi kamu
                                    kembali.
                                </p>

                                <form className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Phone"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            rows={5}
                                            placeholder="Message"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-[#df7224] text-white px-8 py-2 w-full rounded-md font-semibold hover:bg-[#c3611c] transition-colors"
                                    >
                                        Submit Button
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Subs />
            <Footer />
        </div>
    );
}