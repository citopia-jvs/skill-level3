// src/components/BirthdayWishes.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Birthday.css';

interface Message {
    content: string;
    isUser: boolean;
    timestamp: string;
}

const BirthdayWishes: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const logsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logsRef.current) {
            logsRef.current.scrollTop = logsRef.current.scrollHeight;
        }
    }, [messages]);

    const appendLog = (content: string, isUser: boolean = false) => {
        const timestamp = new Date().toISOString();
        setMessages(prev => [...prev, { content, isUser, timestamp }]);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            appendLog("Please enter a wish.", false);
            return;
        }

        setIsLoading(true);
        appendLog(inputValue, true);

        try {
            const response = await fetch(`/invoke?query=${encodeURIComponent(inputValue)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            let lastContent = "No content found.";
            if (result?.processingDetails) {
                for (const detail of result.processingDetails) {
                    const state = detail?.supervisorState;
                    if (state) {
                        for (const key in state) {
                            const messages = state[key]?.messages;
                            if (messages?.length > 0) {
                                lastContent = messages[messages.length - 1]?.kwargs?.content || lastContent;
                            }
                        }
                    }
                }
            }

            appendLog(lastContent, false);
        } catch (error) {
            appendLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
        } finally {
            setIsLoading(false);
            setInputValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const clearLogs = () => {
        setMessages([{ content: "Logs cleared.", isUser: false, timestamp: new Date().toISOString() }]);
    };

    return (
        <div className="birthday-container">
            <a
                href="https://camerone-frontend.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="top-right-link"
            >
                Announce
            </a>

            <div className="title">Les Vœux d'Anniversaire</div>

            <div className="container">
                <div className="form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="input-field"
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
                        Vider les logs
                    </button>
                </div>

                <div className="logs" ref={logsRef}>
                    {messages.map((message, index) => (
                        <div
                            key={`${message.timestamp}-${index}`}
                            className={`message ${message.isUser ? "user-message" : "system-message"}`}
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
    );
};

export default BirthdayWishes;