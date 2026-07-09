"use client";

import { PageHeader } from "../ui-primitives";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-contact";

type LegalKind = "terms" | "privacy" | "cookies";

const CONTENT: Record<
  LegalKind,
  { eyebrow: string; title: string; sections: { heading: string; body: string }[] }
> = {
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    sections: [
      {
        heading: "1. About these terms",
        body: `These Terms of Use govern your access to the ${SITE_NAME} website and enquiry services. By using this site or submitting a form, you agree to these terms.`,
      },
      {
        heading: "2. Our services",
        body: `${SITE_NAME} connects athletes, teams, academies, brands, corporates, and event hosts through enquiries and direct team support. We do not guarantee specific outcomes from any enquiry submitted through the site.`,
      },
      {
        heading: "3. Enquiries & communication",
        body: `When you submit an enquiry, you confirm that the information you provide is accurate. We may contact you by email at the address you supply. You are responsible for keeping your contact details correct.`,
      },
      {
        heading: "4. Acceptable use",
        body: `You must not misuse the site, submit false information, attempt unauthorised access, or use the platform for unlawful purposes.`,
      },
      {
        heading: "5. Intellectual property",
        body: `All content, branding, logos, and materials on this site belong to ${SITE_NAME} or its licensors. You may not copy or reuse them without written permission.`,
      },
      {
        heading: "6. Limitation of liability",
        body: `${SITE_NAME} provides this website and enquiry channel on an "as is" basis. To the fullest extent permitted by law, we are not liable for indirect or consequential loss arising from use of the site.`,
      },
      {
        heading: "7. Changes",
        body: `We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.`,
      },
      {
        heading: "8. Contact",
        body: `Questions about these terms: ${CONTACT_EMAIL}`,
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Who we are",
        body: `This Privacy Policy explains how ${SITE_NAME} ("we", "us") handles personal information collected through our website and enquiry forms.`,
      },
      {
        heading: "2. Information we collect",
        body: `When you submit an enquiry, we may collect your name, email address, enquiry type, and message content.`,
      },
      {
        heading: "3. How we use your information",
        body: `We use your information to respond to enquiries, provide services you request, improve our communications, and maintain records of contact. We do not sell your personal data.`,
      },
      {
        heading: "4. Email confirmations",
        body: `When you submit a form, we send your enquiry to our team and send you a confirmation email at the address you provided so you have a record of your submission.`,
      },
      {
        heading: "5. Data retention",
        body: `We retain enquiry records for as long as needed to respond, follow up, and meet legal or operational requirements.`,
      },
      {
        heading: "6. Your rights",
        body: `You may request access, correction, or deletion of your personal data by emailing ${CONTACT_EMAIL}. We will respond within a reasonable time.`,
      },
      {
        heading: "7. Security",
        body: `We take reasonable steps to protect information submitted through our site. No online transmission is completely secure; please share only what is necessary.`,
      },
      {
        heading: "8. Contact",
        body: `Privacy questions: ${CONTACT_EMAIL}`,
      },
    ],
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    sections: [
      {
        heading: "1. What are cookies?",
        body: `Cookies are small text files stored on your device when you visit a website. They help the site work properly and remember preferences.`,
      },
      {
        heading: "2. How we use cookies",
        body: `${SITE_NAME} may use essential cookies required for the site to function, and optional cookies for analytics or preferences where enabled.`,
      },
      {
        heading: "3. Essential cookies",
        body: `These are necessary for basic site operation — for example, remembering theme or session-related settings. The site may not work correctly without them.`,
      },
      {
        heading: "4. Analytics cookies",
        body: `If we use analytics tools, they may set cookies to understand how visitors use the site in aggregate. We use this to improve content and usability.`,
      },
      {
        heading: "5. Managing cookies",
        body: `You can control or delete cookies through your browser settings. Blocking essential cookies may affect how the site works.`,
      },
      {
        heading: "6. Updates",
        body: `We may update this Cookie Policy when our use of cookies changes. The latest version will always be available on this page.`,
      },
      {
        heading: "7. Contact",
        body: `Questions about cookies: ${CONTACT_EMAIL}`,
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = CONTENT[kind];

  return (
    <div>
      <PageHeader eyebrow={doc.eyebrow} title={doc.title} />
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-8">
          {doc.sections.map((section) => (
            <div key={section.heading} className="glossy-card p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gradient-gold mb-3">{section.heading}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>
    </div>
  );
}
