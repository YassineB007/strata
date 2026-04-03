"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartDrawerProvider } from "@/context/CartDrawerContext";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Providers({ children, initialUser }) {
  return (
    <ThemeProvider>
      <AuthProvider initialUser={initialUser}>
        <CartProvider>
          <CartDrawerProvider>{children}</CartDrawerProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
