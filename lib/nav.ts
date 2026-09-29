export type NavItem = { label: string; href: string }
export const mainNav: NavItem[] = [
  { label: 'Notre flotte', href: '/vehicules' },
  { label: 'Comment ça marche', href: '/#comment-ca-marche' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]
export const primaryCta: NavItem = {
  label: 'Choisir mes dates',
  href: '/reservation',
}
