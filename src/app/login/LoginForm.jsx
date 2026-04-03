"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";
  const err = searchParams.get("error");

  const supabase = useMemo(() => createClient(), []);

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push(next);
          router.refresh();
          return;
        }
        setMessage(
          "Check your email to confirm your account, then sign in."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(next);
        router.refresh();
      }
    } catch (e) {
      setMessage(e.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-md rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/90 p-8 shadow-[0_32px_100px_-32px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0e0e12]/95 sm:p-10"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
        <p className="text-[10px] font-bold tracking-[0.45em] text-accent uppercase">
          {mode === "signup" ? "Join" : "Sign in"}
        </p>
      </div>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-3xl">
        {mode === "signup" ? "Create an account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {mode === "signup"
          ? "Create a STRATA account to save preferences and checkout faster."
          : "Sign in with your email and password."}
      </p>

      {(err === "auth" || message) && (
        <p
          className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
            message && !message.includes("Check your email")
              ? "border-red-500/35 bg-red-500/10 text-red-200"
              : "border-accent/30 bg-accent/10 text-[var(--foreground)]"
          }`}
        >
          {err === "auth" && !message
            ? "Sign-in failed. Try again or create an account."
            : message}
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-[var(--foreground)] py-4 text-[11px] font-bold tracking-[0.22em] text-[var(--background)] uppercase transition-[transform,opacity] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 dark:bg-white dark:text-[#070708]"
        >
          {submitting
            ? "…"
            : mode === "signup"
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--muted)]">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setMessage("");
              }}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            New here?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </>
        )}
      </p>

      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--foreground)]"
        >
          ← Back to shop
        </Link>
      </p>
    </motion.div>
  );
}
