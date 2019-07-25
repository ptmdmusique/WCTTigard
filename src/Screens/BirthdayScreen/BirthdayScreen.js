import React, { Component } from 'react'
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from '../../CommonComponents/CustomHeader';
import {Container, StyleProvider, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components'; 
import RefreshView from '../../CommonComponents/RefreshView';

import * as firebase from 'firebase/app';

export class BirthdayScreen extends Component {
  state = {
    data: "",
    isLoading: true,
  }

  componentDidMount() {
    //TODO: CHANGE THIS
    firebase.firestore().collection('BirthdayScreen').doc(global.uid).get()
    .then( doc =>
      this.setState({data: doc.data().birthdayContent }, () => this.setState({isLoading: false}))
    )
    .catch(err => {
      console.log("--No birthday to load");
      this.setState({ isLoading: false });
      console.log(err);
    })
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
        <CustomHeader title='Birthday Party' navigation={this.props.navigation} />

        {this.state.isLoading ? <Spinner/> : 
          <WebView
            source={{ html: this.state.data || ""}}
          />}
          
          {Platform.OS === "ios" ? <RefreshView navigation={this.props.navigation}/> : null}
        </Container>
      </StyleProvider>
    )
  }
}

export default BirthdayScreen
