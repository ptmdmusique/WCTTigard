import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import {customStyles} from '../../common/CustomStyle';

//This should be dynamically retrieved from database for the "More" section
/* Temp
  {
    name: "Picture",
    iconName: "image",
    displayName: "Picture Board"
  },
  {
    name: "AboutUs",
    iconName: "info",
    displayName:  "About Us"
  },
  {
    name: "Birthday",
    iconName: "cake",
    displayName: "Birthday Party"
  },
  {
    name: "ReferUs",
    iconName: "users",
    displayName: "Refer Us"
  },

*/
const previewRoute = [
  {
    name: "Event",
    iconName: "news",
    displayName: "News"
  },
  {
    name: "Video",
    iconName: "video",
    displayName: "Videos"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "Schedule"
  },
  {
    name: "ContactUs",
    iconName: "globe",
    displayName: "Contact Us"
  },
]

var {height, width} = Dimensions.get('window');
//To format grid
const itemPerRow = 2;

export default class HomeScreen extends React.Component {
  render() {    
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
                  <Icon style={{color: '#e53110', fontSize: 40}} name={previewRoute[i + j].iconName}/>
                  <Text style={{fontSize: 11, top: 8}}>
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
            width: '85%'
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
              <Title style={customStyles.headerText}>Home</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                    style={{height: 40, width: 40}}/>
              
            </Right>
          </Header>

          <Grid style={{
              backgroundColor: '#f0f0f0',
              zIndex: -3,
            }}>
              <Row size={3}
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#d9d9d9',
                }}
              >
                <Content>
                  <Content>
                    <Left style={{paddingBottom: 5, paddingTop: 5}}>
                      <Title style={{color:'black', fontSize: 15}}>Latest News!</Title>
                    </Left>              
                  </Content>

                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate("Event")}
                    style={{alignSelf: 'center'}}
                  >
                    <Card style={{width: '90%', alignSelf: 'center'}}>
                      <Grid>
                        <Col size={3} 
                          style={{
                            justifyContent: 'center',
                            borderRightWidth: 0.2,
                            borderRightColor: '#d9d9d9'
                          }}>
                          <View 
                            style={{
                              width: '75%', 
                              height: '75%', 
                              alignSelf: 'center', 
                            }}>
                            <Image source={require('../../../assets/images/sidebar-logo.png')} 
                              style={{flex: 1, width: undefined, height: undefined}}/>
                          </View>
                        </Col>
                        <Col size={7}>
                          <View style={{paddingTop: 10}}>
                            <Header style={{height: 20, elevation: 0}}>
                              <Title style={{fontSize: 14, color: "black"}}> Tournament is coming! </Title>
                            </Header>
                            <Content style={{height: 60,}}>
                              <Text 
                                style={{alignSelf: 'center', fontSize: 12,}}
                              >
                                1/1/2019
                              </Text>
                              <Text 
                                style={{alignSelf: 'center', fontSize: 12,}}
                              >
                                All day
                              </Text>
                              <Text 
                                style={{alignSelf: 'center', fontSize: 12,}}
                              >
                                Everybody can join!
                              </Text>
                            </Content>
                            <Footer style={{height: 20, elevation: 0.25}}>
                              <Image source={require('../../../assets/images/high-kick.png')} style={{width: 15, height: 15, paddingBottom: 5}}/>          
                            </Footer>
                          </View>
                        </Col>
                      </Grid>
                    </Card>
                  </TouchableNativeFeedback>
                </Content>
              </Row>

              <Row
                size={7}
                style={{
                    top: 10,
                    paddingTop: height / 20,
                    borderTopWidth: 2,
                    borderTopColor: '#d9d9d9',
                }}
              >
                <Content >
                  <Content>
                    <Left style={{paddingLeft: 12}}>
                      <Title style={{color:'black', fontSize: 15}}>Quick Navigation</Title>
                    </Left>              
                  </Content>

                  <Grid style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                    {menuGridItems}
                  </Grid>
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
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: (width - 120) / itemPerRow,
    height: (width - 100) / itemPerRow,
  },
})