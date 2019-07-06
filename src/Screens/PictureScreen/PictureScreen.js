import React from 'react';
import { Content, Container, Icon, StyleProvider, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import CustomHeader from '../../CommonComponents/CustomHeader';
import MOCK_IMAGES from '../../../Database/Images/ImageList.json'; //Temporarily, use this as name
import Modal from "react-native-modal";
import AutoHeightImage from 'react-native-auto-height-image';
import { FileSystem } from 'expo';

const imagePerRow = 3;
const {height, width} = Dimensions.get('window');

let imageURLs = [];

export default class PictureScreen extends React.Component {  
  state = {
    screenSwitched: false,

    finishLoading: false,
    imageSize: [],

    isModalVisible : false,
    uri: '',
  }

  constructor(props){
    super(props);
    MOCK_IMAGES.forEach((image, index) => {
      imageURLs.push({'URI': image, "id": index.toString()});
    });
  }
  
  componentWillUnmount() {
    this.setState({isModalVisible: false});
  }
  
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  
  async _downloadImage(uri){
    const fileUri = FileSystem.documentDirectory + "images";
  
    let downloadObject = FileSystem.createDownloadResumable(
      uri,
      fileUri
    );
    let response = await downloadObject.downloadAsync();
    console.log(response);
  }

  loadImageSize() {
    const _imageSize = this.state.imageSize;
    MOCK_IMAGES.forEach((item, index) => {
      Image.getSize(item, (myWidth, myHeight) => {
        _imageSize.push({ myUri: item, myWidth, myHeight });
        this.setState({imageSize: _imageSize});
      });
    });
  }

  renderImage(image){  
    return (
      <View 
      style={{flex: 1 / imagePerRow, aspectRatio: 1, marginBottom: 2, marginRight: 2, alignContent: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd'}}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({uri: image.myUri});
            this._toggleModal();
          }}
        >
          <View style={{backgroundColor: '#f0f0f0', width: '100%', height: '100%', alignSelf: 'center'}}>
              <Image source={{uri: image.myUri}} 
                resizeMode='cover'
                style={{width: '100%', height: '100%'}}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  renderModalImage(){
    if (this.state.uri){
      return (
        <TouchableOpacity
          onPress={() => this._toggleModal()}
        >
          <AutoHeightImage width={width * 0.98} style={{alignSelf: 'center'}} source={{uri: this.state.uri}}/>
        </TouchableOpacity>
      )
    }
  }
  
  componentDidMount() {
    this.loadImageSize();
    //console.log(MOCK_IMAGES);
    this.setState({finishLoading: true});
  }

  renderBody(){
    if (this.state.finishLoading){
      return (
        <FlatList
          keyExtractor={(item, index) => item + index}
          numColumns={imagePerRow}
          data={this.state.imageSize}
          renderItem={data => this.renderImage(data.item)}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center',}}
        />
      )
    } else {
      return (
        <Spinner color='red'/>
      )
    }
  }

  render () {   
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <NavigationEvents
              onWillFocus={() => this.setState({ screenSwitched: false })}
              onWillBlur={() => this.setState({ screenSwitched: true })}
            />

          <CustomHeader title='Picture Board' navigation={this.props.navigation} />

          <Modal 
            isVisible={this.state.isModalVisible}
            onBackButtonPress={() => this.setState({isModalVisible: false})}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={{ flex: 1 }}>
              <View 
                style={{
                  position: 'absolute',
                  left:     0,
                  top:      0,
                  right: 0,
                  bottom: 0,
                  flex: 1,
                  justifyContent: 'center',
                }}>
                {this.renderModalImage()}
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Icon name="x" style={{color:'white'}} onPress={this._toggleModal}/>
                <Icon name="download" style={{color: 'white',}} onPress={() => this._downloadImage(this.state.uri)}/>
              </View>
            </View>
          </Modal>

          <Content contentContainerStyle={{flexDirection: 'row', justifyContent: 'center'}}>
            {this.renderBody()}
          </Content>
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  imageCard: {
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: (width - 10) / imagePerRow,
    height: (width - 10) / imagePerRow,
  },
  imageContainer: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%',
    height: '100%',
  },
})