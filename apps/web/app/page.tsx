"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

const categories = [
  { name: "Riads & Hébergement", icon: "riad", href: "/services?type=Hebergement" },
  { name: "Gastronomie", icon: "food", href: "/services?type=Restaurant" },
  { name: "Aventure & Sport", icon: "adventure", href: "/services?type=Activite" },
  { name: "Art & Culture", icon: "culture", href: "/services?type=Activite" },
  { name: "Bien-être & Spa", icon: "wellness", href: "/services?type=Hebergement" },
  { name: "Événements privés", icon: "events", href: "/services" },
] as const;

const experiences = [
  {
    title: "Riad Secret dans la Médina",
    city: "Marrakech",
    type: "Hébergement",
    price: "À partir de 780 MAD",
    rating: 4.9,
    gradient: "from-emerald-700/85 via-emerald-500/70 to-amber-500/60",
    serviceType: "Hebergement",
  },
  {
    title: "Dîner nomade sous les étoiles",
    city: "Agafay",
    type: "Gastronomie",
    price: "À partir de 520 MAD",
    rating: 4.8,
    gradient: "from-orange-700/85 via-orange-500/70 to-amber-400/60",
    serviceType: "Restaurant",
  },
  {
    title: "Atelier Zellige & Artisanat",
    city: "Fès",
    type: "Culture",
    price: "À partir de 390 MAD",
    rating: 5.0,
    gradient: "from-teal-800/85 via-cyan-600/70 to-emerald-400/60",
    serviceType: "Activite",
  },
] as const;

const testimonials = [
  {
    name: "Leila B.",
    initials: "LB",
    city: "Casablanca",
    text: "Une expérience fluide et inspirée. Nous avons réservé un séjour magique en quelques clics.",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Youssef A.",
    initials: "YA",
    city: "Rabat",
    text: "Sélection premium et support très réactif. Notre guide local était exceptionnel du début à la fin.",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    name: "Sofia K.",
    initials: "SK",
    city: "Lyon",
    text: "Le mélange tradition et modernité est parfait. Une plateforme élégante et vraiment utile.",
    tone: "bg-amber-100 text-amber-700",
  },
] as const;

const heroSlides = [
  "/home/marrakech.png",
  "/home/sahrae.png",
  "/home/chafchawan.png",
  "/home/casa.png",
  "/home/agadir.png",
];

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
        <path d="M7 4V11M9 4V11M11 4V11M9 11V20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 4V20M16 4C18.2 4 20 5.8 20 8V10H16" stroke="currentColor" strokeWidth="1.8" />
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
        <path d="M8 6V4H16V6M8 18V20H16V18" stroke="currentColor" strokeWidth="1.8" />
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
  const router = useRouter();
  const whatsappHref = "https://wa.me/212600000000?text=Bonjour%20Morocco%20With%20You%2C%20je%20veux%20de%20l%27aide%20pour%20reserver%20une%20experience.";
  const statsRef = useRef<HTMLElement | null>(null);
  const statTargets = [2000, 150, 12, 98];
  const statLabels = ["Expériences", "Prestataires", "Villes", "Satisfaction"];
  const statSuffix = ["+", "+", "", "%"];
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [destination, setDestination] = useState("");
  const [experienceType, setExperienceType] = useState("Gastronomie");
  const [date, setDate] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const [dateArrivee, setDateArrivee] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [voyageurs, setVoyageurs] = useState("");

  function resetSlideTimer() {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }

  function goToSlide(index: number) {
    const i = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    setCurrentSlide(i);
    resetSlideTimer();
  }

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
    const duration = 1500;
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

  // Restart Ken Burns animation each time the active slide changes
  useEffect(() => {
    const el = slideRefs.current[currentSlide];
    if (!el) return;
    const animNames = ["kenBurns1", "kenBurns2", "kenBurns3", "kenBurns4"] as const;
    el.style.animation = "none";
    void el.offsetHeight; // force reflow to restart animation
    el.style.animation = `${animNames[currentSlide % 4]} 8s ease-in-out forwards`;
  }, [currentSlide]);

  // Start the auto-advance timer once on mount
  useEffect(() => {
    resetSlideTimer();
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zelligePattern =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.18' stroke-width='1.2'%3E%3Cpath d='M70 6l25 14v28L70 62 45 48V20z'/%3E%3Cpath d='M70 78l25 14v28l-25 14-25-14V92z'/%3E%3Cpath d='M8 42l25 14v28L8 98-17 84V56z'/%3E%3Cpath d='M132 42l25 14v28l-25 14-25-14V56z'/%3E%3C/g%3E%3C/svg%3E\")";

  const scrollToPopular = () => {
    const target = document.getElementById("popular-experiences");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = destination.trim();

    if (query) {
      router.push(`/services?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <main className="text-neutral-900">
      {/* HERO — slideshow + Ken Burns + Airbnb search bar */}
      <section
        className="relative isolate min-h-screen overflow-hidden bg-black"
        onMouseEnter={() => { if (slideTimerRef.current) clearInterval(slideTimerRef.current); }}
        onMouseLeave={() => resetSlideTimer()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0]?.clientX ?? 0; }}
        onTouchEnd={(e) => {
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          if (Math.abs(delta) > 50) goToSlide(currentSlide + (delta < 0 ? 1 : -1));
        }}
      >
        {/* Slides */}
        {heroSlides.map((url, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${url})`,
              opacity: i === currentSlide ? 1 : 0,
              transition: "opacity 1.4s cubic-bezier(.4,0,.2,1)",
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 30%, rgba(0,0,0,.4) 65%, rgba(0,0,0,.88) 100%)",
          }}
        />

        {/* Zellige pattern */}
        <div
          className="absolute inset-0 z-10 opacity-20"
          style={{ backgroundImage: zelligePattern, backgroundSize: "220px 220px" }}
        />

        {/* Centered headline */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
          style={{ paddingBottom: "calc(2.4rem + 90px + 1.2rem)" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6 text-white text-xs font-semibold tracking-widest uppercase"
            style={{
              padding: ".38rem 1.1rem",
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.28)",
              backdropFilter: "blur(10px)",
              animation: "heroFadeUp .8s .2s both",
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-amber-400 shrink-0"
              style={{ boxShadow: "0 0 6px #f59e0b", animation: "heroPulse 2s infinite" }}
            />
            Découvrez le Maroc authentique
          </div>

          {/* Title */}
          <h1
            className="text-white font-black leading-[1.12] max-w-3xl"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 32px rgba(0,0,0,.4)",
              animation: "heroFadeUp .8s .35s both",
            }}
          >
            <span className="block whitespace-nowrap">
              Transformez votre voyage au Maroc,
            </span>
            <span
              className="block whitespace-nowrap text-center"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              en une expérience unique
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-5 text-white/80 max-w-lg leading-relaxed"
            style={{ fontSize: "clamp(.9rem, 1.8vw, 1.1rem)", animation: "heroFadeUp .8s .5s both" }}
          >
            Des médinas millénaires aux dunes dorées du Sahara —<br />
            des séjours sur mesure qui restent gravés pour toujours.
          </p>
        </div>

        {/* Slide indicators */}
        <div
          className="absolute z-30 flex gap-2 items-center"
          style={{ bottom: "calc(2.4rem + 90px + 1.6rem)", left: "50%", transform: "translateX(-50%)" }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer border-none p-0"
              style={{
                width: i === currentSlide ? 26 : 8,
                height: 8,
                background: i === currentSlide ? "#f59e0b" : "rgba(255,255,255,.4)",
              }}
            />
          ))}
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center text-white transition hover:scale-110 border-none cursor-pointer"
          style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(8px)" }}
          aria-label="Précédent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center text-white transition hover:scale-110 border-none cursor-pointer"
          style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(8px)" }}
          aria-label="Suivant"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Airbnb-style search bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-6 flex justify-center"
          style={{ animation: "heroFadeUp .9s .75s both" }}
        >
          <form
            onSubmit={onSearch}
            className="w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ background: "#fff", boxShadow: "0 24px 72px rgba(0,0,0,.32), 0 0 0 1px rgba(0,0,0,.06)" }}
          >
            {/* Destination */}
            <div className="flex-1 flex flex-col justify-center px-5 py-3 border-b md:border-b-0 md:border-r border-neutral-100 min-w-0 focus-within:bg-amber-50/60 transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 mb-0.5 select-none cursor-default">
                Destination
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Marrakech, Fès, Sahara…"
                className="border-none bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none w-full"
              />
            </div>

            {/* Date arrivée */}
            <div className="flex-1 flex flex-col justify-center px-5 py-3 border-b md:border-b-0 md:border-r border-neutral-100 min-w-0 focus-within:bg-amber-50/60 transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 mb-0.5 select-none cursor-default">
                Date d&apos;arrivée
              </label>
              <input
                type="date"
                value={dateArrivee}
                onChange={(e) => setDateArrivee(e.target.value)}
                className="border-none bg-transparent text-sm text-neutral-700 focus:outline-none w-full"
              />
            </div>

            {/* Date départ */}
            <div className="flex-1 flex flex-col justify-center px-5 py-3 border-b md:border-b-0 md:border-r border-neutral-100 min-w-0 focus-within:bg-amber-50/60 transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 mb-0.5 select-none cursor-default">
                Date de départ
              </label>
              <input
                type="date"
                value={dateDepart}
                onChange={(e) => setDateDepart(e.target.value)}
                className="border-none bg-transparent text-sm text-neutral-700 focus:outline-none w-full"
              />
            </div>

            {/* Voyageurs */}
            <div className="flex-1 flex flex-col justify-center px-5 py-3 border-b md:border-b-0 border-neutral-100 min-w-0 focus-within:bg-amber-50/60 transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 mb-0.5 select-none cursor-default">
                Voyageurs
              </label>
              <input
                value={voyageurs}
                onChange={(e) => setVoyageurs(e.target.value)}
                placeholder="2 voyageurs"
                className="border-none bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none w-full"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex-shrink-0 flex items-center justify-center gap-2 text-sm font-bold text-white transition hover:brightness-110 hover:scale-[1.03] active:scale-95 border-none cursor-pointer"
              style={{
                padding: "1rem 1.5rem",
                margin: "6px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 4px 16px rgba(245,158,11,.4)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="border-y border-emerald-200/70 bg-[#FAFAF7] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Explorez par univers</h2>
          <p className="mt-2 text-neutral-600">Des expériences soigneusement sélectionnées pour tous les rythmes de voyage.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-[1.75rem_0.65rem_1.75rem_0.65rem] border border-neutral-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-2 text-emerald-700 transition group-hover:bg-emerald-100 group-hover:text-emerald-800">
                <Icon type={item.icon} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">Collections exclusives avec partenaires vérifiés.</p>
            </Link>
          ))}
        </div>
      </section>

      {/* EXPERIENCES POPULAIRES */}
      <section id="popular-experiences" className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Expériences populaires</h2>
            <p className="mt-2 text-neutral-600">Les sélections coup de coeur de notre communauté.</p>
          </div>
          <Link href="/services" className="rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50">
            Voir tout
          </Link>
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
                <Link
                  href={`/services?type=${experience.serviceType}`}
                  className="group relative overflow-hidden rounded-lg bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-900/30"
                >
                  <span className="absolute inset-0 -translate-x-full bg-emerald-800/30 transition-transform duration-300 group-hover:translate-x-0" />
                  <span className="relative z-10">Réserver</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <h2 className="mb-8 text-3xl font-semibold text-neutral-900 sm:text-4xl">Pourquoi nous</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-emerald-200 bg-emerald-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-emerald-700">
              <Icon type="verified" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Prestataires vérifiés</h3>
            <p className="mt-1 text-sm text-neutral-600">Chaque partenaire est audité pour garantir qualité et authenticité.</p>
          </article>
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-orange-200 bg-orange-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-orange-700">
              <Icon type="payment" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Paiement sécurisé Stripe</h3>
            <p className="mt-1 text-sm text-neutral-600">Transactions protégées et confirmations instantanées.</p>
          </article>
          <article className="rounded-[1.7rem_0.6rem_1.7rem_0.6rem] border border-amber-200 bg-amber-50/50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-white p-2 text-amber-700">
              <Icon type="support" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Support 24/7</h3>
            <p className="mt-1 text-sm text-neutral-600">Notre équipe vous accompagne avant, pendant et après chaque réservation.</p>
          </article>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Témoignages voyageurs</h2>
          <p className="mt-2 text-neutral-600">Avis authentiques de notre communauté.</p>
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

      {/* CARTE & CONTACT */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem_0.8rem_2rem_0.8rem] border border-emerald-200 bg-white shadow-sm">
            <div className="border-b border-emerald-100 bg-emerald-50/60 px-5 py-4">
              <h2 className="text-2xl font-semibold text-neutral-900">Notre présence au Maroc</h2>
              <p className="mt-1 text-sm text-neutral-600">Repérez nos principales destinations et préparez votre itinéraire en un clic.</p>
            </div>
            <iframe
              title="Carte Morocco With You"
              src="https://www.google.com/maps?q=Morocco&output=embed"
              className="h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>

          <article className="rounded-[2rem_0.8rem_2rem_0.8rem] border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-700">Assistance rapide</p>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-900">Besoin d'aide pour choisir une expérience ?</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Contactez un conseiller en direct via WhatsApp pour obtenir des recommandations personnalisées selon votre budget, vos dates et votre ville.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Ouvrir WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Marrakech"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-orange-400 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-50"
              >
                Itineraire Google Maps
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-4 my-14 rounded-[2rem_0.8rem_2rem_0.8rem] bg-[#C2410C] px-6 py-24 text-center text-[#FAFAF7] sm:mx-6 lg:mx-10 lg:py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-orange-100/90">Votre prochaine histoire commence ici</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Plongez dans des expériences marocaines qui laissent une empreinte durable.</h2>
        <Link
          href="/services"
          className="mt-7 inline-flex rounded-full bg-[#FAFAF7] px-7 py-3 text-sm font-semibold text-[#C2410C] transition hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-lg"
        >
          Explorer les expériences
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-neutral-900">Morocco With You</p>
            <p>Copyright Morocco With You 2026</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition hover:text-emerald-700">À propos</Link>
            <Link href="/services" className="transition hover:text-emerald-700">Expériences</Link>
            <Link href="/account" className="transition hover:text-emerald-700">Contact</Link>
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
