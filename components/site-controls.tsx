'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/locale-provider'
import { localizePath } from '@/lib/i18n'

export function SiteControls() {
  const { locale } = useI18n()
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  useEffect(
    () => setDark(document.documentElement.dataset.theme === 'dark'),
    [],
  )
  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== 'dark'
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('ryd-theme', next ? 'dark' : 'light')
    } catch {}
  }
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
      <button
        className="control-button"
        type="button"
        aria-label={locale === 'fr' ? 'Mode sombre' : 'Dark mode'}
        aria-pressed={dark}
        onClick={toggleTheme}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          {dark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
            </>
          ) : (
            <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" />
          )}
        </svg>
      </button>
    </div>
  )
}
