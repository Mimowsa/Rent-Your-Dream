import Link from 'next/link'
import { ArrowRight } from '@/components/icons'

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingBlock: '18svh 20svh' }}>
      <span className="kicker">Erreur 404</span>
      <h1 style={{ fontSize: 'clamp(2.4rem, 9vw, 4rem)', marginTop: 20 }}>
        Cette page a pris la route.
      </h1>
      <p className="dim" style={{ marginTop: 14 }}>
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <p style={{ marginTop: 26 }}>
        <Link href="/" className="tlink">
          Revenir à l’accueil
          <ArrowRight />
        </Link>
      </p>
    </section>
  )
}
