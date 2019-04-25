import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, FooterTab, Footer, Tabs, Tab } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import {customStyles} from '../../common/CustomStyle';
import MOCK_IMAGES from '../../../database/Images/ImageList.json'; //Temporarily, use this as name
import Modal from "react-native-modal";
import AutoHeightImage from 'react-native-auto-height-image';
import { FileSystem } from 'expo';

export default class PictureScreen extends React.Component {  
  state = {
    activeTab: 'school',
  }

  renderFooterTab(tabName, text){
    return(
      <Button 
        full
        active={this.state.activeTab === tabName}
        onPress={() => {
          this.setState({activeTab: tabName});
          // console.log(this.state.activeTab);
          //Anim?
        }}
        style={{
          borderTopWidth: this.state.activeTab === tabName ? 2 : 0,
        }}
      >
        <Text 
          style={{
            color: this.state.activeTab === tabName ? "#4b4b4b" : "#d7d7d7",
            fontWeight: this.state.activeTab === tabName ? 'bold' : 'normal',
            fontSize: 13,
            }}>
            {text}
        </Text>
      </Button>
    )
  }
  renderTab(){
    switch (this.state.activeTab){
      case 'school':
        return (
          <Text>School</Text>
        )
      case 'master': 
        return (
          <Text>Master</Text>
        )
    }
  }

  render () {   
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
           <Header style={customStyles.header}
          >
            <Left style={{flex:1}}>    
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={customStyles.headerIcon} name='menu'/>
              </Button>
            </Left>

            <Body style={{flex:3}}>
              <Title style={customStyles.headerText}>About Us</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

          <Content>
            {this.renderTab()}
          </Content>

          <Footer
            // tabBarUnderlineStyle={{backgroundColor: '#666'}}
            tabActiveBgColor = "#666"
          >
            <FooterTab>
              {this.renderFooterTab('school', 'About School')}
              {this.renderFooterTab('master', 'About Master')}
            </FooterTab>
          </Footer>

          {/* <Tabs>
              <Tab heading="About School"
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
              >
                <Text>School</Text>
              </Tab>
              <Tab heading="About Master"
                textStyle={styles.tabText}
                activeTextStyle={styles.tabActiveText}
                tabStyle={styles.tab}
                activeTabStyle={styles.tab}
              >
                <Text>Master</Text>
              </Tab>
          </Tabs> */}
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  tab: {
    height: 50,
  },
  tabText: {
    color: '#333'
  },
  tabActiveText: {
    color: '#333'
  },
})