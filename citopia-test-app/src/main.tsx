import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './context/UserProvider';

/**
 * Point d'entrée de l'application React
 * - Le composant racine <App /> se trouve dans la div #root du DOM..
 * - Le mode strict est activé pour détecter les erreurs potentielles.
 * - <UserProvider> enveloppe l'application pour fournir le contexte utilisateur à tous les composants enfants.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
);
