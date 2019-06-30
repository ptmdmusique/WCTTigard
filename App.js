import React from 'react';
import { StatusBar, Platform, StatusBarStyle } from 'react-native';
import AppContainer from './src/AppContainer';
import { Root, StyleProvider, Spinner, Text, Content, Container } from 'native-base';
import { Image } from 'react-native';
import { Font, AppLoading } from 'expo';
import material from './native-base-theme/variables/material';
import getTheme from './native-base-theme/components';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux/Reducers';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      fontLoaded: false,
    };
    
    
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDAN3pQfUqF5rVmz2xOcc8j2QDmeDsPO4Q",
      authDomain: "wcttigardweb.firebaseapp.com",
      databaseURL: "https://wcttigardweb.firebaseio.com",
      storageBucket: "wcttigardweb.appspot.com",
      projectId: "wcttigardweb",

    };

    firebase.initializeApp(firebaseConfig);
  }

  async componentDidMount() {
    //setTimeout(() => {this.setState({isReady: true})}, 500);
    this.setState({ isReady: true });

    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Ubuntu-Regular': require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
      'Ubuntu-Medium': require('./assets/fonts/Ubuntu/Ubuntu-Medium.ttf'),
      'Ubuntu-Bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
      'VarelaRound': require('./assets/fonts/VarelaRound/VarelaRound-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const isIOS = Platform.OS === 'ios';

    if (!this.state.fontLoaded) {
      return <AppLoading/>
    }

    if (!this.state.isReady) {
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
                    <Text style={{fontSize: 15, textAlign: 'center'}}>Master Eric's{"\n"}World Champion Taekwondo</Text>
                    <Spinner color='red'/>
                </Content>
            </Container>
        </StyleProvider>
      );
      
    }

    return (
      <Provider store={createStore(reducers)}>
        <Root>
          {/* <StatusBar hidden={!isIOS} backgroundColor='black' barStyle='dark-content' /> */}
          <StatusBar hidden />
          <AppContainer></AppContainer>
        </Root>
      </Provider>
    );
  }
}