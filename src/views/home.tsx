import React, { use, useEffect, useMemo } from 'react';
import { View, Text, Image, Button } from 'react-native';

import styles from "./home";
import useStore from '../store';
import { getDummyImage } from '../lib/user';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../index';
import Separator from '../components/separator';

import commonStyles from '../commonStyles';
import dayjs from 'dayjs';

const Home: React.FC = () => {
    const user = useStore((state) => state.user);
    const [image, setImage] = React.useState<string | null>(null);
    const navigation = useNavigation<RootNavigationProp>();

    const birthdayText = useMemo(() => {
        if (!user) {
            return "Aucun utilisateur de paramétré";
        }

        const today = dayjs().startOf('day');
        const birthDate = dayjs(user.birthday).startOf('day');

        let nextBirthday = dayjs(new Date(
            today.year(),
            birthDate.month(),
            birthDate.date()
        )).startOf('day');
        
        // Si cette date est déjà passée, on prend l'anniversaire de l'année prochaine
        if (nextBirthday.isBefore(today)) {
            nextBirthday = nextBirthday.add(1, 'year');
        }

        // On calcule le nombre de jours entre aujourd'hui et le prochain anniversaire
        const daysUntilBirthday = nextBirthday.diff(today, 'day');


        if (daysUntilBirthday === 0) {
            return "Joyeux anniversaire ! 🎉";
        } else {
            return `Votre anniversaire est dans ${daysUntilBirthday} jour(s)`;
        }
    }, [ user ]); 

    useEffect(() => {
        const getImage = async () => {
            if (!user) {
                return;
            }
            const dummyImage = await getDummyImage(user.firstname || "John", user.lastname || "Doe", 300, 300); 
            setImage(dummyImage);
        }    
        getImage();    
    },  [ user ]);

    const navigateToUserPage = () => {
        navigation.navigate("Profile");
    };

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

    return (
        <View style={ styles.container }>
            <Image
                testID='userImage'
                source={ source }
                style={ styles.image }
            />
            <Text style={ styles.text }>{birthdayText }</Text>
            <Separator height={ commonStyles.stdInterElementLarge } />
            <Button
                title={ btnTitle }
                onPress={ navigateToUserPage }
                color={ commonStyles.stdColorOrange}
            />
        </View>
    );
};

export default Home;