import React from 'react';
import { Container, Icon, StyleProvider, Spinner, Content, Card, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import Moment from 'moment';
import { View, Dimensions, Platform, ImageBackground, StyleSheet, Text, Linking, } from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';
import { MapView, Location, Permissions } from 'expo';

var latitudeDelta = 0.0522, longitudeDelta = 0.0521;
var { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default class NewsDetailScreen extends React.Component {
  state = {
    geoLocation: null,
    news: null,
    url: null,
  }

  async convertAddress() {
    try {
      this.setState({geoLocation: await Location.geocodeAsync(this.state.news.address)});        
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
                  this.state.geoLocation.longitude + "?q=" + this.state.news.locationName,
              android: "geo:" + this.state.geoLocation.latitude + "," + 
                  this.state.geoLocation.longitude + "?q=" + this.state.news.locationName,           
          })
      })
    }
  }


  componentDidMount(){ 
    this.setState({news: this.props.navigation.getParam('news')}, () =>{
      this.setState({
        url: Platform.select({
          ios: "maps:" + this.state.news.latLng.lat + "," + 
            this.state.news.latLng.lng + "?q=" + this.state.news.locationName,
          android: "geo:" + this.state.news.latLng.lat + "," + 
            this.state.news.latLng.lng + "?q=" + this.state.news.locationName,           
        })
      }, () => this.setState({ finishLoading: true }))
    });
  }

  renderMap(){
    if (this.state.news.address){
        return (
            <View style={{flex: 1,}}>
                <MapView
                    style={{width: '100%', height: screenHeight / 3, alignSelf: 'center'}}
                    initialRegion={{
                        latitude: this.state.news.latLng.lat, 
                        longitude: this.state.news.latLng.lng, 
                        longitudeDelta, 
                        latitudeDelta
                    }}
                    >
                    <MapView.Marker
                        title={this.state.news.title}
                        description={this.state.news.description}
                        coordinate={{
                            latitude: this.state.news.latLng.lat, 
                            longitude: this.state.news.latLng.lng
                        }}
                    />
                </MapView>
            </View>
        )
    }
  }
  renderLocationItem() {
    if (this.state.news.address){
      return(
        <CardItem button
          onPress={() => Linking.openURL(this.state.url)}
        >
          <Icon name="map-marker" type="FontAwesome" style={styles.icon}/>
          <Text style={{flex: 17/20, color: "#333"}}>{this.state.news.address}</Text>
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
            <ImageBackground source={{uri: this.state.news.imageURL}}
              style={{flex: 1}}
              imageStyle={{resizeMode:'cover'}}
            >
              <View style={styles.darkOverlay} />
              <Text style={styles.title}>{this.state.news.title}</Text>
            </ImageBackground>
          </View>

          <Content>
            <Card style={styles.cardStyle}>
              <CardItem>
                <Icon name="calendar" type="FontAwesome" style={styles.icon}/>
                <Text style={{flex: 18/20, color: "#333"}}>Date Posted: {Moment(this.state.news.date).format("MM-DD-YYYY")}</Text>
              </CardItem>
              {this.renderLocationItem()}
            </Card>

            <Content style={{flex: 2}}>
              <Card style={styles.cardStyle}>
                <CardItem bordered>
                  <Text style={styles.descriptionText}>
                    {this.state.news.description}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 13, color: "#666"}}>
                    {this.state.news.content}
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
    //console.log(this.props.navigation.getParam('news'));
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{backgroundColor: '#ddd',}}>
          <CustomHeader title='News Detail' navigation={this.props.navigation} isStack />

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
    position: 'absolute',
    top: '72%'
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