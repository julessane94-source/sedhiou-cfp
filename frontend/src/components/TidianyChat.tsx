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

export default function TidianyChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Bonjour ! Je suis Tidiany, votre assistant virtuel. Posez-moi vos questions sur le CFP SEDHIOU (formations, inscriptions, dates, etc.).',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchKnowledge() {
      try {
        const query = `*[_type == "chatbotKnowledge"] {
          question,
          answer,
          keywords
        }`
        const data = await client.fetch(query)
        setKnowledge(data)
      } catch (error) {
        console.error('Erreur chargement connaissances:', error)
      }
    }
    fetchKnowledge()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function findBestResponse(question: string): string | null {
    const lowerQuestion = question.toLowerCase()
    let bestMatch: KnowledgeItem | null = null
    let bestScore = 0

    for (const item of knowledge) {
      let score = 0
      if (lowerQuestion.includes(item.question.toLowerCase())) {
        score = 100
      } else {
        const keywords = item.keywords ? item.keywords.split(',').map(k => k.trim().toLowerCase()) : []
        for (const kw of keywords) {
          if (lowerQuestion.includes(kw)) score += 20
        }
        const words = lowerQuestion.split(' ')
        const questionWords = item.question.toLowerCase().split(' ')
        for (const w of words) {
          if (questionWords.some(qw => qw.includes(w) || w.includes(qw))) score += 10
        }
      }
      if (score > bestScore) {
        bestScore = score
        bestMatch = item
      }
    }
    if (bestScore >= 20) return bestMatch!.answer
    return null
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    const answer = findBestResponse(input)
    let botReply = answer || "Je n'ai pas encore la réponse. Contactez-nous par email ou téléphone."
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
      botReply = "Bonjour ! Je suis Tidiany. Comment puis-je vous aider ?"
    } else if (lowerInput.includes('merci')) {
      botReply = "Avec plaisir !"
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 bg-[#772a1d] text-white p-4 rounded-full shadow-lg hover:bg-[#5c2016] transition transform hover:scale-105">
        <MessageCircle size={28} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up">
      <div className="bg-[#772a1d] text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2"><MessageCircle size={20} /><span className="font-semibold">Tidiany - Assistant</span></div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-[#772a1d] text-white rounded-br-none' : 'bg-white border border-gray-200 text-stone-800 rounded-bl-none shadow-sm'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className="text-[10px] opacity-70 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-3 bg-white">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Écrivez votre message..." className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#772a1d]" />
          <button onClick={handleSend} className="bg-[#772a1d] text-white p-2 rounded-full hover:bg-[#5c2016] transition"><Send size={20} /></button>
        </div>
      </div>
    </div>
  )
}