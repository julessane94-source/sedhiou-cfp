'use client'

export default function InscriptionPage() {
  // URL du formulaire Google (avec ?embedded=true pour l'iframe)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdMnxfMHGu7rviw3ki9YCHs1V_1eqgwNUl7uXFmMic2xzF6Uw/viewform?embedded=true"

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4 animate-fade-in">
            Inscription aux formations
          </h1>
          <p className="text-stone-600 animate-fade-in animation-delay-200">
            Remplissez le formulaire ci-dessous pour postuler à nos formations.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-slide-up">
          <iframe
            src={googleFormUrl}
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulaire d'inscription CFP SEDHIOU"
            className="w-full"
            style={{ border: 'none' }}
          >
            Chargement…
          </iframe>
        </div>
        <div className="text-center mt-6 text-stone-500 text-sm">
          Les informations collectées sont utilisées uniquement pour le traitement de votre candidature.
        </div>
      </div>
    </div>
  )
}