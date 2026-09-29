import english from '@/content/english.json'

export type Locale = 'fr' | 'en'

export function localizePath(path: string, locale: Locale): string {
  if (
    !path.startsWith('/') ||
    path.startsWith('//') ||
    /^\/(?:_next|_vercel|brand|vehicles|images|fonts)(?:\/|$)/.test(path)
  )
    return path
  const bare = path.replace(/^\/en(?=\/|\?|#|$)/, '') || '/'
  return locale === 'en' ? `/en${bare === '/' ? '' : bare}` : bare
}

export function translate<T>(value: T, locale: Locale): T {
  if (locale !== 'en' || typeof value !== 'string') return value
  const key = value.trim().replace(/\s+/g, ' ')
  const text = (english as Record<string, string>)[key]
  if (text) return value.replace(value.trim(), text) as T
  return value
    .replace(/ — accueil$/, ' — home')
    .replace(/^Découvrir la /, 'Discover the ')
    .replace(/^Choisir la /, 'Choose the ')
    .replace(/^Photos et détails de la /, 'Photos and details of the ')
    .replace(/^Futur véhicule /, 'Future vehicle ')
    .replace(/^Voir la photo /, 'View photo ')
    .replace(/^(\d+) sur (\d+)$/, '$1 of $2')
    .replace(/^Livraison à /, 'Delivery to ')
    .replace(/^Retrait en /, 'Pick-up in ')
    .replace(/ km souhaités/, ' km requested')
    .replace(/supplément à préciser/, 'extra mileage to be confirmed')
    .replace(
      /^Renault Mégane 4 noire de Rent Your Dream, vue avant trois-quarts sur fond studio$/,
      'Black Rent Your Dream Renault Mégane 4, front three-quarter view on a studio background',
    )
    .replace(
      /^Renault Mégane 4 noire de Rent Your Dream, vue avant trois-quarts$/,
      'Black Rent Your Dream Renault Mégane 4, front three-quarter view',
    )
    .replace(
      /^Renault Mégane 4 noire de Rent Your Dream, vue arrière trois-quarts$/,
      'Black Rent Your Dream Renault Mégane 4, rear three-quarter view',
    )
    .replace(
      /^Renault Mégane 4 noire de Rent Your Dream, vue avant en contre-plongée$/,
      'Black Rent Your Dream Renault Mégane 4, low-angle front view',
    ) as T
}
