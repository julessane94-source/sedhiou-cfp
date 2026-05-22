'use client'

import { useState, useEffect, useRef } from 'react'
import { client } from '@/lib/sanity/client'
import { X, Send, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface KnowledgeItem {
  question: string
  answer: string
  keywords?: string
}

interface Formation {
  title: string
  description?: string
  price?: string
  duration?: string
  startDate?: string
}

interface Actualite {
  title: string
  excerpt?: string
  publishedAt: string
}

interface AppelCandidature {
  title: string
  description?: string
  deadline: string
}

interface Contact {
  phone: string
  email: string
  address: string
}

interface Director {
  name: string
  title?: string
  email?: string
  phone?: string
  bio?: string
}

export default function TidianyChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Bonjour ! Je suis Tidiany, votre assistant virtuel. Je peux vous renseigner sur nos formations, actualités, appels à candidatures, tarifs, etc. Posez-moi vos questions !',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Charger la FAQ fixe depuis Sanity
  useEffect(() => {
    async function fetchKnowledge() {
      try {
        const query = `*[_type == "chatbotKnowledge"] { question, answer, keywords }`
        const data = await client.fetch(query)
        setKnowledge(data)
      } catch (error) { console.error(error) }
    }
    fetchKnowledge()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fonction pour interroger Sanity de manière intelligente
  async function smartSearch(question: string): Promise<string | null> {
    const q = question.toLowerCase()
    
    // Détection des salutations et messages simples
    if (q.includes('bonjour') || q.includes('salut') || q.includes('coucou') || q.includes('allo') || q.includes('hey')) {
      return "Bonjour! 👋 Je suis Tidiany, votre assistant virtuel. Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur nos formations, actualités, appels à candidatures, tarifs, ou toute autre information."
    }
    if (q.includes('ça va') || q.includes('comment ça va') || q.includes('comment vas-tu') || q.includes('ça roule') || q.includes('comment allez-vous')) {
      const replies = [
        "Ça va très bien, merci! 😊 Et vous?",
        "Je vais bien, prêt à vous aider. Que voulez-vous savoir?",
        "Tout va bien ici! En quoi puis-je vous aider aujourd'hui?"
      ]
      return replies[Math.floor(Math.random() * replies.length)]
    }
    if (q.includes('qui es tu') || q.includes('qui es-tu') || q.includes('tu es qui') || q.includes('c est qui') || q.includes('ton nom')) {
      return "Je suis Tidiany, l'assistant virtuel du CFP Sédhiou. Je peux vous aider à trouver des informations sur nos formations, nos actualités, les appels à candidatures, les tarifs et plus encore."
    }

    // Détection des questions sur le directeur
    if (q.includes('directeur') || q.includes('chef') || q.includes('administrateur') || q.includes('responsable') || q.includes('dirigeant')) {
      try {
        const groq = `*[_type == "siteSettings"][0] { director_name, director_email, director_phone, director_title }`
        const settings = await client.fetch(groq)
        if (settings && settings.director_name) {
          let reply = `Le directeur du CFP Sédhiou est **${settings.director_name}**`
          if (settings.director_title) reply += ` (${settings.director_title})`
          reply += `.\n`
          if (settings.director_email) reply += `📧 Email: ${settings.director_email}\n`
          if (settings.director_phone) reply += `📞 Téléphone: ${settings.director_phone}`
          return reply
        } else {
          return "Je n'ai pas d'informations sur le directeur actuellement. Veuillez nous contacter directement au +221 77 885 16 91 ou à contact@cfpsedhiou.sn."
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du directeur:', error)
        return "Nous contacter pour plus d'informations sur la direction: +221 77 885 16 91"
      }
    }

    // Questions sur inscription/admission
    if (q.includes('inscrire') || q.includes('inscription') || q.includes('admission') || q.includes('candidature') || q.includes('comment rejoindre')) {
      return "Pour vous inscrire au CFP Sédhiou, veuillez :\n1. Consulter la page **Inscriptions** de notre site\n2. Remplir le formulaire d'inscription\n3. Nous envoyer vos documents requis\n4. Attendre la confirmation\n\nVous avez besoin d'aide? Contactez-nous: **+221 77 885 16 91** ou **contact@cfpsedhiou.sn**"
    }

    // Questions sur la localisation/accès
    if (q.includes('où') || q.includes('localisation') || q.includes('adresse') || q.includes('comment venir') || q.includes('lieu') || q.includes('situé')) {
      const groq = `*[_type == "contact"][0] { address, phone, email }`
      const contact = await client.fetch(groq)
      if (contact?.address) {
        return `📍 Nous sommes situés à: **${contact.address}**\n\nÉtapes:\n1. Consultez Google Maps\n2. Appelez-nous pour des indications: **${contact.phone}**\n\n📧 ${contact.email}`
      }
      return "Pour connaître notre localisation, veuillez nous appeler au +221 77 885 16 91 ou consulter Google Maps."
    }

    // Questions sur horaires/disponibilités
    if (q.includes('horaire') || q.includes('heure') || q.includes('ouvert') || q.includes('fermé') || q.includes('disponib') || q.includes('quand venez')) {
      return "Pour connaître nos horaires d'ouverture et de formation, veuillez :\n📞 Nous appeler: **+221 77 885 16 91**\n📧 Nous écrire: **contact@cfpsedhiou.sn**\n\nNos horaires peuvent varier selon les formations. Les équipes vous répondront dans les meilleurs délais!"
    }

    // Questions sur qui sommes-nous / histoire / mission
    if (q.includes('qui êtes-vous') || q.includes('qui sommes-nous') || q.includes('histoire') || q.includes('mission') || q.includes('vision') || q.includes('présentation') || q.includes('à propos')) {
      return "Le **CFP Sédhiou** (Centre de Formation Professionnelle) est un établissement de formation professionnelle et technique dédié à l'excellence.\n\n🎯 **Notre mission:** Former les jeunes et adultes pour un avenir professionnel prospère.\n💼 **Nos domaines:** Coiffure, Horlogerie, Cuisine, Couture, Développement local, Santé & Hygiène...\n\nPour plus de détails, visitez notre page **À Propos**"
    }

    // Questions générales de satisfaction
    if (q.includes('merci') || q.includes('merci beaucoup') || q.includes('super') || q.includes('bien') || q.includes('ça va')) {
      const replies = [
        "De rien! 😊 N'hésitez pas si vous avez d'autres questions.",
        "Vous êtes bienvenu(e)! 👍 Je suis là pour vous aider.",
        "Avec plaisir! 🌟 Quoi d'autre?"
      ]
      return replies[Math.floor(Math.random() * replies.length)]
    }

    // Détection des intentions
    if (q.includes('formation') || q.includes('cours') || q.includes('filière') || q.includes('filières') || q.includes('branche') || q.includes('domaines')) {
      try {
        const groq = `*[_type == "formation"] { title, description, price, duration }`
        const results = await client.fetch(groq)
        if (results && results.length > 0) {
          let reply = `Voici quelques filières proposées au CFP Sédhiou :\n`
          results.slice(0, 5).forEach((f: Formation) => {
            reply += `- ${f.title} : ${f.description?.substring(0, 80) ?? 'Description non disponible'}... (durée: ${f.duration || 'sur demande'}, prix: ${f.price || 'sur demande'})\n`
          })
          return reply
        }
      } catch (error) {
        console.error('Erreur récupération formations:', error)
      }
      return "Je peux vous aider à trouver nos filières. Rendez-vous sur la page Formations pour la liste complète."
    }
    if (q.match(/\bbt\b/) || q.includes('niveau bt') || q.includes('brevet de technicien') || q.includes('niveau brevet')) {
      return "Le BT (Brevet de Technicien) est un diplôme de formation professionnelle. Au CFP Sédhiou, nous proposons des parcours techniques et pratiques adaptés aux besoins du marché. Pour en savoir plus sur les modalités et les filières BT, consultez la page Formations ou contactez-nous directement."
    }
    else if (q.includes('actualité') || q.includes('nouvelle') || q.includes('news')) {
      const groq = `*[_type == "actualite"] | order(publishedAt desc) [0...2] { title, excerpt, publishedAt }`
      const results = await client.fetch(groq)
      if (results && results.length > 0) {
        let reply = `Voici les dernières actualités :\n`
        results.forEach((a: Actualite) => {
          reply += `- ${a.title} (${new Date(a.publishedAt).toLocaleDateString()}) : ${a.excerpt?.substring(0, 100)}...\n`
        })
        return reply
      } else {
        return "Aucune actualité récente pour le moment."
      }
    }
    else if (q.includes('appel') || q.includes('candidature') || q.includes('postuler')) {
      const groq = `*[_type == "appelCandidature" && status == "open"] | order(deadline asc) { title, description, deadline }`
      const results = await client.fetch(groq)
      if (results && results.length > 0) {
        let reply = `Appels à candidatures ouverts :\n`
        results.forEach((a: AppelCandidature) => {
          reply += `- ${a.title} : ${a.description?.substring(0, 80)}... (date limite: ${new Date(a.deadline).toLocaleDateString()})\n`
        })
        return reply
      } else {
        return "Aucun appel à candidatures ouvert actuellement."
      }
    }
    else if (q.includes('prix') || q.includes('coût') || q.includes('tarif') || q.includes('frais')) {
      const groq = `*[_type == "formation"] { title, price }`
      const results = await client.fetch(groq)
      if (results && results.length > 0) {
        let reply = `Tarifs des formations :\n`
        results.forEach((f: Formation) => {
          if (f.price) reply += `- ${f.title} : ${f.price}\n`
        })
        if (reply === `Tarifs des formations :\n`) reply += "Aucun tarif renseigné pour le moment. Contactez-nous pour un devis personnalisé."
        return reply
      } else {
        return "Je n'ai pas d'information sur les tarifs. N'hésitez pas à nous contacter directement."
      }
    }
    else if (q.includes('date') || q.includes('session') || q.includes('quand')) {
      const groq = `*[_type == "formation" && startDate != null] | order(startDate asc) [0...2] { title, startDate }`
      const results = await client.fetch(groq)
      if (results && results.length > 0) {
        let reply = `Prochaines dates de début de formation :\n`
        results.forEach((f: Formation) => {
          reply += `- ${f.title} : ${new Date(f.startDate!).toLocaleDateString()}\n`
        })
        return reply
      } else {
        return "Je ne dispose pas de dates précises. Veuillez consulter la page Formations ou nous appeler."
      }
    }
    else if (q.includes('contact') || q.includes('adresse') || q.includes('téléphone') || q.includes('email')) {
      const groq = `*[_type == "contact"][0] { phone, email, address }`
      const contact = await client.fetch(groq)
      if (contact) {
        return `Voici nos coordonnées :\n📞 ${contact.phone}\n✉️ ${contact.email}\n📍 ${contact.address}`
      } else {
        return "Vous pouvez nous joindre par téléphone au +221 77 885 16 91 ou par email à contact@cfpsedhiou.sn."
      }
    }
    return null // aucune intention détectée
  }

  async function handleSend() {
    if (!input.trim()) return
    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      let botReply = await smartSearch(input)
      if (!botReply) {
        // Chercher dans la base de connaissances (FAQ)
        const bestMatch = findBestResponse(input)
        if (bestMatch) botReply = bestMatch
        else botReply = "Je n'ai pas trouvé de réponse. Posez une autre question ou contactez-nous directement."
      }
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: botReply, sender: 'bot', timestamp: new Date() }
      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      const errorMsg: Message = { id: (Date.now() + 2).toString(), text: "Désolé, une erreur technique s'est produite. Veuillez réessayer plus tard.", sender: 'bot', timestamp: new Date() }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  function findBestResponse(question: string): string | null {
    const lowerQuestion = question.toLowerCase()
    let bestMatch: KnowledgeItem | null = null
    let bestScore = 0
    for (const item of knowledge) {
      let score = 0
      const itemQuestion = item.question.toLowerCase()
      if (lowerQuestion.includes(itemQuestion) || itemQuestion.includes(lowerQuestion)) {
        score = 120
      } else {
        const keywords = item.keywords ? item.keywords.split(',').map(k => k.trim().toLowerCase()) : []
        for (const kw of keywords) {
          if (!kw) continue
          if (lowerQuestion.includes(kw)) score += 30
          else if (lowerQuestion.split(' ').some(word => kw.includes(word) || word.includes(kw))) score += 15
        }
        const words = lowerQuestion.split(/\s+/).filter(Boolean)
        const questionWords = itemQuestion.split(/\s+/).filter(Boolean)
        for (const w of words) {
          if (questionWords.some(qw => qw === w)) score += 15
          else if (questionWords.some(qw => qw.includes(w) || w.includes(qw))) score += 8
        }
      }
      if (score > bestScore) { bestScore = score; bestMatch = item }
    }
    return (bestScore >= 30 && bestMatch) ? bestMatch.answer : null
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-white p-4 rounded-full shadow-lg hover:bg-[#059669] transition transform hover:scale-105" title="Assistant Tidiany">
        <MessageCircle size={28} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[600px] sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up">
      <div className="bg-[#10B981] text-white px-4 py-3 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-2"><MessageCircle size={20} /><span className="font-semibold">Tidiany - Assistant</span></div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition" title="Fermer"><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 overflow-x-hidden">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} px-2`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl break-words ${msg.sender === 'user' ? 'bg-[#10B981] text-white rounded-br-none' : 'bg-white border border-gray-200 text-stone-800 rounded-bl-none shadow-sm'}`}>
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
              <p className="text-[10px] opacity-70 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start px-2">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>
      <div className="border-t p-3 bg-white flex-shrink-0 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Posez votre question..." className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm" />
        <button onClick={handleSend} disabled={isLoading} className="bg-[#10B981] text-white px-4 py-2 rounded-full hover:bg-[#059669] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0" title="Envoyer" aria-label="Envoyer">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}