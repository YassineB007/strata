import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign in — STRATA",
  description: "Sign in or create a STRATA account.",
};

function LoginFallback() {
  return (
    <div className="mx-auto h-96 max-w-md animate-pulse rounded-[2rem] bg-[var(--surface-2)] dark:bg-white/5" />
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
