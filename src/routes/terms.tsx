import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — ORVANI" },
      { name: "description", content: "The terms and conditions governing your use of ORVANI's website and purchases." },
      { property: "og:title", content: "Terms of Service — ORVANI" },
      { property: "og:description", content: "Terms governing your use of ORVANI's website and purchases." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 5, 2026</p>

      <div className="space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Agreement</h2>
          <p>
            By accessing or using the ORVANI website, you agree to these Terms of Service. If you
            do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
          <p>
            You must be at least 16 years old, or the age of majority in your jurisdiction, to make
            a purchase. By placing an order you confirm that the information you provide is
            accurate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Products & Pricing</h2>
          <p>
            We aim to display products and prices accurately, but errors may occur. We reserve the
            right to correct errors, change prices, or cancel orders affected by them. Items are
            subject to availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Orders & Payment</h2>
          <p>
            Placing an order is an offer to purchase. We may accept or decline any order. Payment
            must be made through the approved payment methods at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Shipping</h2>
          <p>
            Delivery times are estimates, not guarantees. Risk of loss passes to you on delivery to
            the carrier.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Returns & Refunds</h2>
          <p>
            Unworn items in original condition may be returned within 14 days of delivery. Sale
            items and customized products are final sale unless faulty.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
          <p>
            All content on this site — including logos, designs, images, and text — is owned by
            ORVANI or its licensors and is protected by copyright and trademark laws. You may not
            use it without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Acceptable Use</h2>
          <p>
            You agree not to misuse the site, attempt to gain unauthorized access, interfere with
            its operation, or use it for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Disclaimer</h2>
          <p>
            The site and products are provided "as is" without warranties of any kind, to the
            fullest extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ORVANI is not liable for any indirect,
            incidental, or consequential damages arising from your use of the site or products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Changes</h2>
          <p>
            We may update these Terms at any time. Continued use of the site after changes means
            you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Contact</h2>
          <p>
            Questions? Email{" "}
            <a className="underline" href="mailto:hello@orvani.com">hello@orvani.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
