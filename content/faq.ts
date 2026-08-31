import { company } from '@/lib/company'

/**
 * FAQ content. Answers stay generic across the fleet: tarifs, caution et
 * kilométrage varient d'un véhicule à l'autre et sont indiqués sur chaque fiche.
 * Les passages « à préciser » signalent ce qui n'est pas encore contractuellement
 * fixé — à compléter sans toucher au reste.
 */

export type FaqItem = { question: string; answer: string }

export const faq: FaqItem[] = [
  {
    question: 'Quels documents sont nécessaires pour louer un véhicule ?',
    answer:
      'Une pièce d’identité en cours de validité, un permis de conduire et un justificatif de domicile récent. L’âge minimum et l’ancienneté de permis exigés seront confirmés lors de votre demande — écrivez-nous pour vérifier votre situation.',
  },
  {
    question: 'Quel est le montant de la caution ?',
    answer:
      'La caution dépend du véhicule : elle est indiquée sur chaque fiche. Elle peut être réglée par virement ou en espèces et vous est restituée après restitution du véhicule en bon état.',
  },
  {
    question: 'Combien de kilomètres sont inclus ?',
    answer:
      'Chaque véhicule inclut un forfait kilométrique journalier, précisé sur sa fiche (par exemple 250 km / jour). Les kilomètres supplémentaires éventuels sont décomptés selon un barème communiqué avant le départ.',
  },
  {
    question: 'Et si j’ai besoin de plus de kilomètres ?',
    answer:
      'C’est possible : indiquez le nombre de kilomètres supplémentaires souhaités dans le configurateur (« Km supplémentaires ? »). Nous vous communiquons le tarif correspondant lors de la confirmation de votre demande.',
  },
  {
    question: 'Comment effectuer une réservation ?',
    answer:
      'Choisissez le véhicule et vos dates dans le configurateur : il prépare un message récapitulatif. Vous l’envoyez sur WhatsApp en un clic (ou par e-mail si vous préférez) et nous vous confirmons la disponibilité directement.',
  },
  {
    question: 'Quels moyens de paiement sont acceptés ?',
    answer:
      'Les moyens de paiement acceptés pour la location et pour la caution sont confirmés lors de l’échange de réservation. La caution est aujourd’hui prise par virement ou en espèces.',
  },
  {
    question: 'Puis-je réserver pour un week-end ?',
    answer:
      'Oui. Un forfait week-end (du vendredi au dimanche) est proposé ; son tarif varie selon le véhicule et figure sur sa fiche. Indiquez vos horaires souhaités dans votre demande.',
  },
  {
    question: 'Proposez-vous la livraison du véhicule ?',
    answer: `La remise se fait en ${company.area}. Une livraison ailleurs en France est envisageable selon les cas : indiquez-le dans votre demande et nous verrons ensemble les modalités.`,
  },
]
