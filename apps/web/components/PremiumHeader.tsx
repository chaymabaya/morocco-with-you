"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PremiumHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = "https://wa.me/212600000000?text=Bonjour%20Morocco%20With%20You%2C%20j%27ai%20besoin%20d%27aide.";

  const scrollToPopular = () => {
    const target = document.getElementById("popular-experiences");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-amber-300">
          <div className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/70 bg-white/5">
            <Image
              src="/logo.png"
              alt="Logo Morocco With You"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Morocco With You</span>
        </Link>

        <nav className="hidden items-center gap-10 text-base font-medium text-white/90 md:flex">
          <Link href="/" className="transition hover:text-amber-300">
            Accueil
          </Link>
          <Link href="/services" className="transition hover:text-amber-300">
            Nos services
          </Link>
          <a href="#popular-experiences" onClick={scrollToPopular} className="transition hover:text-amber-300 cursor-pointer">
            Expériences
          </a>
          <Link href="/bookings" className="transition hover:text-amber-300">
            Réservations
          </Link>
          <a href="/account" className="transition hover:text-amber-300">
            Mon compte
          </a>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="transition hover:text-amber-300">
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border border-amber-300/70 p-2 text-amber-300 transition hover:bg-amber-300/15 md:hidden"
          aria-label="Ouvrir le menu rapide"
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 7H19M5 12H19M5 17H19" />
          </svg>
        </button>

        {menuOpen ? (
          <div className="fixed inset-0 top-20 z-30 flex flex-col items-stretch gap-2 rounded-b-2xl border-b border-amber-300/40 bg-black/95 p-4 backdrop-blur md:hidden">
            <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-white transition hover:bg-white/10">
              Accueil
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-white transition hover:bg-white/10">
              Nos services
            </Link>
            <a href="#popular-experiences" onClick={() => { scrollToPopular(); setMenuOpen(false); }} className="rounded-lg px-3 py-2 text-white transition hover:bg-white/10 cursor-pointer">
              Expériences
            </a>
            <Link href="/bookings" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-white transition hover:bg-white/10">
              Réservations
            </Link>
            <Link href="/account" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-white transition hover:bg-white/10">
              Mon compte
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-amber-300 transition hover:bg-white/10">
              WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
