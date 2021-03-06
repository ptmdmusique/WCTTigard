import React from 'react';
import { Container, Icon, StyleProvider, Text, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Linking, Platform, TouchableOpacity,  StyleSheet} from 'react-native';
import { MapView, Location, Permissions } from 'expo';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';

var latitudeDelta = 0.1022, longitudeDelta = 0.1021;

export default class ContactUsScreen extends React.Component {
    state = {
        data: { latLng: { lat: 37.4220, lng: -122.0841 }},
        mapURL: null,
        isLoading: true,
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
        firebase.firestore().collection('ContactUsScreen').doc(global.uid).get()
        .then( doc => {
            if (doc.data()) { 
                console.log("--Getting contact info");
                this.setState({data: doc.data()}, () => this.convertAddress());
            } else {
                console.warn("--Empty contact info!");
                this.setState({ isLoading: false });
            }
        })
        .catch(err => {
            console.warn(err);
        })
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
                    <Icon name="location-on" type="MaterialIcons" style={[{color: '#fc5344'}, styles.glowingRed]} />
                </View>
                <View style={{flex: 5, paddingRight: 15}}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 5}}>
                        <Text style={[{ color: 'white', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}, styles.glowingRed]}>{this.state.data.schoolName || "No contact info yet"}</Text>
                    </View>
                    <Text style={{color: '#fff', fontSize: 12}}>{this.state.data.address}</Text>
                    <Text style={{color: '#fff', fontSize: 12}}>{this.state.data.phoneNumber}</Text>
                    <Text style={{color: '#fff', fontSize: 12}}>{this.state.data.email}</Text>
                    {/* <Text style={{color: '#3366bb', fontWeight: '400', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 5, fontSize: 14}}>{this.state.contact.website}</Text> */}
                </View>
            </View>
        );
    }

    render () {
        return (
            <StyleProvider style={getTheme(material)}>
            <Container style={{backgroundColor: '#2d3238'}}>
                <CustomHeader title='Contact Us' navigation={this.props.navigation} />

                { this.state.isLoading ? <Spinner/> :
                    <View style={{flex: 1, flexDirection: 'column', elevation: -2}}>
                        {this.renderMap()}
                        <View style={{width: '80%', height: 175, position: 'absolute', top: '65%', left: '10%', backgroundColor: 'rgba(0, 0, 0, 0.6 )', justifyContent: 'center'}}>
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

const styles = StyleSheet.create({
    glowingRed: {
        textShadowColor: 'rgba(255, 83, 68, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      },
});