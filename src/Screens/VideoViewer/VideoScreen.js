import React from 'react';
import {Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, AppState, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class VideoScreen extends React.Component {
  state = {
    appState: AppState.currentState,
    screenSwitched: false,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
    this.setState({appState: nextAppState});
  }

  renderVideo() {
    if (this.state.appState !== 'active' || this.state.screenSwitched) {
      return <View />;
    }

    return (
      <WebView 
        style={styles.mainVideo}
        javaScriptEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/1CTced9CMMk'}}
      />
    );
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={styles.header}>
            <Left>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu'/>
              </Button>
            </Left>

            <Body style={{}}>
              <Title style={{fontFamily: 'Ubuntu_Bold'}}> Videos </Title>
            </Body>

            <Right></Right>
          </Header>

          <Content>
            <NavigationEvents
              onWillFocus={() => this.setState({ screenSwitched: false })}
              onWillBlur={() => this.setState({ screenSwitched: true })}
            />

            {this.renderVideo()}
          </Content>

        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  mainVideo: {
    height: 300, // temp
    width: 'auto',
  }
})