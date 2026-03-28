"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const forgotSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  async function onSubmit(_: ForgotForm) {
    // TODO: brancher sur l'API de reset quand elle sera disponible
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold">Mot de passe oubli&eacute;</h1>
        <p className="mb-6 text-sm text-gray-500">
          Entre ton email et, si un compte existe, tu recevras un lien pour r&eacute;initialiser ton mot de passe.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="ton@email.com"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {submitted && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
              Si un compte existe avec cet email, un lien de r&eacute;initialisation a &eacute;t&eacute; envoy&eacute;.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="w-full rounded-lg bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/login" className="font-medium text-green-600 hover:underline">
            Retour &agrave; la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
