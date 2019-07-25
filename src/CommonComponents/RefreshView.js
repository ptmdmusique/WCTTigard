import React from 'react';
import { Icon, Text, Left, Body, Right } from 'native-base';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

import '@firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window');

export default class RefreshView extends React.Component {
  renderBody = () => {
    if (Platform.OS === "ios"){
      if (this.props.refresh) {
        return (
          <View style={{ alignSelf: 'flex-start', paddingLeft: 20, flexDirection: 'row', }}>
            <Left style={{ flex: 1 }}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Home')}
                style={ [styles.refreshButton, styles.glowingRed] } 
              >
                <View style={ styles.refreshIconContainer }>
                  <Icon 
                    name="angle-left" 
                    type="FontAwesome"
                    style={ styles.refreshIcon } 
                  />
                </View>
                <Text style={{ color: 'white', marginLeft: 10 }}>
                  Go Back
                </Text>
              </TouchableOpacity>   
            </Left>
  
            <Body style={{ flex: 1 }}>
  
            </Body>
  
            <Right style={{ flex: 1, marginRight: 20, }}>
              <TouchableOpacity 
                onPress={() => this.props.refresh()}
                style={ [styles.refreshButton, styles.glowingRed] } 
              >
                <Text style={{ color: 'white', marginRight: 10 }}>
                  Refresh
                </Text>
                <View style={ styles.refreshIconContainer }>
                  <Icon 
                    name="md-refresh" 
                    type="Ionicons"
                    style={ styles.refreshIcon } 
                  />
                </View>
              </TouchableOpacity>   
            </Right>
          </View>
        )
      } else {
        return (
          <View style={{ alignSelf: 'flex-start', paddingLeft: 20, flexDirection: 'row', }}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Home')}
              style={ [styles.refreshButton, styles.glowingRed] } 
            >
              <View style={ styles.refreshIconContainer }>
                <Icon 
                  name="angle-left" 
                  type="FontAwesome"
                  style={ styles.refreshIcon } 
                />
              </View>
              <Text style={{ color: 'white', marginLeft: 10 }}>
                Go Back
              </Text>
            </TouchableOpacity>   
          </View>
        )
      }
    } else {
      return (
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
      )
    }
  }

  render () {
    return (
      <View style={ styles.reloadContainer }>
        {this.renderBody()}
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