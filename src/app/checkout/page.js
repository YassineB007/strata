import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Checkout — STRATA",
  description: "Complete your STRATA order.",
};

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/checkout");
  }

  return <CheckoutForm />;
}
