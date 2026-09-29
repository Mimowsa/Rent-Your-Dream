import { pageMetadata } from '@/lib/seo'
import { FaqAccordion } from '@/components/faq-accordion'
import { faqJsonLd } from '@/lib/faq-seo'
export const metadata = pageMetadata({
  title: 'Questions fréquentes sur votre location',
  description:
    'Tarifs, assurance, caution, documents, âge minimum et kilométrage : les réponses pour préparer votre location de voiture chez Rent Your Dream.',
  path: '/faq',
})

export default function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <section className="wrap page-intro">
        <span className="kicker">Avant de prendre la route</span>
        <h1>Les réponses. Sans détour.</h1>
        <p>
          Les informations utiles pour préparer votre location en toute
          simplicité.
        </p>
      </section>
      <section className="wrap section catalog-section">
        <FaqAccordion />
      </section>
    </>
  )
}
