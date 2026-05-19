'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Envoi...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('Message envoyé avec succès')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus(`Erreur: ${data?.error || "impossible d'envoyer"}`)
      }
    } catch (err) {
      setStatus('Erreur serveur, réessayez plus tard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Nom" className="w-full border rounded p-2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <input type="email" placeholder="Email" className="w-full border rounded p-2" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
      <textarea placeholder="Message" rows={5} className="w-full border rounded p-2" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Envoyer</button>
      {status && <p className="text-center">{status}</p>}
    </form>
  )
}
