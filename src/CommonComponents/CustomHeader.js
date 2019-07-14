import React from 'react';
import { StyleSheet, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Title, Body, Right, Header, Button, Left, Icon, Text } from 'native-base';


export default class CustomHeader extends React.Component {
  renderLeftIcon() {
    if (this.props.isStack) {
      return (
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={styles.headerIcon} name='chevron-left'/>
        </Button>
      );
    }

    return (
      <Button transparent onPress={() => this.props.navigation.openDrawer()} style={{flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon style={styles.headerIcon} name='menu'/>
        <Text style={styles.headerIconText}>Menu</Text>
      </Button>
    );
  }

  render () {
    return (
      <Header style={styles.header} transparent>
        <Left style={{flex:1}}>
          <Animatable.View animation="zoomIn">
            {this.renderLeftIcon()}
          </Animatable.View>
        </Left>

        <Body style={{flex:3}}>
          <Animatable.View animation="zoomIn">
            <Title style={styles.headerText}>{this.props.title}</Title>
          </Animatable.View>
        </Body>

        <Right style={{flex:1}}>
          <Animatable.View animation="zoomIn">
            {this.props.isHome? null :
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              {/* <Icon style={styles.headerIcon} name='home'/> */}
              <Image source={require('../../assets/images/sidebar-logo.png')} 
                style={{
                  height: 40,
                  width: 40,
                }}
              />
            </Button>}
          </Animatable.View>
        </Right>
      </Header>

      // <Header>
      //   <Left>
      //     <Button transparent>
      //       <Icon name='menu' style={{backgroundColor: 'red'}}/>
      //     </Button>
      //   </Left>
      //   <Body>
      //     <Title styles={{color: 'red'}}>Header</Title>
      //   </Body>
      //   <Right>
      //     <Button transparent>
      //       <Icon name='menu' style={{backgroundColor: 'red'}} />
      //     </Button>
      //   </Right>
      // </Header>
    );
  };
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center', 
    alignItems: 'center',
    // shadowRadius: 5,
    // elevation: 3,
    paddingTop: 0,
  },
  headerText:{
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',

    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerIcon:{
    color: '#fff',
    fontSize: 30,
    flex: 2,
    paddingBottom: 0,
    marginBottom: 0,
    
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerIconText: {
    color: '#fff',
    fontSize: 10,
    flex: 1,
    marginLeft: 3,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }
})