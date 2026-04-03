import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import Providers from "@/components/Providers";
import Shell from "@/components/Shell";
import { getServerUser } from "@/lib/auth/session";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "STRATA — Contemporary Streetwear",
  description:
    "Limited-run streetwear with an architectural edge. Hoodies, tees, pants, and accessories.",
};

export default async function RootLayout({ children }) {
  const initialUser = await getServerUser();

  return (
    <html
      lang="en"
      className={`${syne.variable} ${space.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-[family-name:var(--font-space)] antialiased">
        <Providers initialUser={initialUser}>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
