import {StyleSheet} from 'react-native';

//Custom style
export const customStyles = StyleSheet.create({
    header: {
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      shadowRadius: 10,
      elevation: 5,
      zIndex: 5,
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
      fontFamily: 'Ubuntu_Bold', 
      color: 'black',
    },
    headerIcon:{
      color: '#FF6961',
      fontSize: 20,
    },
  })


  /*
  Some color to consider:
    Header
      #3ccdcd
      #2658cd
    Border
      #ebebeb
    Icon
      #FF6961
  */