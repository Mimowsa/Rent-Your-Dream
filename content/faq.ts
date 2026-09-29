import { company } from '@/lib/company'
import { euros, primaryVehicle } from '@/lib/vehicles'
import { rentalPolicy } from '@/lib/rental-policy'

export type FaqItem = { question: string; answer: string }

const vehicle = primaryVehicle

/** The current fleet's confirmed terms, shared by the visible FAQ and JSON-LD. */
export const faq: FaqItem[] = [
  {
    question: 'À partir de quel âge puis-je louer ?',
    answer: `L’âge minimum et l’ancienneté du permis dépendent du véhicule choisi. Pour la ${vehicle.name}, il faut avoir au moins ${vehicle.minimumAge} ans et le permis depuis ${vehicle.minimumLicenseYears} an. Consultez la fiche du véhicule ; ces conditions sont confirmées dans le contrat.`,
  },
  {
    question: 'Quels documents sont nécessaires ?',
    answer:
      'Une pièce d’identité en cours de validité, un permis de conduire valide et un justificatif de domicile récent sont à prévoir pour établir le contrat. Aucun de ces documents n’est demandé dans le configurateur du site. Nous vous précisons les modalités de vérification lors de la confirmation.',
  },
  {
    question: 'Quels sont les tarifs de location ?',
    answer: `Chaque véhicule possède ses propres tarifs, affichés sur sa fiche. Par exemple, la ${vehicle.name} est à ${euros(vehicle.pricing.day)} TTC pour 24 heures, ${euros(vehicle.pricing.weekend)} TTC pour un week-end de ${vehicle.pricing.weekendHours} heures et ${euros(vehicle.pricing.week)} TTC pour 7 jours. Les horaires, les options éventuelles et le prix total sont confirmés par écrit avant votre engagement.`,
  },
  {
    question: 'L’assurance est-elle incluse ?',
    answer: `La responsabilité civile doit être couverte pour toute location. La couverture applicable à la ${vehicle.name}, les conducteurs autorisés, garanties, exclusions et franchises restent à vérifier avec le fournisseur et son assureur. Ces informations vous seront remises avant votre engagement ; aucune réservation ne sera confirmée avant ces vérifications.`,
  },
  {
    question: 'Quel est le montant de la caution et quand est-elle rendue ?',
    answer: `Le montant dépend du véhicule et reste distinct du prix de location. Pour la ${vehicle.name}, la caution est de ${euros(vehicle.deposit)}, par ${vehicle.depositMeans.toLocaleLowerCase('fr-FR')}. Elle est restituée le jour du retour, après l’état des lieux et sous réserve des sommes dues et justifiées. Les délais bancaires peuvent s’ajouter.`,
  },
  {
    question: 'Combien de kilomètres sont inclus ?',
    answer: `Le kilométrage inclus est indiqué sur la fiche de chaque véhicule : ${vehicle.includedKmPerDay} km par jour pour la ${vehicle.name}. Prévoyez-vous de rouler davantage ? Signalez-le dans votre demande. Le tarif des kilomètres supplémentaires dépend du véhicule et vous est communiqué avant votre engagement.`,
  },
  {
    question: 'Comment effectuer une demande de location ?',
    answer:
      'Choisissez le véhicule, la durée et vos dates dans le configurateur. Il prépare votre récapitulatif, à envoyer sur WhatsApp. La demande est sans engagement : la disponibilité, les horaires et le prix total sont confirmés ensuite par écrit. Aucun paiement n’est effectué sur le site.',
  },
  {
    question: 'Quels moyens de paiement sont acceptés ?',
    answer: `Les modalités de paiement sont précisées dans le devis avant votre engagement. La fiche de chaque véhicule indique celles de la caution : pour la ${vehicle.name}, le moyen prévu est le ${vehicle.depositMeans.toLocaleLowerCase('fr-FR')}. Les espèces ne sont possibles que lorsqu’une exception légale s’applique et est vérifiée. Aucun paiement n’est encaissé sur le site.`,
  },
  {
    question: 'Puis-je louer pour un week-end ?',
    answer: `Oui, selon les forfaits et les disponibilités du véhicule choisi. Par exemple, le forfait week-end de la ${vehicle.name} est de ${euros(vehicle.pricing.weekend)} TTC pour ${vehicle.pricing.weekendHours} heures. Indiquez vos horaires souhaités dans la demande pour les faire confirmer.`,
  },
  {
    question: 'Où récupérer le véhicule ? La livraison est-elle possible ?',
    answer: `La remise se fait en ${company.area}, à un lieu convenu lors de la confirmation. Une livraison ailleurs en France est possible sur demande, selon disponibilité et devis. Le siège administratif à Bagnolet n’est pas un point de retrait annoncé.`,
  },
  {
    question: 'Puis-je annuler ma demande ou ma location ?',
    answer: `Une simple demande de disponibilité ne vous engage pas. Pour une réservation, des arrhes de ${rentalPolicy.arrhesPercent} % sont demandées. Elles sont remboursées si vous prévenez au moins ${rentalPolicy.cancellationNoticeDays} jours avant le départ convenu ; en dessous de ce délai, elles sont conservées. Consultez la page Annulation et remboursement pour les conditions et vos droits.`,
  },
]
