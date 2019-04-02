import React from 'react';
import { View } from 'react-native';
import {Container, Header, Text, Button, Left, Icon, StyleProvider, Footer } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, ImageBackground} from 'react-native';
import { Row, Grid } from "react-native-easy-grid";

const previewRoute = [
  {
    name: "Video",
    iconName: "videocamera",
    iconType: "AntDesign",
    displayName: "Videos"
  },
  {
    name: "Picture",
    iconName: "picture",
    iconType: "AntDesign",
    displayName: "Picture Board"
  },
  {
    name: "Event",
    iconName: "calendar",
    iconType: "AntDesign",
    displayName: "News"
  },
  {
    name: "Info",
    iconName: "infocirlceo",
    iconType: "AntDesign",
    displayName: "School Info"
  },
]

export default class HomeScreen extends React.Component {

  render() {
    const gridItems = [];
    for(let i = 0; i < previewRoute.length; i++){
      gridItems.push(
        <Grid style={{alignItems:'center'}} key={previewRoute[i].name}>
          <Row style={{alignContent:'center', justifyContent: 'center'}}>
            <Button 
              transparent 
              onPress={() => {
                this.props.navigation.navigate(previewRoute[i].name)
              }}>
              <Icon 
                style={{ fontSize: 22, textAlign:'center', color: 'white',}} 
                name={previewRoute[i].iconName} 
                type={previewRoute[i].iconType} 
              />
            </Button>
          </Row>
          <Row>
            <Text style={{fontSize: 10, top: 10}}>{previewRoute[i].displayName}</Text> 
          </Row>
        </Grid>
      )
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={styles.header}>
            <Left style={{flex:1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu'/>
              </Button>
            </Left>
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

            <Grid >
              <Row>
                {gridItems}
              </Row>
            </Grid>
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
    height: 60, 
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
    alignItems:'center', 
    position: 'absolute', 
    opacity: 0.7
  },
  textOverImage: {
    top:-50,
    alignItems:'center', 
    marginTop: 15,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
  },
})