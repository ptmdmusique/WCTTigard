import React from 'react';
import { Container, StyleProvider, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, FlatList, SafeAreaView, } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { WebView } from 'react-native-webview';

import RefreshView from '../../CommonComponents/RefreshView';
import VideoFolder from './VideoFolder';
import CustomHeader from '../../CommonComponents/CustomHeader';

import * as firebase from 'firebase'

export default class VideoScreen extends React.Component {
  state = {    
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
        console.warn("--No video to load!'")
        this.setState({ isLoading: false })
        console.warn(err);
      })
    })
  }

  renderFolder = (folder) => {
    return <VideoFolder folder={folder.item} selectVideo={(url) => this.selectVideo(url)} />
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='Videos' navigation={this.props.navigation} />

          { this.state.isLoading ? <Spinner/> : 
              <SafeAreaView style={{ flex: 1, }}>
                <View style={{backgroundColor: '#ddd'}}>
                  <FlatList
                    data = {this.state.videoFolderList}
                    renderItem={this.renderFolder}
                    keyExtractor={folder => folder.folderName.toString()}
                  />
                </View>
              </SafeAreaView>
          }

          <RefreshView refresh={this.refresh} navigation={this.props.navigation}/>
        </Container>
      </StyleProvider>
    );
  }
}