import React from 'react';
import { Container, Icon, StyleProvider, Spinner, Content, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Dimensions, Platform, ImageBackground, StyleSheet, Text, Linking } from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';
import { MapView, Location, } from 'expo';
import * as Permissions from 'expo-permissions';

var latitudeDelta = 0.0522, longitudeDelta = 0.0521;
var { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default class EventDetailScreen extends React.Component {
  state = {
    geoLocation: null,
    event: null,
    url: null,
  }

  async convertAddress() {
    try {
      this.setState({geoLocation: await Location.geocodeAsync(this.state.event.address)});        
    } catch(e){
        console.log(e);
    } finally {
        await this.setState({
            finishLoading: true, 
            geoLocation: this.state.geoLocation[0],
        });
        this.setState({
          url: Platform.select({
              ios: "maps:" + this.state.geoLocation.latitude + "," + 
                  this.state.geoLocation.longitude + "?q=" + this.state.event.locationName,
              android: "geo:" + this.state.geoLocation.latitude + "," + 
                  this.state.geoLocation.longitude + "?q=" + this.state.event.locationName,           
          })
      })
    }
  }


  async componentDidMount(){ 
    await this.setState({event: this.props.navigation.getParam('event')});
    if (this.state.event.address){
      await Location.getProviderStatusAsync()
            .then(status => {
                //console.log('Getting status');
                if (!status.locationServicesEnabled) {
                    throw new Error('Location services disabled');
                }
            })
            .then(_ => Permissions.askAsync(Permissions.LOCATION))
            .then(permissions => {
                //console.log('Getting permissions');
                if (permissions.status !== 'granted') {
                    throw new Error('Ask for permissions');
                }
            })
            .then(_ => {
                //console.log('Have permissions');
                this.convertAddress();
                //console.log(geoLocation);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            });
    } else {
      this.setState({finishLoading: true});
    }
  }

  renderMap(){
    if (this.state.event.address && this.state.geoLocation){
        return (
            <View style={{flex: 1,}}>
                <MapView
                    style={{width: '100%', height: screenHeight / 4, alignSelf: 'center'}}
                    initialRegion={{
                        latitude: this.state.geoLocation.latitude, 
                        longitude: this.state.geoLocation.longitude, 
                        longitudeDelta, 
                        latitudeDelta
                    }}
                    >
                    <MapView.Marker
                        title={this.state.event.title}
                        description={this.state.event.description}
                        coordinate={{
                            latitude: this.state.geoLocation.latitude, 
                            longitude: this.state.geoLocation.longitude
                        }}
                    />
                </MapView>
            </View>
        )
    }
  }
  renderLocationItem() {
    if (this.state.event.address){
      return(
        <CardItem button
          onPress={() => Linking.openURL(this.state.url)}
        >
          <Icon name="map-marker" type="FontAwesome" style={styles.icon}/>
          <Text style={{flex: 17/20, color: "#333", fontSize: 13}}>{this.state.event.address}</Text>
          <Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize: 20, flex: 1/20, color: "#333",}} />
        </CardItem>
      )
    }
  }
  renderScreen() {
    if (this.state.finishLoading){
      return (
        <View style={{flex: 1}}>
          <View style={{width: screenWidth, height: screenHeight / 5, borderBottomColor: '#333', borderBottomWidth: 2}}>
            <ImageBackground source={{uri: this.state.event.imageURL}}
              style={{flex: 1, justifyContent: 'flex-end'}}
              imageStyle={{resizeMode:'cover'}}
            >
              <View style={styles.darkOverlay} />
              <Text style={styles.title}>{this.state.event.title}</Text>
            </ImageBackground>
          </View>

          <Content>
            <Card style={styles.cardStyle}>
              <CardItem>
                <Icon name="calendar" type="FontAwesome" style={styles.icon}/>
                <Text style={{flex: 18/20, color: "#333", fontSize: 11}}>{this.state.event.dateFrom} - {this.state.event.dateTo}</Text>
              </CardItem>
              {this.renderLocationItem()}
            </Card>

            <Content style={{flex: 2}}>
              <Card style={styles.cardStyle}>
                <CardItem bordered>
                  <Text style={styles.descriptionText}>
                    {this.state.event.description}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 11, color: "#666"}}>
                    {this.state.event.content}
                  </Text>
                </CardItem>
                
                <CardItem>
                  {this.renderMap()}
                </CardItem>
              </Card>
            </Content>
          </Content>
        </View>
      )
    } else {
      return (
        <Spinner color={'red'}/>
      )
    }
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{backgroundColor: '#ddd',}}>
          <CustomHeader title='Event Detail' navigation={this.props.navigation} isStack />

          {this.renderScreen()} 
          
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  darkOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.6
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingLeft: 8,
    // position: 'absolute',
    // top: '72%',
    paddingVertical: 5,
    width: '100%',
    // backgroundColor: 'black',
    // opacity: 0.6,
  },
  icon: {
    fontSize: 20,
    textAlign: 'center',
    flex: 2/20,
    color: "#555",
  },
  descriptionText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: "#fc5344",
  },
  cardStyle: {
    width: '95%', 
    alignSelf: 'center',
    flex: 2,
  }
})