import React from 'react';
import { Container, StyleProvider, Tabs, Tab, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';

import CustomHeader from '../../CommonComponents/CustomHeader';

import AboutSchoolTab from './Tabs/AboutSchoolTab';
import AboutMasterTab from './Tabs/AboutMasterTab';
import * as firebase from 'firebase';

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
  state = {
    aboutMasterData: null,
    aboutSchoolData: null,
    isLoading: true,
    masterImageURL: "",
  }

  componentDidMount() {
    //TODO: Change this
    firebase.firestore().collection('AboutSchool').doc("test").get()
    .then( doc => {
      this.setState({ aboutSchoolData: doc.data() }, () => {
        // console.log(this.state.aboutSchoolData.content);
        //TODO: Change this
        firebase.firestore().collection('AboutMaster').doc("test").get()
        .then( doc => {
          this.setState({ aboutMasterData: doc.data() }, () => {
            //TODO: Change this back
            firebase.storage().ref("AboutMasterScreen/" + "test").listAll()
            .then(result => {
              result.items[0].getDownloadURL().then(url => {
                this.setState({ masterImageURL: url }, () => {
                  this.setState({ isLoading: false })
                })              
              })})
            .catch(err => {
              console.error(err);
            });
            
          })
        })
        .catch(err => {
          console.log(err);
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='About Us' navigation={this.props.navigation} />

          <Tabs tabBarPosition='bottom' tabBarUnderlineStyle={{backgroundColor: '#FF6961', top: 0}}>
            <Tab
              heading={"School"}
              textStyle={{color: '#FF6961'}}
              tabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
              activeTextStyle={{color: '#FF6961'}}
              activeTabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
            >
              {this.state.isLoading ? <Spinner/> : <AboutSchoolTab schoolData={this.state.aboutSchoolData}/>}
            </Tab>

            <Tab
              heading={"Master"}
              textStyle={{color: '#FF6961'}}
              tabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
              activeTextStyle={{color: '#FF6961'}}
              activeTabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
            >
              {this.state.isLoading ? <Spinner/> : <AboutMasterTab masterData={this.state.aboutMasterData} masterImageURL={this.state.masterImageURL}/>}
            </Tab>
          </Tabs>

        </Container>
      </StyleProvider>
    );
  };
}
