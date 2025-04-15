import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    width: "100%",
    alignItems: "center"
  },
  viewFocused: {
    borderColor: '#fa7251'
  },
  viewBlured: {
    borderColor: 'grey',
  },
  textContainer: {
    flexGrow: 1
  }  
})

export default styles;