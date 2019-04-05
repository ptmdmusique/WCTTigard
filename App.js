import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AppContainer from './src/AppContainer';
import {Root} from 'native-base';
import { Font, AppLoading } from 'expo';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux/Reducers';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'VarelaRound': require('./assets/fonts/VarelaRound/VarelaRound-Regular.ttf'),
      'Ubuntu_Bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
      'Ubuntu_Light': require('./assets/fonts/Ubuntu/Ubuntu-Light.ttf'),
      'Merriweather_Bold': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf'),
      'Merriweather_Light': require('./assets/fonts/Merriweather/Merriweather-Light.ttf'),
    });
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <Provider store={createStore(reducers)}>
        <Root>
          <StatusBar hidden />
          <AppContainer></AppContainer>
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
