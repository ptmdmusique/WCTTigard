import React from 'react';
import { Platform } from 'react-native'
import {Text, Spinner} from 'native-base';
import {View, ImageBackground, ScrollView} from 'react-native';

const AboutSchoolTab = (props) => {
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