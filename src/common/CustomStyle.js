import {StyleSheet} from 'react-native';

//Custom style
export const customStyles = StyleSheet.create({
    header: {
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      shadowRadius: 5,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    footer: {
      height: 60, 
      justifyContent: 'center', 
      alignItems: 'center',
  
      shadowRadius: 5,
      elevation: 10,
      zIndex: 10,
    },
    headerText:{
      fontSize: 25,
      color: 'black',
      alignSelf: 'center',
    },
    headerIcon:{
      color: '#e53110',
      fontSize: 30,
    },
  })


  /*
  Some color to consider:
      #e53110
    Header
      #3ccdcd
      #2658cd
    Border
      #ebebeb
    Icon
      #FF6961

  Some font to consider
    Arial
  */