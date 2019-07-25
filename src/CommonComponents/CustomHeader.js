import React from 'react';
import { StyleSheet, Image, } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Body, Right, Header, Button, Left, Icon, Text } from 'native-base';


export default class CustomHeader extends React.Component {
  renderLeftIcon() {
    if (this.props.isStack) {
      return (
        <Button transparent onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon style={styles.headerIcon} name='angle-left' type="FontAwesome"/>
          <Text style={styles.headerIconText}>Back</Text>
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
      <Header style={styles.header}>
        <Left style={{flex:1, }}>
          <Animatable.View animation="zoomIn">
            {this.renderLeftIcon()}
          </Animatable.View>
        </Left>

        <Body style={{flex: 3, alignItems: this.props.isHome ? 'center' : 'flex-start', }}>
          {this.props.isHome ? 
          <Animatable.View animation="zoomIn">
            <Text style={[styles.headerText, { fontSize: 12, textAlign: 'center', }]}>{this.props.title}</Text>
            <Text style={[styles.headerText, { fontSize: 12, textAlign: 'center', }]}>{this.props.title_2}</Text>
          </Animatable.View> :
          <Animatable.View animation="zoomIn">
            <Text style={[styles.headerText, { fontSize: 22, }]}>{this.props.title}</Text>
          </Animatable.View>
        }
        </Body>

        <Right style={{flex: 1}}>
          <Animatable.View animation="zoomIn">
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Image source={require('../../assets/images/logo.png')} 
                style={{
                  height: 75,
                  width: 75,
                }}
              />
            </Button>
          </Animatable.View>
        </Right>
      </Header>
    );
  };
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#e53635",
    paddingTop: 0.1,
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