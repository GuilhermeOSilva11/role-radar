import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from '@primereact/core'
import Aura from '@primeuix/themes/aura'

import App from './components/App.jsx'
import { PRIMEUI_LICENSE } from './utils/chaves.js'

import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import './styles.css'

const primereact = {
  theme: {
    preset: Aura
  },
  license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider {...primereact}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
)