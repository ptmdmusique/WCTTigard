import React from 'react';
import { Container, Icon, StyleProvider, Text, Button } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import { StyleSheet, View, Dimensions } from 'react-native';

import { BoxShadow, } from 'react-native-shadow';
import '@firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window');

export default class RefreshView extends React.Component {
  render () {
    return (
      <View style={ styles.reloadContainer }>
        <View style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
          <TouchableOpacity 
            onPress={() => this.props.refresh()}
            style={ [styles.refreshButton, styles.glowingRed] } 
          >
            <View style={ styles.refreshIconContainer }>
              <Icon 
                name="md-refresh" 
                type="Ionicons"
                style={ styles.refreshIcon } 
              />
            </View>
            <Text style={{ color: 'white', marginLeft: 10 }}>
              Refresh
            </Text>
          </TouchableOpacity>   
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
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  refreshButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  refreshIconContainer: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#FE4141',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    color: 'white',
    fontSize: 25,
  },
  glowingRed: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
})