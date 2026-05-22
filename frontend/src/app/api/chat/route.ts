import { NextRequest, NextResponse } from 'next/server'

// FAQ simple (règles)
const faq = [
  { keywords: ['bonjour', 'salut', 'coucou'], response: "Bonjour ! Comment puis-je vous aider ?" },
  { keywords: ['formation', 'formations', 'cours'], response: "Nous proposons des CAP en Horticulteur, Coiffeur, Couture, Cuisine, Développement local, Santé/hygiène, ainsi que des Attestations en Coiffure, Restauration, Habillement. Consultez notre page Formations." },
  { keywords: ['inscription', 'candidature', 'postuler'], response: "Vous pouvez vous inscrire via notre formulaire en ligne : https://sedhiou-cfp1.vercel.app/inscription" },
  { keywords: ['horaire', 'horaires', 'ouverture'], response: "Le centre est ouvert du lundi au vendredi de 8h à 17h, et le samedi de 9h à 13h." },
  { keywords: ['adresse', 'localisation', 'où'], response: "Nous sommes situés à Quartier Moricounda, face au Pôle Emploi de Sédhiou, Sénégal." },
  { keywords: ['téléphone', 'appeler', 'contact'], response: "Vous pouvez nous joindre au +221 77 885 16 91 ou par email à cfpsedhiou@gmail.com." },
  { keywords: ['coût', 'prix', 'tarif'], response: "Les tarifs varient selon la formation. Contactez-nous pour plus de détails." },
  { keywords: ['durée', 'longueur'], response: "Les formations durent généralement 3 ans (CAP ou Attestation)." },
  { keywords: ['directeur', 'doubaless'], response: "Le directeur du CFP SEDHIOU est Monsieur Doubaless Yinghou." },
  { keywords: ['merci', 'merci beaucoup'], response: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions." },
]

function getResponse(message: string): string {
  const lowerMsg = message.toLowerCase()
  for (const item of faq) {
    for (const kw of item.keywords) {
      if (lowerMsg.includes(kw)) {
        return item.response
      }
    }
  }
  return "Je ne comprends pas encore cette question. Veuillez contacter notre équipe directement par téléphone ou email, ou consulter notre site pour plus d'informations."
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message) return NextResponse.json({ error: "Message manquant" }, { status: 400 })
    const reply = getResponse(message)
    // Petite simulation de délai pour un effet naturel
    await new Promise(resolve => setTimeout(resolve, 500))
    return NextResponse.json({ reply })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}