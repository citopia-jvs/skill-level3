import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text, Image, Button } from 'react-native';
import useStore from '../store';
import { getDummyImage, getNbrDaysUntilBirthday } from '../lib/user';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../index';
import Separator from '../components/separator';
import dayjs from 'dayjs';
import PhotoPicker from '../components/input/photoPicker.tsx';

import styles from "./home";
import commonStyles from '../commonStyles';

const Home: React.FC = () => {
    const user = useStore((state) => state.user);
    const storeUser = useStore((state) => state.setUser);
    const storeUserAvatar = useStore((state) => state.setUserAvatar);
    const [image, setImage] = React.useState<string | null>(null);
    const navigation = useNavigation<RootNavigationProp>();

    const birthdayText = useMemo(() => {
        if (!user?.birthday) {
            return "Aucune date de naissance de paramétré";
        }

        const daysUntilBirthday = getNbrDaysUntilBirthday(user.birthday);

        if (daysUntilBirthday === 0) {
            return "Joyeux anniversaire ! 🎉";
        } else {
            return `Votre anniversaire est dans ${daysUntilBirthday} jour(s)`;
        }
    }, [ user ]); 

	useEffect(() => {
        const getImage = async () => {
            if (!user) {
                setImage(null);
				return;
            }
			if (user.avatar) {
				setImage(user.avatar);
				return;
			}

			const dummyImage = await getDummyImage(user.firstname || "John", user.lastname || "Doe", 300, 300); 
            setImage(dummyImage);
        }    
        getImage();    
    },  [ user ]);

    const btnTitle = useMemo(() => {
        if (!user) {
            return "Ajouter un utilisateur";
        }
        return "Changer d'utilisateur";
    }, [ user ]);

    const source =  useMemo(() => {
        if (!image) {
            return require('../assets/empty_user.png');
        }
        return { uri: image };
    }, [ image ]);

    const updateUserAvatar = useCallback((uri: string | null) => storeUserAvatar(uri), [ user ]);
    const deleteAvatar = useCallback(() => updateUserAvatar(null), [ updateUserAvatar ]);
    const deleteAvatarBtn = useMemo(() => {
		if (!user?.avatar) {
			return null;
		}	
		return (
			<>
				<Separator height={commonStyles.stdInterElementSmall} />
				<Button title="Supprimer l'avatar" onPress={ deleteAvatar } color={ commonStyles.stdColorRed }/>
			</>
		);
	}, [ user ]);

    const navigateToUserPage = useCallback(() => navigation.navigate("Profile"), [ navigation ]);

    const deleteUser = useCallback(() => storeUser(null), []);

    return (
        <View style={ styles.container }>
			<View style={ styles.content}>
				<Image
					testID='userImage'
					source={ source }
					style={ styles.image }
				/>
				{ user && (<PhotoPicker title="Ajouter un avatar" onFileSelected={ updateUserAvatar } />) }
				{ deleteAvatarBtn }
				<Separator height={commonStyles.stdInterElementLarge} />
				<Text style={ styles.text }>{birthdayText }</Text>
			</View>
            <View>
                <Button
                    title={ btnTitle }
                    onPress={ navigateToUserPage }
                    color={ commonStyles.stdColorOrange}
                />
                <Separator height={ commonStyles.stdInterElementLarge } />
                {user && (
                    <Button
                        title={ "Supprimer l'utilisateur" }
                        onPress={ deleteUser }
                        color={ commonStyles.stdColorRed}
                    />
                )}
            </View>
        </View>
    );
};

export default Home;