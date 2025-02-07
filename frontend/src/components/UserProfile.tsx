import React, { useEffect, useState } from 'react';
import { fetchUser, User } from '../api/userService';

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await fetchUser();
            setUser(fetchedUser);
        };

        getUser();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>Birth Date: {user.birthDate}</p>
                    <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
};

export default UserProfile;
