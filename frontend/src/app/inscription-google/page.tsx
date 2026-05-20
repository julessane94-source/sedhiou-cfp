import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function InscriptionGooglePage() {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdMnxfMHGu7rviw3ki9YCHs1V_1eqgwNUl7uXFmMic2xzF6Uw/viewform?embedded=true"
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-stone-100 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4 animate-fade-in">Inscription en ligne</h1>
        <p className="text-center text-stone-600 mb-8 animate-fade-in animation-delay-200">
          Veuillez remplir le formulaire ci-dessous pour vous inscrire.
        </p>
        <div className="card-light p-4">
          <iframe
            src={googleFormUrl}
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-lg"
            title="Formulaire d'inscription Google"
          >
            Chargement…
          </iframe>
        </div>
        <div className="text-center mt-8">
          <Link href="/" className="text-amber-700 hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  )
}