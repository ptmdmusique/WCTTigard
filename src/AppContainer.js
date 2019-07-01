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
import BirdthdayScreen, { BirthdayScreen } from './Screens/BirthdayScreen/BirthdayScreen';

// const FadeTransition = (index, position) => {
//   const sceneRange = [index - 1, index - 0.99, index];
//   const outputOpacity = [0, 1, 1];
//   const transition = position.interpolate({
//     inputRange: sceneRange,
//     outputRange: outputOpacity,
//   });

//   return {
//     opacity: transition
//   }
// }

// const BottomTransition  = (index, position, height) => {
//   const sceneRange = [index - 1, index, index + 1];
//   const outputHeight = [height, 0, 0];
//   const transition = position.interpolate({
//     inputRange: sceneRange,
//     outputRange: outputHeight,
//   });

//   return {
//     transform: [{
//       translateY: transition
//     }]
//   }
// }

// const NavigationConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 300,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//     },
//     screenInterpolator: (sceneProps) => {
//       const { layout, position, scene } = sceneProps;
//       const index = scene.index;
//       const height = sceneProps.layout.initHeight;
//       // const position = sceneProps.position;
//       // const scene = sceneProps.scene;

//       var opacity = FadeTransition(index, position);
//       var transform = BottomTransition(index, position, height);
//       return {opacity, transform};
//     }
//   }
// }

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
      },
    }), 
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
  },
  Birthday: {
    screen: BirthdayScreen,
  }
}, {
  initialRouteName: 'Home',
  contentComponent: props => <SideBar {...props} />,
});

const MyAppContainer = createAppContainer(MyDrawerNavigator);

export default MyAppContainer;
