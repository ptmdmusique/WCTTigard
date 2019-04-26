import React from 'react';
import {Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, AppState, View, FlatList, Image, } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Grid, Row, Col} from 'react-native-easy-grid';
import Toast from 'react-native-simple-toast';

import VideoFolder from './VideoFolder';

import MOCK_VIDEOS from '../../../database/Videos/VideoList.json';

import {connect} from 'react-redux';
import {customStyles} from '../../common/CustomStyle';

export default class VideoScreen extends React.Component {
  state = {
    appState: AppState.currentState,
    screenSwitched: false,
    currentVidUrl: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc"),
    // defaultURL: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc")
  }

  componentDidMount() {
    // Toast.show("Tip: Click and hold the link to copy!", Toast.SHORT);
    AppState.addEventListener('change', this._handleAppStateChange);
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
        javaScriptEnabled={true}
        source={{uri: this.state.currentVidUrl}}
      />
    );
  }

  getEmbedFromLink(url){
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
        return 'http://www.youtube.com/embed/' + match[2];
    } else {
        return this.defaultURL;
    }
  }

  selectVideo(vidUrl) {
    this.setState({ currentVidUrl: this.getEmbedFromLink(vidUrl) });
  }

  renderFolder = (folder) => {
    return <VideoFolder folder={folder.item} selectVideo={(url) => this.selectVideo(url)} />
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header}>
            <Left style={{flex: 1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon style={customStyles.headerIcon}  name='menu'/>
              </Button>
            </Left>

            <Body style={{flex: 3}}>
              <Title style={customStyles.headerText}> Videos </Title>
            </Body>

            <Right style={{flex: 1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                    style={{height: 40, width: 40}}/>              
            </Right>
          </Header>

          <NavigationEvents
              onWillFocus={() => this.setState({ screenSwitched: false })}
              onWillBlur={() => this.setState({ screenSwitched: true })}
            />

          <Grid>
            <Row size={4} style={{borderBottomColor: '#666', borderBottomWidth: 4, elevation: 5}}>
              {this.renderVideo()}
            </Row>

            <Row size={6} style={{backgroundColor: '#ddd'}}>
              <Grid>
               
                <Row style={{}}>
                  <FlatList
                    data = {MOCK_VIDEOS}
                    renderItem={this.renderFolder}
                    keyExtractor={folder => folder.folderName.toString()}
                  />
                </Row>
              </Grid>
            </Row>
          </Grid>


        </Container>
      </StyleProvider>
    );
  }
}

// const mapStateToProps = (state) => {
//   const vidURL = state.selectedItem.vidURL;
  
//   return {vidURL}
// };

// export default connect(mapStateToProps)(VideoScreen);