import React, { useState, useEffect, Component } from 'react'
import {
  Container,
  StyleProvider,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Icon,
} from 'native-base';
import { SafeAreaView, Platform, Text, StyleSheet, } from 'react-native';
import RefreshView from '../../CommonComponents/RefreshView';

import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import CustomHeader from '../../CommonComponents/CustomHeader';
import WebViewComp from '../../CommonComponents/WebViewComp';

import * as firebase from 'firebase/app';

const tabStyle = {
  "fundraiser": { 
    iconName: "heart",
    iconType: "Entypo",
    title   : "School Fundraisers",
  }, 
  "birthday": { 
    iconName: "cake",
    iconType: "Entypo",
    title   : "Birthday Party"
  }, 
  "movieNights": { 
    iconName: "popcorn",
    iconType: "MaterialCommunityIcons",
    title   : "Movie Nights",
  }, 
}

class TabList extends Component {
  state = {
    curTab: 0,
  }

  renderTabs = () => {
    const returnList = [];

    this.props.dataList.forEach((tabData, index) => {
      returnList.push(
        <Tab 
          key={index}
          heading={
            <TabHeading>
              <Icon 
                name={tabData['iconName']} type={tabData['iconType']} 
                style={{
                  fontSize: 17, 
                  marginRight: 5, 
                  color: this.state.curTab === index ? 'red' : 'black',
                  
                }}/>
              <Text 
                style={{
                  color: this.state.curTab === index ? 'red' : 'black',
                }}>
                {tabData['title']}
              </Text>
            </TabHeading>
          }
          tabStyle={{ borderTopWidth: 1.5, borderTopColor: '#bbb', }}
        >
          <WebViewComp data={tabData['data']}/>
        </Tab>
      )
    })
    
    const finalTabs = (
      <Tabs 
        tabBarPosition='top' 
        tabBarUnderlineStyle={{backgroundColor: '#FF6961', }}
        renderTabBar={() => <ScrollableTab />}
        onChangeTab={({ i }) => this.setState({ curTab: i })}
        >
        {returnList}
      </Tabs>
    )

    return finalTabs;
  }

  render() { 
    return this.renderTabs();
  }
}

const SpecialServiceScreen = (props) => {
  //Generalize things so that we can easily add dynamic pages (pages added by users through the web)
  const [dataList, setDataList] = useState(null);
  
  useEffect(() => {
    firebase.firestore().collection('SpecialServices').doc(global.uid).get()
    .then( doc => {
      //WARNING: there might be icon and title mismatch if the some data in doc.data() is missing!
      const tempList = [];
      data = doc.data();
      Object.keys(data).forEach((key, _) => {
        tempList.push({
          "data": data[key],
          ...tabStyle[key],
        })
      })
      
      setDataList(tempList);
    })
    .catch(err => {
      console.warn("--No special services to load");
      console.warn(err);
    })

  }, [])
 

  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <CustomHeader title='Special Services' navigation={props.navigation} />

        <SafeAreaView style={{ flex: 1 }}>

          {dataList ? <TabList dataList={dataList}/> : null}

          {Platform.OS === "ios" ? <RefreshView navigation={props.navigation}/> : null}
        </SafeAreaView>
      </Container>
    </StyleProvider>
  );
}

export default SpecialServiceScreen

const styles = StyleSheet.create({
  icon: {
    // color: '#333',
    fontSize: 18, 
    marginRight: 5, 
  },
})