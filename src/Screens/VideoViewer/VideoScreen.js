import React from 'react';
import {Text, View} from 'react-native';

export default class VideoScreen extends React.Component {
  render () {
    return (
      <View style={{marginTop: 50, backgroundColor: 'red'}}>
        <Text onPress={() => this.props.navigation.openDrawer()}>Video Test</Text>
      </View>
    );
  };
}