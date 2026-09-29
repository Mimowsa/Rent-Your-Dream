'use client'

import { useI18n } from '@/components/locale-provider'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from '@/components/localized-link'
import { usePathname } from 'next/navigation'
import { mainNav, primaryCta } from '@/lib/nav'
import { company } from '@/lib/company'
import { Menu, Close } from '@/components/icons'
import { SiteControls } from '@/components/site-controls'

export function SiteHeader() {
  const { t, locale } = useI18n()

  const pathname = usePathname()
  const currentPath = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
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
        <Link
          href="/"
          className="brand"
          aria-label={t(`${company.name} — accueil`)}
        >
          <Image
            className="brand-mark"
            src="/brand/ryd-mark.png"
            alt={t(company.name)}
            width={1099}
            height={352}
          />
          <span className="brand-name">
            {t('Rent Your Dream')}
            <small>{t('Location automobile')}</small>
          </span>
        </Link>

        <nav className="nav" aria-label={t('Navigation')}>
          {mainNav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              aria-current={currentPath === i.href ? 'page' : undefined}
            >
              {t(i.label)}
            </Link>
          ))}
          <Link href={primaryCta.href} className="btn btn--primary btn--sm">
            {t(primaryCta.label)}
          </Link>
        </nav>

        <SiteControls />
        <button
          type="button"
          className="burger"
          ref={burgerRef}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">{t('Ouvrir le menu')}</span>
          <Menu />
        </button>
      </div>

      <div
        id="drawer"
        className="drawer"
        ref={drawerRef}
        data-open={open ? 'true' : undefined}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={t('Menu de navigation')}
        inert={!open}
        aria-hidden={open ? undefined : true}
      >
        <div className="drawer-top">
          <Link
            href="/"
            className="brand"
            aria-label={t(`${company.name} — accueil`)}
            onClick={close}
          >
            <Image
              src="/brand/ryd-mark.png"
              alt={t(company.name)}
              width={1099}
              height={352}
              style={{ height: 26, width: 'auto' }}
            />
          </Link>
          <button type="button" className="burger" onClick={close}>
            <span className="sr-only">{t('Fermer')}</span>
            <Close />
          </button>
        </div>
        <nav aria-label={t('Navigation mobile')}>
          {mainNav.map((i) => (
            <Link key={i.href} href={i.href} onClick={close}>
              {t(i.label)}
            </Link>
          ))}
        </nav>
        <Link
          href={primaryCta.href}
          className="btn btn--primary btn--block"
          onClick={close}
        >
          {t(primaryCta.label)}
        </Link>
        <p className="drawer-foot">
          {t(company.phone ? `WhatsApp · ${company.phone}` : company.email)}
          <br />
          {t('Snapchat · ')}
          {t(company.socials.snapchat.handle)}
          {company.socials.instagram.handle && (
            <>
              <br />
              Instagram · {company.socials.instagram.handle}
            </>
          )}
          {company.socials.tiktok.handle && (
            <>
              <br />
              TikTok · {company.socials.tiktok.handle}
            </>
          )}
        </p>
      </div>
    </header>
  )
}
