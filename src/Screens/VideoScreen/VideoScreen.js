import React from 'react';
import { Container, StyleProvider, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, FlatList, } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { WebView } from 'react-native-webview';

import RefreshView from '../../CommonComponents/RefreshView';
import VideoFolder from './VideoFolder';
import CustomHeader from '../../CommonComponents/CustomHeader';

import * as firebase from 'firebase'

export default class VideoScreen extends React.Component {
  state = {
    screenSwitched: false,
    currentVidUrl: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc"),
    
    videoFolderList: null,
    isLoading: true,
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    //TODO: Change this
    this.setState({ isLoading: true }, () => {
      firebase.firestore().collection('VideoScreen').doc(global.uid).get()
      .then( doc => {
        console.log("--Video loaded!");
        this.setState({ videoFolderList: doc.data().videoFolderList }, 
          () => this.setState({ isLoading: false }))
      })
      .catch(err => {
        console.log("--No video to load!'")
        this.setState({ isLoading: false })
        console.log(err);
      })
    })
  }

  renderVideo() {
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

          { this.state.isLoading ? <Spinner/> : 
              <View style={{backgroundColor: '#ddd'}}>
                <FlatList
                  data = {this.state.videoFolderList}
                  renderItem={this.renderFolder}
                  keyExtractor={folder => folder.folderName.toString()}
                />
              </View>
          }

          <RefreshView refresh={this.refresh}/>
        </Container>
      </StyleProvider>
    );
  }
}