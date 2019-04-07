import React from 'react';
import { View, } from 'react-native';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import {customStyles} from '../../common/CustomStyle';

const quickNavigationRoute = [
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
]

//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  ...quickNavigationRoute,
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
                  <Icon style={{color: '#3ccdcd'}} name={previewRoute[i + j].iconName}/>
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
    
    //Quick nav bar
    const quickNavGridItems = [];
    for(let i = 0; i < quickNavigationRoute.length; i++){
      quickNavGridItems.push(
        <Grid style={{alignItems:'center'}} key={quickNavigationRoute[i].name}>
          <Row style={{alignContent:'center', justifyContent: 'center'}}>
            <Button 
              transparent 
              onPress={() => {
                this.props.navigation.navigate(quickNavigationRoute[i].name)
              }}>
              <Icon 
                style={{ fontSize: 22, textAlign:'center', color: '#3ccdcd',}} 
                name={quickNavigationRoute[i].iconName} 
              />
            </Button>
          </Row>
          <Row>
            <Text style={{fontSize: 10, top: 10}}>{quickNavigationRoute[i].displayName}</Text> 
          </Row>
        </Grid>
      )
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header}
          >
            <Left style={{flex:1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon style={customStyles.headerIcon} name='menu'/>
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
                <Content>
                  <Left style={{alignSelf: 'flex-start', paddingLeft: 12}}>
                    <Title style={{color:'black'}}>Let's Explore: </Title>
                  </Left>              
                </Content>

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
                    <Title style={{color:'black'}}>Upcoming Event: </Title>
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
                        <Title style={{color:'black'}}> Test News </Title>
                      </Header>
                      <Content style={{height: 70}}>
                        <Text 
                          style={{paddingLeft: 5, paddingRight: 5, paddingTop: 1, fontSize: 12}}
                        >
                          December 17, 1903, is the birth date of all airplanes. Orville and Wilbur Wright started building gliders in 1900. In 1903, they built a motor and propeller for their glider. Orville made the first flight, which lasted 12 seconds, and flew 120 feet. Wilbur's flight was 852 feet in 59 seconds. These first flights in 1903 were just the start of the evolution of planes. By the year 1909, Bleriot had crossed the English Channel. By the year 1912, a two-piece plywood fuselage was built for greater strength. By the 1930s, the all-metal fuselage was tried, and it soon appeared in DC3s. From the Wrights' 1903 motor and prop came the engines for the 1950 turbojet that generated at least 19,600 pounds of thrust. The big Boeing 747 has four engines with 50,000 pounds of thrust each. The future holds an advanced super-sonic jet with a saving of almost 40 percent in fuel usage.
                        </Text>
                      </Content>
                    </Col>
                  </Grid>
                </Card>
              </Content>
            </Row>
          </Grid>

          <Footer style={customStyles.footer}>
            <Image 
              source={require('../../../assets/images/plain_black.png')}
              style={styles.blurImage}
            />
            <View style={styles.textOverImage}>
                <Text style={{fontSize: 15, fontFamily: 'Merriweather_Bold', color: "white"}}>
                  Master Eric's World Champion Taekwondo
                </Text>
            </View> 

            <Grid >
              <Row>
                {quickNavGridItems}
              </Row>
            </Grid>
          </Footer>
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
    width: 100,
    height: 75,
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