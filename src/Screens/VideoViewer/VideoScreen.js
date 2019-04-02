import React from 'react';
import {Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Body, Right, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {StyleSheet} from 'react-native';
import { Row, Grid } from "react-native-easy-grid";
import {Video} from 'expo';

export default class VideoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {videoSource: ''};
  }
  
  changeVideo(newSource){
    this.setState({videoSource: newSource})
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={styles.header}>
            <Left style={{flex:1}}>    
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu'/>
              </Button>
            </Left>

            <Body style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontFamily: 'Ubuntu_Bold'}}> Videos </Text>
            </Body>

            <Right style={{flex: 1}}/>
          </Header>

          <Content style={{flexDirection: 'column'}}>
            <Content style={{backgroundColor: 'red', flex: 3}}>
              <Text> asdasd</Text>
              <Text> asdasd</Text>
              <Text> asdasd</Text>
            </Content>

            <Content style={{backgroundColor: 'black', flexGrow: 1, height: 'auto'}}>
              <Text> asdasd</Text>
              <Text> asdasd</Text>
              <Text> asdasd</Text>
            </Content>
          </Content>

        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  header: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
})