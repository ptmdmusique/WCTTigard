import React from 'react';
import { Container, StyleProvider, Footer, Text, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { FileSystem } from 'expo';

import CustomHeader from '../../CommonComponents/CustomHeader';

var {height, width} = Dimensions.get('window');

export default class ScheduleScreen extends React.Component {
    state = {
        scheduleURL: "https://imgur.com/DX5HpsF.jpg"
    }
    
    downloadDocument() {
        FileSystem.downloadAsync(
            this.state.scheduleURL,
            FileSystem.documentDirectory + 'schedule.jpeg'
        )
        .then(({ uri }) => {
            console.log('Finished downloading to ', uri);
        })
        .catch(error => {
            console.error(error);
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
                    <Image source={{uri: this.state.scheduleURL}}
                        style={{
                            flex: 1,
                            width: null,
                            height: null,
                            resizeMode: 'contain'
                        }}
                    />
                </View>
              </Content>

              <Footer>
                    <TouchableOpacity 
                        onPress={() => this.downloadDocument()}
                        style={{alignSelf: 'center', width: '90%', height: 30, backgroundColor: '#f74242', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}
                        activeOpacity={0.7}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Download</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
          </StyleProvider>
        );
      };
}
