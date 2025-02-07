// src/pages/Accueil.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserAvatar } from '../features/user/userAPI';
import { updateUserInfo } from '../features/user/userSlice';
import { getDaysUntilBirthday } from '../utils/dateUtils';
import { Message } from '../types/api.types';
import '../styles/Birthday.css';
import { sendQuery } from '../api/wishService';
import { useDebounce } from '../hooks/useDebounce';

const Accueil: React.FC = () => {
    const { firstName, lastName, birthDate, avatarUrl } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const logsRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of logs when messages change
    useEffect(() => {
        if (logsRef.current) {
            logsRef.current.scrollTop = logsRef.current.scrollHeight;
        }
    }, [messages]);

    // Debounced avatar fetching after name changes
    useDebounce(
        () => {
            if (firstName.trim() && lastName.trim()) {
                fetchUserAvatar(firstName, lastName, dispatch);
            }
        },
        2000, // Delay in milliseconds (e.g., 2000ms = 2 seconds)
        [firstName, lastName, dispatch]
    );

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateUserInfo({ [name]: value }));
    };

    const daysUntilBirthday = getDaysUntilBirthday(birthDate);

    const appendLog = (content: string, isUser: boolean = false) => {
        const timestamp = new Date().toISOString();
        setMessages((prev) => [...prev, { content, isUser, timestamp }]);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            appendLog('Please enter a wish.', false);
            return;
        }

        appendLog(`You: ${inputValue}`, true);
        setIsLoading(true);

        try {
            const result = await sendQuery(inputValue); // API call

            console.log('Full API Response:', result); // Debugging

            appendLog(`Response: ${result.response}`, false);
            appendLog(`Reasoning: ${result.reasoning}`, false);
            appendLog(`Summary: ${result.summary}`, false);

            // Show processing details in logs
            result.processingDetails.forEach((detail, index) => {
                appendLog(`[Step ${index + 1}] ${JSON.stringify(detail)}`, false);
            });
        } catch (error: any) {
            console.error('Error sending wish:', error);
            appendLog(
                `Error: ${error.message || 'An error occurred while sending your wish.'}`,
                false
            );
        } finally {
            setIsLoading(false);
            setInputValue('');
        }
    };

    const clearLogs = () => {
        setMessages([]);
        appendLog('Logs cleared.', false);
    };

    return (
        <div className="birthday-container">
            <div className="main-layout">
                {/* Left Column - User Info Form */}
                <div className="left-column">
                    <div className="user-info-container">
                        <h2 className="section-title">Informations Personnelles</h2>
                        <form className="user-form">
                            <div className="form-group">
                                <label htmlFor="lastName">Nom</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleUserInfoChange}
                                    className="input-field"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">Prénom</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleUserInfoChange}
                                    className="input-field"
                                    placeholder="Votre prénom"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="birthDate">Date de naissance</label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={birthDate}
                                    onChange={handleUserInfoChange}
                                    className="input-field"
                                />
                            </div>
                        </form>

                        <div className="avatar-container">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="avatar-image" />
                            ) : (
                                <p>Chargement de l'avatar...</p>
                            )}
                        </div>

                        {birthDate && (
                            <p className="birthday-countdown">
                                Votre anniversaire est dans {daysUntilBirthday} jours
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Column - Wishes and Logs */}
                <div className="right-column">
                    <div className="wishes-container">
                        <h2 className="section-title">Vos Vœux Pour l'Anniversaire</h2>
                        <div className="wish-form">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                className="wish-input"
                                placeholder="Entrez votre vœu"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSubmit}
                                className="submit-btn"
                                disabled={isLoading || !inputValue.trim()}
                            >
                                {isLoading ? 'Envoi...' : 'Vœu!'}
                            </button>
                            <button
                                onClick={clearLogs}
                                className="clear-btn"
                                disabled={messages.length === 0}
                            >
                                Vider
                            </button>
                        </div>

                        <div className="logs" ref={logsRef}>
                            {messages.map((message, index) => (
                                <div
                                    key={`${message.timestamp}-${index}`}
                                    className={`message ${message.isUser ? 'user-message' : 'system-message'}`}
                                >
                                    [{new Date(message.timestamp).toLocaleTimeString()}] {message.content}
                                </div>
                            ))}
                        </div>

                        <div className="spotify-layer">
                            <iframe
                                src="https://open.spotify.com/embed/track/7xrEnNo99wrmIs8ZK3RZMK?utm_source=generator"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title="Spotify Player"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;