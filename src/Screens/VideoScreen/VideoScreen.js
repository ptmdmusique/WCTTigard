import React from 'react';
import {Spinner, Title, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, AppState, View, FlatList, Image, } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {Grid, Row, Col} from 'react-native-easy-grid';

import VideoFolder from './VideoFolder';

import data from './VideoList.json';

import {connect} from 'react-redux';
import {customStyles} from '../../common/CustomStyle';

class VideoScreen extends React.Component {
  state = {
    appState: AppState.currentState,
    screenSwitched: false,
    defaultURL: this.getEmbedFromLink("https://www.youtube.com/watch?v=_-HNSut_1Fc")
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
        style={styles.mainVideo}
        javaScriptEnabled={true}
        source={{uri: this.props.vidURL ? this.getEmbedFromLink(this.props.vidURL) : this.state.defaultURL}}
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

  renderFolder(folder){
    return <VideoFolder folder={folder.item} />
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header}>
            <Left style={{flex: 1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon style={customStyles.headerIcon}  name='menu'/>
              </Button>
            </Left>

            <Body style={{flex: 1}}>
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

          <Grid style={styles.content}>
            <Row size={4} style={{backgroundColor: 'red'}}>
              {this.renderVideo()}
            </Row>

            <Row size={6} style={{backgroundColor: '#f0f0f0'}}>
              <Grid>
                <Row 
                  style={styles.videoListHeader}>
                  <Text style={{fontFamily: 'Ubuntu_Bold', color: 'black'}}> Available Videos </Text>
                </Row>
               
                <Row 
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                    top: 10,
                  }}
                >
                  <FlatList
                    data = {data}
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
  };
}

const mapStateToProps = (state) => {
  const vidURL = state.selectedItem.vidURL;
  
  return {vidURL}
};

export default connect(mapStateToProps)(VideoScreen);

const styles = StyleSheet.create({
  videoListHeader: {
    alignContent: 'center', 
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,  

    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 10,
  },
})