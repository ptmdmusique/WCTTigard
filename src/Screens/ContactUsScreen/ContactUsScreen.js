import React from 'react';
import { Container, Icon, StyleProvider, Text, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Linking, Platform, TouchableOpacity,  StyleSheet} from 'react-native';
import { MapView, Location, Permissions } from 'expo';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase';

var latitudeDelta = 0.1022, longitudeDelta = 0.1021;
const MOCK_CONTACT = {
    phoneNumber: '(503) 431-2034',
    address: "15660 SW Pacific Hwy",
    website: 'http://wcttigard.com/',
    email: 'wcttigard@yahoo.com',
    name: "WCT Tigard",
};

export default class ContactUsScreen extends React.Component {
    state = {
        data: MOCK_CONTACT,
        mapURL: null,
        isLoading: true,
    }
    
    componentDidMount() {

    }

    convertAddress() {
        this.setState({
            mapURL: Platform.select({
                ios: "maps:" + this.state.data.latLng.lat + "," + 
                    this.state.data.latLng.lng + "?q=" + this.state.data.schoolName,
                android: "geo:" + this.state.data.latLng.lat + "," + 
                    this.state.data.latLng.lng + "?q=" + this.state.data.schoolName,           
            })
        }, () => this.setState({ isLoading: false }))
    }

    componentDidMount(){        
        Location.getProviderStatusAsync()
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
                //TODO: CHANGE THIS
                firebase.firestore().collection('ContactUsScreen').doc("test").get()
                .then( doc => {
                    this.setState({data: doc.data()}, () => this.convertAddress())
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            });
    }

    renderMap(){ 
        if (!this.state.isLoading){
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={{width: '100%', flex: 1}}
                        initialRegion={{
                            latitude: this.state.data.latLng.lat, 
                            longitude: this.state.data.latLng.lng, 
                            longitudeDelta, 
                            latitudeDelta
                        }}
                        >
                        <MapView.Marker
                            title={this.state.data.schoolName}
                            description={this.state.data.markerLabel}
                            coordinate={{
                                latitude: this.state.data.latLng.lat, 
                                longitude: this.state.data.latLng.lng
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
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>
                        <Text style={{color: '#fc5344', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>{this.state.data.schoolName}</Text>
                    </View>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.data.address}</Text>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.data.phoneNumber}</Text>
                    <Text style={{color: '#888', fontSize: 12}}>{this.state.data.email}</Text>
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
                <CustomHeader title='Contact Us' navigation={this.props.navigation} />

                { this.state.isLoading ? <Spinner/> :
                    <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
                        {this.renderMap()}
                        <View style={{width: '80%', height: '30%', position: 'absolute', top: '65%', left: '10%', backgroundColor: '#fff', elevation: 8, justifyContent: 'center'}}>
                            <View style={{justifyContent: 'center'}}>{this.renderContact()}</View>
                            
                            <View style={{position: 'absolute', top: -20, right: 10, flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL('mailto:' + this.state.data.email)}
                                    style={{borderRadius: 50, overflow: 'hidden', marginRight: 8, elevation: 10}}
                                >
                                    <Icon name="mail" style={{backgroundColor: '#ff7b5e', color: 'white', fontSize: 20, padding: 10}} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL('tel:' + this.state.data.phoneNumber)}
                                    style={{borderRadius: 50, overflow: 'hidden', marginRight: 8, elevation: 10}}
                                >
                                    <Icon name="phone" style={{backgroundColor: '#15db54', color: 'white', fontSize: 20, padding: 10}} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL(this.state.data.website)}
                                    style={{borderRadius: 50, overflow: 'hidden', marginRight: 8, elevation: 10}}
                                >
                                    <Icon name="globe" style={{backgroundColor: '#70a1ff', color: 'white', fontSize: 20, padding: 10}} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL(this.state.mapURL)}
                                    style={{borderRadius: 50, overflow: 'hidden', marginRight: 8, elevation: 10}}
                                >
                                    <Icon name="map-pin" style={{backgroundColor: '#27b7c7', color: 'white', fontSize: 20, padding: 10}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </Container>
          </StyleProvider>
        );
      };
}