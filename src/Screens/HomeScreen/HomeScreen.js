import React from 'react';
import {Container, Text, Icon, StyleProvider, Footer, Spinner, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableOpacity , Dimensions} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";
import Swiper from 'react-native-deck-swiper';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';

const numberOfSwiper = 3;
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

  state = {
    menuGridItems: [],

    imageURL: "",
    isImageLoading: true,
    
    latestEvent: null,
    isEventLoading: true,
  }

  componentDidMount() {
    console.log(global.uid);
    //TODO: Change this back
    firebase.storage().ref("HomeScreen/" + global.uid).listAll()
    .then(result => {
      result.items[0].getDownloadURL().then(url => {
        this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
      })})
    .catch(err => {
      console.error(err);
    });

    firebase.firestore().collection('EventScreen').doc("rtJagOTuloWzHv8H4Q9zkH9Ugei2").get()
    .then( doc => {
      tempList = doc.data().list;
      tempList.sort((a, b) => {
        var returnVal = new Date(b.dateFrom) - new Date(a.dateFrom);
        if (returnVal === 0) {
          returnVal = new Date(b.dateTo) - new Date(a.dateTo);
        }
        return returnVal;
      })

      this.setState({latestEvent: tempList[0]}, () => this.setState({ isEventLoading: false }))
    })
    .catch(err => {
      console.log(err);
    })

    this.renderPreviewRoute();
  }

  renderEventCard = () => {
    //console.log(card);

    return (
      <View style={{width: '90%', height: '25%', position: 'absolute', top: '70%', left: '5%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white'}}>
          <View style={{flex: 1, alignItems: 'center', paddingLeft: 5,}}>
              <Icon name="newspaper-o" type="FontAwesome" style={{color: '#fc5344'}} />
          </View>
          
          <View style={{flex: 5, paddingRight: 15, paddingLeft: 11}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>
              <Text style={{color: '#fc5344', fontWeight: 'bold', fontFamily: 'Roboto-Bold', fontSize: 13, }}>
                Latest Event: {this.state.latestEvent.title}
              </Text>
            </View>

            <Text style={{color: '#888', fontSize: 10, marginTop: 5, }}>{this.state.latestEvent.description}</Text>
            <Text style={{color: '#888', fontSize: 10, marginTop: 5, }}> Start: {this.state.latestEvent.dateFrom}</Text>
            <Text style={{color: '#888', fontSize: 10}}> End: {this.state.latestEvent.dateTo}</Text>
            {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
          </View>  
        </View>     
      </View>
    );
  }

  renderPreviewRoute() {
    //All menu
    const tempMenu = [];
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

      tempMenu.push(
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

    this.setState({ menuGridItems: tempMenu });
  }

  render() {        
    return (
      <StyleProvider style={getTheme(material)}>
        {this.state.isImageLoading || this.state.isEventLoading ? 
          <Container>
            <Content 
                contentContainerStyle={{
                    flex: 1, 
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <Image source={require('../../../assets/images/sidebar-logo.png')}/>
                <Text style={{fontSize: 15, textAlign: 'center'}}>Master Eric's{"\n"}World Champion Taekwondo</Text>
                <Spinner color='red'/>
            </Content>
          </Container> : 

          <Container>
            <CustomHeader title='Home' navigation={this.props.navigation} isHome />

            <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
              <View style={{flex: 1}}>
                <Image source={{uri: this.state.imageURL || "http://wcttigard.com/assets/wp-content/screens/IMG_2628-2-1.jpg"}}
                  style={{alignSelf: 'center', height: '100%', width: '100%',}}
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
              {this.renderEventCard()}
            </View>

            <Footer style={styles.footer}>
              <Grid style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
                {this.state.menuGridItems}
              </Grid>
            </Footer>
          </Container>
        }
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