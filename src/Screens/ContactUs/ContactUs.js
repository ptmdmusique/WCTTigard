import React from 'react';
import {Title, Container, Header, Button, Left, Icon, StyleProvider, 
    Body, Right, Footer, Text, Content, Spinner} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Image, Dimensions, StyleSheet, Linking, Platform, ScrollView } from 'react-native';
import {MapView, Location, Permissions} from 'expo';

import {customStyles} from '../../common/CustomStyle';
import { scale, moderateScale, verticalScale} from '../../common/Scalling';

var {height, width} = Dimensions.get('window');
var latitudeDelta = 0.1022, longitudeDelta = 0.1021;
const label = 'Custom Label';

const MOCK_CONTACT = {
    phoneNumber: '(503) 431-2034',
    address: "15660 SW Pacific Hwy",
    website: 'http://wcttigard.com/',
    email: 'wcttigard@yahoo.com',
    name: "World Champion Taekwondo Tigard",
};

export default class ScheduleScreen extends React.Component {
    state = {
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
                <View style={{flex: 1, borderBottomColor: '#aaa', borderBottomWidth: 1}}>
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

    renderButton(iconName, description){
        return (
            <View 
                style={{
                    paddingTop: 15, 
                    flexDirection:'row', 
                    alignItems: 'center', 
                    width: '75%', 
                    paddingLeft: width / 11,
                }}>
                <Body 
                    style={{
                        width: '25%',
                        justifyContent: 'center',
                    }}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name={iconName} style={{fontSize: 21, color: '#e53110'}}/>
                        {/* <Text style={{fontSize: 10, color: '#e53110', paddingTop: 5}}>{note}</Text> */}
                    </View>
                </Body>
                <Body 
                    style={{
                        flex: 5, 
                        paddingLeft: 10, 
                        alignItems: 'flex-start',
                    }}>
                    <Text style={{fontSize: 15,}}>{description}</Text>
                </Body>
            </View>
        )
    }

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

            <View style={{flex: 1, flexDirection: 'column'}}>
                {this.renderMap()}
                <View style={{flex: 1, backgroundColor: '#ddd'}}>
                    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                        <View style={{width: '85%', backgroundColor: '#fff', borderColor: '#fff', borderRadius: 5, elevation: 5}}>
                            <Text>Hello</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {/* {this.renderButton("phone", MOCK_CONTACT.phoneNumber)}
            {this.renderButton("mail", MOCK_CONTACT.email)}
            {this.renderButton("location", MOCK_CONTACT.address)}
            {this.renderButton("globe", MOCK_CONTACT.website)} */}

              {/* <Footer style={{flexDirection: 'row',}}>
                  <Button danger
                    style={styles.button}
                    onPress={() => Linking.openURL(`tel:${MOCK_CONTACT.phoneNumber}`)}
                  >
                    <Text style={styles.buttonText}>Call</Text>
                  </Button>
                  <Button danger
                    style={styles.button}
                    onPress={() => Linking.openURL('mailto:' + MOCK_CONTACT.email)}
                  >
                    <Text style={styles.buttonText}>Email</Text>
                  </Button>
                  <Button danger
                    style={styles.button}
                    onPress={() => Linking.openURL(MOCK_CONTACT.url)}
                  >
                    <Text style={styles.buttonText}>Direction</Text>
                  </Button>
                  <Button danger
                    style={styles.button}
                    onPress={() => Linking.openURL(MOCK_CONTACT.website)}
                  >
                    <Text style={styles.buttonText}>Website</Text>
                  </Button>
              </Footer> */}
            </Container>
          </StyleProvider>
        );
      };
}

styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 40, 
        top: 10, 
        color: '#e53110',
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: width / 50,
    }
})