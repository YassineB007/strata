import InfoArticle from "@/components/InfoArticle";

export const metadata = {
  title: "Shipping — STRATA",
  description: "Shipping regions, timelines, and fees for STRATA orders.",
};

export default function ShippingPage() {
  return (
    <InfoArticle eyebrow="Info" title="Shipping">
      <p>
        We dispatch most in-stock orders within <strong>48 hours</strong> on
        business days. You will receive a confirmation email with tracking once
        your package leaves our warehouse.
      </p>
      <p>
        <strong>Regions</strong> — We currently ship within the European Union
        and selected international destinations. Rates and delivery windows are
        calculated at checkout based on your address.
      </p>
      <p>
        <strong>Free shipping</strong> — EU orders over{" "}
        <strong>€200</strong> qualify for complimentary standard shipping unless
        otherwise stated during promotions.
      </p>
      <p>
        <strong>Customs</strong> — International orders may be subject to import
        duties and taxes, which are the responsibility of the recipient. We
        cannot mark packages as gifts or under-declare value.
      </p>
      <p>
        Questions about your shipment? Email{" "}
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
