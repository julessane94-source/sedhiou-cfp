import chatbotKnowledge from './chatbotKnowledge'
import formation from './formation'
import actualite from './actualite'
import appelCandidature from './appelCandidature'
import pageAbout from './pageAbout'
import siteSettings from './siteSettings'
import inscription from './inscription'
import inscriptionPage from './inscriptionPage'
import contact from './contact'
import accueil from './accueil'
import aPropos from './aPropos'
import homePage, { hero, textWithImage, videoBlock, audioBlock, gallery, cta, featuredFormations, featuredActualites, faqBlock, testimonials } from './homePage'

export const schemaTypes = [
  // blocs et types partagés
  hero,
  textWithImage,
  videoBlock,
  audioBlock,
  gallery,
  cta,
  featuredFormations,
  featuredActualites,
  faqBlock,
  testimonials,
  homePage,
  formation,
  actualite,
  appelCandidature,
  pageAbout,
  siteSettings,
  inscription,
  inscriptionPage,
  contact,
  accueil,
  aPropos,
  chatbotKnowledge
]
