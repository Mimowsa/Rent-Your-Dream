export type NavItem = { label: string; href: string }

/**
 * Single-page navigation. All hrefs are anchors on the home page so they also
 * work from a vehicle detail page (they route back to `/` then scroll).
 */
export const mainNav: NavItem[] = [
  { label: 'Véhicules', href: '/#vehicules' },
  { label: 'Réserver', href: '/#reserver' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

export const primaryCta: NavItem = { label: 'Réserver', href: '/#reserver' }
