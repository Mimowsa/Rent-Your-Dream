import { faq, type FaqItem } from '@/content/faq'

/** Native <details> accordion — no JS, keyboard accessible. */
export function FaqAccordion({ items = faq }: { items?: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} name="faq">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd(items: FaqItem[] = faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  }
}
