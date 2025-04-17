import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const withSafeArea = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {    
    const ComponentWithSafeArea: React.FC<P> = (props) => {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', "bottom"]}>
                <WrappedComponent {...props} />
            </SafeAreaView>
        );
    };

    return ComponentWithSafeArea;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default withSafeArea;