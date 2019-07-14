import React from 'react';
import {Container, Text, Icon, StyleProvider, Footer, Spinner, Content, Button } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableOpacity , Dimensions, Platform } from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";
import { LinearGradient } from 'expo-linear-gradient';


import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';

const numberOfSwiper = 3;
//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  // {
  //   name: "Contact",
  //   iconName: "globe",
  //   displayName: "Contact Us"
  // },
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "Schedule"
  },
  {
    name: "Alert",
    iconName: "bell",
    displayName: "Alerts"
  },
  {
    name: "Event",
    iconName: "book-open",
    displayName: "Events"
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
    //TODO: Change this back
    firebase.storage().ref("HomeScreen/" + global.uid).listAll()
    .then(result => {
      if (!result.items || result.items.length === 0){
        console.log("--No homescreen image");
        firebase.storage().ref("HomeScreen/test").listAll()
        .then(result => {
        result.items[0].getDownloadURL().then(url => {
          this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
        })})
        return;
      }

      result.items[0].getDownloadURL().then(url => {
        this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
      })})
    .catch(err => {
      console.log("--No homescreen image");
      firebase.storage().ref("HomeScreen/test").listAll()
      .then(result => {
        result.items[0].getDownloadURL().then(url => {
          this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
        })})
      console.error(err);
    });
    
    firebase.firestore().collection('EventScreen').doc(global.uid).get()
    .then( doc => {      
      let tempList = doc.data().list;
      console.log("--Getting latest event"); 
      //console.log(tempList);
      if (!tempList || tempList.length === 0){
        console.log("--Empty latest event");
        this.setState({ isEventLoading: false } );
        return;
      }

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
      console.log("--Empty latest event");
      this.setState({ isEventLoading: false } );
      console.log(err);
    })

  }

  renderEventCard = () => {
    //console.log(card);

    return (
      <View style={{width: '90%', height: '25%', position: 'absolute', top: '70%', left: '5%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white'}}>
          <View style={{flex: 1, alignItems: 'center', paddingLeft: 5,}}>
              <Icon name="newspaper-o" type="FontAwesome" style={{color: '#fc5344'}} />
          </View>
          
          {this.state.latestEvent ? 
          <View style={{flex: 5, paddingRight: 15, paddingLeft: 11}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>
              <Text style={{color: '#fc5344', fontWeight: 'bold', fontFamily: 'Roboto-Bold', fontSize: Platform.OS === 'ios' ? 17 : 13, }}>
                Latest Event: {this.state.latestEvent.title}
              </Text>
            </View>

            <Text style={{color: '#888', fontSize: Platform.OS === 'ios' ? 13 : 10, marginTop: 5, }}>{this.state.latestEvent.description}</Text>
            <Text style={{color: '#888', fontSize: Platform.OS === 'ios' ? 13 : 10, marginTop: 5, }}> Start: {this.state.latestEvent.dateFrom}</Text>
            <Text style={{color: '#888', fontSize: Platform.OS === 'ios' ? 13 : 10}}> End: {this.state.latestEvent.dateTo}</Text>
            {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
          </View>  : 
          null
          }
        </View>     
      </View>
    );
  }

  renderMenuButton() {
    return previewRoute.map((route, index) => (
      <TouchableOpacity
        style={styles.menuButton}
        key={route.name}
        onPress={() => this.props.navigation.navigate(previewRoute[index].name)}
      >
        <Icon style={[styles.menuButtonIcon, styles.glowing]} name={route.iconName}></Icon>
        <Text style={[styles.menuButtonText, styles.glowing]}>{route.displayName}</Text>
      </TouchableOpacity>
    ))
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

          <Container style={{backgroundColor: '#0f0f0f'}}>
            <CustomHeader title="Ricardo Milos" navigation={this.props.navigation} isHome />

            <View style={{ width: '100%', height: '100%' }}>
              <Image source={{uri: "http://wcttigard.com/assets/wp-content/screens/IMG_2628-2-1.jpg"}}
                style={{position: 'absolute', top: 0, left: 0, alignSelf: 'center', height: '75%', width: '100%',}}
              />
              <LinearGradient
                colors={['#0f0f0f', 'transparent', '#0f0f0f']}
                style={{ alignItems: 'center', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                locations={[0, 0.1, 0.6]}>
              </LinearGradient>

              <View style={styles.menuButtonsContainer}>
                {this.renderMenuButton()}
              </View>

              <View style={styles.eventContainer}>
                <View style={{flex: 1}}>
                  <Icon style={[styles.eventIcon, styles.glowing]} name='book-open'></Icon>
                </View>
                <View style={{flex: 3}}>
                  <Text style={[styles.eventTitle, styles.glowing]}>{this.state.latestEvent.title}</Text>
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={[styles.eventDescription, styles.glowing]}>{this.state.latestEvent.description}</Text>
                    <View style={{flex: 1,}}>
                      <Text style={[styles.eventDate, styles.glowing]}>Start Date: {this.state.latestEvent.dateFrom}</Text>
                      <Text style={[styles.eventDate, styles.glowing]}>End Date: {this.state.latestEvent.dateTo}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Container>
        }
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  glowing: {
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  // Menu buttons (Left)
  menuButtonsContainer: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    backgroundColor: 'transparent',
    width: '25%',
    flexDirection: 'column-reverse',
  },
  menuButton: {
    flex: 1,
    width: '100%',
    borderColor: '#e02b34',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderStartWidth: 0,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 5,
  },
  menuButtonIcon: {
    flex: 2,
    color: '#fff',
    fontSize: 18,
  },
  menuButtonText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
  },
  
  // Event Card (Right)
  eventContainer: {
    position: 'absolute',
    bottom: '15%',
    right: 0,
    height: '25%',
    width: '65%',
    borderColor: '#e02b34',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderEndWidth: 0,
    marginBottom: 5,
    flexDirection: 'row',
    padding: 10,
  },
  eventIcon: {
    color: '#fff',
    fontSize: 44,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  eventDescription: {
    color: '#fff',
    flex: 3,
    fontSize: 12,
    marginTop: 10,
  },
  eventDate: {
    color: '#fff',
    fontSize: 10,
  }
})