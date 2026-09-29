# Rent Your Dream

Site de location automobile à Paris et en Île-de-France. Next.js 16, React 19, TypeScript et CSS adaptatif. Refonte du 29 septembre 2026.

## Interface et demande de location

L’accueil présente une grille de quatre cartes : les véhicules du catalogue et des emplacements gris pour les prochaines arrivées. La Mégane dispose de sa fiche avec photos et tarifs ; un configurateur dont les dates sont visibles dès l’accueil prépare la demande. La page `/reservation` donne accès au même parcours en trois étapes : dates, options, récapitulatif. Le formulaire prépare uniquement un lien WhatsApp ; aucun message n’est envoyé automatiquement et aucun paiement n’est encaissé par le site. Sans JavaScript, un lien WhatsApp permet de demander directement une location. L’e-mail reste disponible pour les questions générales, les démarches administratives et l’exercice des droits sur les données personnelles.

Le formulaire ne demande ni téléphone, ni nom complet, ni document d’identité ou donnée bancaire. Les choix restent en mémoire dans la page, sans cookie, stockage local ou base de données. L’ouverture du lien WhatsApp transmet le texte préparé à ce service ; cette information est affichée avant le clic. Les données techniques traitées par Vercel et les messageries sont distinguées dans la politique de confidentialité.

Les photographies, logos et la police Manrope sont servis localement. La licence de la police figure dans `public/fonts/OFL-Manrope.txt`. Les anciens composants non utilisés et leur catalogue contradictoire ont été supprimés.

## Démarrer et vérifier

```bash
npm install
npm run dev
npm run build
npm run start
```

Les tests nécessitent un serveur lancé. Ils n’envoient aucune demande au loueur et n’ouvrent aucun lien WhatsApp.

```bash
npx playwright install chromium
npm run test:smoke
npm run test:a11y
```

Pour Chrome installé : `PLAYWRIGHT_CHANNEL=chrome npm run test:smoke` et `PLAYWRIGHT_CHANNEL=chrome npm run test:a11y`. `TEST_BASE_URL` permet de changer l’URL cible (défaut : `http://localhost:3000`). Les captures et rapports sont stockés dans `artifacts/`, ignoré par Git.

Les smoke tests couvrent douze pages à quatre largeurs, la validation du formulaire, le contenu des messages, l’absence de fuite des saisies et de persistance, le clavier, les alternatives sans JavaScript, les images et les éléments SEO. L’audit axe couvre les pages en mobile et sur ordinateur ainsi que le menu et le configurateur visible. Ces tests ne constituent pas une certification RGAA.

## Sources des informations

| Besoin                                                      | Fichier                |
| ----------------------------------------------------------- | ---------------------- |
| Société, Kbis, domaine, contact, réseaux                    | `lib/company.ts`       |
| Véhicules, tarifs, équipements, photos, critères conducteur | `lib/vehicles.ts`      |
| Arrhes et délai d’annulation                                | `lib/rental-policy.ts` |
| Messages de demande                                         | `lib/whatsapp.ts`      |
| Titres, descriptions et données structurées                 | `lib/seo.ts`           |
| FAQ partagée avec son balisage structuré                    | `content/faq.ts`       |
| Couleurs et mise en page                                    | `app/globals.css`      |

Mégane 4 : 60 € TTC / 24 h, 150 € / week-end de 48 heures, 350 € / 7 jours, 200 km/jour inclus, caution de 1 000 € par virement, assurance de sous-location à vérifier, conducteur de 20 ans minimum et permis depuis un an. La caution et la franchise sont deux notions distinctes. Les montants de franchise et du kilomètre supplémentaire doivent être confirmés sans ambiguïté avant publication.

Pour ajouter un véhicule, ajouter son objet dans `lib/vehicles.ts` et ses photos avec descriptions alternatives. Renseigner ses propres tarifs, caution, conditions, équipements et disponibilités. Les fiches, le catalogue, le sitemap et le sélecteur sont générés depuis cette source.

## Pages et mise en ligne

Pages commerciales : `/`, `/vehicules`, `/vehicules/megane-4`, `/reservation`, `/faq`, `/contact`.

Pages légales : `/mentions-legales`, `/politique-confidentialite`, `/politique-cookies`, `/conditions-generales`, `/conditions-location`, `/annulation-remboursement`.

Le domaine confirmé est `https://rentyourdream.fr`, avec Vercel pour hébergeur. Le dépôt ne configure pas les comptes Vercel, DNS, Google Search Console ni Business Profile. La refonte locale n’est pas un déploiement.

- [Audit juridique, données et informations restant à compléter](docs/legal-audit.md)
- [Référencement et étapes Google](docs/seo.md)
- [Vérifications de la refonte](docs/verification.md)

Avant publication, finaliser les points juridiques indiqués dans l’audit, en particulier l’adhésion à un médiateur, la situation TVA, les franchises et frais, les modalités de remboursement et la conservation réelle des données chez les prestataires. Le site ne revendique pas une conformité intégrale tant que ces informations ne sont pas réglées. Aucun classement Google n’est garanti.

Réalisation : MimoServices.

## Langues, thème et statistiques

La version française conserve les URL actuelles. Les versions anglaises sont accessibles sous `/en`, avec HTML anglais rendu sur le serveur, canoniques et liens hreflang. Le bouton FR/EN conserve la page et ses paramètres d’URL ; les saisies non présentes dans l’URL ne sont pas persistées lors d’un changement de langue. Les traductions partagées sont dans `content/english.json`, les FAQ dans `content/faq-en.ts` et les pages légales anglaises dans `content/legal-en.ts`.

Le mode sombre suit d’abord le système ; une préférence choisie avec le bouton est conservée dans `ryd-theme`. Les détails de location restent en mémoire. Le chargement des routes utilise `app/loading.tsx`, sans attente artificielle, et un retour en haut apparaît après défilement.

Vercel Web Analytics est intégré avec le SDK officiel. Il reste bloqué avant accord. Accepter et refuser ont la même visibilité ; le pied de page permet de retirer l’accord. Le choix est conservé pendant 180 jours, puis redemandé. Les vues de pages publiques connues sont seules autorisées : pas d’événement personnalisé, pas de paramètres, fragments ou informations du configurateur. Le code ne charge pas le script en développement local ni en preview Vercel.

**Activation de production :** dans le projet Vercel, ouvrir Analytics / Web Analytics et cliquer sur Enable, puis déployer cette version. Le code s’active sur `VERCEL_ENV=production`. Cette intégration n’active pas elle-même le tableau de bord et n’a pas déployé le site. Source : https://vercel.com/docs/analytics/quickstart. Pour un laboratoire local, démarrer un serveur séparé avec `VERCEL_ENV=production` et intercepter les requêtes Analytics ; aucun test ne transmet de données réelles à Vercel.

HTTPS est imposé sur le domaine de production à partir du protocole transmis par Vercel ; HSTS est envoyé. Le serveur local reste accessible en HTTP. Les protections du formulaire sont un champ piège non accessible au clavier et une temporisation de 15 secondes entre ouvertures répétées. Elles ne constituent pas un filtre anti-spam côté WhatsApp ni une limite de débit serveur ; aucun endpoint de réservation ou envoi serveur n’est créé.

Les photographies sont désormais en WebP, avec métadonnées supprimées et dimensions limitées à 1600 × 1200. Le rapport `docs/image-compression.json` contient les poids avant/après. Les six photos du véhicule passent de 6,82 Mo à 1,06 Mo (−84,4 %). Les originaux utilisés dans cette session ont été conservés dans `/private/tmp/ryd-original-media` et les sources historiques sont également dans `assets/originals`.

Contrôles supplémentaires :

```bash
PLAYWRIGHT_CHANNEL=chrome npm run test:preferences
PLAYWRIGHT_CHANNEL=chrome npm run test:a11y-variants
npm run test:server-safety
```
