import { StyleSheet } from 'react-native';

import commonStyles from '../commonStyles';

const styles = StyleSheet.create({
   container: {
    padding: commonStyles.stdPaddingLarge,
    flex: 1
   },
   label: {
      paddingBottom: commonStyles.stdPaddingSmall,
      color: commonStyles.stdColorGray,
      fontWeight: "bold"
   },
   selectDate: {
      color: commonStyles.stdColorOrange,
      fontSize: commonStyles.stdFontSizeLarge
   },
   displayDateSelectedContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: commonStyles.stdInterElementLarge
   },
   cancelDate: {
      color: "red",
      fontSize: commonStyles.stdFontSizeLarge
   },
   title: {
      fontSize: commonStyles.stdFontSizeVeryLarge,
      fontWeight: "bold",
      paddingBottom: commonStyles.stdPaddingLarge
   }
});

export default styles;