import React from 'react';
import { Container, StyleProvider, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { WebView, AppState, View, FlatList, } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import VideoFolder from './VideoFolder';

import MOCK_VIDEOS from '../../../Database/Videos/VideoList.json';

import CustomHeader from '../../CommonComponents/CustomHeader';

export default class VideoScreen extends React.Component {
  state = {
    appState: AppState.currentState,
    screenSwitched: false,
    currentVidUrl: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc"),
    // defaultURL: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc")
  }

  componentDidMount() {
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
          <CustomHeader title='Videos' navigation={this.props.navigation} />

          <NavigationEvents
              onWillFocus={() => this.setState({ screenSwitched: false })}
              onWillBlur={() => this.setState({ screenSwitched: true })}
            />

          {/* <Grid>
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
          </Grid> */}

          <View style={{backgroundColor: '#ddd'}}>
            <FlatList
              data = {MOCK_VIDEOS}
              renderItem={this.renderFolder}
              keyExtractor={folder => folder.folderName.toString()}
            />
          </View>

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