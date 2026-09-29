import HomeContent from '@/components/home-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Location de voiture à Paris et en Île-de-France',
  description:
    'Découvrez la flotte Rent Your Dream pour vos locations de voiture à Paris et en Île-de-France. Tarifs par véhicule, demande directe et livraison sur devis.',
  path: '/',
})

export default function HomePage() {
  return <HomeContent />
}
