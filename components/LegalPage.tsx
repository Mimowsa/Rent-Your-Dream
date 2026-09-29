'use client'

import { useI18n } from '@/components/locale-provider'

import Link from '@/components/localized-link'
import type { ReactNode } from 'react'
import { company } from '@/lib/company'

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: ReactNode
}) {
  const { t, locale } = useI18n()

  return (
    <article className="wrap prose legal-page">
      <header>
        <span className="kicker">{t('Vos informations, en toute clarté')}</span>
        <h1>{t(title)}</h1>
        {intro && <p className="legal-intro">{t(intro)}</p>}
        <p className="legal-updated">
          {t('Mis à jour le ')}
          <time dateTime="2026-09-29">{t('29 septembre 2026')}</time>
          {t('.')}
        </p>
      </header>
      {t(children)}
      <nav className="legal-nav" aria-label={t('Autres informations légales')}>
        <h2>{t('Informations utiles')}</h2>
        <ul>
          {company.legalRoutes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{t(route.label)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}
