'use client'

import { useI18n } from '@/components/locale-provider'
import Link from '@/components/localized-link'
import { ArrowRight } from '@/components/icons'

export function NoVehiclesAvailable() {
  const { t } = useI18n()

  return (
    <div className="notice">
      <h3>{t('Aucun véhicule disponible pour le moment.')}</h3>
      <p>{t('Notre flotte sera mise à jour dès que de nouveaux véhicules seront disponibles.')}</p>
      <Link href="/contact" className="tlink">
        {t('Nous contacter ')}<ArrowRight />
      </Link>
    </div>
  )
}
