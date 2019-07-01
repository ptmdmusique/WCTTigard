import React from 'react';
import { Body, Text, Card, CardItem } from 'native-base';
import { Dimensions, ScrollView } from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

const {height, width} = Dimensions.get('window');

const AboutMasterTab = (props) => {

  renderAchievements = () => {
    return props.masterData.achievementList.map((item, index) => (
      <Text key={index}>
        <Text style={{fontWeight: '500', fontSize: 11,  color: '#333'}}>{item.year}</Text>
        <Text style={{fontSize: 10,  color: '#333'}}> - {item.award}</Text>
      </Text>
    ));
  }

  return(
    <ScrollView style={{height: '100%', backgroundColor: '#eee'}}>
      <Card style={{width: '95%', alignSelf: 'center'}}>
        <CardItem header bordered>
          <Text style={{color: '#fc5344'}}>{props.masterData.title}</Text>
        </CardItem>
        
        <CardItem bordered>
          <Body>
            <Text style={{fontSize: 12, color: '#333'}}>
              {props.masterData.content}
            </Text>
          </Body>
        </CardItem>

        <CardItem>
          <Body style={{flex: 1/3,}}>
            <AutoHeightImage source={{uri: props.masterImageURL}} width={width / 4}/>
          </Body>
          <Body style={{flex: 2/3, paddingLeft: 5}}>
            {renderAchievements()}
          </Body>
        </CardItem>
      </Card>
    </ScrollView>
  )
}

export default AboutMasterTab;