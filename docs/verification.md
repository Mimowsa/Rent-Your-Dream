# Vérifications de la refonte

Contrôles du 29 septembre 2026. Ils portent sur la version locale reconstruite, sauf la consultation du domaine public explicitement distinguée ci-dessous.

## Résultats

- Compilation de production Next.js et TypeScript réussies ; les tests navigateur et axe passent également sur le serveur de production local (`next start`). Les polices sont locales : aucun téléchargement de Google Fonts au build ni dans le navigateur. La configuration Tailwind ancienne, non utilisée par cette interface, a été supprimée.
- Douze routes françaises contrôlées à 320, 390, 768 et 1 440 pixels, puis les 24 routes françaises/anglaises : réponse HTTP 200, un titre h1, une zone main, langue correcte, images avec alternative et absence de débordement horizontal. Les 26 liens internes uniques contrôlés répondent sans erreur.
- Configurateur : champs obligatoires, dates impossibles ou passées, retour après départ, livraison, kilomètres entiers, erreurs associées aux champs, conservation des choix entre les étapes et suppression des options décochées du message.
- Le configurateur propose uniquement WhatsApp ; les liens e-mail restent réservés au contact général, aux démarches administratives et aux droits sur les données personnelles. Les contrôles des liens n’ouvrent aucun service externe et n’envoient aucun message. Aucun appel réseau contenant les saisies, aucun cookie ni stockage local/session du formulaire. Les saisies sont effacées après rechargement.
- Menu mobile contrôlé au clavier (Tab, Maj+Tab, Échap, retour du focus), parcours du formulaire à 320 pixels, cibles principales d’au moins 44 × 44 pixels. FAQ native et galerie sans lecture automatique.
- Contenu et liens disponibles sans JavaScript ; lien WhatsApp direct pour les demandes de location à la place du configurateur.
- Titres/descriptions et canoniques spécifiques, JSON-LD syntaxiquement valide, pages dans le sitemap, exploration autorisée dans robots.txt.
- 26 audits axe des pages françaises et 42 audits supplémentaires des pages anglaises, du mode sombre, des erreurs, options, récapitulatif et préférences de statistiques : aucune violation automatisée des règles WCAG A/AA testées.
- Les routes inexistantes françaises et anglaises répondent avec HTTP 404 et une page personnalisée. Le sélecteur de langue conserve la route, le thème choisi persiste et le retour en haut fonctionne au clavier.
- La flotte précède le configurateur, conformément au dernier ajustement demandé. Le configurateur garde sa première étape ouverte, son panneau de présentation réduit et les détails supplémentaires révélés au fil du parcours. Le hero présente le logo, avec un seul bouton principal rouge à l’arrivée sur mobile.
- Le bandeau de réassurance est placé immédiatement sous le hero, avant la flotte : contact direct, tarifs transparents et livraison en France. Les trois points restent sur une même ligne sur téléphone, avec des libellés abrégés ; les textes complets sont conservés sur ordinateur.
- L’accueil utilise un espacement commun entre ses huit blocs : 48 px sur ordinateur, 32 px jusqu’à 760 px. Les anciennes marges verticales cumulées sont supprimées pour obtenir le même écart entre chaque conteneur. Les panneaux colorés gardent un espacement intérieur commun de 32/24 px.
- Le piège anti-spam et la temporisation des ouvertures WhatsApp sont contrôlés. Aucune demande ni donnée d’identité n’est envoyée pendant ces tests.
- Analytics vérifié sur un serveur local en mode production, avec toutes ses requêtes interceptées : aucun script avant accord ou après refus ; chargement après acceptation et déchargement après retrait. Filtrage des paramètres, fragments, champs supplémentaires, routes privées et événements personnalisés. Aucun envoi de statistiques réel.
- Tests unitaires de la redirection HTTP vers HTTPS en production, du maintien de HTTP local et de l’écrasement du marqueur de langue fourni par le client. Aucun déploiement public effectué.

Les tests utilisent Chrome. Ils ne remplacent pas un audit RGAA exhaustif, des essais manuels avec lecteurs d’écran ni la vérification Safari/iOS sur appareil réel. Ils ne constituent pas une garantie de conformité juridique ou d’indexation.

## Contrastes

Principales paires de couleurs, rapport calculé selon la luminance WCAG :

| Usage                          | Couleurs texte / fond | Rapport |
| ------------------------------ | --------------------- | ------- |
| Texte principal                | `#142333` / `#ffffff` | 15,93:1 |
| Texte secondaire               | `#536170` / `#ffffff` | 6,34:1  |
| Texte secondaire sur panneau   | `#536170` / `#eef2f7` | 5,64:1  |
| Bouton principal rouge         | `#ffffff` / `#c8172e` | 5,80:1  |
| Étape active, dont mode sombre | `#ffffff` / `#194bc5` | 7,36:1  |
| Pied de page                   | `#c6d1dc` / `#102335` | 10,32:1 |
| Légende de photo               | `#e0e8f2` / `#102335` | 12,93:1 |
| Texte indicatif de champ       | `#647180` / `#ffffff` | 4,98:1  |
| Focus                          | `#1470e4` / `#ffffff` | 4,70:1  |

Les légendes sur les photos ont un fond opaque afin de ne pas dépendre de la luminosité de chaque image. Les bordures des champs ont été assombries pour dépasser 3:1. Le contraste du numéro de l’étape active a été corrigé en mode sombre. Aucun sens n’est communiqué uniquement par la couleur.

## Domaine actuellement public

Consultation de `https://rentyourdream.fr/` : réponse 200, chargements observés uniquement depuis `rentyourdream.fr`, aucun cookie, stockage local ou stockage de session observé dans un navigateur neuf. Cette visite unique confirme l’absence de traceur détecté dans ce parcours, sans prétendre couvrir toutes les configurations Vercel ni les services ouverts après un clic externe. Le site public utilise encore l’ancienne version ; aucun déploiement n’a été effectué pendant cette mission.

## Reproduire

```bash
npm run build
npm run start
PLAYWRIGHT_CHANNEL=chrome npm run test:smoke
PLAYWRIGHT_CHANNEL=chrome npm run test:a11y
PLAYWRIGHT_CHANNEL=chrome npm run test:preferences
PLAYWRIGHT_CHANNEL=chrome npm run test:a11y-variants
npm run test:server-safety
PLAYWRIGHT_CHANNEL=chrome node tests/performance.mjs
```

`TEST_BASE_URL` change le serveur cible. Les rapports et captures de test sont dans `artifacts/` (ignoré par Git). Les tests n’envoient aucun message au loueur.

Pour le test Analytics, lancer un serveur local temporaire avec `VERCEL_ENV=production npm run start -- --port 3003`, puis `PLAYWRIGHT_CHANNEL=chrome node tests/analytics-consent.mjs`. Ce test intercepte le script et bloque les autres destinations externes.

## Chargement et images

Mesures Chrome à 390 px, cache navigateur vide, CPU ralenti ×4 et paramètres de réseau mobile simulé (150 ms, 1,6 Mbit/s). Trois essais par page, médiane. Le serveur est local : ces chiffres ne mesurent ni le réseau réel des clients ni l’hébergement Vercel et ne sont pas un score Lighthouse.

| Page         | Premier contenu | Plus grand contenu (LCP) | Décalages (CLS) | Transfert initial |
| ------------ | --------------- | ------------------------ | --------------- | ----------------- |
| Accueil FR   | 716 ms          | 716 ms                   | 0               | 307 ko            |
| Accueil EN   | 724 ms          | 724 ms                   | 0,0042          | 308 ko            |
| Réservation  | 700 ms          | 700 ms                   | 0,0006          | 311 ko            |
| Fiche Mégane | 704 ms          | 1 424 ms                 | 0,0001          | 318 ko            |

Rapport brut : [performance.json](performance.json). Les six photos du véhicule sont réduites de 84,4 % ; les neuf images traitées de 89,4 %. Les images utilisent WebP/AVIF et des dimensions adaptées. Vérifier ensuite le domaine déployé avec PageSpeed Insights et les données réelles disponibles dans Search Console.

Voir [l’audit juridique](legal-audit.md) pour les éléments commerciaux et opérationnels restant à confirmer, et [le guide SEO](seo.md) pour la publication et les comptes Google.

## Ajustements de la flotte

La grille affiche maintenant la Mégane et trois cartes grises non réservables. Elle accueille les prochains véhicules depuis le catalogue sans créer d’offres fictives. Les textes généraux et les métadonnées présentent la flotte ; la Mégane reste le véhicule mis en avant. Ses valeurs sont corrigées à 200 km/jour et 1 000 € de caution.

Contrôle des quatre cartes, de l’absence de lien de réservation sur les emplacements futurs et des colonnes FAQ contenant respectivement 5 et 6 questions. Vérification à 320, 390, 768 et 1 440 pixels. Le bloc des étapes a été réduit et le bloc réseaux sociaux a un fond noir. Compilation, smoke tests et 26 contrôles axe réussis après ces ajustements.

Dernier ajustement : cartes raccourcies à environ 303 px sur mobile et 307 px sur ordinateur, avec tarif journalier et accès à la fiche complète. Réseaux sociaux placés avant la FAQ. Boutons du configurateur sur toute la largeur sous 760 px, hauteur minimale de 48 px ; demandes uniquement via WhatsApp, y compris sans JavaScript. Contrôles visuels du récapitulatif et des cartes à 320, 390, 768 et 1 440 px, puis compilation, tests de parcours et 26 contrôles axe réussis. Aucun message envoyé et aucune ouverture de l’application WhatsApp sur appareil réel pendant ces contrôles.
