import React from 'react';
import { StatusBar, Platform, } from 'react-native';
import AppContainer from './src/AppContainer';
import { Root, StyleProvider, Spinner, Text, Content, Container } from 'native-base';
import { Image } from 'react-native';
import { Font, AppLoading } from 'expo';
import material from './native-base-theme/variables/material';
import getTheme from './native-base-theme/components';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux/Reducers';
import * as firebase from 'firebase/app';

import { Permissions, Notifications, } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      fontLoaded: false,
      
      notification: null,
    };

    //USER ID
    //ptmdmusique
    //global.uid = "rtJagOTuloWzHv8H4Q9zkH9Ugei2";
    //WCTTigard 
    global.uid = "up9uVP8l43csXumPi9okIWTUcuH2";
    //Test
    global.uid = "test";
    
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

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      //TODO: WARN THE USER HERE
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    //TODO: CHANGE THIS
    let docRef = firebase.firestore().collection('FCMToken').doc(global.uid);
    docRef.set({
      list: firebase.firestore.FieldValue.arrayUnion(token)
    }, { merge: true }).then(
      console.log("Add Token successfully!")
    ).catch(err => {
      console.log(err);
    })

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      console.log("--Registering notification channel");
      Notifications.createChannelAndroidAsync('wcttigard', {
        name: "WCT Tigard's Important Messages",
        description: "Notification setting for WCT Tigard's important messages",
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    
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
 
    this.registerForPushNotificationsAsync();
  }

  render() {
    console.disableYellowBox = true;

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