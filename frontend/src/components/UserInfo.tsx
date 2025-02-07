// src/components/BirthdayWishes/UserInfo.tsx
import React from "react";

class UserData {
    avatarUrl: any;
    birthDate: any;
    name: any;
}

export const UserInfo: React.FC<{ userData: UserData }> = ({ userData }) => (
    <div className="user-info">
        <div className="avatar-container">
            {userData.avatarUrl ? (
                <img
                    src={userData.avatarUrl}
                    alt="User avatar"
                    className="avatar-image"
                />
            ) : (
                <div className="skeleton-avatar" />
            )}
        </div>
        <h2 className="welcome-text">Welcome, {userData.name}!</h2>
        <p className="birthday-text">
            Birthday: {new Date(userData.birthDate).toLocaleDateString()}
        </p>
    </div>
);