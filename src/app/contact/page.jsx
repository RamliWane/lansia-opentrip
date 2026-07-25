"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Subs from "@/components/landing/Subs";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import ContactForm from "@/components/contact/ContactForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <ContactHeader />

        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-16">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid lg:grid-cols-5">
            <ContactInfoCard />
            <ContactForm />
          </div>
        </section>

        <Subs />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;