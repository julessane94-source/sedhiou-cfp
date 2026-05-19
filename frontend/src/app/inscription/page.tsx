'use client'

import { useState } from 'react'

type Niveau = 'CAP' | 'ATTESTE' | 'BT'
type FiliereCAP = 'horticulteur' | 'coiffeur' | 'couturier modÃ©liste' | 'cuisinier' | 'dÃ©veloppement local' | 'santÃ© hygiÃ¨ne'
type FiliereATTESTE = 'coiffure' | 'restauration' | 'habillement'

const filieresCAP: FiliereCAP[] = [
  'horticulteur',
  'coiffeur',
  'couturier modÃ©liste',
  'cuisinier',
  'dÃ©veloppement local',
  'santÃ© hygiÃ¨ne'
]

const filieresATTESTE: FiliereATTESTE[] = ['coiffure', 'restauration', 'habillement']

export default function InscriptionPage() {
  const [niveau, setNiveau] = useState<Niveau>('CAP')
  const [filiere, setFiliere] = useState('')
  const [annee, setAnnee] = useState('1')
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    niveauEtudes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNiveauChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNiveau = e.target.value as Niveau
    setNiveau(newNiveau)
    setFiliere('')
    if (newNiveau === 'BT') {
      setMessage('Le niveau BT sera bientÃ´t disponible. Revenez plus tard.')
    } else {
      setMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (niveau === 'BT') {
      setStatus('error')
      setMessage('Inscriptions BT non encore ouvertes.')
      return
    }
    if (niveau === 'CAP' && formData.niveauEtudes !== '4Ã¨me') {
      setStatus('error')
      setMessage('Pour le CAP, vous devez avoir au moins le niveau 4Ã¨me collÃ¨ge.')
      return
    }
    setStatus('loading')
    try {
      const payload = {
        niveau,
        filiere,
        annee: parseInt(annee),
        ...formData,
      }
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Inscription enregistrÃ©e ! Nous vous contacterons rapidement.')
        setFormData({ nom: '', prenom: '', email: '', telephone: '', niveauEtudes: '' })
        setFiliere('')
        setAnnee('1')
      } else {
        throw new Error('Erreur serveur')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez rÃ©essayer plus tard.')
    }
  }

  const filieresListe = niveau === 'CAP' ? filieresCAP : niveau === 'ATTESTE' ? filieresATTESTE : []

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-2">Inscription Ã  nos formations</h1>
      <p className="text-center text-gray-600 mb-8">Choisissez votre parcours et commencez votre avenir professionnel</p>
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-6">
        <div>
          <label className="block font-semibold mb-1">Niveau de formation *</label>
          <select value={niveau} onChange={handleNiveauChange} className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="CAP">CAP (3 ans) â€“ Niveau 4Ã¨me requis</option>
            <option value="ATTESTE">ATTESTE (3 ans) â€“ Tout niveau</option>
            <option value="BT" disabled>BT (BientÃ´t disponible)</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">FiliÃ¨re *</label>
          <select value={filiere} onChange={(e) => setFiliere(e.target.value)} required className="w-full border rounded-lg p-3" disabled={niveau === 'BT'}>
            <option value="">-- SÃ©lectionnez --</option>
            {filieresListe.map((f) => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">AnnÃ©e (1, 2 ou 3) *</label>
          <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="w-full border rounded-lg p-3">
            <option value="1">1Ã¨re annÃ©e</option>
            <option value="2">2Ã¨me annÃ©e</option>
            <option value="3">3Ã¨me annÃ©e</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block font-semibold mb-1">Nom *</label><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
          <div><label className="block font-semibold mb-1">PrÃ©nom *</label><input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
          <div><label className="block font-semibold mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
          <div><label className="block font-semibold mb-1">TÃ©lÃ©phone *</label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
        </div>
        {niveau === 'CAP' && (
          <div>
            <label className="block font-semibold mb-1">Votre niveau actuel * (CAP exige au moins la 4Ã¨me)</label>
            <select name="niveauEtudes" value={formData.niveauEtudes} onChange={handleChange} required className="w-full border rounded-lg p-3">
              <option value="">-- SÃ©lectionnez --</option>
              <option value="4Ã¨me">4Ã¨me (ou plus)</option>
              <option value="autre">Moins que 4Ã¨me (non Ã©ligible)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">âš ï¸ Pour le CAP, vous devez avoir validÃ© la 4Ã¨me.</p>
          </div>
        )}
        <button
          type="submit"
          disabled={status === 'loading' || niveau === 'BT' || (niveau === 'CAP' && formData.niveauEtudes !== '4Ã¨me')}
          className="w-full bg-bordeaux-600 text-white font-bold py-3 rounded-lg hover:bg-bordeaux-700 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
        </button>
        {message && (
          <div className={`text-center p-3 rounded ${status === 'success' ? 'bg-bordeaux-100 text-bordeaux-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}