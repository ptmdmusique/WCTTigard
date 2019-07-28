import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import { Text } from 'react-native';
import {Container, StyleProvider, Spinner, } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components'; 


const WebViewComp = (props) => {
  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
      {!props.data ?
        <Text>
          No Data yet!
        </Text>: 
        <WebView
          source={{ html: props.data || ""}}
        />}          
      </Container>
    </StyleProvider>
  )
}

export default WebViewComp
