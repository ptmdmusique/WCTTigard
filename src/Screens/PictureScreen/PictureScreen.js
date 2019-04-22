import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import Lightbox from 'react-native-lightbox';
import Carousel from 'react-native-looped-carousel-improved';

import {customStyles} from '../../common/CustomStyle';
import data from '../../../database/Images/ImageList.json'; //Temporarily, use this as name

const imagePerRow = 3;
const {height, width} = Dimensions.get('window');

const imageGridItems = [];
const renderCarousel = (image) => {
  //console.log(image);
  return (
    <Carousel style={{width, height}}>
      <Image
        style={{ flex: 1 }}
        resizeMode="contain"
        source={{ uri: image}}
      />
    </Carousel>
  )
}
const renderImage = (image) => {
  return (
    <View 
      style={{flex: 1 / imagePerRow, aspectRatio: 1, alignContent: 'center', justifyContent: 'center', }}
    >
      <Lightbox
        swipeToDismiss={false}   
        renderContent={() => renderCarousel(image.item)}
      >
          <Image source={{uri: image.item}} style={{width: '98%', height: '98%', alignSelf: 'center'}}/>
      </Lightbox>
    </View>
  )
}


export default class PictureScreen extends React.Component {  
  state = {
    finishLoading: false,
  }
  
  async componentDidMount() {
    //await this.loadImages();
    this.setState({finishLoading: true});
  }

  renderBody(){
    if (this.state.finishLoading){
      return (
        <Grid 
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',              
          }}>
          {imageGridItems}      
        </Grid>
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
            {/* {this.renderBody()} */}
            <FlatList
              keyExtractor={(item, index) => item + index}
              numColumns={imagePerRow}
              data={data}
              renderItem={image => renderImage(image)}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center',}}
            />
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