'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, primaryCta } from '@/lib/nav'
import { company } from '@/lib/company'
import { Menu, Close } from '@/components/icons'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const firstRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="header" data-scrolled={scrolled ? 'true' : undefined}>
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label={`${company.name} — accueil`}>
          <Image
            src="/brand/logo-horizontal-tight.png"
            alt={company.name}
            width={2040}
            height={224}
            priority
          />
        </Link>

        <nav className="nav" aria-label="Navigation">
          {mainNav.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
          <Link href={primaryCta.href} className="btn btn--primary btn--sm">
            {primaryCta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Menu />
        </button>
      </div>

      <div id="drawer" className="drawer" data-open={open ? 'true' : undefined}>
        <div className="drawer-top">
          <Link href="/" className="brand" aria-label={`${company.name} — accueil`}>
            <Image
              src="/brand/logo-horizontal-tight.png"
              alt={company.name}
              width={2040}
              height={224}
              style={{ height: 22, width: 'auto' }}
            />
          </Link>
          <button type="button" className="burger" onClick={() => setOpen(false)}>
            <span className="sr-only">Fermer</span>
            <Close />
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          {mainNav.map((i, idx) => (
            <Link key={i.href} href={i.href} ref={idx === 0 ? firstRef : undefined}>
              {i.label}
            </Link>
          ))}
        </nav>
        <Link href={primaryCta.href} className="btn btn--primary btn--block">
          {primaryCta.label}
        </Link>
        <p className="drawer-foot">
          {company.email}
          <br />
          Snapchat · {company.socials.snapchat.handle}
        </p>
      </div>
    </header>
  )
}
