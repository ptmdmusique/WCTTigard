import React from 'react';
import {Title, Container, Header, Button, Left, Icon, StyleProvider, 
    Body, Right, Footer, Text, Content, Spinner} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Image, Dimensions, StyleSheet, Linking, Platform, TouchableNativeFeedback } from 'react-native';
import {MapView, Location, Permissions} from 'expo';

import {customStyles} from '../../common/CustomStyle';
import { scale, moderateScale, verticalScale} from '../../common/Scalling';

var {height: screenHeight, width: screenWidth} = Dimensions.get('window');
var latitudeDelta = 0.1022, longitudeDelta = 0.1021;
const label = 'Custom Label';

const MOCK_CONTACT = {
    phoneNumber: '(503) 431-2034',
    address: "15660 SW Pacific Hwy",
    website: 'http://wcttigard.com/',
    email: 'wcttigard@yahoo.com',
    name: "WCT Tigard",
};

// const CONTACT_BUTTONS = [
//     {
//         iconName: 'email',
//         iconType: 'MaterialCommunityIcons',
//         backgroundColor: '#ff7b5e',
//     },
//     {
//         iconName: 'phone',
//         iconType: 'MaterialCommunityIcons',
//         backgroundColor: '#15db54',
//     },
//     {
//         iconName: 'globe',
//         iconType: 'Entypo',
//         backgroundColor: '#70a1ff',
//     },
// ];

export default class ContactUsScreen extends React.Component {
    state = {
        contact: MOCK_CONTACT,
        finishLoading: false,
        geoLocation: null,
        url: null,
    }
    
    async convertAddress() {
        try {
            this.setState({geoLocation: await Location.geocodeAsync(MOCK_CONTACT.address)});        
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
                        this.state.geoLocation.longitude + "?q=" + MOCK_CONTACT.name,
                    android: "geo:" + this.state.geoLocation.latitude + "," + 
                        this.state.geoLocation.longitude + "?q=" + MOCK_CONTACT.name,           
                })
            })
            //console.log(JSON.stringify(this.state.geoLocation) + " " + JSON.stringify(this.state.url));
        }
    }

    async componentDidMount(){
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
    }

    renderMap(){
        if (this.state.finishLoading){
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={{width: '100%', flex: 1}}
                        initialRegion={{
                            latitude: this.state.geoLocation.latitude, 
                            longitude: this.state.geoLocation.longitude, 
                            longitudeDelta, 
                            latitudeDelta
                        }}
                        >
                        <MapView.Marker
                            title={"World Champion Taekwondo Tigard"}
                            description={"Master Eric's World Champion Taekwondo Tigard"}
                            coordinate={{
                                latitude: this.state.geoLocation.latitude, 
                                longitude: this.state.geoLocation.longitude
                            }}
                        />
                    </MapView>
                </View>
            )
        } else {
            return (
                <Spinner color={'red'}/>
            )
        }
    }

    renderContact() {
        return (
            <View style={{flexDirection: 'row', width: '100%', marginTop: -15}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Icon name="location-on" type="MaterialIcons" style={{color: '#fc5344'}} />
                </View>
                <View style={{flex: 5, paddingRight: 15}}>
                    <Text style={{color: '#fc5344', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>{this.state.contact.name}</Text>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.contact.address}</Text>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.contact.phoneNumber}</Text>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.contact.email}</Text>
                    {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
                </View>
            </View>
        );
    }

    // renderContactButtons(contactButtons) {
    //     contactButtons = CONTACT_BUTTONS;
    //     return contactButtons.map(contactButton => (
    //         <Icon name={contactButton.iconName} type={contactButton.iconType} style={{backgroundColor: '#70a1ff', color: 'white', fontSize: 20, padding: 10, borderRadius: 50, marginRight: 8, elevation: 10}} />
    //     ));
    // }

    render () {
        return (
            <StyleProvider style={getTheme(material)}>
            <Container>
              <Header style={customStyles.header}>
                <Left style={{flex: 1}}>    
                  <Button transparent onPress={this.props.navigation.openDrawer}>
                    <Icon style={customStyles.headerIcon}  name='menu'/>
                  </Button>
                </Left>
    
                <Body style={{flex: 3}}>
                  <Title style={customStyles.headerText}> Contact Us </Title>
                </Body>
    
                <Right style={{flex: 1}}>
                  <Image source={require('../../../assets/images/sidebar-logo.png')} 
                        style={{height: 40, width: 40}}/>              
                </Right>
              </Header>

                <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
                    {this.renderMap()}
                    <View style={{width: '80%', height: '30%', position: 'absolute', top: '65%', left: '10%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
                        <View style={{justifyContent: 'center'}}>{this.renderContact()}</View>
                        
                        <View style={{position: 'absolute', top: -20, right: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableNativeFeedback
                                onPress={() => Linking.openURL('mailto:' + MOCK_CONTACT.email)}
                            >
                                <Icon name="email" type="MaterialCommunityIcons" style={{backgroundColor: '#ff7b5e', color: 'white', fontSize: 20, padding: 10, borderRadius: 50, marginRight: 8, elevation: 10}} />
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                onPress={() => Linking.openURL('tel:' + MOCK_CONTACT.phoneNumber)}
                            >
                                <Icon name="phone" type="MaterialCommunityIcons" style={{backgroundColor: '#15db54', color: 'white', fontSize: 20, padding: 10, borderRadius: 50, marginRight: 8, elevation: 10}} />
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                onPress={() => Linking.openURL(MOCK_CONTACT.website)}
                            >
                                <Icon name="globe" type="Entypo" style={{backgroundColor: '#70a1ff', color: 'white', fontSize: 20, padding: 10, borderRadius: 50, marginRight: 8, elevation: 10}} />
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                onPress={() => Linking.openURL(this.state.url)}
                            >
                                <Icon name="location" type="Entypo" style={{backgroundColor: '#27b7c7', color: 'white', fontSize: 20, padding: 10, borderRadius: 50, marginRight: 8, elevation: 10}} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </Container>
          </StyleProvider>
        );
      };
}
