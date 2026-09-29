'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/components/locale-provider'

export function BackToTop() {
  const { locale } = useI18n()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return visible ? (
    <button
      type="button"
      className="back-to-top"
      aria-label={locale === 'fr' ? 'Retour en haut de page' : 'Back to top'}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        })
        document.getElementById('contenu')?.focus({ preventScroll: true })
      }}
    >
      ↑
    </button>
  ) : null
}
