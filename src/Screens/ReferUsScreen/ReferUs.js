import React from 'react';
import {Title, Body, Right, Container, Header, Button, Left, Icon, StyleProvider, Card, CardItem, Text} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet} from 'react-native';

import {customStyles} from '../../common/CustomStyle';

export default class PictureScreen extends React.Component {
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header} hasTabs>
            <Left style={{flex:1}}>    
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={customStyles.headerIcon} name='menu'/>
              </Button>
            </Left>

            <Body style={{flex:3}}>
              <Title style={customStyles.headerText}>Refer Us</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

          <Card>
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
                <Text>
                  As you know, Taekwondo is a great way for children and adults to lead happier and healthier lives.
                </Text>
                <Text>
                  Children will be able to improve their focus, fitness and self-control, adults will be able to improve their health and reduce stress and families are able to spend quality time together in a positive atmostphere.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Image source={require('../../../assets/images/michaelangelo.png')} style={{height: 20, width: 20, marginRight: 10,}}/>
              <Text>
                Thank you for using our app!
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Refer us through:</Text>
            </CardItem>
            <CardItem style={{justifyContent: 'space-around'}}>
              <Icon name="mail-with-circle" style={styles.icon}/>
              <Icon name="mail-with-circle" style={styles.icon}/>
              <Icon name="mail-with-circle" style={styles.icon}/>
              <Icon name="mail-with-circle" style={styles.icon}/>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  };
}

styles = StyleSheet.create({
  icon: {
    color: "#fc5344", 
    fontSize: 35,
  }
})