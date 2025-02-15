import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Accueil from './pages/Accueil';
import Informations from './pages/Informations';
import { AnimatePresence } from 'framer-motion';
import CubeTransition from './components/CubeTransition';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/informations"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Informations
                        </NavLink>
                    </li>
                    <li>
                        <a
                            href="https://camerone-frontend.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Announce
                        </a>
                    </li>
                </ul>
            </nav>
            <main
                style={{
                    marginTop: '60px',
                    position: 'relative',
                    perspective: '2000px',
                    // Remove overflow property to allow scrolling
                    // overflow: 'hidden',
                }}
            >
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path="/"
                            element={
                                <CubeTransition>
                                    <Accueil />
                                </CubeTransition>
                            }
                        />
                        <Route
                            path="/informations"
                            element={
                                <CubeTransition>
                                    <Informations />
                                </CubeTransition>
                            }
                        />
                    </Routes>
                </AnimatePresence>
            </main>
        </>
    );
};

export default App;