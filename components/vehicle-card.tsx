import Image from 'next/image'
import Link from 'next/link'
import { euros, type Vehicle } from '@/lib/vehicles'
import { ArrowRight } from '@/components/icons'

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/vehicules/${vehicle.slug}`} className="veh">
      <span className="veh__img">
        <Image
          src={vehicle.photos[0].src}
          alt={vehicle.photos[0].alt}
          fill
          sizes="(max-width: 40em) 100vw, (max-width: 64em) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </span>
      <span className="veh__body">
        <span className="veh__cat">{vehicle.category}</span>
        <span className="veh__name">{vehicle.name}</span>
        <span className="chips">
          {vehicle.features.slice(0, 3).map((f) => (
            <span key={f}>{f}</span>
          ))}
        </span>
        <span className="veh__foot">
          <span className="veh__price">
            <b>dès {euros(vehicle.pricing.day)}</b> <span>/ 24h</span>
          </span>
          <ArrowRight width={18} height={18} />
        </span>
      </span>
    </Link>
  )
}

export function VehicleCardSoon() {
  return (
    <div className="veh veh--soon">
      <span className="veh--soon__plus" aria-hidden="true">
        +
      </span>
      <span className="veh__cat">Prochainement</span>
      <b>Nouveau véhicule bientôt disponible.</b>
    </div>
  )
}
