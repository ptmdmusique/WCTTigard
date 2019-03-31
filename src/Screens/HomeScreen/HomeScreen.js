import React from 'react';
import { View, Text } from 'react-native';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{marginTop: 50, backgroundColor: 'red'}}>
        <Text onPress={() => this.props.navigation.openDrawer()}>Open Drawer!!</Text>
      </View>
    );
  }
}