import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import PremiumHeader from "@/components/PremiumHeader";
import ChatbotWidget from "@/components/ChatbotWidget";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Morocco With You",
  description: "Discover, book, and manage authentic Morocco experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappHref = "https://wa.me/212600000000?text=Bonjour%20Morocco%20With%20You%2C%20j%27ai%20besoin%20d%27aide.";

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
        <PremiumHeader />
        <div className="min-h-screen pt-20">
          {children}

          <ChatbotWidget />

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Contacter le support WhatsApp"
            className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 hover:bg-[#1fa855]"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
              <path d="M12 2a9.9 9.9 0 0 0-8.56 14.88L2 22l5.28-1.38A10 10 0 1 0 12 2Zm0 18.2a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.12.82.84-3.04-.2-.31A8.17 8.17 0 1 1 12 20.2Zm4.48-6.14c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.58 4.12 3.62.58.25 1.04.4 1.4.5.58.18 1.1.15 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
