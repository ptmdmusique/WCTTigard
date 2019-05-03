import React from 'react';

import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';

import SideBar from './CommonComponents/SideBar';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import VideoScreen from './Screens/VideoScreen/VideoScreen';
import PictureScreen from './Screens/PictureScreen/PictureScreen';
import ScheduleScreen from './Screens/ScheduleScreen/ScheduleScreen';
import ContactUsScreen from './Screens/ContactUsScreen/ContactUsScreen';
import AboutUsScreen from './Screens/AbousUsScreen/AboutUsScreen';
import ReferUsScreen from './Screens/ReferUsScreen/ReferUs';
import EventScreen from './Screens/EventScreen/EventScreen';
import EventDetailScreen from './Screens/EventScreen/EventDetailScreen';
import NewsScreen from './Screens/NewsScreen/NewsScreen';
import NewsDetailScreen from './Screens/NewsScreen/NewsDetailScreen';
import AlertScreen from './Screens/AlertScreen/AlertScreen';

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Video: {
    screen: VideoScreen,
  },
  Event: {
    screen: createStackNavigator({
      EventScreen: EventScreen,
      EventDetailScreen: EventDetailScreen,
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    })
  },
  News: {
    screen: createStackNavigator({
      NewsScreen: NewsScreen,
      NewsDetailScreen: NewsDetailScreen,
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    })
  },
  // Picture: {
  //   screen: PictureScreen
  // },
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
  ReferUs: {
    screen: ReferUsScreen
  },
  Alert: {
    screen: AlertScreen,
  }
}, {
  initialRouteName: 'Video',
  contentComponent: props => <SideBar {...props} />,
  });

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
