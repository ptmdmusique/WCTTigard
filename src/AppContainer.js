import React from 'react';

import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import VideoScreen from './Screens/VideoScreen/VideoScreen';
import EventScreen from './Screens/EventScreen/EventScreen';
import PictureScreen from './Screens/PictureScreen/PictureScreen';
import InfoScreen from './Screens/InfoScreen/InfoScreen'
import LoadingScreen from './Screens/LoadingScreen/LoadingScreen';

const MyDrawerNavigator = createDrawerNavigator({
  LoadingScreen: {
    screen: LoadingScreen,
  },
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
  }
}, {
  initialRouteName: 'Home',
  contentComponent: props => <SideBar {...props} />
});

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
