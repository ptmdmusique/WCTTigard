import React from 'react';
import { View, } from 'react-native';
import {Badge, Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import {customStyles} from '../../common/CustomStyle';

//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "Schedule"
  },
  {
    name: "Picture",
    iconName: "image",
    displayName: "Picture Board"
  },
  {
    name: "Event",
    iconName: "notification",
    displayName: "News"
  },
  {
    name: "Info",
    iconName: "info",
    displayName: "School Info"
  },
  {
    name: "Video",
    iconName: "video",
    displayName: "Videos"
  },
  {
    name: "ContactUs",
    iconName: "globe",
    displayName: "Contact Us"
  },
  {
    name: "AboutUs",
    iconName: "info",
    displayName: "About Us"
  },
  {
    name: "ReferUs",
    iconName: "users",
    displayName: "Refer Us"
  },
  {
    name: "Birthday",
    iconName: "cake",
    displayName: "Birthday Party"
  },
]

export default class HomeScreen extends React.Component {
  state = {
    numberOfNotification: "1",
  }

  render() {
    //To format grid
    const itemPerRow = 3;
    //All menu
    const menuGridItems = [];
    for(let i = 0; i < previewRoute.length; i += itemPerRow){
      const row = [];      
      for(let j = 0; j < itemPerRow; j++){
        if (i + j < previewRoute.length){
          //Push a card
          row.push(
            <Col key={previewRoute[i + j].displayName}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center', 
            }}
            >
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate(previewRoute[i + j].name)}
              >
                <Card             
                style={styles.menu}  
                >
                  <Icon style={{color: '#FF6961'}} name={previewRoute[i + j].iconName}/>
                  <Text style={{fontSize: 11, top: 5}}>
                    {previewRoute[i + j].displayName}
                  </Text>
                </Card>
              </TouchableNativeFeedback>
            </Col>
          )
        }
      }

      menuGridItems.push(
        <Row 
          key={previewRoute[i].name} 
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
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
              <Button transparent onPress={() => console.log("!!!")}>
                <Icon style={customStyles.headerIcon} name='bell'/>
                <Badge info style={{ position: 'absolute', scaleX: 0.6, scaleY: 0.6, right: 15}}>
                  <Text>{this.state.numberOfNotification}</Text>
                </Badge>
              </Button>
            </Left>

            <Body>
              <Title style={customStyles.headerText}> Home Page </Title>
            </Body>

            <Right>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                    style={{height: 40, width: 40}}/>
              
            </Right>
          </Header>

          <Grid>
            <Row
              size={6}
            >
              <Content style={
                  styles.menuContainer
                }>
                {/* <Content>
                  <Left style={{alignSelf: 'flex-start', paddingLeft: 12}}>
                    <Title style={{color:'black', fontSize: 15}}>Let's Explore: </Title>
                  </Left>              
                </Content> */}

                <Grid style={{
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                  top: 1,
                }}>
                  {menuGridItems}
                </Grid>
              </Content>
            </Row>

            <Row size={4}>
              <Content style={{
                elevation: 0, 
                zIndex: 0, 
                top: 10,
                backgroundColor: '#f0f0f0',
                borderWidth: 0.25,
                borderTopColor: '#ebebeb',
              }}>
                <Content>
                  <Left style={{alignSelf: 'flex-start', paddingLeft: 12}}>
                    <Title style={{color:'black', fontSize: 15}}>Upcoming Event: </Title>
                  </Left>              
                </Content>

                <Card>
                  <Grid>
                    <Col size={2} 
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRightWidth: 1,  
                        borderRadius: 2,
                        borderRightColor: '#ebebeb',
                        elevation: 0.25,                        
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../../../assets/images/sidebar-logo.png')} 
                      style={{height: 70, width: 70,}}/>
                    </Col>
                    <Col size={8}>
                      <Header style={{height: 25, elevation: 0.5}}>
                        <Title style={{color:'black', fontSize: 14}}> Tournament! </Title>
                      </Header>
                      <Content style={{height: 70}}>
                        <Text 
                          style={{paddingLeft: 5, paddingRight: 5, paddingTop: 1, fontSize: 12}}
                        >
                          Tournament!
                        </Text>
                      </Content>
                    </Col>
                  </Grid>
                </Card>
              </Content>
            </Row>
          </Grid>

          {/* <Footer style={customStyles.footer}>
            {/* <Image 
              source={require('../../../assets/images/plain_black.png')}
              style={styles.blurImage}
            />
            <View style={styles.textOverImage}>
                <Text style={{fontSize: 15, fontFamily: 'Merriweather_Bold', color: "white"}}>
                  Master Eric's World Champion Taekwondo
                </Text>
            </View>  

            <Text style={{fontSize: 15, fontFamily: 'Merriweather_Bold', color: "black"}}>
              Master Eric's World Champion Taekwondo
            </Text> 
          </Footer>*/}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: 'auto',
    //height: 600,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
  },
  logoContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 100,
  },
  logo: {
    height: 80,
    width: 80,
  },

  blurImage: {
    height: 50,
    top: -50,
    alignItems:'center', 
    position: 'absolute', 
    opacity: 0.7
  },
  textOverImage: {
    top:-50,
    alignItems:'center', 
    marginTop: 15,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
  },
  menu: {
    width: 110,
    height: 90,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'      
  },
  menuContainer: {
    elevation: 0, 
    zIndex: 0, 
    top: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 0.25,
    borderTopColor: '#ebebeb',
  }
})