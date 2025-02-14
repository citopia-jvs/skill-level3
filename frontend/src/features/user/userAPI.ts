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

        // Prevent fetching when name fields are empty
        if (!firstName || !lastName) {
            console.warn('Missing firstName or lastName, skipping avatar fetch.');
            dispatch(setAvatarUrl('')); // Set avatarUrl to empty string
            return null;
        }

        // Fetch DummyJSON users
        const response = await axios.get('https://dummyjson.com/users');
        console.log('DummyJSON Response:', response.data);

        if (response.data.users && response.data.users.length > 0) {
            // Pick a random user that has an image
            const usersWithImages = response.data.users.filter((user: User) => user.image);
            if (usersWithImages.length > 0) {
                const randomUser = usersWithImages[Math.floor(Math.random() * usersWithImages.length)];
                console.log('Selected User with Image:', randomUser);

                const avatarUrl = randomUser.image;
                dispatch(setAvatarUrl(avatarUrl));
                // Update last fetched info
                dispatch(updateLastFetchedInfo());
                return avatarUrl;
            }
        }

        console.warn('No valid avatars found in DummyJSON, using fallback...');

        // Fallback to Pravatar
        const defaultAvatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(`${firstName}-${lastName}`)}`;
        console.log('Using default avatar:', defaultAvatar);
        dispatch(setAvatarUrl(defaultAvatar));
        // Update last fetched info
        dispatch(updateLastFetchedInfo());
        return defaultAvatar;

    } catch (error) {
        console.error('Error fetching avatar:', error);
        dispatch(setAvatarUrl('')); // Set avatarUrl to empty string on error
        return null;
    }
};