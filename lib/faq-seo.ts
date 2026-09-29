import { faq, type FaqItem } from '@/content/faq'
import { faqEn } from '@/content/faq-en'
import type { Locale } from '@/lib/i18n'

export function faqJsonLd(items: FaqItem[] = faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
