# Référencement et mise en ligne

État de la refonte : 29 septembre 2026. Le travail dans le dépôt prépare le référencement ; il ne constitue ni un déploiement, ni une inscription dans Google, ni une garantie de position.

## Ce que le site fournit

- Contenu en français et anglais disponible dans le HTML, liens internes standards et pages dédiées au véhicule, à la location, aux questions fréquentes et au contact. Les versions anglaises sont sous `/en` ; chaque page possède sa canonique et ses alternates hreflang.
- Titres et descriptions par page, URL canoniques, métadonnées de partage et images locales avec descriptions alternatives.
- `/sitemap.xml` contenant les 24 pages publiques françaises/anglaises, leurs alternates et les photos du catalogue. Aucune date de modification artificiellement actualisée à chaque requête ; Google ignore les indications `priority` et `changefreq`.
- `/robots.txt` autorisant l’exploration des pages publiques, y compris les politiques légales, par les moteurs et agents qui respectent ce protocole.
- Données structurées `Organization` et `WebSite` avec les coordonnées du site et l’identité du Kbis. Le siège de Bagnolet n’est pas présenté comme une agence ouverte au public. Aucun horaire, avis, note ou emplacement de retrait n’est inventé.
- Une seule source pour les tarifs : `lib/vehicles.ts`. Mégane 4 : 60 € / 24 h, 150 € / week-end, 350 € / 7 jours ; diesel, automatique, 200 km/jour, caution 1 000 €.

Les bonnes pratiques HTML et SEO restent pertinentes pour les fonctions IA de Google. Google n’exige ni fichier `llms.txt`, ni balisage spécial IA. Aucun fichier supplémentaire susceptible de dupliquer et désynchroniser les tarifs n’a donc été ajouté. Sources : [SEO Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [fonctions IA](https://developers.google.com/search/docs/appearance/ai-features), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).

## Domaine et configuration

Le domaine déjà présent dans le projet, `https://rentyourdream.fr`, est conservé dans `lib/company.ts`. Le propriétaire a confirmé ce domaine et l’hébergement Vercel. Le DNS et le déploiement restent à vérifier dans ses comptes.

```dotenv
# Domaine de production confirmé, sans chemin ni barre finale.
NEXT_PUBLIC_SITE_URL=https://rentyourdream.fr

# Facultatif : valeur fournie par Google pour la validation HTML d’une
# propriété de préfixe d’URL Search Console, pas une clé privée.
GOOGLE_SITE_VERIFICATION=
```

Ces valeurs sont appliquées au build. Après une modification, reconstruire et redéployer. Utiliser le domaine de production pour les canoniques, le sitemap et les données structurées. Protéger les prévisualisations privées par authentification chez l’hébergeur ; ne pas les soumettre aux moteurs.

## Étapes qui nécessitent les accès du propriétaire

1. Finaliser les informations juridiques encore manquantes et vérifier le rattachement du domaine confirmé à Vercel. Faire pointer le domaine vers le déploiement HTTPS et configurer une redirection permanente des variantes HTTP / `www` vers le domaine retenu, en conservant les chemins.
2. Ajouter la propriété de domaine dans [Google Search Console](https://search.google.com/search-console) et la valider par l’enregistrement DNS fourni par Google. Une propriété de préfixe d’URL peut aussi être validée par la balise HTML prévue ci-dessus. [Procédure Google](https://support.google.com/webmasters/answer/34592?hl=fr).
3. Soumettre `https://rentyourdream.fr/sitemap.xml`, puis inspecter l’accueil et la fiche du véhicule et demander leur indexation. Vérifier le rendu mobile, les canoniques retenues, les erreurs d’exploration et l’indexation des pages. La soumission d’un sitemap ne garantit pas l’indexation.
4. Créer ou revendiquer la fiche Google Business Profile si l’activité est éligible. Utiliser l’identité réelle, le téléphone existant, le domaine confirmé, les vrais horaires et la zone de service. Ne pas présenter le siège administratif comme un lieu d’accueil si les clients n’y sont pas reçus. Ajouter les vraies photos et demander des avis aux clients sans en fabriquer.
5. Contrôler les pages publiques avec le [test des résultats enrichis](https://search.google.com/test/rich-results), le [validateur Schema.org](https://validator.schema.org/) et [PageSpeed Insights](https://pagespeed.web.dev/). Les tests locaux ne mesurent pas la latence et la configuration de l’hébergement final.

Le classement local dépend notamment de la pertinence, de la distance et de la notoriété. Aucun prestataire ne peut garantir la première place pour « location de voiture ». L’objectif réaliste est d’être utile et visible sur les recherches correspondant à la flotte et à la zone réellement desservie. [Explication de Google](https://support.google.com/business/answer/7091?hl=fr).

## Entretien

Mettre à jour les prix et disponibilités dans `lib/vehicles.ts`, l’entreprise dans `lib/company.ts` et les conditions de location dès qu’elles évoluent. Conserver les URL existantes ; si une URL change, créer une redirection permanente vers sa remplaçante. Maintenir les informations du site et de la fiche Google cohérentes. Suivre les requêtes, les clics et les pages indexées dans Search Console ; cette mesure ne nécessite pas d’ajouter un script d’analyse sur le site.
