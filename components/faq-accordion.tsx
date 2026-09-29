'use client'

import { useI18n } from '@/components/locale-provider'
import { faqEn } from '@/content/faq-en'
import { faq, type FaqItem } from '@/content/faq'

/** Two columns preserve a natural reading order: 5 then 6 for the current FAQ. */
export function FaqAccordion({ items: given }: { items?: FaqItem[] }) {
  const { locale } = useI18n()
  const items = given || (locale === 'en' ? faqEn : faq)
  const splitAt = Math.floor(items.length / 2)
  const groups =
    items.length > 1 ? [items.slice(0, splitAt), items.slice(splitAt)] : [items]
  return (
    <div className="faq">
      {groups.map((group, index) => (
        <div className="faq-column" key={index}>
          {group.map((item) => (
            <details key={item.question} name="faq">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  )
}
