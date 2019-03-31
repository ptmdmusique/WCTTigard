import React from 'react';
import { Image, ImageBackground, View, StyleSheet } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Icon } from "native-base";

const routes =  [
  {
    name: "Home",
    iconName: "home",
    iconType: "AntDesign",
    displayName: "Home"
  },
  {
    name: "Video",
    iconName: "videocamera",
    iconType: "AntDesign",
    displayName: "Videos"
  },
]

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../assets/sidebar-background.png')}
            style={styles.imageBackground}>
            <View style={styles.darkOverlay} />
            <View style={styles.logoContainer}>
              <Image
                style={{ height: 70, width: 70 }}
                source={require('../../assets/sidebar-logo.png')}
              />
            </View>
            <Text style={styles.title}>Master Eric's WCT</Text>
          </ImageBackground>

          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  icon
                  button
                  onPress={() => this.props.navigation.navigate(data.name)}
                  style={{listBtnUnderlayColor: '#333'}}>
                  <Left>
                    <Icon style={{ fontSize: 23 }} name={data.iconName} type={data.iconType} />
                  </Left>
                  <Body>
                    <Text style={{marginLeft: 10}}>{data.displayName}</Text>
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
    marginLeft: 15,
    marginTop: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  }
});