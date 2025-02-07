// src/components/BirthdayWishes/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { UserInfo } from './UserInfo.tsx';
import { MessageForm } from '../MessageForm';
import { LogsDisplay } from '../LogsDisplay';
import { SpotifyPlayer } from './SpotifyPlayer.tsx';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import './Birthday.css';

interface UserData {
    name: string;
    birthDate: string;
    avatarUrl?: string;
}

const BirthdayWishes: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorDisplay error={error} onRetry={() => setError(null)} />
            ) : !userData ? (
                <UserForm onSubmit={setUserData} />
            ) : (
                <div className="container">
                    <UserInfo userData={userData} />
                    <MessageForm />
                    <LogsDisplay />
                    <SpotifyPlayer />
                </div>
            )}
        </div>
    );
};

// Separate component for the user form
const UserForm: React.FC<{ onSubmit: (data: UserData) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<UserData>({
        name: '',
        birthDate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    type="text"
                    className="input-field"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="birthDate">Birth Date</label>
                <input
                    id="birthDate"
                    type="date"
                    className="input-field"
                    value={formData.birthDate}
                    onChange={e => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                    required
                />
            </div>
            <button type="submit" className="submit-btn">
                Continue
            </button>
        </form>
    );
};

// Error display component
const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
    <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="retry-button" onClick={onRetry}>
            Try Again
        </button>
    </div>
);

export default BirthdayWishes;