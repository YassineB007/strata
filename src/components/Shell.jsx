import { Suspense } from "react";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Shell({ children }) {
  return (
    <div className="relative flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-[var(--background)] text-[var(--foreground)]">
      <Suspense
        fallback={
          <header className="sticky top-0 z-50 h-[4.25rem] border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-2xl dark:bg-[#070708]/85" />
        }
      >
        <Navbar />
      </Suspense>
      <main className="relative z-10 min-w-0 flex-1 overflow-x-clip">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
