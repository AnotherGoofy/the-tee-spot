import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — ORVANI" },
      { name: "description", content: "ORVANI privacy policy: how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — ORVANI" },
      { property: "og:description", content: "How ORVANI collects, uses, and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 5, 2026</p>

      <div className="space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            ORVANI ("we", "us", "our") respects your privacy. This Privacy Policy explains what
            information we collect when you visit our website, how we use it, and the rights you
            have over your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Contact details such as name, email address, and shipping address.</li>
            <li>Order and payment details necessary to fulfill purchases.</li>
            <li>Usage data such as pages visited, device type, and browser information.</li>
            <li>Cookies and similar technologies used to operate and improve the site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Process and ship orders and provide customer support.</li>
            <li>Send order updates and, with consent, marketing communications.</li>
            <li>Improve our website, products, and user experience.</li>
            <li>Detect, prevent, and address fraud or technical issues.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We share data only with trusted service
            providers (payment processors, shipping carriers, analytics) who help us run our
            business, and when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
          <p>
            Cookies help the site function and let us understand how it's used. You can disable
            cookies in your browser, but some features may not work properly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
          <p>
            We keep your information only as long as needed for the purposes described above or as
            required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete, or
            export your personal data, and to object to or restrict certain processing. Contact us
            to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your information.
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be posted on this
            page with an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a className="underline" href="mailto:hello@orvani.com">hello@orvani.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
