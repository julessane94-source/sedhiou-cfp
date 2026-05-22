'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Bonjour ! Je suis l'assistant virtuel du CFP SEDHIOU. Posez-moi vos questions (formations, inscription, horaires...)", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { text: userMsg, isUser: true }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { text: data.reply || "Désolé, une erreur s'est produite.", isUser: false }])
    } catch (error) {
      setMessages(prev => [...prev, { text: "Erreur de connexion. Veuillez réessayer.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#772a1d] text-white p-4 rounded-full shadow-lg hover:bg-[#5c2016] transition z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 animate-fade-in-up">
          <div className="bg-[#772a1d] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Assistant CFP SEDHIOU</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-[#5c2016] p-1 rounded">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl shadow-sm ${msg.isUser ? 'bg-[#772a1d] text-white rounded-br-none' : 'bg-white border border-gray-200 text-stone-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white border p-3 rounded-xl">...</div></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#772a1d]"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-[#772a1d] text-white p-2 rounded-full hover:bg-[#5c2016] transition disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}