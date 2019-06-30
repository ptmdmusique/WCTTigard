import React from 'react';
import { Title, Body, Container, Icon, StyleProvider, Card, CardItem, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase';

const MOCK_MESSAGE_BODY = "Refer WCT Tigard to your friend!";

export default class ReferUsScreen extends React.Component {
  state = {
    data: {},
    isLoading: true,
  }

  componentDidMount() {
    firebase.firestore().collection('ReferUsScreen').doc("test").get()
    .then( doc => {
      this.setState({data: doc.data(), isLoading: false})
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='Refer Us' navigation={this.props.navigation} />

          {this.state.isLoading ? 
          <Spinner/>
          : 
          <Content style={{flex: 1, backgroundColor: '#eee'}}>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header>
                {/* <Body style={{flex: 1/3,}}>
                  <AutoHeightImage source={{uri: MOCK_MASTER_INFO.masterImageURL}} width={width / 4}/>
                </Body> */}
                <Body style={{flex: 2/3, paddingLeft: 5}}>
                  <Title style={{color: "#fc5344", fontSize: 15}}>{this.state.data.rewardTitle}</Title>
                </Body>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Image
                    source={require('../../../assets/images/refer_gift.png')}
                    style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 10}} />
                  {/* <Text style={{color: '#666', fontWeight: '500', fontSize: 12, fontFamily: 'Roboto-Bold'}}>
                    As you know, Taekwondo is a great way for children and adults to lead happier and healthier lives.
                  </Text>
                  <Text style={{color: '#666', fontWeight: '500', fontSize: 12, fontFamily: 'Roboto-Bold'}}>
                    Children will be able to improve their focus, fitness and self-control, adults will be able to improve their health and reduce stress and families are able to spend quality time together in a positive atmostphere.
                  </Text> */}
                  <Text style={{color: '#666', fontWeight: '500', fontSize: 12, fontFamily: 'Roboto-Bold'}}>
                    {this.state.data.rewardContent}
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                {/* <Image source={require('../../../assets/images/michaelangelo.png')} style={{height: 20, width: 20, marginRight: 10,}}/> */}
                <Icon name="sun" style={{fontSize: 20, color: '#fc5344'}}/>
                <Text style={{color: '#fc5344', fontWeight: 'bold', fontSize: 15, fontFamily: 'Roboto-Bold'}}>
                  Thank you for using our app!
                </Text>
              </CardItem>
            </Card>

            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem>
                <Text style={{fontWeight: 'bold', color: '#fc5344', fontFamily: 'Roboto-Bold'}}>Refer us through:</Text>
              </CardItem>
              <CardItem style={{justifyContent: 'space-around'}}>
              <TouchableOpacity
                  onPress={() => Linking.openURL('mailto:?subject=' + this.state.data.referTitle + '&body=' + this.state.data.referContent)}
              >
                  <Icon name="mail" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => Linking.openURL('sms:?&body=' + this.state.data.referContent)}
              >
                  <Icon name="message-square" style={styles.icon} />
              </TouchableOpacity>
                {/* <Icon name="mail-with-circle" style={styles.icon}/>
                <Icon name="mail-with-circle" style={styles.icon}/>
                <Icon name="mail-with-circle" style={styles.icon}/> */}
              </CardItem>
            </Card>

          </Content>
          }
          
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  icon: {
    color: "#fc5344", 
    fontSize: 35,
  }
})