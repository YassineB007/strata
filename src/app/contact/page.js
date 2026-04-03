import InfoArticle from "@/components/InfoArticle";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — STRATA",
  description: "Reach STRATA for orders, press, and wholesale inquiries.",
};

export default function ContactPage() {
  return (
    <InfoArticle eyebrow="Info" title="Contact">
      <p>
        For order updates, sizing help, or returns, email us and include your
        order number when possible. We typically reply within one business day.
      </p>
      <p>
        <strong>Customer care &amp; press</strong> —{" "}
        <a
          href="mailto:ybouharb08@icloud.com"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          ybouharb08@icloud.com
        </a>
      </p>

      <div className="!mt-12 border-t border-[var(--border)] pt-10">
        <p className="!mt-0 text-[10px] font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
          Send a message
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Opens your email app with a pre-filled message — nothing is stored on
          this site.
        </p>
        <ContactForm />
      </div>
    </InfoArticle>
  );
}
