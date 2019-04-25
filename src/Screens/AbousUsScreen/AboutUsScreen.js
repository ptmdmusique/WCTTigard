import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import {customStyles} from '../../common/CustomStyle';
import MOCK_IMAGES from '../../../database/Images/ImageList.json'; //Temporarily, use this as name
import Modal from "react-native-modal";
import AutoHeightImage from 'react-native-auto-height-image';
import { FileSystem } from 'expo';

const imagePerRow = 3;
const {height, width} = Dimensions.get('window');

let imageURLs = [];

export default class PictureScreen extends React.Component {  
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
              <Title style={customStyles.headerText}>About Us</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>
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