import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/**
 * Point d'entrée de l'application React
 * - Le composant racine <App /> se trouve dans la div #root du DOM..
 * - Le mode strict est activé pour détecter les erreurs potentielles.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
