import React from 'react';

import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import VideoScreen from './Screens/VideoScreen/VideoScreen';
import NewsAndEventScreen from './Screens/NewsAndEventScreen/NewsAndEventScreen';
import PictureScreen from './Screens/PictureScreen/PictureScreen';
import InfoScreen from './Screens/InfoScreen/InfoScreen'
//import TrialClassScreen from './Screens/TrialClassScreen/TrialClassScreen';
import ScheduleScreen from './Screens/ScheduleScreen/ScheduleScreen';
import ContactUsScreen from './Screens/ContactUsScreen/ContactUsScreen';
import AboutUsScreen from './Screens/AbousUsScreen/AboutUsScreen';
import ReferUsScreen from './Screens/ReferUsScreen/ReferUs';
import NewsScreen from './Screens/NewsAndEventScreen/NewsScreen/NewsScreen';
import EventScreen from "./Screens/NewsAndEventScreen/EventScreen/EventScreen";
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
      NewsAndEventScreen: NewsAndEventScreen,
      NewsScreen: NewsScreen,
      EventScreen: EventScreen,
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
                  const {layout, position, scene} = sceneProps;
                  const {index} = scene;
    
                  const width = layout.initWidth;
                  const translateX = position.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [width, 0, 0],
                  });
    
                  const opacity = position.interpolate({
                      inputRange: [index - 1, index - 0.99, index],
                      outputRange: [0, 1, 1],
                  });
    
                  return {opacity, transform: [{translateX: translateX}]};
          },
        })
    }),
    
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
  ReferUs: {
    screen: ReferUsScreen
  },
  Alert: {
    screen: AlertScreen,
  }
}, {
  initialRouteName: 'Home',
  contentComponent: props => <SideBar {...props} />,
  });

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
