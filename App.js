import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AppContainer from './src/AppContainer';
import {Root, StyleProvider, Spinner, Text, Content, Container} from 'native-base';
import {Image} from 'react-native';
import { Font, AppLoading } from 'expo';
import material from './native-base-theme/variables/material';
import getTheme from './native-base-theme/components';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux/Reducers';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    setTimeout(() => {this.setState({isReady: true})}, 500);

    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'VarelaRound': require('./assets/fonts/VarelaRound/VarelaRound-Regular.ttf'),
      'LiberationSans-Bold': require('./assets/fonts/LiberationSans/LiberationSans-Bold.ttf'),
      'LiberationSans-Regular': require('./assets/fonts/LiberationSans/LiberationSans-Regular.ttf'),
      'Merriweather_Bold': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf'),
      'Merriweather_Light': require('./assets/fonts/Merriweather/Merriweather-Light.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading/>
    }

    if (!this.state.isReady){
      return (
        <StyleProvider style={getTheme(material)}>
            <Container>
            <Content 
                contentContainerStyle={{
                    flex: 1, 
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                    <Image source={require('./assets/images/sidebar-logo.png')}/>
                    <Text style={{fontSize: 15, textAlign: 'center'}}>Master Eric's{'\n'}World Champion Taekwondo</Text>
                    <Spinner color='red'/>
                </Content>
            </Container>
        </StyleProvider>
      )
      
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