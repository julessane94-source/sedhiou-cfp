'use client'
import { useState } from 'react'

type Niveau = 'CAP' | 'ATTESTE' | 'BT'
type FiliereCAP = 'horticulteur' | 'coiffeur' | 'couturier modÃƒÆ’Ã‚Â©liste' | 'cuisinier' | 'dÃƒÆ’Ã‚Â©veloppement local' | 'santÃƒÆ’Ã‚Â© hygiÃƒÆ’Ã‚Â¨ne'
type FiliereATTESTE = 'coiffure' | 'restauration' | 'habillement'

const filieresCAP: FiliereCAP[] = ['horticulteur', 'coiffeur', 'couturier modÃƒÆ’Ã‚Â©liste', 'cuisinier', 'dÃƒÆ’Ã‚Â©veloppement local', 'santÃƒÆ’Ã‚Â© hygiÃƒÆ’Ã‚Â¨ne']
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
    if (newNiveau === 'BT') setMessage('Le niveau BT sera bientÃƒÆ’Ã‚Â´t disponible.')
    else setMessage('')
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (niveau === 'BT') { setStatus('error'); setMessage('Inscriptions BT non encore ouvertes.'); return }
    if (niveau === 'CAP' && formData.niveauEtudes !== '4ÃƒÆ’Ã‚Â¨me') { setStatus('error'); setMessage('Pour le CAP, vous devez avoir au moins le niveau 4ÃƒÆ’Ã‚Â¨me collÃƒÆ’Ã‚Â¨ge.'); return }
    setStatus('loading')
    try {
      const payload = { niveau, filiere, annee: parseInt(annee), ...formData }
      const res = await fetch('/api/inscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        setStatus('success'); setMessage('Inscription enregistrÃƒÆ’Ã‚Â©e ! Nous vous contacterons rapidement.')
        setFormData({ nom: '', prenom: '', email: '', telephone: '', niveauEtudes: '' }); setFiliere(''); setAnnee('1')
      } else throw new Error('Erreur serveur')
    } catch (error) {
      setStatus('error'); setMessage('Une erreur est survenue. Veuillez rÃƒÆ’Ã‚Â©essayer plus tard.')
    }
  }
  const filieresListe = niveau === 'CAP' ? filieresCAP : niveau === 'ATTESTE' ? filieresATTESTE : []
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Inscription ÃƒÆ’Ã‚Â  nos formations</h1>
        <p className="text-center text-white/80 mb-8">Choisissez votre parcours et commencez votre avenir professionnel</p>
        <form onSubmit={handleSubmit} className="card-glass p-6 md:p-8 space-y-6">
          <div><label className="block font-semibold mb-1">Niveau de formation *</label>
            <select value={niveau} onChange={handleNiveauChange} className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
              <option value="CAP">CAP (3 ans) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Niveau 4ÃƒÆ’Ã‚Â¨me requis</option>
              <option value="ATTESTE">ATTESTE (3 ans) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Tout niveau</option>
              <option value="BT" disabled>BT (BientÃƒÆ’Ã‚Â´t disponible)</option>
            </select>
          </div>
          <div><label className="block font-semibold mb-1">FiliÃƒÆ’Ã‚Â¨re *</label>
            <select value={filiere} onChange={(e) => setFiliere(e.target.value)} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white" disabled={niveau === 'BT'}>
              <option value="">-- SÃƒÆ’Ã‚Â©lectionnez --</option>
              {filieresListe.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
            </select>
          </div>
          <div><label className="block font-semibold mb-1">AnnÃƒÆ’Ã‚Â©e (1, 2 ou 3) *</label>
            <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
              <option value="1">1ÃƒÆ’Ã‚Â¨re annÃƒÆ’Ã‚Â©e</option><option value="2">2ÃƒÆ’Ã‚Â¨me annÃƒÆ’Ã‚Â©e</option><option value="3">3ÃƒÆ’Ã‚Â¨me annÃƒÆ’Ã‚Â©e</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block font-semibold mb-1">Nom *</label><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">PrÃƒÆ’Ã‚Â©nom *</label><input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">TÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©phone *</label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
          </div>
          {niveau === 'CAP' && (
            <div><label className="block font-semibold mb-1">Votre niveau actuel * (CAP exige au moins la 4ÃƒÆ’Ã‚Â¨me)</label>
              <select name="niveauEtudes" value={formData.niveauEtudes} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
                <option value="">-- SÃƒÆ’Ã‚Â©lectionnez --</option><option value="4ÃƒÆ’Ã‚Â¨me">4ÃƒÆ’Ã‚Â¨me (ou plus)</option><option value="autre">Moins que 4ÃƒÆ’Ã‚Â¨me (non ÃƒÆ’Ã‚Â©ligible)</option>
              </select>
              <p className="text-sm text-white/60 mt-1">ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Pour le CAP, vous devez avoir validÃƒÆ’Ã‚Â© la 4ÃƒÆ’Ã‚Â¨me.</p>
            </div>
          )}
          <button type="submit" disabled={status === 'loading' || niveau === 'BT' || (niveau === 'CAP' && formData.niveauEtudes !== '4ÃƒÆ’Ã‚Â¨me')} className="w-full bg-white text-bordeaux-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </button>
          {message && <div className={`text-center p-3 rounded ${status === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>{message}</div>}
        </form>
      </div>
    </div>
  )
}