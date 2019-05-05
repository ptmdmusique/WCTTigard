import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity , Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Container, Text, Icon, StyleProvider, Footer } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Row, Grid, Col } from "react-native-easy-grid";
import Swiper from 'react-native-deck-swiper';

import CustomHeader from '../../CommonComponents/CustomHeader';

const numberOfSwiper = 3;

const MOCK_EVENTS = [
  {
    eventTitle: 'Latest Event',
    eventTime: '1/1/1111',
    eventDuration: 'All week',
    eventContent: 'Something Content!',
  },
]
//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  {
    name: "Event",
    iconName: "book-open",
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

  renderEventCard = (card) => {
    return (
      <Animatable.View animation="zoomIn" delay={700} style={{width: '80%', height: '25%', position: 'absolute', top: '70%', left: '10%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white'}}>
          <View style={{flex: 1, alignItems: 'center', paddingLeft: 5,}}>
              <Icon name="newspaper-o" type="FontAwesome" style={{color: '#fc5344'}} />
          </View>
          <View style={{flex: 5, paddingRight: 15, paddingLeft: 10}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>
              <Text style={{color: '#fc5344', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>{card.eventTitle}</Text>
            </View>
            <Text style={{color: '#888', fontSize: 12}}>{card.eventTime}</Text>
            <Text style={{color: '#888', fontSize: 12}}>{card.eventDuration}</Text>
            <Text style={{color: '#888', fontSize: 12}}>{card.eventContent}</Text>
            {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
          </View>
        </View>
      </Animatable.View>
    );
  }

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
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate(previewRoute[i + j].name)}
              >
                <View style={styles.menu}>
                  <Icon style={{color: '#fc5344', fontSize: 24}} name={previewRoute[i + j].iconName}/>
                  <Text style={{color: '#fc5344', fontSize: 9, marginTop: 5, fontFamily: 'Roboto-Regular'}}>
                      {previewRoute[i + j].displayName}
                  </Text>
                </View>
              </TouchableOpacity >
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
          <CustomHeader title='Home' navigation={this.props.navigation} isHome />

          <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
            <View style={{flex: 1}}>
              <Image source={{uri: "http://wcttigard.com/assets/wp-content/screens/IMG_2628-2-1.jpg"}}
                style={{alignSelf: 'center', height: '100%', width: '100%'}}
              />
            </View>
            
            {/* <Swiper
              cards={MOCK_EVENTS}
              renderCard={(card) => this.renderEventCard(card)}
              useViewOverflow={false}
              backgroundColor="transparent"
              cardVerticalMargin={0}
              cardHorizontalMargin={0}
              infinite={true}
              stackSize={numberOfSwiper}
              // containerStyle={{flex: 1}}
              // cardStyle={{}}
            >
            </Swiper> */}
            {this.renderEventCard(MOCK_EVENTS[0])}
          </View>

          <Footer style={styles.footer}>
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
  footer: {
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center',

    shadowRadius: 5,
    elevation: 10,
    zIndex: 10,
  }
})