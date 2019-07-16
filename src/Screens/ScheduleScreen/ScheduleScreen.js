import React from 'react';
import { View, Dimensions, TouchableOpacity, Platform, CameraRoll } from 'react-native';
import { Container, StyleProvider, Footer, Text, Content, Toast, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import PDFReader from 'rn-pdf-reader-js';
import { FileSystem, Permissions } from 'expo';

import CustomHeader from '../../CommonComponents/CustomHeader';

import * as firebase from 'firebase/app';
var {height, width} = Dimensions.get('window');

export default class ScheduleScreen extends React.Component {
    state = {
        scheduleURL: "http://www.pdf995.com/samples/pdf.pdf",
        isLoading: true,
    }

    async componentDidMount() {
        //TODO: Change this back
        firebase.storage().ref("ScheduleScreen/" + global.uid + "/schedule.pdf").getDownloadURL()
        .then(url => {
            console.log("Schedule Download URL: " + url);
            this.setState({ scheduleURL: url }, () => this.setState({ isLoading: false }))})
        .catch(err => {
            //TODO: Add some alert here
            this.setState({ isLoading: false });
            console.log("--No Schedule to load");
            console.log(err);
        })
    }
    
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
                  {/* TODO: Change to refresh */}
                    <TouchableOpacity 
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
