"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "General");
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`STRATA — ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:ybouharb08@icloud.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
        />
      </div>
      <div>
        <label
          htmlFor="contact-topic"
          className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
        >
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
        >
          <option>Order status</option>
          <option>Return or exchange</option>
          <option>Sizing</option>
          <option>Press</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--foreground)] py-4 text-[11px] font-bold tracking-[0.22em] text-[var(--background)] uppercase transition-opacity hover:opacity-95 dark:bg-white dark:text-[#070708]"
      >
        Open in email
      </button>
      {sent && (
        <p className="text-center text-xs text-[var(--muted)]">
          If your mail app did not open, copy{" "}
          <span className="font-mono-nums text-[var(--foreground)]">
            ybouharb08@icloud.com
          </span>
        </p>
      )}
    </form>
  );
}
