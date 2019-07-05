import React from 'react';
import { View, Dimensions, TouchableOpacity, Platform, CameraRoll } from 'react-native';
import { Container, StyleProvider, Footer, Text, Content, Toast, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import PDFReader from 'rn-pdf-reader-js';
import { FileSystem, } from 'expo';
import * as Permissions from 'expo-permissions';

import CustomHeader from '../../CommonComponents/CustomHeader';

import * as firebase from 'firebase';
var {height, width} = Dimensions.get('window');

export default class ScheduleScreen extends React.Component {
    state = {
        scheduleURL: "http://www.pdf995.com/samples/pdf.pdf",
        isLoading: true,
        isGrantedPermission: false
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === 'granted') {
            this.setState({ isGrantedPermission: true });
        } else {
            this.setState({ isGrantedPermission: false });
            Toast.show({
                text: "You won't be able to download!",
                buttonText: 'Okay',
                duration: 2500,
            })
            // ToastAndroid.show("You won't be able to download.");
        }

        //TODO: Change this back
        firebase.storage().ref("ScheduleScreen/" + "test" + "/schedule.pdf").getDownloadURL()
        .then(url => {
            console.log("Schedule Download URL: " + url);
            this.setState({ scheduleURL: url }, () => this.setState({ isLoading: false }))})
        .catch(err => {
            console.log(err);
        })
    }
    
    downloadDocument() {
        if (this.state.isGrantedPermission){
            FileSystem.downloadAsync(
                this.state.scheduleURL,                             //Link tai?
                FileSystem.documentDirectory + 'schedule.pdf'      //Thu muc iai?
            )
            .then(({ uri }) => {
                CameraRoll.saveToCameraRoll(uri, 'photo');
                Toast.show({
                    text: "Downloaded! Check your pdf download folder.",
                    buttonText: 'Okay',
                    duration: 2500,
                })
            })
            .catch(error => {
                console.error(error);
            })
        } else {
            //TOAST no permission granted
            Toast.show({
                text: "Sorry you denied permission to access storage, please reload app!",
                buttonText: 'Okay',
                duration: 2500,
            })
        }
    }

    // saveToGallery() {
    //     let url = this.state.scheduleURL;
    //     ToastAndroid.show("Image is Saving...", ToastAndroid.SHORT)
    //     if (Platform.OS === 'android'){ 


    //         RNFetchBlob
    //             .config({
    //             fileCache : true,
    //             appendExt : 'jpg'
    //             })
    //             .fetch('GET', url)
    //             .then((res) => {
    //                 console.log('Luu cai ne');
    //                 CameraRoll.saveToCameraRoll(res.path())

    //                     .then((res) => {
    //                     console.log("save", res)
    //                     ToastAndroid.show("Image saved Successfully.", ToastAndroid.SHORT)
    //                     }).catch((error) => {
    //                         ToastAndroid.show("Ops! Operation Failed", ToastAndroid.SHORT)

    //                     })

    //             })
    //     } else {
    //         CameraRoll.saveToCameraRoll(url)
    //         .then(alert('Success', 'Photo added to camera roll!'))
    //         ToastAndroid.show("Image saved Successfully.", ToastAndroid.SHORT)
    //     }
    // }

    render () {
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <CustomHeader title='Schedule' navigation={this.props.navigation} />

              <Content 
                contentContainerStyle={{
                    alignContent: 'center', 
                    alignItems: 'center', 
                    justifyContent: 'center',}}>
                <View style={{width, height: height * 0.8}}>
                    {/* <Image source={{uri: this.state.scheduleURL}}
                        style={{
                            flex: 1,
                            width: null,
                            height: null,
                            resizeMode: 'contain'
                        }}
                    /> */}
                    {this.state.isLoading ? 
                          <Spinner/>
                        : <PDFReader source={{ uri: this.state.scheduleURL }} />}
                </View>
              </Content>

              <Footer>
                    <TouchableOpacity 
                        onPress={() => this.downloadDocument()}
                        style={{alignSelf: 'center', width: '90%', height: Platform.OS === 'ios' ? 45 : 30, backgroundColor: '#f74242', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}
                        activeOpacity={0.7}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>Download</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
          </StyleProvider>
        );
      };
}
