'use client'
import { useState } from 'react'

type Niveau = 'CAP' | 'ATTESTE' | 'BT'
type FiliereCAP = 'horticulteur' | 'coiffeur' | 'couturier modÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©liste' | 'cuisinier' | 'dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©veloppement local' | 'santÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© hygiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ne'
type FiliereATTESTE = 'coiffure' | 'restauration' | 'habillement'

const filieresCAP: FiliereCAP[] = ['horticulteur', 'coiffeur', 'couturier modÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©liste', 'cuisinier', 'dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©veloppement local', 'santÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© hygiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ne']
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
    if (newNiveau === 'BT') setMessage('Le niveau BT sera bientÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´t disponible.')
    else setMessage('')
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (niveau === 'BT') { setStatus('error'); setMessage('Inscriptions BT non encore ouvertes.'); return }
    if (niveau === 'CAP' && formData.niveauEtudes !== '4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me') { setStatus('error'); setMessage('Pour le CAP, vous devez avoir au moins le niveau 4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me collÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ge.'); return }
    setStatus('loading')
    try {
      const payload = { niveau, filiere, annee: parseInt(annee), ...formData }
      const res = await fetch('/api/inscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        setStatus('success'); setMessage('Inscription enregistrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e ! Nous vous contacterons rapidement.')
        setFormData({ nom: '', prenom: '', email: '', telephone: '', niveauEtudes: '' }); setFiliere(''); setAnnee('1')
      } else throw new Error('Erreur serveur')
    } catch (error) {
      setStatus('error'); setMessage('Une erreur est survenue. Veuillez rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©essayer plus tard.')
    }
  }
  const filieresListe = niveau === 'CAP' ? filieresCAP : niveau === 'ATTESTE' ? filieresATTESTE : []
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Inscription ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  nos formations</h1>
        <p className="text-center text-white/80 mb-8">Choisissez votre parcours et commencez votre avenir professionnel</p>
        <form onSubmit={handleSubmit} className="card-glass p-6 md:p-8 space-y-6">
          <div><label className="block font-semibold mb-1">Niveau de formation *</label>
            <select value={niveau} onChange={handleNiveauChange} className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
              <option value="CAP">CAP (3 ans) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ Niveau 4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me requis</option>
              <option value="ATTESTE">ATTESTE (3 ans) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ Tout niveau</option>
              <option value="BT" disabled>BT (BientÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´t disponible)</option>
            </select>
          </div>
          <div><label className="block font-semibold mb-1">FiliÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re *</label>
            <select value={filiere} onChange={(e) => setFiliere(e.target.value)} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white" disabled={niveau === 'BT'}>
              <option value="">-- SÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lectionnez --</option>
              {filieresListe.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
            </select>
          </div>
          <div><label className="block font-semibold mb-1">AnnÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e (1, 2 ou 3) *</label>
            <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
              <option value="1">1ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re annÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e</option><option value="2">2ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me annÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e</option><option value="3">3ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me annÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block font-semibold mb-1">Nom *</label><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">PrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©nom *</label><input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
            <div><label className="block font-semibold mb-1">TÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©phone *</label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white placeholder-white/50" /></div>
          </div>
          {niveau === 'CAP' && (
            <div><label className="block font-semibold mb-1">Votre niveau actuel * (CAP exige au moins la 4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me)</label>
              <select name="niveauEtudes" value={formData.niveauEtudes} onChange={handleChange} required className="w-full bg-transparent border border-white/30 rounded p-3 text-white">
                <option value="">-- SÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lectionnez --</option><option value="4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me">4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me (ou plus)</option><option value="autre">Moins que 4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me (non ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ligible)</option>
              </select>
              <p className="text-sm text-white/60 mt-1">ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â Pour le CAP, vous devez avoir validÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© la 4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me.</p>
            </div>
          )}
          <button type="submit" disabled={status === 'loading' || niveau === 'BT' || (niveau === 'CAP' && formData.niveauEtudes !== '4ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me')} className="w-full bg-white text-bordeaux-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </button>
          {message && <div className={`text-center p-3 rounded ${status === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>{message}</div>}
        </form>
      </div>
    </div>
  )
}