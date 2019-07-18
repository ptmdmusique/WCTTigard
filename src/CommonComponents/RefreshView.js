import React from 'react';
import { Container, Icon, StyleProvider, Text, Button } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import { StyleSheet, View, Dimensions } from 'react-native';

import { BoxShadow, } from 'react-native-shadow';
import '@firebase/firestore';

var {height, width} = Dimensions.get('window');

export default class RefreshView extends React.Component {
  render () {
    return (
      <View style={ styles.reloadContainer }>
        <View style={{ alignSelf: 'center', }}>
          <BoxShadow setting={shadowOpt}>
            <Button 
              onPress={() => this.props.refresh()}
              style={ [styles.refreshButton, styles.glowingRed] } 
              rounded >
              <Icon 
                name="md-refresh" 
                type="ionicons"
                style={{ color: 'white', fontSize: 25, marginRight: 0, marginLeft: 0, }} 
              />
            </Button>
          </BoxShadow>    
          <Text style={{ marginTop: 10, color: 'white', }}>
            Refresh
          </Text>
        </View>
      </View>
    );
  };
}

styles = StyleSheet.create({
  reloadContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 0.15 * height,
    width: width,
    backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
    alignItems: 'center',
    alignContent: 'center', 
    justifyContent: 'center', 
  },
  refreshButton: {
    height: 50,
    width: 50,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#FE4141',
    backgroundColor: 'transparent',
    alignSelf: 'center',    
    alignItems: 'center',   
    justifyContent: 'center',
  },
  glowingRed: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
})

const shadowOpt = {
  height: 50,
  width: 50,
  color:"#ab000d",
  border: 1,
  radius: 25, 
  opacity: 0.07,
  x:0,
  y:0,
}