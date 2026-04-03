"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => {},
});

/** @param {{ id: string, email: string | null } | null | undefined} snap */
function snapshotToUser(snap) {
  if (!snap?.id) return null;
  return {
    id: snap.id,
    email: snap.email,
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: "",
    updated_at: "",
    role: "authenticated",
  };
}

export function AuthProvider({ children, initialUser = null }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(() => snapshotToUser(initialUser));
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  }, [supabase, router]);

  const value = useMemo(
    () => ({ user, loading, signOut }),
    [user, loading, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
