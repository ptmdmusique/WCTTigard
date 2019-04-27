import React from 'react';

import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import VideoScreen from './Screens/VideoScreen/VideoScreen';
import EventScreen from './Screens/EventScreen/EventScreen';
import PictureScreen from './Screens/PictureScreen/PictureScreen';
import InfoScreen from './Screens/InfoScreen/InfoScreen'
//import TrialClassScreen from './Screens/TrialClassScreen/TrialClassScreen';
import ScheduleScreen from './Screens/ScheduleScreen/ScheduleScreen';
import ContactUsScreen from './Screens/ContactUsScreen/ContactUsScreen';
import AboutUsScreen from './Screens/AbousUsScreen/AboutUsScreen';
import ReferUsScreen from './Screens/ReferUsScreen/ReferUs';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Video: {
    screen: VideoScreen,
  },
  Event: {
    screen: EventScreen,
  },
  Picture: {
    screen: PictureScreen
  },
  Info: {
    screen: InfoScreen
  },
  // Trial: {
  //   screen: TrialClassScreen
  // },
  Schedule: {
    screen: ScheduleScreen
  },
  Contact: {
    screen: ContactUsScreen
  },
  About: {
    screen: AboutUsScreen
  },
  Refer: {
    screen: ReferUsScreen
  }
}, {
  initialRouteName: 'Refer',
  contentComponent: props => <SideBar {...props} />
});

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
