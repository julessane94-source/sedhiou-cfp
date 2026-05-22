import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Bridge script pour l'iframe du dashboard
const bridgeScript = 'https://core.sanity-cdn.com/bridge.js'

export default defineConfig({
  name: 'cfp-sedhiou-studio',
  title: 'CFP SEDHIOU Studio',
  projectId: 'a4ouqnxe',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    // Ajout du script bridge
    {
      name: 'bridge-script',
      studio: {
        components: {
          layout: (props) => {
            // Injection du script dans le head
            if (typeof document !== 'undefined') {
              const script = document.createElement('script')
              script.src = bridgeScript
              script.async = true
              script.type = 'module'
              document.head.appendChild(script)
            }
            return props.renderDefault(props)
          }
        }
      }
    }
  ],
  schema: {
    types: schemaTypes,
  },
})
