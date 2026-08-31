# Rent Your Dream

Site vitrine — location automobile. **Une seule page** (`/`) qui contient tout :
hero + configurateur, véhicules, bandeau réseaux, FAQ. La navigation du menu fait
défiler vers les ancres (`#reserver`, `#vehicules`, `#faq`, `#contact`) —
`#contact` pointe sur le pied de page.

Le configurateur, la grille véhicules, le bandeau réseaux, la FAQ et le pied de
page partagent une même largeur (`--container-wide` dans `app/globals.css`,
classe `.wrap--wide`), plus large que le reste de la page (`--container`).

Le **pied de page** (`components/site-footer.tsx`, `id="contact"`) porte le CTA
final (« Prêt à prendre la route ? » → `#reserver` + e-mail), puis quatre
colonnes : marque, Explorer, Contact (e-mail, Snapchat, téléphone, zone), Légal.
Toutes les coordonnées viennent de `lib/company.ts`.

La **seule autre page** est la fiche d'un véhicule : `/vehicules/<slug>`.
Elle affiche toutes les photos du véhicule dans un carrousel
(`components/vehicle-carousel.tsx` — scroll-snap natif, boutons, points,
compteur) et un panneau tarifs / conditions. Son bouton « Réserver ce véhicule »
renvoie vers `/?v=<slug>#reserver`, ce qui pré-sélectionne le véhicule dans le
configurateur de l'accueil.

Pages légales (`/mentions-legales`, `/politique-confidentialite`,
`/conditions-location`) : liées uniquement depuis le pied de page.

## Direction artistique

Claire. Blanc dominant. Palette du logo, système tricolore (tokens `:root` dans
`app/globals.css`, nommés par rôle) :

- **rouge `#D32F2F`** = `--primary` = **action** : boutons/CTA, liens, prix,
  flèche des cartes, dégradé & vague du hero, lueur du footer.
- **bleu `#0D47A1`** = `--accent` = **accent** : le mot « éveillé. » du hero,
  tous les eyebrows / kickers, les icônes +/− de la FAQ, les traits au-dessus
  des titres, les intitulés de colonnes + le slogan du footer, le survol des
  liens de texte, le filet des encadrés légaux. `--accent-soft #6f9cd6` sur
  fond sombre.
- **gris `#757575`** = texte secondaire (`--gray` ajusté à `#6a6a6a` pour l'AA).
- anthracite pour les titres et le corps de texte.

Typo **Manrope**.
Header clair : fond blanc, fine bordure basse au scroll ; **marque RYD seule sur
mobile, lockup complet dès 48em**. Menu mobile (drawer) clair. Hero sans photo :
dégradé blanc → rose très pâle + vague SVG.

Logos (`public/brand/`, PNG transparents) : `ryd-lockup.png` (lockup détouré —
header desktop + footer, sur pastille blanche), `ryd-mark.png` (monogramme RYD
seul — header mobile + drawer + favicon), `ryd-lockup-full.png` (lockup avec
marges), `ryd-stacked.png` (version verticale). Sources dans `assets/originals/`.

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Coordonnées, réseaux, mentions, crédit MimoServices | `lib/company.ts` |
| **Numéro WhatsApp** (dès qu'il est connu) | `lib/company.ts` → `whatsappNumber` (format international sans `+`, ex. `"33612345678"`). Le site bascule seul de l'e-mail vers WhatsApp. |
| Véhicules : specs, tarifs, caution, photos | `lib/vehicles.ts` |
| Questions / réponses FAQ | `content/faq.ts` |
| Libellés de navigation | `lib/nav.ts` |
| Message de réservation | `lib/whatsapp.ts` |
| Couleurs, typo, espacements | `app/globals.css` (`:root`) |

## Ajouter un véhicule

Un objet dans `vehicles` (`lib/vehicles.ts`) avec un `slug` unique + les photos
dans `public/vehicles/<slug>/`. La carte sur l'accueil, la fiche
`/vehicules/<slug>`, le sélecteur du configurateur et le sitemap se génèrent
automatiquement. La section « Nos véhicules » de l'accueil affiche 4 cartes sur
une grille élargie ; les emplacements non pourvus deviennent des cartes
« Prochainement ».

## Assets

Photos réelles et logos dans `public/`. Sources originales dans
`assets/originals/`. `next/image` génère WebP/AVIF et les tailles responsives.

Réalisation : MimoServices.
