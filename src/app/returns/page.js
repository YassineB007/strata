import InfoArticle from "@/components/InfoArticle";

export const metadata = {
  title: "Returns — STRATA",
  description: "Return window, condition, and how to start a STRATA return.",
};

export default function ReturnsPage() {
  return (
    <InfoArticle eyebrow="Info" title="Returns">
      <p>
        We want you to be happy with your pieces. If something is not right, you
        can request a return within <strong>14 days</strong> of delivery for
        eligible items.
      </p>
      <p>
        <strong>Condition</strong> — Items must be unworn, unwashed, and in
        original condition with tags attached. Footwear must include the
        original box where applicable. Items that show wear or damage may not be
        accepted.
      </p>
      <ul>
        <li>Final sale and limited drops marked as non-returnable are excluded.</li>
        <li>Underwear and socks are not returnable for hygiene reasons.</li>
      </ul>
      <p>
        <strong>How to start</strong> — Sign in to your account, open your
        order, and follow the return flow. You will receive a prepaid label where
        applicable, or instructions for return shipping. Refunds are issued to
        the original payment method after we inspect the return.
      </p>
      <p>
        Need help? Contact{" "}
        <a
          href="mailto:ybouharb08@icloud.com"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          ybouharb08@icloud.com
        </a>{" "}
        with your order number.
      </p>
    </InfoArticle>
  );
}
