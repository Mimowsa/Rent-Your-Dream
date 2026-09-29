# Audit juridique et données — Rent Your Dream

État du travail : 29 septembre 2026. Audit du code local, du Kbis fourni et des informations communiquées par le propriétaire. Ce document ne vaut pas attestation de conformité du service en production ou des pratiques de l’entreprise.

## Éléments établis

- RENT YOUR DREAM, SASU, capital de 1 000 €, SIREN 130 181 647, RCS Bobigny, siège 19 Rue Charles Delescluze, 93170 Bagnolet. Président et directeur de publication : Ryan DJORDJEVIC. Source : extrait Kbis du 18 septembre 2026 fourni par le propriétaire.
- Domaine confirmé : `rentyourdream.fr`. Hébergeur confirmé : Vercel. Pas de médiateur conventionné actuellement, pas de numéro de TVA reçu.
- Mégane 4 : 60 € TTC / 24 h, 150 € TTC / week-end de 48 heures, 350 € TTC / 7 jours ; 200 km/jour inclus ; caution de 1 000 € ; minimum 20 ans et 1 an de permis annoncé, à vérifier avec l’assureur ; assurance de sous-location non vérifiée ; restitution de la caution le jour du retour, après vérifications et éventuelles retenues justifiées. Les délais bancaires ne peuvent être garantis.
- Arrhes confirmées par le propriétaire : 30 % du montant total convenu ; remboursement intégral si le client prévient au moins 7 jours avant le départ prévu ; moins de 7 jours, conservation des arrhes sans exiger automatiquement le solde. Source commune : `lib/rental-policy.ts`. Le délai d’exécution du remboursement et l’échéance du solde restent à préciser.
- Aucun extrait Kbis public, date/lieu de naissance, nationalité ou document personnel n’a été ajouté. L’adresse du siège ne doit pas être présentée comme une agence ouverte au public sans confirmation.

## Pages et parcours livrés

| Route                        | Objet                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `/mentions-legales`          | Identification KBis, Vercel, publication, contact, points manquants explicites                           |
| `/conditions-generales`      | Conditions d’utilisation du site, demandes sans engagement, accès humains et outils automatisés          |
| `/conditions-location`       | Informations commerciales confirmées ; conditions non établies signalées                                 |
| `/politique-confidentialite` | Données, finalités, bases légales, destinataires, critères de conservation, droits et prestataires       |
| `/politique-cookies`         | Préférences nécessaires, mesure Vercel facultative avec accord préalable, refus et retrait               |
| `/annulation-remboursement`  | Arrhes 30 %, annulation avec préavis de 7 jours, exception de rétractation, démarche par e-mail, caution |

Chaque page utilise du HTML textuel rendu côté serveur, une structure de titres et des liens accessibles. Les métadonnées canoniques sont propres à la route.

## Décision sur les consentements et les formulaires

- Le parcours actuel prépare une demande de disponibilité. Il ne comporte ni conclusion de contrat ni paiement en ligne. Une case imposée « j’accepte l’utilisation de mes données » ne rendrait pas le traitement plus légal : la base pertinente pour une demande sollicitée est la mesure précontractuelle, article 6(1)(b) du RGPD. Une information proche de l’action et un lien vers la politique sont nécessaires. [CNIL, base contrat](https://www.cnil.fr/fr/les-bases-legales/contrat).
- Vercel Web Analytics a été ajouté à la demande du propriétaire. L’absence de cookie d’audience n’est pas utilisée comme preuve d’exemption : le SDK et son script restent bloqués avant accord. Accepter/refuser ont la même visibilité, et le retrait est accessible dans le pied de page. Les événements personnalisés sont bloqués ; seules les URL de pages publiques connues sont autorisées, sans paramètres ni fragments. Le choix est conservé 180 jours dans le stockage local. Le thème est une préférence nécessaire enregistrée uniquement après action, et la langue repose sur l’URL. [CNIL, cookies](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi), [Vercel, données mesurées](https://vercel.com/docs/analytics/privacy-policy), [Vercel, beforeSend](https://vercel.com/docs/analytics/package).
- Pour une location de voiture **à date ou période déterminée**, exception légale au droit de rétractation : article L. 221-28, 12°. Pas de formulaire de rétractation ni de case de renonciation nécessaire pour ces locations. Il ne faut pas confondre cette exception avec une règle commerciale « jamais remboursé ». [Texte en vigueur](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563170).
- Une page séparée de remboursement n’est pas à elle seule une formalité rendant le service conforme. Les modalités applicables doivent être accessibles avant l’engagement. La page créée regroupe les informations et un lien e-mail prérempli, sans collecte supplémentaire ni fausse confirmation automatique.
- La somme avancée a été qualifiée expressément d’**arrhes** par le propriétaire. Le remboursement avec un préavis d’au moins 7 jours est une condition commerciale plus favorable au client. En cas de dédit de la société, les arrhes se restituent au double selon [l’article L. 214-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226990) ; ne pas écrire que l’agence peut simplement annuler en remboursant la somme reçue. Les régimes légaux particuliers, dont la force majeure, ne sont pas remplacés par une clause générale de refus de remboursement. [Service Public, arrhes et acompte](https://www.service-public.gouv.fr/particuliers/vosdroits/F31187).
- Si le site permet plus tard de conclure un contrat : revoir le parcours d’acceptation des CGV, la preuve et le support durable, les exigences de commande/paiement et, selon les contrats concernés, les fonctions légales de résiliation/rétractation en ligne. Ce point ne doit pas être activé par l’ajout d’un simple bouton « payer ».

## Correction juridique importante : espèces

L’ancienne mention « Virement ou espèces » a été remplacée par « Virement ». Depuis le 15 juin 2025, le II ter de l’article L. 112-6 interdit les paiements en espèces des opérations afférentes à la location automobile ; le III prévoit certaines exceptions. Ce n’est donc pas simplement une question de plafond général de 1 000 €. Ne pas réintroduire la promesse d’une caution en espèces sans analyse applicable à la situation. [Code monétaire et financier](https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006169848/), [Service Public, mise à jour juin 2026](https://www.service-public.gouv.fr/particuliers/vosdroits/F10999).

## Cartographie des données

| Étape                       | Données                                                                                         | Destination et déclenchement                                                                | Conservation / action                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Consultation                | IP, navigateur, URL, date/heure, données réseau                                                 | Hébergeur Vercel pour livrer et sécuriser les pages                                         | Paramétrage et rétention réels à vérifier dans le compte Vercel                                  |
| Configurateur avant contact | Véhicule, dates/heures, options ; ville seulement si livraison ; prénom/commentaire facultatifs | État React en mémoire, aucun appel API de collecte, aucune base de données                  | Pas de cookie, `localStorage` ou `sessionStorage` applicatif ; perdu à la fermeture/recharge     |
| Clic WhatsApp               | Récapitulatif du configurateur dans `wa.me?...text=`                                            | WhatsApp reçoit le texte du lien dès son ouverture ; pas seulement après l’envoi du message | Le lien peut rester dans l’historique. Ne jamais y placer permis/identité/carte bancaire         |
| Envoi WhatsApp              | Message envoyé + numéro/profil visible                                                          | Société et service WhatsApp                                                                 | Politique interne et purge à fixer, inclure appareils liés et sauvegardes                        |
| E-mail                      | Adresse expéditeur, message volontaire                                                          | Société, Outlook/Microsoft et messagerie expéditeur                                         | Politique de conservation et archivage à documenter                                              |
| Clic social                 | Données techniques et compte auprès de la plateforme                                            | Instagram/Snapchat/TikTok après clic ; aucun widget intégré                                 | Politiques de ces services, pas de contrôle distant depuis ce site                               |
| Contrat après échange       | Identité/permis strictement utiles, facturation, paiement selon le contrat                      | Hors configurateur ; prestataires à identifier réellement                                   | Informer avant collecte ; ne pas conserver automatiquement toute copie d’identité pendant 10 ans |

Vérifications de code : `package.json`, `app/layout.tsx`, `components/configurator.tsx`, `lib/whatsapp.ts`, composants sociaux et recherche des occurrences `cookie`, `localStorage`, `sessionStorage`, `analytics`, `gtag`, `pixel`, `fetch`, `iframe`. Le SDK Vercel Analytics est présent avec activation après consentement et filtrage des données ; aucun pixel publicitaire, session replay, géolocalisation précise, capture de carte bancaire ou formulaire serveur de location n’est ajouté. Les polices sont servies localement dans la version reconstruite.

Ancien composant identifié : `components/BookingForm.tsx` imposait nom et téléphone et utilisait un ancien numéro différent. Il a été supprimé ; le parcours actif utilise le configurateur partagé. Ne pas réutiliser l’ancien contenu.

Les journaux d’hébergement constituent un traitement de données : l’ancienne affirmation « aucune donnée sur nos serveurs » a été retirée. Ni l’absence de cookie ni l’absence de base applicative ne signifie absence de données personnelles.

## Précisions reçues, en attente de confirmation

Le propriétaire a indiqué « franchise de 5 000 € si le véhicule est RSV », sans plafond précis pour les autres dommages. Il faut rapprocher ce montant et ce cas de l’assurance effective avant de les présenter comme une franchise contractuelle. Il a aussi indiqué « 0,25 centimes » par kilomètre supplémentaire : une clarification est en cours entre 0,25 € (25 centimes) et 0,0025 € (0,25 centime). Aucun de ces deux tarifs n’a été publié arbitrairement.

## À résoudre avant publication commerciale

Ces informations ne peuvent pas être déduites du Kbis ni inventées dans les CGV.

1. **Médiateur** : adhérer effectivement à un médiateur compétent référencé CECMC ; publier son nom, adresse et URL sur le site et les documents contractuels. Un simple lien vers une liste de médiateurs ne remplace pas la convention. Le propriétaire a confirmé ne pas en avoir. [Obligations officielles](https://www.economie.gouv.fr/mediation-conso/vous-etes-un-professionnel/vos-principales-obligations-0).
2. **TVA** : confirmer le régime avec le service des impôts/comptable et publier le numéro s’il est applicable. Ne pas calculer un numéro à partir du SIREN ni affirmer une franchise de TVA parce que le numéro n’est pas encore reçu. [Mentions d’une société](https://entreprendre.service-public.gouv.fr/vosdroits/F37351).
3. **Contrat et tarifs complémentaires Mégane** : montant exact des franchises par risque, garanties/exclusions et assistance de l’assurance, tarif TTC/km supplémentaire, prix ou calcul livraison, carburant, nettoyage, retard, échéance du solde et délai d’exécution du remboursement des arrhes, lieu et horaires précis, conducteurs supplémentaires et territoires autorisés. Le propriétaire a confirmé les arrhes 30 % et le remboursement avec préavis de 7 jours. La mention « variable selon véhicule » ne renseigne pas le client sur cette Mégane. Remettre les informations avant accord, et le devis requis en établissement. [DGCCRF, règles location](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/location-de-vehicule-la-reglementation-applicable).
4. **Conservation et sous-traitants** : adopter des durées réelles documentées pour les demandes WhatsApp/e-mail, contrats, justificatifs, logs et sauvegardes ; prévoir purge/archivage. La politique indique les critères disponibles et signale ce point restant. Les pièces comptables se conservent 10 ans après clôture de l’exercice ; ceci ne justifie pas 10 ans de copies de permis ou de conversations. [CNIL conservation](https://www.cnil.fr/fr/passer-laction/les-durees-de-conservation-des-donnees), [durées entreprises](https://www.service-public.gouv.fr/entreprendre/vosdroits/F10029).
5. **Vercel et messageries** : contrôler le contrat de traitement applicable au forfait réellement souscrit, la liste des sous-traitants, les régions, les transferts et garanties (DPA/clause pertinente), les accès autorisés et la sécurité des comptes. Ne pas présenter comme signé un DPA simplement parce qu’il est disponible publiquement.
6. **Production** : HTTPS, redirections du domaine canonique, absence de scripts/cookies ajoutés au tableau de bord Vercel, absence de barre d’outils de prévisualisation publique, cookies/CDN, journaux sans commentaires ou documents personnels. Refaire un relevé réseau et stockage sur le domaine une fois déployé.
7. **Accessibilité légale** : depuis le 28 juin 2025, des obligations concernent notamment les services de commerce électronique, avec une exemption pour certaines microentreprises prestataires de services (seuils d’effectif et de CA/bilan à vérifier, pas simplement le statut SASU). Ne pas publier de déclaration de conformité RGAA complète sans audit approprié. L’amélioration technique n’équivaut pas à une certification. [DGCCRF, accessibilité](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/professionnels-vos-produits-et-services-doivent-etre-conformes-la-directive-accessibilite).

## Sources des prestataires vérifiées

- [Vercel Privacy Notice, juin 2026](https://vercel.com/legal/privacy-notice) : nom et adresse, données de trafic, opérations internationales. La notice distingue Vercel responsable de traitement de Vercel sous-traitant pour ses clients.
- [Vercel DMCA Policy](https://vercel.com/legal/dmca-policy) : téléphone public +1 559 288 7060. La page légale le décrit comme contact juridique publié, pas comme hotline d’assistance générale.
- [Vercel DPA](https://vercel.com/legal/dpa) : documents contractuels à rapprocher du forfait utilisé.
- [WhatsApp EEE, juillet 2026](https://www.whatsapp.com/legal/privacy-policy-eea) : WhatsApp Ireland Limited, données de compte et de connexion, transferts, conservation.
- [Microsoft](https://www.microsoft.com/fr-fr/privacy/privacystatement) : service de messagerie utilisé pour l’adresse Outlook.
- [CNIL transparence](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence) : information avant collecte, catégories de destinataires, durées ou critères, transferts et droits.

## Limites

Les pages sont préparées et les informations connues intégrées. Les mentions explicites de points non finalisés évitent d’inventer un engagement, mais **ne dispensent pas de les finaliser avant publication**. Il reste impossible de garantir « aucune amende » à partir du seul code : les contrats, l’assurance, la facturation, les réglages d’hébergement et les pratiques quotidiennes sont également concernés.

## Ajout des préférences et de Vercel Analytics

Politiques française et anglaise mises à jour. Les saisies du configurateur restent séparées des préférences nécessaires (`ryd-theme`, `ryd-analytics-consent-v1`) et ne sont pas persistées. La société doit documenter la conservation effective des statistiques, les paramètres et les garanties du projet Vercel avant publication. Le tableau de bord Web Analytics doit être activé dans le compte Vercel ; aucune activation de compte ni publication du site n’a été effectuée.

Les protections simples (champ piège et limite des ouvertures répétées) n’envoient aucune saisie à un service CAPTCHA. Elles protègent le parcours contre des automatismes simples ; elles ne garantissent pas l’absence de spam dans une messagerie dont le numéro est public.

## Dernières précisions du propriétaire

- Les véhicules sont pris auprès de professionnels puis sous-loués. Vérifier les contrats fournisseurs et obtenir une confirmation écrite de l’autorisation de sous-location et de la couverture d’assurance des clients finaux, notamment dès 20 ans avec un an de permis. Les garanties, exclusions, franchises et la responsabilité entre parties restent à documenter. Les affirmations d’assurance incluse non vérifiées ont été retirées des pages.
- Le forfait week-end de la Mégane est de 48 heures. Les anciens libellés vendredi-dimanche ont été remplacés, sans présumer de jours de départ imposés.
- Les frais complémentaires sont calculés par le propriétaire : la formule ou le prix convenu doit néanmoins être communiqué avant l’engagement. Dire « je calcule moi-même » ne fournit pas une méthode tarifaire au client.
- Les contrats seront établis avec les clients : leur modèle et les informations précontractuelles restent à finaliser, avant tout versement ou accord engageant.
- Le suivi courant d’une location doit être supprimé au plus tard un an après sa fin. Les archives légales et preuves nécessaires sont distinctes : pièces comptables dix ans après clôture, documents commerciaux notamment cinq ans, contrats consommateurs conclus électroniquement d’au moins 120 € dix ans après la prestation. La société doit organiser la purge réelle des messageries, appareils et sauvegardes ; le site n’efface pas les conversations WhatsApp. Sources : https://entreprendre.service-public.gouv.fr/vosdroits/F10029 et https://www.cnil.fr/fr/passer-laction/les-durees-de-conservation-des-donnees.
- Le tarif « 0,25 centimes/km » reste ambigu : confirmation avec deux exemples chiffrés demandée. Aucune conversion en euros supposée.
- Le propriétaire demandera au comptable de confirmer le régime de TVA.
