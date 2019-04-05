import React from 'react';
import {ScrollView, Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, AppState, View, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Grid, Row, Col} from 'react-native-easy-grid';

import VideoFolder from './VideoFolder';

import data from './VideoList.json';

class VideoScreen extends React.Component {
  state = {
    vidID: '',
    appState: AppState.currentState,
    screenSwitched: false,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    this.setState({vidID: 'http://www.youtube.com/embed/' + this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc")});
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
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

  renderFolder(folder){
    return <VideoFolder folder={folder.item} />
  }

  render () {
    const gridItems = [];
  
    for(let i = 0; i < data.length; i++){
      gridItems.push(
        <Row key={data[i].folderName}> 
          <VideoFolder folder={data[i]}/> 
        </Row>          
      )
    }
    
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
                <Container>
                  <Header style={{...styles.header, borderBottomWidth: 0, height: 25}}>
                    <Text> Available Videos </Text>
                  </Header>
                  
                  <Grid
                    style={{top: 10}}
                  >
                    {gridItems}
                  </Grid>
                </Container>
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

export default VideoScreen;

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