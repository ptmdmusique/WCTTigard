import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, FlatList,} from 'react-native';

import Lightbox from 'react-native-lightbox';
import Carousel from 'react-native-looped-carousel-improved';

import {customStyles} from '../../common/CustomStyle';
import MOCK_IMAGES from '../../../database/Images/ImageList.json'; //Temporarily, use this as name


const imagePerRow = 3;
const ratioToView = 98;
const {height, width} = Dimensions.get('window');

let imageURLs = [];

export default class PictureScreen extends React.Component {  
  state = {
    finishLoading: false,
    imageSize: [],
    imageBrowser: [],
  }

  constructor(props){
    super(props);
    MOCK_IMAGES.forEach((image, index) => {
      imageURLs.push({'URI': image, "id": index.toString()});
    });
  }
  
  loadImageSize() {
    const _imageSize = this.state.imageSize;
    const _imageBrowser = this.state.imageBrowser;
    MOCK_IMAGES.forEach((item, index) => {
      Image.getSize(item, (myWidth, myHeight) => {
        _imageSize.push({ myUri: item, myWidth, myHeight });
        this.setState({imageSize: _imageSize});

        _imageBrowser.push({
          photo: item,
          id: index,
        })
        this.setState({imageBrowser: _imageBrowser});
      });
    });
  }

  renderCarousel(image){
    return (
      // <Carousel style={{width, height}}>
        
      // </Carousel>
      <Image
          resizeMode="contain"
          source={{ uri: image.myUri}}
          style={{ 
            flex: 1,
          }}
      />
    )
  } 
  renderImage(image){  
    return (
      <View 
      style={{flex: 1 / imagePerRow, aspectRatio: 1, marginBottom: 2, marginRight: 2, alignContent: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd'}}
      >
        <Lightbox
          swipeToDismiss={false}
          renderContent={() => this.renderCarousel(image)}
        >
          <View style={{backgroundColor: '#f0f0f0', width: '100%', height: '100%', alignSelf: 'center'}}>
            <Image source={{uri: image.myUri}} 
              resizeMode='cover'
              style={{width: '100%', height: '100%'}}/>
          </View>
        </Lightbox>
      </View>
    )
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
          <Header style={customStyles.header}
          >
            <Left style={{flex:1}}>    
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={customStyles.headerIcon} name='menu'/>
              </Button>
            </Left>

            <Body style={{flex:3}}>
              <Title style={customStyles.headerText}>Pictures</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

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