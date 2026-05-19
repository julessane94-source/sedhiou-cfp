"use client"
export const dynamic = 'force-dynamic'
export const revalidate = 1
import { useState } from 'react'

type Niveau = 'CAP' | 'ATTESTE' | 'BT'
type FiliereCAP = 'horticulteur' | 'coiffeur' | 'couturier modéliste' | 'cuisinier' | 'développement local' | 'santé hygiène'
type FiliereATTESTE = 'coiffure' | 'restauration' | 'habillement'

const filieresCAP: FiliereCAP[] = ['horticulteur', 'coiffeur', 'couturier modéliste', 'cuisinier', 'développement local', 'santé hygiène']
const filieresATTESTE: FiliereATTESTE[] = ['coiffure', 'restauration', 'habillement']

export default function InscriptionPage() {
  const [niveau, setNiveau] = useState<Niveau>('CAP')
  const [filiere, setFiliere] = useState('')
  const [annee, setAnnee] = useState('1')
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', telephone: '', niveauEtudes: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleNiveauChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNiveau = e.target.value as Niveau
    setNiveau(newNiveau)
    setFiliere('')
    if (newNiveau === 'BT') setMessage('Le niveau BT sera bientôt disponible.')
    else setMessage('')
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (niveau === 'BT') { setStatus('error'); setMessage('Inscriptions BT non encore ouvertes.'); return }
    if (niveau === 'CAP' && formData.niveauEtudes !== '4ème') { setStatus('error'); setMessage('Pour le CAP, vous devez avoir au moins le niveau 4ème collège.'); return }
    setStatus('loading')
    try {
      const payload = { niveau, filiere, annee: parseInt(annee), ...formData }
      const res = await fetch('/api/inscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        setStatus('success')
        setMessage('Inscription enregistrée ! Nous vous contacterons rapidement.')
        setFormData({ nom: '', prenom: '', email: '', telephone: '', niveauEtudes: '' })
        setFiliere(''); setAnnee('1')
      } else throw new Error('Erreur serveur')
    } catch (error) {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }
  const filieresListe = niveau === 'CAP' ? filieresCAP : niveau === 'ATTESTE' ? filieresATTESTE : []
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Inscription à nos formations</h1>
        <p className="text-center text-white/90 mb-8">Choisissez votre parcours et commencez votre avenir professionnel</p>
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-6">
          {/* ... formulaire ... */}
          <div><label className="block font-semibold mb-1">Niveau de formation *</label>
            <select value={niveau} onChange={handleNiveauChange} className="w-full border rounded-lg p-3">
              <option value="CAP">CAP (3 ans) – Niveau 4ème requis</option><option value="ATTESTE">ATTESTE (3 ans) – Tout niveau</option><option value="BT" disabled>BT (Bientôt disponible)</option>
            </select>
          </div>
          <div><label className="block font-semibold mb-1">Filière *</label>
            <select value={filiere} onChange={(e) => setFiliere(e.target.value)} required className="w-full border rounded-lg p-3" disabled={niveau === 'BT'}>
              <option value="">-- Sélectionnez --</option>{filieresListe.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
            </select>
          </div>
          <div><label className="block font-semibold mb-1">Année (1, 2 ou 3) *</label>
            <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="w-full border rounded-lg p-3"><option value="1">1ère année</option><option value="2">2ème année</option><option value="3">3ème année</option></select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block font-semibold mb-1">Nom *</label><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
            <div><label className="block font-semibold mb-1">Prénom *</label><input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
            <div><label className="block font-semibold mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
            <div><label className="block font-semibold mb-1">Téléphone *</label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full border rounded-lg p-3" /></div>
          </div>
          {niveau === 'CAP' && (
            <div><label className="block font-semibold mb-1">Votre niveau actuel *</label>
              <select name="niveauEtudes" value={formData.niveauEtudes} onChange={handleChange} required className="w-full border rounded-lg p-3">
                <option value="">-- Sélectionnez --</option><option value="4ème">4ème (ou plus)</option><option value="autre">Moins que 4ème (non éligible)</option>
              </select>
              <p className="text-sm text-white/70 mt-1">⚠️ Pour le CAP, vous devez avoir validé la 4ème.</p>
            </div>
          )}
          <button type="submit" disabled={status === 'loading' || niveau === 'BT' || (niveau === 'CAP' && formData.niveauEtudes !== '4ème')} className="w-full btn-primary py-3 rounded-lg">{status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}</button>
          {message && <div className={`text-center p-3 rounded ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
        </form>
      </div>
    </div>
  )
}

