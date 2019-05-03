import React from 'react';
import {Title, Body, Right, Header, Button, Left, Icon} from 'native-base';
import { StyleSheet, Image } from 'react-native'


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
      <Button transparent onPress={() => this.props.navigation.openDrawer()}>
        <Icon style={styles.headerIcon} name='menu'/>
      </Button>
    );
  }

  render () {
    return (
      <Header style={styles.header}>
        <Left style={{flex:1}}>
          {this.renderLeftIcon()}
        </Left>

        <Body style={{flex:3}}>
          <Title style={styles.headerText}>{this.props.title}</Title>
        </Body>

        <Right style={{flex:1}}>
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
    shadowRadius: 5,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 0,
  },
  footer: {
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center',

    shadowRadius: 5,
    elevation: 10,
    zIndex: 10,
  },
  headerText:{
    fontSize: 22,
    color: '#444',
    fontFamily: 'Ubuntu-Medium',
    // alignSelf: 'center',
  },
  headerIcon:{
    color: '#444',
    fontSize: 30,
  },
})