import React from 'react';
import { Title, Body, Container, Icon, StyleProvider, Card, CardItem, Text, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, TouchableNativeFeedback, Linking} from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';

const MOCK_MESSAGE_BODY = "Test";

export default class ReferUsScreen extends React.Component {
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='Refer Us' navigation={this.props.navigation} />

          <Content style={{flex: 1, backgroundColor: '#eee'}}>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header>
                {/* <Body style={{flex: 1/3,}}>
                  <AutoHeightImage source={{uri: MOCK_MASTER_INFO.masterImageURL}} width={width / 4}/>
                </Body> */}
                <Body style={{flex: 2/3, paddingLeft: 5}}>
                  <Title style={{color: "#fc5344"}}>VIP Rewards Program</Title>
                </Body>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Image
                    source={require('../../../assets/images/refer_gift.png')}
                    style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 10}} />
                  <Text style={{color: '#666', fontWeight: '500', fontSize: 14}}>
                    As you know, Taekwondo is a great way for children and adults to lead happier and healthier lives.
                  </Text>
                  <Text style={{color: '#666', fontWeight: '500', fontSize: 14}}>
                    Children will be able to improve their focus, fitness and self-control, adults will be able to improve their health and reduce stress and families are able to spend quality time together in a positive atmostphere.
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                {/* <Image source={require('../../../assets/images/michaelangelo.png')} style={{height: 20, width: 20, marginRight: 10,}}/> */}
                <Icon name="sun" style={{fontSize: 20, color: '#fc5344'}}/>
                <Text style={{color: '#fc5344', fontWeight: 'bold'}}>
                  Thank you for using our app!
                </Text>
              </CardItem>
            </Card>

            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem>
                <Text style={{fontWeight: 'bold', color: '#fc5344'}}>Refer us through:</Text>
              </CardItem>
              <CardItem style={{justifyContent: 'space-around'}}>
              <TouchableNativeFeedback
                  onPress={() => Linking.openURL('mailto:?subject=Refer WCT Tigard&body=' + MOCK_MESSAGE_BODY)}
              >
                  <Icon name="mail" style={styles.icon} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                  onPress={() => Linking.openURL('sms:number?&body=' + MOCK_MESSAGE_BODY)}
              >
                  <Icon name="message-square" style={styles.icon} />
              </TouchableNativeFeedback>
                {/* <Icon name="mail-with-circle" style={styles.icon}/>
                <Icon name="mail-with-circle" style={styles.icon}/>
                <Icon name="mail-with-circle" style={styles.icon}/> */}
              </CardItem>
            </Card>

          </Content>
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