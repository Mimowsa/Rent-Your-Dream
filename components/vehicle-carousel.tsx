'use client'

import { useI18n } from '@/components/locale-provider'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@/components/icons'
import type { VehiclePhoto } from '@/lib/vehicles'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Photo gallery with touch swiping, keyboard arrows and labeled controls. */
export function VehicleCarousel({
  photos,
  name,
}: {
  photos: VehiclePhoto[]
  name: string
}) {
  const { t, locale } = useI18n()

  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = photos.length

  const go = useCallback(
    (i: number, instant = false) => {
      const track = trackRef.current
      if (!track) return
      const next = Math.max(0, Math.min(count - 1, i))
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth',
      })
    },
    [count],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth)
        setIndex(Math.max(0, Math.min(count - 1, i)))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [count])

  // keep the active thumbnail in view
  useEffect(() => {
    const strip = thumbsRef.current
    const active = strip?.children[index] as HTMLElement | undefined
    if (strip && active)
      strip.scrollTo({
        left: Math.max(
          0,
          active.offsetLeft -
            strip.offsetLeft -
            strip.clientWidth / 2 +
            active.clientWidth / 2,
        ),
        behavior: 'auto',
      })
  }, [index])

  if (count === 0) return null

  return (
    <div
      className="carousel"
      role="group"
      aria-roledescription={t('carrousel')}
      aria-label={t(`Photos — ${name}`)}
    >
      <div className="carousel__stage">
        <div
          className="carousel__track"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              go(index - 1)
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              go(index + 1)
            }
          }}
        >
          {photos.map((p, i) => (
            <figure
              className="carousel__slide"
              key={p.src}
              aria-roledescription={t('diapositive')}
              aria-label={t(`${i + 1} sur ${count}`)}
            >
              <Image
                src={p.src}
                alt={t(p.alt)}
                fill
                sizes="(max-width: 60em) 100vw, 58vw"
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
              {p.caption && <figcaption>{t(p.caption)}</figcaption>}
            </figure>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="carousel__nav carousel__nav--prev"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={t('Photo précédente')}
            >
              <ArrowRight />
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              onClick={() => go(index + 1)}
              disabled={index === count - 1}
              aria-label={t('Photo suivante')}
            >
              <ArrowRight />
            </button>
            <span className="carousel__count" aria-hidden="true">
              {index + 1} {t('/ ')}
              {t(count)}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="carousel__thumbs" ref={thumbsRef}>
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className="carousel__thumb"
              aria-label={t(`Voir la photo ${i + 1}`)}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <Image
                src={p.src}
                alt={t(p.alt)}
                fill
                sizes="90px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
