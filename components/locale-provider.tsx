'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { translate, type Locale } from '@/lib/i18n'

const LocaleContext = createContext<Locale>('fr')

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export function useI18n() {
  const locale = useContext(LocaleContext)
  return { locale, t: <T,>(value: T): T => translate(value, locale) }
}
