import React from 'react';
import { Image, ImageBackground, View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text, ListItem, Left, Body, Icon, StyleProvider, Footer, Header} from "native-base";
import material from '../..//native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import * as firebase from 'firebase/app';

const routes =  [
  {
    name: "Home",
    iconName: "home",
    iconType: "Feather",
    displayName: "Home"
  },
  {
    name: "Alert",
    iconName: "bell",
    iconType: "Feather",
    displayName: "Alerts"
  },
  {
    name: "Event",
    iconName: "book-open",
    iconType: "Feather",
    displayName: "Events"
  },
  {
    name: "News",
    iconName: "file-text",
    iconType: "Feather",
    displayName: "News"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    iconType: "Feather",
    displayName: "School Schedule"
  },
  {
    name: "Video",
    iconName: "youtube",
    iconType: "Feather",
    displayName: "Videos"
  },
  // {
  //   name: "Picture",
  //   iconName: "image",
  //   iconType: "Feather",
  //   displayName: "Picture Board"
  // },
  {
    name: "Birthday",
    iconName: "gift",
    iconType: "Feather",
    displayName: "Birthday Party"
  },
  {
    name: "ReferUs",
    iconName: "users",
    iconType: "Feather",
    displayName: "Refer Us"
  },
  {
    name: "Contact",
    iconName: "globe",
    iconType: "Feather",
    displayName: "Contact Us"
  },
  {
    name: "About",
    iconName: "info",
    iconType: "Feather",
    displayName:  "About Us"
  },
  // {
  //   name: "Trial",
  //   iconName: "v-card",
  //   displayName: "Trial Class"
  // },
]

class SideBar extends React.Component {
  state = {
    imageURL: '../../assets/images/sidebar-background.png'
  }

  componentDidMount() {
    firebase.storage().ref("Drawer/" + global.uid).listAll()
    .then(result => {
      if (!result.items || result.items.length === 0){
        console.warn("--No Drawer image");
        return;
      }

      console.log("--Drawer image found!");
      result.items[0].getDownloadURL().then(url => {
        this.setState({ imageURL: url }, () => this.setState({ isImageLoading: false }));
      })})

    .catch(err => {
      console.warn("--No Drawer image");
      console.error(err);
    });
  }

  render() {
    // TODO: Get sidebar Image from database
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          {this.state.imageURL ? 
            <ImageBackground
              source={{ url: this.state.imageURL }}
              style={styles.imageBackground}
            >
              <View style={styles.darkOverlay} />
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/original_logo_edited.png')}
                />
              </View>
              <Text style={styles.title}>Master Eric's WCT</Text>
            </ImageBackground>
              :
            <ImageBackground
              source={require('../../assets/images/sidebar-background.png')}
              style={styles.imageBackground}
            >
              <View style={styles.darkOverlay} />
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/original_logo_edited.png')}
                />
              </View>
              <Text style={styles.title}>Master Eric's WCT</Text>
            </ImageBackground>
          }

          <Content style={{backgroundColor: '#fafafa'}}>
            <FlatList        
              keyExtractor={item => item.name}
              data={routes}
              renderItem={data => {
                return (
                  <ListItem
                    icon
                    button
                    onPress={() => 
                      {
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate(data.item.name);
                      }
                    }   
                    style={{marginLeft: 0}}
                    >
                    <Left>
                      <Icon style={[styles.menuItemIcon, styles.glowing]} name={data.item.iconName} type={data.item.iconType}/>
                    </Left>
                    <Body style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5}}>
                      <Text style={[styles.menuItemDisplayName, styles.glowing]}>{data.item.displayName}</Text>
                    </Body>
                  </ListItem>
                );
              }}
            />
          </Content>
{/* 
          <Footer style={{height: 50, paddingTop: 10}}>
            <Image source={require('../../assets/images/yin-yang.png')} style={{width: 30, height: 30}}/>             
          </Footer> */}
        </Container>
      </StyleProvider>
    );
  }
}

export default SideBar;

const styles = StyleSheet.create({
  glowing: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  imageBackground: {
    height: 150,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: "flex-start",
    flexDirection: 'column'
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.5
  },
  logoContainer: {
    height: 85,
    width: 85,
    backgroundColor: 'white',
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#333'
  },
  title: {
    marginLeft: 17,
    marginTop: 5,
    color: 'white',
    fontSize: 13,
    fontFamily: 'Ubuntu-Bold',
  },
  menuItemIcon: {
    fontSize: 23,
    marginLeft: 10,
    color: '#222'
  },
  menuItemDisplayName: {
    marginLeft: 10,
    fontSize: 12,
    color: '#222',
    fontFamily: 'Ubuntu-Medium'
  },
  logo: {
    width: 100,
    height: 100,
  }
});