import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Home from './views/home.tsx';
import Informations from './views/informations.tsx';
import { NavigationContainer } from "@react-navigation/native";
import withSafeArea from "./hoc/withSafeArea.tsx";

const HomeWithSafeArea = withSafeArea(Home);
const InformationsWithSafeArea = withSafeArea(Informations);

export type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();

const Root: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
                <Stack.Screen name="Home" component={ HomeWithSafeArea } options={{ title: "Accueil" }} />
                <Stack.Screen name="Profile" component={ InformationsWithSafeArea } options={{ title: "Informations" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Root;