'use client'

import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/locale-provider'
import { localizePath } from '@/lib/i18n'

export function SiteControls() {
  const { locale } = useI18n()
  const pathname = usePathname()
  return (
    <div className="site-controls">
      <a
        className="control-button language-switch"
        href={localizePath(pathname, locale === 'fr' ? 'en' : 'fr')}
        lang={locale === 'fr' ? 'en' : 'fr'}
        aria-label={
          locale === 'fr' ? 'Switch to English' : 'Passer en français'
        }
        onClick={(event) => {
          event.currentTarget.href =
            localizePath(
              window.location.pathname,
              locale === 'fr' ? 'en' : 'fr',
            ) +
            window.location.search +
            window.location.hash
        }}
      >
        {locale === 'fr' ? 'EN' : 'FR'}
      </a>

    </div>
  )
}
