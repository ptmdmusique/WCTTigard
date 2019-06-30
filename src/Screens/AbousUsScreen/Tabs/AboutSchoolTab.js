import React from 'react';
import { Platform } from 'react-native'
import {Text, Spinner} from 'native-base';
import {View, ImageBackground, ScrollView} from 'react-native';

const MOCK_SCHOOL_INFO = {
  title: 'Tigard Martial Arts Classes',
  paragraphs: [
    'World Champion Taekwondo (WCT) first opened its doors in 1996 in NW Portland by 1992 Barcelona Olympic Gold Medalist, Grandmaster B.C. Kim. Since then, WCT has opened 8 other locations in Portland Metropolitan area including Portland, Beaverton,Tigard, Lake Oswego, and Gresham. WCT is the most Educational Taekwondo School in America offering the best comprehensive Fitness and Discipline programs to its members. World Champion Taekwondo’s vision is to make Taekwondo a way of life. Through training at World Champion Taekwondo, one will make RESPECT, DISCIPLINE, and CONFIDENCE a way of life.',
    'The staff at World Champion Taekwondo is another reason why WCT is different from other schools within the Martial Arts Industry. The staff at WCT are individuals who have achieved greatness within the field of Taekwondo and are compassionate to help each students reach their dreams. At WCT, we do not believe in just being a winner. We believe everyone is a WINNER, we believe in PERSONAL BEST, and we believe in LIFE CHAMPIONS!',
  ]
}


const AboutSchoolTab = (props) => {
  console.log(props.schoolData);
  console.log(props.content);

  return (
    <ImageBackground
      source={{uri: 'https://i.pinimg.com/originals/fe/79/3e/fe793ed2d97dee602f1ef3d58eeba1f0.jpg'}}
      style={{height: '100%', width: 'auto'}}
    >
      <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', opacity: (Platform.OS === 'ios' ? 0.5 : 0.8)}}></View>

      <ScrollView style={{alignSelf: 'center', width: '90%', marginTop: 10}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto', borderBottomColor: 'white', borderBottomWidth: 0.5, paddingBottom: 3}}>
          {props.schoolData.title}
        </Text>
        <Text style={{color: 'white', fontSize: 10, marginTop: 10}}>
          {props.schoolData.content}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

export default AboutSchoolTab;

const styles = {
  darkOverlay: {
    opacity: 0.5
  }
}