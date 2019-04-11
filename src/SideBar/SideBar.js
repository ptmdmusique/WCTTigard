import React from 'react';
import { Image, ImageBackground, View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text, ListItem, Left, Body, Icon, StyleProvider, Footer, Header} from "native-base";
import material from '../..//native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';

const routes =  [
  {
    name: "Home",
    iconName: "home",
    displayName: "Home"
  },
  {
    name: "Video",
    iconName: "video",
    displayName: "Videos"
  },
  {
    name: "Picture",
    iconName: "image",
    displayName: "Picture Board"
  },
  {
    name: "Event",
    iconName: "news",
    displayName: "Events and News"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "School Schedule"
  },
  {
    name: "AboutUs",
    iconName: "info",
    displayName:  "About Us"
  },
  {
    name: "Birthday",
    iconName: "cake",
    displayName: "Birthday Party"
  },
  {
    name: "ReferUs",
    iconName: "users",
    displayName: "Refer Us"
  },
]

class SideBar extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <ImageBackground
            source={require('../../assets/images/sidebar-background.png')}
            style={styles.imageBackground}
          >
            <View style={styles.darkOverlay} />
            <View style={styles.logoContainer}>
              <Image
                style={{ height: 70, width: 70 }}
                source={require('../../assets/images/sidebar-logo.png')}
              />
            </View>
            <Text style={styles.title}>Master Eric's WCT</Text>
          </ImageBackground>

          <Content>
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
                    <Icon style={{ fontSize: 23, marginLeft: 10, color: '#404040' }} name={data.item.iconName}/>
                  </Left>
                  <Body>
                    <Text style={{marginLeft: 10, fontSize: 12, color: '#404040', fontWeight: '500'}}>{data.item.displayName}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
          </Content>

          <Footer style={{height: 50, paddingTop: 10}}>
            <Image source={require('../../assets/images/yin-yang.png')} style={{width: 30, height: 30}}/>             
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

export default SideBar;

const styles = StyleSheet.create({
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
    opacity: 0.6
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
    fontWeight: '600',
  }
});