'use client'

import { useI18n } from '@/components/locale-provider'

import { useEffect, useState } from 'react'
import { euros } from '@/lib/vehicles'
import { ArrowRight } from '@/components/icons'

/** Mobile-only sticky CTA on the vehicle detail page. */
export function StickyCta({
  priceFrom,
  href,
}: {
  priceFrom: number
  href: string
}) {
  const { t, locale } = useI18n()

  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky-cta" data-show={show ? 'true' : undefined}>
      <div>
        <span>{t('à partir de')}</span>
        <b>
          {euros(priceFrom)} {t('/ 24h')}
        </b>
      </div>
      <a href={href} className="btn btn--primary btn--sm">
        {t('Réserver')}
        <ArrowRight width={15} height={15} />
      </a>
    </div>
  )
}
