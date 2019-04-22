import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import {customStyles} from '../../common/CustomStyle';
import NewsCard from '../../common/NewsCard';
import AutoHeightImage from 'react-native-auto-height-image';

const MOCK_DATA = {
  eventTitle: 'Test Title',
  eventTime: '1/1/1111',
  eventDuration: 'All week',
  eventContent: 'Something Content!',
}
//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  {
    name: "Event",
    iconName: "news",
    displayName: "Events"
  },
  {
    name: "Alert",
    iconName: "bell",
    displayName: "Alerts"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "Schedule"
  },
  {
    name: "Contact",
    iconName: "globe",
    displayName: "Contact Us"
  },
]

var {height, width} = Dimensions.get('window');
//To format grid
const itemPerRow = 4;

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
                <View style={styles.menu}>
                  <Icon style={{color: '#e53110', fontSize: 24}} name={previewRoute[i + j].iconName}/>
                  <Text style={{fontSize: 10, top: 5}}>
                      {previewRoute[i + j].displayName}
                  </Text>
                </View>
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
            width: '100%'
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

            <Body style={{flex:3}}>
              <Title style={customStyles.headerText}>Home</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                    style={{height: 40, width: 40}}/>
              
            </Right>
          </Header>

          {/* <Grid style={{
              backgroundColor: '#fafafa',
              zIndex: -3,
            }}>

            <Row size={5} style={{justifyContent: 'center'}}>
              <AutoHeightImage source={{uri: "https://i.imgur.com/oZ0qFnR.jpg"}}
                width={width}
                style={{alignSelf: 'center'}}
              />
            </Row>

            <Row size={5}
              style={{
                borderTopWidth: 1,
                borderTopColor: '#d9d9d9',
                }
              }
            >
              <Grid>
                <Row size={1}
                >
                  <Body style={{paddingBottom: 5, paddingTop: 10}}>
                    <Title style={{color:'black', fontSize: 15}}>Latest News!</Title>
                  </Body>              
                </Row>

                <Row size={4}>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate("Event")}
                      
                    >
                      <NewsCard
                        imageLink='https://i.imgur.com/rilIkTm.png'
                        headerText='Tournament!'
                        date='1/1/2019'
                        durationText='All day!'
                        content='Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template '                        
                      />
                    </TouchableNativeFeedback>
                  </Content>
                </Row>
              </Grid>
            </Row>
          </Grid> */}
          <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
            <View style={{flex: 1}}>
              <Image source={{uri: "https://imgur.com/z3vlReU.jpg"}}
                style={{alignSelf: 'center', height: '100%', width: '100%'}}
              />
            </View>
            <View style={{width: '80%', height: '25%', position: 'absolute', top: '65%', left: '10%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', width: '100%', marginTop: -15,}}>
                  <View style={{flex: 1, alignItems: 'center',}}>
                      <Icon name="newspaper" type="MaterialCommunityIcons" style={{color: '#fc5344'}} />
                  </View>
                  <View style={{flex: 5, paddingRight: 15, paddingLeft: 10}}>
                      <Text style={{color: '#fc5344', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>{MOCK_DATA.eventTitle}</Text>
                      <Text style={{color: '#888', fontSize: 12}}>{MOCK_DATA.eventTime}</Text>
                      <Text style={{color: '#888', fontSize: 12}}>{MOCK_DATA.eventDuration}</Text>
                      <Text style={{color: '#888', fontSize: 12}}>{MOCK_DATA.eventContent}</Text>
                      {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
                  </View>
              </View>
            </View>
          </View>

          <Footer style={customStyles.footer}>
            <Grid style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
              {menuGridItems}
            </Grid>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({ 
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