import React from 'react';
import {Title, Body, Right, Container, Header, Button, Left, Icon, StyleProvider, Tabs, Tab} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image } from 'react-native';

import {customStyles} from '../../common/CustomStyle';

import AboutSchoolTab from './Tabs/AboutSchoolTab';
import AboutMasterTab from './Tabs/AboutMasterTab';


const TABS = [
  {
    heading: 'School',
    childrenComponent: <AboutSchoolTab />
  },
  {
    heading: 'Master',
    childrenComponent: <AboutMasterTab />
  },
];

export default class PictureScreen extends React.Component {
  renderTabs = () => {
    return TABS.map((item, index) => (
      <Tab
        heading={item.heading}
        textStyle={{color: '#FF6961'}}
        tabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
        activeTextStyle={{color: '#FF6961'}}
        activeTabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
        key={index}
      >
        {item.childrenComponent}
      </Tab>
    ));
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header} hasTabs>
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
          <Tabs tabBarPosition='bottom' tabBarUnderlineStyle={{backgroundColor: '#FF6961', top: 0}}>
            {this.renderTabs()}
          </Tabs>

        </Container>
      </StyleProvider>
    );
  };
}
