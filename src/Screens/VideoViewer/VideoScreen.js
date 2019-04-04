import React from 'react';
import {Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, AppState, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Grid, Row, Col} from 'react-native-easy-grid';

export default class VideoScreen extends React.Component {
  state = {
    vidID: 'sdf',
    appState: AppState.currentState,
    screenSwitched: false,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    this.setState({vidID: 'http://www.youtube.com/embed/' + this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc")});
    console.log(this.state.vidID);
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
        source={{uri: this.state.vidID}}
      />
    );
  }

  getEmbedFromLink(url){
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
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

          <NavigationEvents
              onWillFocus={() => this.setState({ screenSwitched: false })}
              onWillBlur={() => this.setState({ screenSwitched: true })}
            />

            <Grid style={styles.content}>
              <Row size={4} style={{backgroundColor: 'red'}}>
                {this.renderVideo()}
              </Row>

              <Row size={6} style={{backgroundColor: 'blue'}}>
                <Text>
                  Some text!
                </Text>
              </Row>
            </Grid>

            <Footer style={styles.footer}>
              <Text> Enjoy? Join us! </Text>
            </Footer>
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  header: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: 2, 
    borderBottomColor: '#FF1515',
  },
  footer: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderTopWidth: 2, 
    borderTopColor: '#FF1515',
  },
})