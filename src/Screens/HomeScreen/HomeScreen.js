import React from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Button, Left, Right, Body, Icon, StyleProvider, Footer, CardItem } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, ImageBackground} from 'react-native';
import {BlurView} from 'expo';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={styles.header}>
            <Left style={{flex:1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Right style={{flex:1}}/>
          </Header>

          <ImageBackground 
            style={styles.screenContainer}  
            source={require('../../../assets/images/HomePage_Image_1.png')} 
          >
            <View style={{alignItems:'center', marginTop: -140}}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/images/sidebar-logo.png')}
                  style={styles.logo}
                />
              </View>
            </View>
          </ImageBackground>

          <Footer style={styles.footer}>
            <Image 
              source={require('../../../assets/images/plain_black.png')}
              style={styles.blurImage}
            />
            <View style={styles.textOverImage}>
                <Text style={{fontSize: 15, fontFamily: 'Ubuntu_Bold'}}>
                  Master Eric's World Champion Taekwondo
                </Text>
            </View> 
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  footer: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    width: 'auto',
    height: 500,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: 'auto',
  },
  logoContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 100,
  },
  logo: {
    height: 80,
    width: 80,
  },

  blurImage: {
    height: 175,
    flex: 1,
    opacity: 0.7
  },
  textOverImage: {
    alignItems:'center', 
    marginTop: 15,
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
  }
})