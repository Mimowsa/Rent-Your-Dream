import { company } from '@/lib/company'
import { rentalPolicy } from '@/lib/rental-policy'

export type FaqItem = { question: string; answer: string }

/** The current fleet's confirmed terms, shared by the visible FAQ and JSON-LD. */
export const faq: FaqItem[] = [
  {
    question: 'À partir de quel âge puis-je louer ?',
    answer:
      'L’âge minimum et l’ancienneté du permis dépendent du véhicule choisi. Consultez sa fiche pour connaître les conditions de location.',
  },
  {
    question: 'Quels documents sont nécessaires ?',
    answer:
      'Une pièce d’identité en cours de validité, un permis de conduire valide et un justificatif de domicile récent sont à prévoir pour établir le contrat. Aucun de ces documents n’est demandé dans le configurateur du site. Nous vous précisons les modalités de vérification lors de la confirmation.',
  },
  {
    question: 'Quel est le montant de la caution et quand est-elle rendue ?',
    answer:
      'Le montant de la caution dépend du véhicule et est indiqué sur sa fiche. Elle peut être réglée en espèces, par virement ou par empreinte bancaire. Elle est restituée directement lors du retour du véhicule.',
  },
  {
    question: 'Combien de kilomètres sont inclus ?',
    answer:
      'Le kilométrage inclus est différent pour chaque véhicule. Consultez les fiches des véhicules pour connaître le forfait inclus. Si vous prévoyez de rouler davantage, signalez-le dans votre demande : le tarif des kilomètres supplémentaires vous sera précisé.',
  },
  {
    question: 'Comment effectuer une demande de location ?',
    answer:
      'Choisissez le véhicule, la durée et vos dates dans le configurateur. Il prépare votre récapitulatif, à envoyer sur WhatsApp. La demande est sans engagement : la disponibilité, les horaires et le prix total sont confirmés ensuite par écrit. Aucun paiement n’est effectué sur le site.',
  },
  {
    question: 'Quels moyens de paiement sont acceptés ?',
    answer:
      'Les modalités de paiement de la location sont précisées dans votre devis. La caution peut être réglée en espèces, par virement ou par empreinte bancaire. Aucun paiement n’est effectué sur le site.',
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
