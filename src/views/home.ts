import { StyleSheet } from 'react-native';

import commonStyles from '../commonStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: commonStyles.stdPaddingLarge,
        justifyContent: "space-between"
    },
    text: {
        fontSize: commonStyles.stdFontSizeVeryLarge
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: commonStyles.stdRadiusRegular,
        marginBottom: commonStyles.stdPaddingLarge
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }


});

export default styles;