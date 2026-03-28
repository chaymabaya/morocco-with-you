"use client";

import { FormEvent, useState } from "react";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const SUGGESTIONS = [
  "Comment réserver une expérience ?",
  "Quels sont vos horaires de support ?",
  "Puis-je modifier ma réservation ?",
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Bonjour ",
    },
    {
      id: 2,
      from: "bot",
      text: "Je suis l'assistant Morocco With You. Posez-moi une question sur les réservations, les services ou votre compte.",
    },
  ]);
  const [pending, setPending] = useState(false);

  function addBotReply(question: string) {
    const lower = question.toLowerCase();
    let reply =
      "Merci pour votre message. Pour l'instant je peux répondre aux questions générales sur le site, les réservations et les services. Un membre de l'équipe pourra aussi vous aider sur WhatsApp si besoin.";

    if (lower.includes("reserver") || lower.includes("réserver") || lower.includes("reservation") || lower.includes("réservation")) {
      reply =
        "Pour réserver, choisissez une expérience, cliquez sur 'Réserver' puis suivez les étapes de paiement. Vous retrouverez vos réservations dans la section 'Mon compte'.";
    } else if (lower.includes("remboursement") || lower.includes("annuler") || lower.includes("annulation")) {
      reply =
        "Les conditions d'annulation et de remboursement dépendent de chaque prestataire. Vérifiez les détails dans la page du service réservé et contactez-nous en cas de doute.";
    } else if (lower.includes("horaire") || lower.includes("support") || lower.includes("contact")) {
      reply =
        "Notre équipe support est joignable tous les jours par email et via WhatsApp. Cliquez sur le bouton WhatsApp en bas à droite pour une réponse rapide.";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        from: "bot",
        text: reply,
      },
    ]);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text },
    ]);
    setInput("");
    setPending(true);

    setTimeout(() => {
      addBotReply(text);
      setPending(false);
    }, 400);
  }

  function handleSuggestionClick(s: string) {
    setInput(s);
  }

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="mb-2 w-80 max-w-[90vw] overflow-hidden rounded-2xl border border-amber-200/70 bg-white text-sm shadow-2xl">
          <div className="flex items-center justify-between bg-amber-400 px-3 py-2 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">MW</div>
              <div className="leading-tight">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">Assistant</p>
                <p className="text-[11px] opacity-90">Réponses rapides</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/80 hover:bg-black/10 hover:text-white"
              aria-label="Fermer le chat"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none">
                <path d="M6 6L18 18M6 18L18 6" />
              </svg>
            </button>
          </div>

          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto bg-amber-50/40 px-3 py-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-3 py-1.5 text-xs text-white"
                    : "mr-auto max-w-[90%] rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs text-neutral-800 shadow"
                }
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <div className="mr-auto inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] text-neutral-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                L'assistant écrit...
              </div>
            )}
          </div>

          <div className="border-t border-amber-100 bg-white px-3 py-2">
            <div className="mb-1 flex flex-wrap gap-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-full border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[10px] text-amber-900 hover:bg-amber-100"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 border-none bg-amber-50 px-2 py-1 text-xs outline-none ring-0 rounded-md"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-2 py-1 text-xs font-semibold text-white shadow disabled:opacity-60"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-white shadow-xl transition hover:scale-105 hover:bg-amber-500"
        aria-label="Ouvrir le chatbot"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none">
          <path d="M5 5H19V14H7L5 16V5Z" />
          <path d="M9 18H17L19 20V11" />
        </svg>
      </button>
    </div>
  );
}
