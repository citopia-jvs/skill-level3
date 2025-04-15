import React, { FunctionComponent, PropsWithChildren, useCallback, useMemo } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import InputText from '../components/input/text.tsx';
import Separator from '../components/separator.tsx';
import commonStyles from '../commonStyles.ts';
import DatePicker from '../components/input/datePicker.tsx';
import useStore from '../store';

import styles from './informations';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

const Label: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <Text style={ styles.label }>{ children }</Text>
) 

const Informations: React.FC = () => {
    const storeUser = useStore((state) => state.setUser);
    const user = useStore((state) => state.user);
    const[displayDatePicker, setDisplayDatePicker] = React.useState(false);

    const lastname = useMemo(() => user?.lastname, [ user?.lastname ]);
    const firstname = useMemo(() => user?.firstname, [ user?.firstname ]);
    const birthday = useMemo(() => user?.birthday, [ user?.birthday ]);

    const displayBirthday = useMemo(() => {
        if (!birthday) {
            return (
                <TouchableOpacity onPress={() => setDisplayDatePicker(true)}>
                    <Text style={ styles.selectDate }>Sélectionner</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={ styles.displayDateSelectedContainer}>
                    <Text>{ dayjs(birthday).format("DD/MM/YYYY") }</Text>
                    <TouchableOpacity onPress={() => setDisplayDatePicker(true)}>
                        <Text style={ styles.selectDate }>Modifier</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }, [ birthday ]);

    const setValue = useCallback((value: string | Date, key: string) =>  storeUser({ ...user, [key]: value }), [ user ]);
    
    const setDateAndClosePicker = useCallback((date: Date) => {
        setValue(date, "birthday");
        setDisplayDatePicker(false);
    }, [ setValue ]);

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Informations de l'utilisateur</Text>
            <Label>Votre nom</Label>
            <InputText
                placeholder="Entrez un nom..."
                value={ lastname }
                onChange={(text) => setValue(text, "lastname")}
                autoFocus
            />
            <Separator height={ commonStyles.stdInterElementLarge } />
            <Label>Votre Prénom</Label>
            <InputText
                placeholder="Entrez un prénom..."
                value={ firstname }
                onChange={(text) => setValue(text, "firstname")}
            />
            <Separator height={commonStyles.stdInterElementLarge} />
            <Label>Votre date de naissance</Label>
            { displayBirthday }
            { displayDatePicker && <DatePicker value={ birthday } onChange={ setDateAndClosePicker } onCancel={() => setDisplayDatePicker(false) } /> }
            <Separator height={ commonStyles.stdInterElementLarge } />
        </View>
    );
};

export default Informations;