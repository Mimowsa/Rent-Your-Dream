import { pageMetadata } from '@/lib/seo'
import { ConfiguratorBand } from '@/components/configurator'
import { getVehicle } from '@/lib/vehicles'
export const metadata = pageMetadata({
  title: 'Demander une location de voiture',
  description:
    'Choisissez vos dates et vos options pour une location en Île-de-France. Demande sans engagement par WhatsApp, sans paiement en ligne.',
  path: '/reservation',
})

export default async function Reservation({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string; v?: string }>
}) {
  const q = await searchParams
  const vehicle = getVehicle(q.vehicle || q.v || '')
  return (
    <div className="reservation-page">
      <section className="wrap page-intro">
        <span className="kicker">Votre prochaine escapade</span>
        <h1>Préparons votre départ.</h1>
        <p>
          Vos dates, vos envies, un échange direct. Préparez votre
          récapitulatif, puis contactez-nous sur WhatsApp pour vérifier la
          disponibilité.
        </p>
      </section>
      <div className="wrap">
        <ConfiguratorBand initialSlug={vehicle?.slug} />
      </div>
    </div>
  )
}
