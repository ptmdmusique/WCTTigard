import React from 'react';
import { Image, ImageBackground, View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text, ListItem, Left, Body, Icon } from "native-base";

const routes =  [
  {
    name: "Home",
    iconName: "home",
    iconType: "Entypo",
    displayName: "Home"
  },
  {
    name: "Video",
    iconName: "video",
    iconType: "Entypo",
    displayName: "Videos"
  },
  {
    name: "Picture",
    iconName: "image",
    iconType: "Entypo",
    displayName: "Picture Board"
  },
  {
    name: "Event",
    iconName: "notification",
    iconType: "Entypo",
    displayName: "Events and News"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    iconType: "Entypo",
    displayName: "School Schedule"
  },
]

class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
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
                    <Icon style={{ fontSize: 23, marginLeft: 10, color: 'black' }} name={data.item.iconName} type={data.item.iconType} />
                  </Left>
                  <Body>
                    <Text style={{marginLeft: 10, fontSize: 12}}>{data.item.displayName}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
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