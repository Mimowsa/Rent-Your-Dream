'use client'

import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { localizePath } from '@/lib/i18n'
import { useI18n } from '@/components/locale-provider'

export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof NextLink>) {
  const { locale } = useI18n()
  return (
    <NextLink
      {...props}
      href={
        typeof href === 'string'
          ? localizePath(href, locale)
          : {
              ...href,
              pathname: href.pathname
                ? localizePath(href.pathname, locale)
                : href.pathname,
            }
      }
    />
  )
}
