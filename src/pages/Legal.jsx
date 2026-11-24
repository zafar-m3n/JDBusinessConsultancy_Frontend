import { Meta, Reveal } from '@/components/ui/primitives';
import { PageHero } from '@/components/layout/Chrome';
import { site } from '@/data/site';

// PLACEHOLDER legal text — have it reviewed before launch.
const docs = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Who we are', `${site.name} provides business consultancy services in Sri Lanka. This policy explains how we handle personal information shared with us through this website.`],
      ['Information we collect', 'When you contact us we collect the details you provide, such as your name, company, email address, phone number and message. We do not collect payment details through this website.'],
      ['How we use it', 'We use your information only to respond to your enquiry, provide the services you request and keep records required by law. We do not sell your information.'],
      ['Sharing', 'We share information only where necessary to deliver a service you have asked for, for example with the Registrar of Companies or the Inland Revenue Department, or where the law requires it.'],
      ['Keeping it safe', 'We take reasonable steps to protect your information and keep it only for as long as needed.'],
      ['Your rights', `You can ask to see, correct or delete the information we hold about you by emailing ${site.email}.`],
      ['Changes', 'We may update this policy from time to time. The latest version will always be on this page.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['About these terms', `These terms apply to your use of this website and to services provided by ${site.name}.`],
      ['Information on this website', 'Content on this website is general information, not professional advice for your specific situation. Please contact us before making decisions based on it.'],
      ['Prices', 'Prices shown exclude government fees unless stated otherwise. Final pricing is confirmed in writing before work begins.'],
      ['Payments', 'Payment terms are set out in your quotation. Work may begin only after any required advance has been received.'],
      ['Timelines', 'Timelines are estimates. Some steps depend on government departments and the documents you provide.'],
      ['Liability', 'We take care in everything we do, but our liability is limited to the fees paid for the service concerned, to the extent permitted by law.'],
      ['Governing law', 'These terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka.'],
    ],
  },
};

const slug = s => s.toLowerCase().replace(/[^a-z]+/g, '-');

export default function Legal({ kind }) {
  const doc = docs[kind];
  return (
    <>
      <Meta />
      <PageHero title={doc.title} />
      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-32 space-y-2 text-sm">
              {doc.sections.map(([h]) => (
                <li key={h}>
                  <a href={`#${slug(h)}`} className="text-silver-400 hover:text-accent-600">{h}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-[720px] space-y-12 lg:col-span-8 lg:col-start-5">
            {doc.sections.map(([h, p], i) => (
              <Reveal key={h} id={slug(h)} className="scroll-mt-32">
                <h2 className="text-2xl font-light"><span className="mr-3 text-silver-400">{String(i + 1).padStart(2, '0')}</span>{h}</h2>
                <p className="mt-4 text-silver-400">{p}</p>
              </Reveal>
            ))}
            <p className="text-sm text-silver-400">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </section>
    </>
  );
}
