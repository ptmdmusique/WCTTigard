import React from 'react';
import {Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {StyleSheet, WebView, AppState} from 'react-native';

export default class VideoScreen extends React.Component {
  state = {
    appState: AppState.currentState
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
            {this.state.appState == 'active' &&
            <WebView 
              style={{height: 200, width: 400}}
              javaScriptEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/1CTced9CMMk'}}
            />
            }
          </Content>

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
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 300, height: 300
  },
})