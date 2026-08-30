'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
  const burgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    burgerRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on route change (belt & braces — links also close on click)
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const drawer = drawerRef.current
    drawer?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !drawer) return
      const items = drawer.querySelectorAll<HTMLElement>('a[href], button')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

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
          ref={burgerRef}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Menu />
        </button>
      </div>

      <div
        id="drawer"
        className="drawer"
        ref={drawerRef}
        data-open={open ? 'true' : undefined}
        aria-hidden={open ? undefined : true}
      >
        <div className="drawer-top">
          <Link
            href="/"
            className="brand"
            aria-label={`${company.name} — accueil`}
            onClick={close}
          >
            <Image
              src="/brand/logo-horizontal-tight.png"
              alt={company.name}
              width={2040}
              height={224}
              style={{ height: 22, width: 'auto' }}
            />
          </Link>
          <button type="button" className="burger" onClick={close}>
            <span className="sr-only">Fermer</span>
            <Close />
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          {mainNav.map((i) => (
            <Link key={i.href} href={i.href} onClick={close}>
              {i.label}
            </Link>
          ))}
        </nav>
        <Link href={primaryCta.href} className="btn btn--primary btn--block" onClick={close}>
          {primaryCta.label}
        </Link>
        <p className="drawer-foot">
          {company.email}
          <br />
          Snapchat · {company.socials.snapchat.handle}
          {company.socials.instagram.handle ? (
            <>
              <br />
              Instagram · {company.socials.instagram.handle}
            </>
          ) : null}
          {company.socials.tiktok.handle ? (
            <>
              <br />
              TikTok · {company.socials.tiktok.handle}
            </>
          ) : null}
        </p>
      </div>
    </header>
  )
}
