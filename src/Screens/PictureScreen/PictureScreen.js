import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";
import ImageViewer from 'react-native-image-zoom-viewer';

import {customStyles} from '../../common/CustomStyle';
import data from '../../../Database/Images/ImageList.json'; //Temporarily, use this as name

const imagePerRow = 3;
const {height, width} = Dimensions.get('window');
const images = data.map(function(item){             
  return {
    url: item.imageLink
  }
});
const imageGridItems = [];

export default class PictureScreen extends React.Component {  
  render () {
    //All picture
    const imageGridItems = [];
    for(let i = 0; i < data.length; i += imagePerRow){
      const row = [];      
      for(let j = 0; j < imagePerRow; j++){
        if (i + j < data.length){
          //Push a card
          row.push(
            <Col key={data[i + j].imageLink + i + j}
              style={{
                alignContent: 'center',
                alignItems: 'center', 
              }}
            >
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate(data[i + j].imageLink + "inner" + i + j)}
              >
                <Card             
                style={styles.imageCard}  
                >
                  {/*ONLY TEMPORARY EXIST UNTIL DATABASE COMES IN!*/}
                  {/* {console.log(data[i + j].imageLink)} */}
                  <Image 
                    source={{uri: data[i + j].imageLink}}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />  
                </Card>
              </TouchableNativeFeedback>
            </Col>
          )
        }
      }

      imageGridItems.push(
        <Row 
          key={data[i].imageLink + "outer" + i * 3} 
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          {row}
        </Row>
      )
    }
    
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

            <Body style={{flex:1}}>
              <Title style={customStyles.headerText}>Pictures</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

          <Content>
            <Grid 
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',              
              }}>
              {imageGridItems}      
            </Grid>
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