import { pageMetadata } from '@/lib/seo'
import { FleetShowcase } from '@/components/fleet-showcase'
export const metadata = pageMetadata({
  title: 'Notre flotte de voitures à louer à Paris',
  description:
    'Découvrez les voitures Rent Your Dream à louer à Paris et en Île-de-France : photos, équipements et tarifs. De nouveaux véhicules arrivent prochainement.',
  path: '/vehicules',
})

export default function Vehicles() {
  return (
    <>
      <section className="wrap page-intro">
        <span className="kicker">La flotte Rent Your Dream</span>
        <h1>Votre prochaine envie d’évasion.</h1>
        <p>
          Découvrez nos véhicules, leurs équipements et leurs tarifs. De
          nouvelles arrivées sont prévues prochainement.
        </p>
      </section>
      <section className="wrap section catalog-section">
        <FleetShowcase />
      </section>
    </>
  )
}
