'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@/components/icons'
import type { VehiclePhoto } from '@/lib/vehicles'

const AUTOPLAY_MS = 4000

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Photo carousel for the vehicle page: one large scroll-snap image with
 * previous / next buttons and a counter, plus a thumbnail strip underneath.
 * Auto-advances every 4 s, looping — pauses on hover / focus / hidden tab and
 * is disabled when the user prefers reduced motion. Swipe on touch, arrow keys
 * on focus.
 */
export function VehicleCarousel({
  photos,
  name,
}: {
  photos: VehiclePhoto[]
  name: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
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
    active?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [index])

  // autoplay — every 4 s, looping. Restarts whenever index or paused changes.
  useEffect(() => {
    if (count < 2 || paused || prefersReducedMotion()) return
    const id = window.setInterval(() => {
      const atEnd = index >= count - 1
      go(atEnd ? 0 : index + 1, atEnd)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [index, paused, count, go])

  // pause while the tab is hidden
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (count === 0) return null

  return (
    <div
      className="carousel"
      role="group"
      aria-roledescription="carrousel"
      aria-label={`Photos — ${name}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
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
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 60em) 100vw, 58vw"
                priority={i === 0}
                style={{ objectFit: 'cover' }}
              />
              {p.caption && <figcaption>{p.caption}</figcaption>}
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
              aria-label="Photo précédente"
            >
              <ArrowRight />
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              onClick={() => go(index + 1)}
              disabled={index === count - 1}
              aria-label="Photo suivante"
            >
              <ArrowRight />
            </button>
            <span className="carousel__count" aria-hidden="true">
              {index + 1} / {count}
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
              aria-label={`Voir la photo ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <Image src={p.src} alt="" fill sizes="90px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
