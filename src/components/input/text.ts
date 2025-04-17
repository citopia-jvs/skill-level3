import { StyleSheet } from 'react-native';

import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: commonStyles.stdPaddingSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: commonStyles.stdRadiusSmall
  },
  viewFocused: {
    borderColor: '#fa7251'
  },
  viewBlured: {
    borderColor: 'grey',
  }
})

export default styles;