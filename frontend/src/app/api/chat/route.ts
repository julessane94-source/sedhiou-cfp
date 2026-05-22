import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

interface ChatbotKnowledge {
  _id: string
  question: string
  answer: string
  keywords?: string
}

async function getChatbotKnowledge(): Promise<ChatbotKnowledge[]> {
  try {
    const query = `*[_type == "chatbotKnowledge"] { _id, question, answer, keywords }`
    const results = await client.fetch(query)
    return results || []
  } catch (error) {
    console.error('Erreur Sanity:', error)
    return []
  }
}

function calculateSimilarity(text1: string, text2: string): number {
  const t1 = text1.toLowerCase()
  const t2 = text2.toLowerCase()
  
  // Comptabiliser les mots en commun
  const words1 = t1.split(/\s+/)
  const words2 = t2.split(/\s+/)
  
  let matches = 0
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1.includes(w2) || w2.includes(w1)) {
        matches++
      }
    }
  }
  
  return matches / Math.max(words1.length, words2.length)
}

function findBestMatch(message: string, knowledgeBase: ChatbotKnowledge[]): ChatbotKnowledge | null {
  let bestMatch: ChatbotKnowledge | null = null
  let bestScore = 0.3 // Seuil minimum
  
  const lowerMsg = message.toLowerCase()
  
  for (const item of knowledgeBase) {
    // Chercher dans la question
    let score = calculateSimilarity(message, item.question)
    
    // Chercher dans les keywords
    if (item.keywords) {
      const keywordsList = item.keywords.split(',').map(k => k.trim())
      for (const keyword of keywordsList) {
        if (lowerMsg.includes(keyword.toLowerCase())) {
          score = Math.max(score, 0.8)
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }
  
  return bestMatch
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message) return NextResponse.json({ error: "Message manquant" }, { status: 400 })
    
    // Récupérer la base de connaissances
    const knowledgeBase = await getChatbotKnowledge()
    
    // Trouver la meilleure réponse
    const bestMatch = findBestMatch(message, knowledgeBase)
    
    let reply = bestMatch?.answer || "Je n'ai pas trouvé de réponse. Posez une autre question ou contactez-nous directement au +221 77 885 16 91 ou contact@cfpsedhiou.sn"
    
    // Petite simulation de délai pour un effet naturel
    await new Promise(resolve => setTimeout(resolve, 500))
    return NextResponse.json({ reply })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}