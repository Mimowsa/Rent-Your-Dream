'use client'

import { useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Link from '@/components/localized-link'
import { useI18n } from '@/components/locale-provider'
import { sanitizeAnalyticsEvent } from '@/lib/analytics'

const storageKey = 'ryd-analytics-consent-v1'
const lifetime = 180 * 24 * 60 * 60 * 1000

export function AnalyticsConsent({ enabled }: { enabled: boolean }) {
  const { locale } = useI18n()
  const [choice, setChoice] = useState<'accepted' | 'refused' | null>(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const allow = useRef(false)
  const panel = useRef<HTMLElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null')
      if (
        saved &&
        (saved.choice === 'accepted' || saved.choice === 'refused') &&
        saved.expires > Date.now()
      ) {
        setChoice(saved.choice)
        allow.current = saved.choice === 'accepted'
      } else {
        localStorage.removeItem(storageKey)
        setOpen(enabled)
      }
    } catch {
      setOpen(enabled)
    }
    setReady(true)
    const manage = () => {
      previousFocus.current = document.activeElement as HTMLElement
      setOpen(true)
      requestAnimationFrame(() => panel.current?.focus())
    }
    window.addEventListener('ryd:analytics-settings', manage)
    return () => window.removeEventListener('ryd:analytics-settings', manage)
  }, [enabled])
  function choose(next: 'accepted' | 'refused') {
    const withdrawing = choice === 'accepted' && next === 'refused'
    allow.current = next === 'accepted'
    setChoice(next)
    setOpen(false)
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ choice: next, expires: Date.now() + lifetime }),
      )
      if (withdrawing && enabled) window.location.reload()
    } catch {}
    previousFocus.current?.focus()
  }
  return (
    <>
      {enabled && ready && choice === 'accepted' && (
        <Analytics
          debug={false}
          beforeSend={(event) =>
            allow.current
              ? sanitizeAnalyticsEvent(event, window.location.origin)
              : null
          }
        />
      )}
      {ready && open && (
        <aside
          ref={panel}
          className="analytics-consent"
          tabIndex={-1}
          aria-label={
            locale === 'fr' ? 'Statistiques facultatives' : 'Optional analytics'
          }
        >
          <div>
            <strong>
              {locale === 'fr'
                ? 'Statistiques facultatives'
                : 'Optional analytics'}
            </strong>
            <p>
              {locale === 'fr'
                ? 'Avec votre accord, Vercel nous aide à comprendre quelles pages sont consultées. Aucun contenu du configurateur n’est mesuré.'
                : 'With your permission, Vercel helps us understand which pages are visited. Configurator content is never tracked.'}{' '}
              <Link href="/politique-cookies">
                {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
              </Link>
            </p>
          </div>
          <div className="analytics-consent__actions">
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => choose('refused')}
            >
              {locale === 'fr' ? 'Refuser' : 'Decline'}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => choose('accepted')}
            >
              {locale === 'fr' ? 'Accepter' : 'Accept'}
            </button>
          </div>
        </aside>
      )}
    </>
  )
}
