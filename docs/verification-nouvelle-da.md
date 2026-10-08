# Vérification de nouvelle-da avant intégration sur main

Version de production compilée dans un worktree isolé, avec installation des dépendances depuis package-lock.json. Les maquettes et fichiers locaux non liés au site ont été exclus.

- `npm run build` : compilation, TypeScript et génération des routes réussis.
- `npm run test:server-safety` : protection des redirections, langues et données analytics validée.
- `npm run test:smoke` : configurateur, erreurs de validation, demande WhatsApp, navigation au clavier, menu mobile, FAQ, galerie, SEO et rendu sans JavaScript validés. Douze routes testées à 1440, 768, 390 et 320 px ; aucun débordement horizontal ni erreur JavaScript.
- `node tests/home-configurator.mjs` : dates, livraison, kilométrage supplémentaire et message WhatsApp du configurateur compact validés.
- `npm run test:preferences` : thème clair même avec préférence sombre, langues, formulaire anglais, consentement et liens internes validés.
- `npm run test:a11y` et `npm run test:a11y-variants` : 67 audits automatiques sans violation détectée. Ces contrôles ne constituent pas une certification d’accessibilité.

Les photos du véhicule sont des copies WebP produites à partir de Src/megane-4, avec conversion préalable des deux fichiers HEIC. Le dossier source original est conservé localement. Le visuel des véhicules à venir est détouré avec transparence et enregistré dans public/vehicles/coming-soon-covered-cutout.webp.
