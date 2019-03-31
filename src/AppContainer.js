import React from 'react';

import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import VideoScreen from './Screens/VideoViewer/VideoScreen';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Video: {
    screen: VideoScreen,
  },
}, {
  initialRouteName: 'Home',
  contentComponent: props => <SideBar {...props} />
});

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
