import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, FooterTab, Footer, Card, CardItem,} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import {customStyles} from '../../common/CustomStyle';
import MOCK_IMAGES from '../../../database/Images/ImageList.json'; //Temporarily, use this as name
import Modal from "react-native-modal";
import AutoHeightImage from 'react-native-auto-height-image';
import { FileSystem } from 'expo';

const MOCK_MASTER_INFO = {
  masterName: 'Master Eric',
  masterImageURL: 'https://imgur.com/eY76iWD.jpg',
  masterDescription: 'Master Eric is a former student of World Champion Taekwondo (WCT). He is a 5th Degree Black Belt and has trained under Grandmaster B.C. Kim, a 1992 Olympic Gold Medalist. Master Eric graduated from University of Bridgeport located in Connecticut, majoring in Martial Arts Studies. Master Eric is only one of five people in the world with a Martial Arts degree from an American University. He is a multi-time State Champion as well as a Bronze Medalist at 2010 National Collegiate Taekwondo Championship held in Denver, CO. In 2014, he became the spokesperson for WCT and opened WCT Tigard. Master Eric’s World Champion Taekwondo’s vision is to find and bring out the best in everybody through Taekwondo. He believes that every single person has a special talent and a gift that can be contributed in achieving something great for our generation!'
}

const MOCK_MASTER_ACHIEVEMENTS = [
  {
    year: "2005",
    title: "Oregon State Champion"
  },
  {
    year: "2006",
    title: "New York State Champion"
  },
  {
    year: "2008",
    title: "Korean American Olympics Bronze Medalist"
  },
  {
    year: "2010",
    title: "National Collegiate Bronze Medalist"
  },
  {
    year: "2010",
    title: "Recipient of Dean’s Award from University of Bridgeport"
  },
  {
    year: "2010",
    title: "B.A. Martial Arts from University of Bridgeport, USA"
  },
  {
    year: "2014",
    title: "Head Master of WCT Tigard"
  },
]

const {height, width} = Dimensions.get('window');

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
          borderTopColor: '#4b4b4b'
        }}
      >
        <Text 
          style={{
            color: this.state.activeTab === tabName ? "#4b4b4b" : "#aaa",
            fontWeight: this.state.activeTab === tabName ? 'bold' : 'normal',
            fontSize: 13,
          }}
        >
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
          this.renderMasterScreen()
        )
    }
  }

  renderAchievements = () => {
    return MOCK_MASTER_ACHIEVEMENTS.map((item, index) => (
      <Text key={index}>
        <Text style={{fontWeight: '500', fontSize: 11,  color: '#333'}}>{item.year}</Text>
        <Text style={{fontSize: 10,  color: '#333'}}> - {item.title}</Text>
      </Text>
    ));
  }

  renderMasterScreen() {
    return(
      <Card style={{width: '95%', alignSelf: 'center'}}>
        <CardItem header bordered>
          <Text style={{color: '#fc5344'}}>{MOCK_MASTER_INFO.masterName}</Text>
        </CardItem>
        
        <CardItem bordered>
          <Body>
            <Text style={{fontSize: 12, color: '#333'}}>
              {MOCK_MASTER_INFO.masterDescription}
            </Text>
          </Body>
        </CardItem>

        <CardItem>
          <Body style={{flex: 1/3,}}>
            <AutoHeightImage source={{uri: MOCK_MASTER_INFO.masterImageURL}} width={width / 4}/>
          </Body>
          <Body style={{flex: 2/3, paddingLeft: 5}}>
            {this.renderAchievements()}
          </Body>
        </CardItem>
      </Card>
      
      // <Card>
      //       <CardItem header bordered>
      //         <Text>NativeBase</Text>
      //       </CardItem>
      //       <CardItem bordered>
      //         <Body>
      //           <Text>
      //             NativeBase is a free and open source framework that enable
      //             developers to build
      //             high-quality mobile apps using React Native iOS and Android
      //             apps
      //             with a fusion of ES6.
      //           </Text>
      //         </Body>
      //       </CardItem>
      //       <CardItem footer bordered>
      //         <Text>GeekyAnts</Text>
      //       </CardItem>
      //     </Card>
    )
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

          <Content style={{backgroundColor: '#eee'}}>
            {this.renderTab()}
          </Content>

          <Footer
            // tabBarUnderlineStyle={{backgroundColor: '#333'}}
            tabActiveBgColor = "#333"
          >
            <FooterTab>
              {this.renderFooterTab('school', 'About School')}
              {this.renderFooterTab('master', 'About Master')}
            </FooterTab>
          </Footer>

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