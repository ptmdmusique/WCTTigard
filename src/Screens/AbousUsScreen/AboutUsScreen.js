import React from 'react';
import { Container, StyleProvider, Tabs, Tab } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';

import CustomHeader from '../../CommonComponents/CustomHeader';

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
          <CustomHeader title='About Us' navigation={this.props.navigation} />

          <Tabs tabBarPosition='bottom' tabBarUnderlineStyle={{backgroundColor: '#FF6961', top: 0}}>
            {this.renderTabs()}
          </Tabs>

        </Container>
      </StyleProvider>
    );
  };
}
