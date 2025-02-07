import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store'; // ✅ Ensure correct import path
import App from './App';
import './styles/Birthday.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>  {/* ✅ Redux store is now provided */}
            <App />
        </Provider>
    </React.StrictMode>,
);
