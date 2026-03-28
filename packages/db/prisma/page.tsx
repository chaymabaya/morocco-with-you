"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  { name: "Riads & Hebergement", icon: "riad" },
  { name: "Gastronomie", icon: "food" },
  { name: "Aventure & Sport", icon: "adventure" },
  { name: "Art & Culture", icon: "culture" },
  { name: "Bien-etre & Spa", icon: "wellness" },
  { name: "Evenements prives", icon: "events" },
] as const;

const experiences = [
  {
    title: "Riad Secret dans la Medina",
    city: "Marrakech",
    type: "Hebergement",
    price: "A partir de 780 MAD",
    rating: 4.9,
    gradient: "from-emerald-700/90 via-emerald-500/70 to-amber-500/60",
  },
  {
    title: "Diner nomade sous les etoiles",
    city: "Agafay",
    type: "Gastronomie",
    price: "A partir de 520 MAD",
    rating: 4.8,
    gradient: "from-orange-700/85 via-orange-500/65 to-amber-400/55",
  },
  {
    title: "Atelier Zellige & artisanat",
    city: "Fes",
    type: "Culture",
    price: "A partir de 390 MAD",
    rating: 5.0,
    gradient: "from-teal-800/90 via-cyan-600/70 to-emerald-400/60",
  },
] as const;

const testimonials = [
  {
    name: "Leila B.",
    initials: "LB",
    city: "Casablanca",
    text: "Une experience fluide et inspiree. Nous avons reserve en quelques clics un sejour magnifique a Essaouira.",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Youssef A.",
    initials: "YA",
    city: "Rabat",
    text: "Selection premium et support tres reactif. Le guide local etait exceptionnel du debut a la fin.",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    name: "Sofia K.",
    initials: "SK",
    city: "Lyon",
    text: "J'ai adore la qualite des experiences. Le mix tradition et modernite est exactement ce que je cherchais.",
    tone: "bg-amber-100 text-amber-700",
  },
] as const;

function Icon({ type }: { type: (typeof categories)[number]["icon"] | "verified" | "payment" | "support" }) {
  const common = "h-6 w-6";

  if (type === "riad") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M4 20V10L12 4L20 10V20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 20V13H15V20" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "food") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M8 4V11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 4V11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 4V11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 11V20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 4V20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 4C18.2 4 20 5.8 20 8V10H16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "adventure") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M3 17L9 8L13 13L16 9L21 17H3Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "culture") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="4" y="6" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 6V4H16V6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 18V20H16V18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "wellness") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M12 20C15.9 17.5 19 14.8 19 10.8C19 8.2 16.9 6 14.4 6C13.3 6 12.4 6.4 11.7 7.2C11 6.4 10.1 6 9 6C6.5 6 4.4 8.2 4.4 10.8C4.4 14.8 7.5 17.5 11.4 20" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "events") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 4V8M16 4V8M4 11H20" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "verified") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <path d="M12 3L19 6V12C19 16.5 16.2 19.8 12 21C7.8 19.8 5 16.5 5 12V6L12 3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12.5L11.2 14.7L15.5 10.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "payment") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="14" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common}>
      <path d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Home() {
  const statsRef = useRef<HTMLElement | null>(null);
  const statTargets = [2000, 150, 12, 98];
  const statLabels = ["Experiences", "Prestataires", "Villes", "Satisfaction"];
  const statSuffix = ["+", "+", "", "%"];
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(statTargets.map((target) => Math.floor(target * eased)));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [statsVisible]);

  const zelligePattern =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.18' stroke-width='1.2'%3E%3Cpath d='M70 6l25 14v28L70 62 45 48V20z'/%3E%3Cpath d='M70 78l25 14v28l-25 14-25-14V92z'/%3E%3Cpath d='M8 42l25 14v28L8 98-17 84V56z'/%3E%3Cpath d='M132 42l25 14v28l-25 14-25-14V56z'/%3E%3C/g%3E%3C/svg%3E\")";

  return (
    <main className="bg-[#FAFAF7] text-neutral-900">
      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
        <div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 15%, rgba(217,119,6,0.4), transparent 45%), linear-gradient(125deg, #054f44 0%, #059669 38%, #0d7a65 65%, #C2410C 100%)`,
          }}
        />
        <div className="absolute inset-0 -z-10 opacity-80" style={{ backgroundImage: zelligePattern, backgroundSize: "180px 180px" }} />
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-7 text-[#FAFAF7]">
            <p className="inline-flex w-fit items-center rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/90 backdrop-blur">
              Morocco With You
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              <span className="block font-serif">Decouvrez le Maroc Authentique</span>
              <span className="block text-3xl font-light text-[#FAFAF7]/90 sm:text-4xl lg:text-5xl" style={{ fontFeatureSettings: '"liga" 1, "calt" 1', direction: "rtl" }}>
                اكتشف المغرب الأصيل
              </span>
            </h1>
            <p className="max-w-2xl text-base font-light text-[#FAFAF7]/90 sm:text-lg">
              Entre medinas dorees, montagnes bleu nuit et horizons desertiques, vivez des rencontres reelles, soigneusement orchestrees par des experts locaux.
            </p>
          </div>

          <div className="rounded-[2rem_0.75rem_2rem_0.75rem] border border-white/25 bg-white/15 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6">
            <div className="mb-4 inline-flex animate-badge-pulse items-center rounded-full border border-white/35 bg-[#FAFAF7]/15 px-3 py-1 text-sm font-medium text-[#FAFAF7]">
              4.9★ · 2000+ experiences
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FAFAF7]/80">Destination</span>
                <input
                  placeholder="Marrakech, Fes, Essaouira..."
                  className="w-full rounded-xl border border-white/35 bg-white/85 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#D97706] focus:outline-none"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FAFAF7]/80">Type d'experience</span>
                <select className="w-full rounded-xl border border-white/35 bg-white/85 px-4 py-3 text-sm text-neutral-900 focus:border-[#D97706] focus:outline-none">
                  <option>Gastronomie</option>
                  <option>Aventure & sport</option>
                  <option>Art & culture</option>
                  <option>Bien-etre & spa</option>
                </select>
              </label>
              <label className="space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FAFAF7]/80">Date</span>
                <input type="date" className="w-full rounded-xl border border-white/35 bg-white/85 px-4 py-3 text-sm text-neutral-900 focus:border-[#D97706] focus:outline-none" />
              </label>
              <button className="group relative overflow-hidden rounded-xl bg-[#D97706] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/30 sm:col-span-2 lg:col-span-1">
                <span className="absolute inset-0 translate-y-full bg-[#b96505] transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10">Rechercher</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="border-y border-emerald-200/70 bg-[#FAFAF7] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {statLabels.map((label, index) => (
            <article key={label} className="rounded-[1.4rem_0.5rem_1.4rem_0.5rem] border border-emerald-200/80 bg-white p-4 text-center shadow-sm">
              <p className={`text-2xl font-bold sm:text-3xl ${statsVisible ? "animate-rise-up" : "opacity-50"}`} style={{ color: index % 2 === 0 ? "#059669" : "#C2410C" }}>
                {counts[index]}
                {statSuffix[index]}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-600">{label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Explorez par univers</h2>
          <p className="mt-2 text-neutral-600">Des experiences soigneusement selectionnees pour tous les rythmes de voyage.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => (
            <article
              key={item.name}
              className="group rounded-[1.75rem_0.65rem_1.75rem_0.65rem] border border-neutral-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
              style={{ boxShadow: "0 0 0 rgba(0,0,0,0)", transitionDelay: `${index * 30}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-2 text-emerald-700 transition group-hover:bg-emerald-100 group-hover:text-emerald-800">
                <Icon type={item.icon} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">Collections exclusives avec partenaires verifies.</p>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCES POPULAIRES */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Experiences populaires</h2>
            <p className="mt-2 text-neutral-600">Les selections coup de coeur de notre communaute.</p>
          </div>
          <button className="rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50">Voir tout</button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <article
              key={experience.title}
              className="rounded-[2rem_0.85rem_2rem_0.85rem] border border-white/70 bg-white/55 p-3 shadow-lg backdrop-blur-sm"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`relative mb-4 h-44 overflow-hidden rounded-[1.2rem_0.6rem_1.2rem_0.6rem] bg-gradient-to-br ${experience.gradient}`}>
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-neutral-900">{experience.price}</div>
                <div className="absolute bottom-3 left-3 rounded-full bg-neutral-900/70 px-3 py-1 text-xs font-medium text-white">{experience.type}</div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{experience.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{experience.city}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-medium text-amber-700">{"★".repeat(5)} {experience.rating.toFixed(1)}</p>
                <button className="group relative overflow-hidden rounded-lg bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-900/30">
                  <span className="absolute inset-0 -translate-x-full bg-emerald-800/30 transition-transform duration-300 group-hover:translate-x-0" />
                  <span className="relative z-10">Reserver</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-3xl font-semibold text-neutral-900 sm:text-4xl">Pourquoi nous</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-emerald-200 bg-emerald-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-emerald-700">
              <Icon type="verified" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Prestataires verifies</h3>
            <p className="mt-1 text-sm text-neutral-600">Chaque partenaire est audite pour garantir qualite et authenticite.</p>
          </article>
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-orange-200 bg-orange-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-orange-700">
              <Icon type="payment" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Paiement securise Stripe</h3>
            <p className="mt-1 text-sm text-neutral-600">Transactions protegees et confirmations instantanees.</p>
          </article>
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-amber-200 bg-amber-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-amber-700">
              <Icon type="support" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Support 24/7</h3>
            <p className="mt-1 text-sm text-neutral-600">Notre equipe vous accompagne avant, pendant et apres chaque reservation.</p>
          </article>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Temoignages voyageurs</h2>
          <p className="mt-2 text-neutral-600">Avis authentiques de notre communaute.</p>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {testimonials.map((review) => (
            <article key={review.name} className="min-w-[85%] snap-start rounded-[1.85rem_0.7rem_1.85rem_0.7rem] border border-neutral-200 bg-white p-6 shadow-sm sm:min-w-[47%] lg:min-w-[32%]">
              <div className="mb-4 flex items-center gap-3">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${review.tone}`}>{review.initials}</div>
                <div>
                  <p className="font-semibold text-neutral-900">{review.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">{review.city}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-4 my-14 rounded-[2rem_0.8rem_2rem_0.8rem] bg-[#C2410C] px-6 py-12 text-center text-[#FAFAF7] sm:mx-6 lg:mx-10 lg:py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-orange-100/90">Votre prochaine histoire commence ici</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Plongez dans des experiences marocaines qui laissent une empreinte durable.</h2>
        <button className="mt-7 rounded-full bg-[#FAFAF7] px-7 py-3 text-sm font-semibold text-[#C2410C] transition hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-lg">
          Explorer les experiences
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-neutral-900">Morocco With You</p>
            <p>Copyright Morocco With You 2026</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-emerald-700">A propos</a>
            <a href="#" className="transition hover:text-emerald-700">Experiences</a>
            <a href="#" className="transition hover:text-emerald-700">Contact</a>
            <a href="#" className="transition hover:text-emerald-700">Instagram</a>
            <a href="#" className="transition hover:text-emerald-700">TikTok</a>
          </nav>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes badgePulse {
          0%,
          100% {
            transform: translateY(0);
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4);
          }
          50% {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px -12px rgba(217, 119, 6, 0.7);
          }
        }

        @keyframes riseUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-badge-pulse {
          animation: badgePulse 2.8s ease-in-out infinite;
        }

        .animate-rise-up {
          animation: riseUp 0.7s ease-out both;
        }
      `}</style>
    </main>
  );
}
