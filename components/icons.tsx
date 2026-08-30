import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
} as const

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

/* --- Brand icons. Colour is applied by the caller (currentColor). --- */

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 1.8c2.18 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.77c0 4.52-3.68 8.19-8.2 8.19a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.09.81.82-3.01-.19-.31a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.19 8.19-8.19Zm-4.7 4.9c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.7 2.6 4.13 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46Z" />
    </svg>
  )
}

export function Snapchat(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M12.03 2.5c1.9 0 3.86 1.06 4.7 3.06.3.72.26 1.9.23 2.86l-.01.22c-.02.28-.03.55-.03.76 0 .15.05.24.2.3.28.13.66.11 1-.06.16-.07.35-.11.53-.11.26 0 .53.09.7.32.24.34.13.79-.35 1.06-.24.13-.53.23-.83.33-.4.13-.85.28-1 .63-.08.19-.05.42.03.66l.02.05c.02.05.9 2.3 3.1 2.66.2.03.34.2.33.4 0 .08-.02.16-.05.23-.27.62-1.42.86-2.28 1.02-.14.03-.19.24-.26.55-.03.13-.06.27-.11.42-.05.16-.19.24-.4.24h-.05c-.16 0-.38-.03-.66-.09a4.7 4.7 0 0 0-1-.11c-.28 0-.57.02-.88.08-.6.1-1.1.46-1.7.87-.75.53-1.6 1.12-2.86 1.12s-2.09-.59-2.83-1.11c-.6-.42-1.11-.78-1.72-.88a5.3 5.3 0 0 0-.88-.08c-.42 0-.76.06-1 .11-.26.05-.47.09-.63.09-.28 0-.42-.16-.47-.31-.05-.15-.08-.29-.11-.42-.07-.31-.12-.51-.26-.54-.86-.16-2.01-.4-2.28-1.03a.55.55 0 0 1-.05-.22c0-.2.13-.37.33-.4 2.2-.36 3.08-2.61 3.1-2.66l.02-.05c.08-.24.11-.47.03-.66-.15-.35-.6-.5-1-.63-.3-.1-.59-.2-.83-.33-.62-.34-.5-.83-.32-1.08.16-.22.42-.35.71-.35.16 0 .34.04.5.11.32.15.68.19.96.08.17-.06.24-.16.23-.36 0-.2-.02-.44-.03-.7-.05-.98-.1-2.2.22-2.94C8.14 3.56 10.11 2.5 12.03 2.5Z" />
    </svg>
  )
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable={false} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function TikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M16.5 3c.3 2.06 1.46 3.5 3.5 3.86v2.64c-1.3.13-2.44-.24-3.66-.94v6.02c0 3.9-2.9 6.42-6.3 5.8-3.02-.55-4.68-3.72-3.62-6.6.86-2.32 3.1-3.5 5.62-3.03v2.9c-.36-.1-.72-.2-1.08-.2-1.32-.03-2.3.98-2.28 2.26.02 1.24 1.03 2.2 2.3 2.18 1.26-.02 2.14-.94 2.14-2.28V3h2.86Z" />
    </svg>
  )
}
