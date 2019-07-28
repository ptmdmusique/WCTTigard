import React from 'react';
import { Container, StyleProvider, Tabs, Tab, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import RefreshView from '../../CommonComponents/RefreshView';
import CustomHeader from '../../CommonComponents/CustomHeader';

import AboutSchoolTab from './Tabs/AboutSchoolTab';
import AboutMasterTab from './Tabs/AboutMasterTab';
import * as firebase from 'firebase/app';

export default class PictureScreen extends React.Component {
  state = {
    aboutMasterData: null,
    aboutSchoolData: null,
    isMasterLoading: true,
    isSchoolLoading: true,
    masterImageURL: "",
  }

  componentDidMount() {
    //TODO: Change this
    firebase.firestore().collection('AboutSchool').doc(global.uid).get()
    .then( doc => this.setState({ aboutSchoolData: doc.data() }, () => this.setState({ isSchoolLoading: false })))
    .catch(err => {
      console.warn("--No about school data to load in AboutUsScreen")
      this.setState({ isSchoolLoading: false });
      console.warn(err);
    })

    //TODO: Change this
    firebase.firestore().collection('AboutMaster').doc(global.uid).get()
    .then( doc => {
      if (doc.data()){
        this.setState({ aboutMasterData: doc.data() }, () => {
          //TODO: Change this back
          firebase.storage().ref("AboutMasterScreen/" + global.uid).listAll()
          .then(result => {
            result.items[0].getDownloadURL().then(url => {
              this.setState({ masterImageURL: url }, () => {
                this.setState({ isMasterLoading: false })
              })              
            })})
          .catch(err => {
            console.warn("--Can't load master image in AboutUsScreen");
            console.warn(err);
          });
          
        })
      } else {
        console.warn("--No master image to load in AboutUsScreen");
        this.setState({ isMasterLoading: false });
      }
    })
  }
  
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='About Us' navigation={this.props.navigation} />

          <Tabs tabBarPosition='top' tabBarUnderlineStyle={{backgroundColor: '#FF6961', }}>
            <Tab
              heading={"School"}
              textStyle={{color: '#FF6961'}}
              tabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
              activeTextStyle={{color: '#FF6961'}}
              activeTabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
            >
              {this.state.isSchoolLoading ? <Spinner/> : <AboutSchoolTab schoolData={this.state.aboutSchoolData}/>}
            </Tab>

            <Tab
              heading={"Master"}
              textStyle={{color: '#FF6961'}}
              tabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
              activeTextStyle={{color: '#FF6961'}}
              activeTabStyle={{borderTopWidth: 1.5, borderTopColor: '#bbb'}}
            >
              {this.state.isMasterLoading ? <Spinner/> : <AboutMasterTab masterData={this.state.aboutMasterData} masterImageURL={this.state.masterImageURL}/>}
            </Tab>
          </Tabs>

          <RefreshView navigation={this.props.navigation}/>
        </Container>
      </StyleProvider>
    );
  };
}
