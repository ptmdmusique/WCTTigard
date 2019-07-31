import React from 'react';
import {Container, Text, Icon, StyleProvider, Footer, Spinner, Content, Button } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableOpacity , Dimensions, SafeAreaView } from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";
import { LinearGradient } from 'expo-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import Moment from 'moment';

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
    name: "Contact",
    iconName: "globe",
    displayName: "Contact Us"
  },
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
    
    latestAlert: null,
    isAlertLoading: true,
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
      console.warn("--No homescreen image");
      firebase.storage().ref("HomeScreen/test").listAll()
      .then(result => {
        result.items[0].getDownloadURL().then(url => {
          this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
        })})
      console.warn(err);
    });
    
    firebase.firestore().collection('AlertScreen').doc(global.uid)
    .onSnapshot( doc => {      
      let tempList = doc.data().list;
      console.log("--Getting latest alert"); 
      //console.log(tempList);
      if (!tempList || tempList.length === 0){
        console.warn("--Empty latest alert");
        this.setState({ isAlertLoading: false } );
        return;
      }

      tempList.sort((a, b) => {
        var returnVal = new Date(b.date) - new Date(a.date);
        return returnVal;
      })

      this.setState({latestAlert: tempList[0]}, () => this.setState({ isAlertLoading: false }))
    }, (err) => {
      console.log("--Empty latest alert");
      this.setState({ isAlertLoading: false } );
      console.warn(err);
    })
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
        {this.state.isImageLoading || this.state.isAlertLoading ? 
          <Container>
            <Content 
                contentContainerStyle={{
                    flex: 1, 
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <Image style={{ width: 200, height: 200, }} source={require('../../../assets/images/logo.png')}/>
                <Text style={{fontSize: 15, textAlign: 'center'}}>Master Eric's{"\n"}World Champion Taekwondo</Text>
                <Spinner color='red'/>
            </Content>
          </Container> : 

          <Container style={{backgroundColor: '#0f0f0f'}}>
            <CustomHeader 
              title="Master Eric's" 
              title_2=" World Champion Taekwondo" 
              navigation={this.props.navigation} 
              isHome 
              style={{ flex: 1, }}
              />

            <SafeAreaView style={{ flex: 1, }}>
              <View style={{ width: '100%', height: '100%' }}>
                <Image source={{uri: this.state.imageURL}}
                  style={{position: 'absolute', top: 0, left: 0, alignSelf: 'center', height: '100%', width: '100%',}}
                />
                <LinearGradient
                  colors={['#0f0f0f', 'transparent', '#0f0f0f']}
                  style={{ alignItems: 'center', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  locations={[0, 0.1, 0.8]}>
                </LinearGradient>

                <View style={{ position: 'absolute', top: 0, right: -10, }}>
                  <AutoHeightImage source={require('../../../assets/images/tkd_white_edited.png')} 
                    width={ width * 0.25 }
                  />
                </View>

                <View style={styles.menuButtonsContainer}>
                  {this.renderMenuButton()}
                </View>

                <View style={styles.alertContainer}>
                  <View style={{flex: 1}}>
                    <Icon style={[styles.alertIcon, styles.glowing]} name='bell'></Icon>
                  </View>
                  {this.state.latestAlert ? 
                    <View style={{flex: 4, }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5, }}>
                        <Text style={[styles.alertTitle, styles.glowing, { fontSize: 12, borderBottomWidth: 0, marginBottom: 5, }]}>Latest Alert: </Text>  
                        <Text style={[styles.alertTitle, styles.glowing]}>{this.state.latestAlert.title}</Text>  
                      </View>

                      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                        <Text style={[styles.alertDescription, styles.glowing]}>{this.state.latestAlert.content}</Text>

                        <View style={{flex: 1,}}>
                          <Text style={[styles.alertDate, styles.glowing]}>Effective Date: {Moment(this.state.latestAlert.date).format("MM-DD-YYYY")}</Text>
                        </View>
                      </View>
                    </View> : 
                    null
                  }
                </View>
              </View>
            </SafeAreaView>
          </Container>
        }
      </StyleProvider>
    );
  }
}
//http://wcttigard.com/assets/wp-content/screens/IMG_2628-2-1.jpg

const styles = StyleSheet.create({
  glowing: {
    // textShadowColor: 'rgba(255, 255, 255, 0.5)',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 10,
  },
  // Menu buttons (Left)
  menuButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    width: '20%',
    flexDirection: 'column-reverse',
  },
  menuButton: {
    flex: 1,
    width: '100%',
    borderColor: '#fff',
    backgroundColor: '#f44336',
    // borderWidth: 2,
    borderRadius: 15,
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
    fontSize: 11,
    fontWeight: 'bold',
  },
  
  // Alert Card (Right)
  alertContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    minHeight: 200,
    width: '72%',
    borderColor: '#fff',
    backgroundColor: '#f44336',
    // borderWidth: 2,
    borderRadius: 15,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderEndWidth: 0,
    marginBottom: 5,
    flexDirection: 'row',
    padding: 10,
  },
  alertIcon: {
    color: '#fff',
    fontSize: 40,
  },
  alertTitle: {
    color: '#fff',
    fontSize: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  alertDescription: {
    color: '#fff',
    flex: 4,
    fontSize: 12,
    marginTop: 10,
  },
  alertDate: {
    color: '#fff',
    fontSize: 10,
  }
})