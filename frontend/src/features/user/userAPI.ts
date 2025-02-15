// src/features/user/userAPI.ts
import axios from 'axios';
import { setAvatarUrl, updateLastFetchedInfo } from './userSlice';
import { AppDispatch } from '@/store/store';

interface User {
    image: string;
}

export const fetchUserAvatar = async (
    firstName: string,
    lastName: string,
    dispatch: AppDispatch
): Promise<string | null> => {
    try {
        console.log('Fetching user avatar...');

        if (!firstName || !lastName) {
            console.warn('Missing firstName or lastName, skipping avatar fetch.');
            dispatch(setAvatarUrl(''));
            return null;
        }

        const response = await axios.get('https://dummyjson.com/users');
        console.log('DummyJSON Response:', response.data);

        if (response.data.users && response.data.users.length > 0) {
            const usersWithImages = response.data.users.filter((user: User) => user.image);
            if (usersWithImages.length > 0) {
                const randomUser = usersWithImages[Math.floor(Math.random() * usersWithImages.length)];
                console.log('Selected User with Image:', randomUser);

                const avatarUrl = randomUser.image;
                dispatch(setAvatarUrl(avatarUrl));
                dispatch(updateLastFetchedInfo());  // Now this will work
                return avatarUrl;
            }
        }

        console.warn('No valid avatars found in DummyJSON, using fallback...');
        const defaultAvatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(`${firstName}-${lastName}`)}`;
        console.log('Using default avatar:', defaultAvatar);
        dispatch(setAvatarUrl(defaultAvatar));
        dispatch(updateLastFetchedInfo());  // Now this will work
        return defaultAvatar;

    } catch (error) {
        console.error('Error fetching avatar:', error);
        dispatch(setAvatarUrl(''));
        return null;
    }
};