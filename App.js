import React from 'react';
import { StatusBar, Platform, StatusBarStyle } from 'react-native';
import AppContainer from './src/AppContainer';
import { Root, StyleProvider, Spinner, Text, Content, Container } from 'native-base';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import material from './native-base-theme/variables/material';
import getTheme from './native-base-theme/components';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/Redux/Reducers';
import * as firebase from 'firebase';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

var FIREBASE_ENDPOINT = "https://iid.googleapis.com/iid/v1/<REGISTRATION_TOKEN>/rel/topics/<TOPIC_NAME> ";
//Should be this?
// https://iid.googleapis.com/iid/v1/<REGISTRATION_TOKEN>/rel/topics/<TOPIC_NAME> 
// https://iid.googleapis.com/iid/v1/<REGISTRATION_TOKEN>/rel/topics/wcttigard 
//Or this, using the old schema, doc as device token + query for group field
// "https://firestore.googleapis.com/v1/projects/wcttigardweb/databases/(default)/documents"
//                                      projects/wcttigardweb/databases/(default)/documents
// POST https://firestore.googleapis.com/v1/projects/wcttigardweb/databases/(default)/documents/FCMToken?documentId=someID2&key={YOUR_API_KEY}
// https://developers.google.com/apis-explorer/#search/firestore/firestore/v1/firestore.projects.databases.documents.createDocument?parent=projects%252Fwcttigardweb%252Fdatabases%252F(default)%252Fdocuments&collectionId=FCMToken&documentId=someID2&_h=2&resource=%257B%250A++%2522fields%2522%253A+%250A++%257B%250A++++%2522group%2522%253A+%250A++++%257B%250A++++++%2522stringValue%2522%253A+%2522myGroup2%2522%250A++++%257D%250A++%257D%250A%257D&
//https://firebase.google.com/docs/cloud-messaging/js/send-multiple  <----- Subscription

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      fontLoaded: false,
      
      notification: null,
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
    let docRef = firebase.firestore().collection('FCMToken').doc('test');
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