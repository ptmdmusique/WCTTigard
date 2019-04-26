import React from 'react';
import { Body, Text, Card, CardItem } from 'native-base';
import { Dimensions, ScrollView } from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

const {height, width} = Dimensions.get('window');

const MOCK_MASTER_INFO = {
  masterName: 'Master Eric',
  masterImageURL: 'https://imgur.com/eY76iWD.jpg',
  masterDescription: 'Master Eric is a former student of World Champion Taekwondo (WCT). He is a 5th Degree Black Belt and has trained under Grandmaster B.C. Kim, a 1992 Olympic Gold Medalist. Master Eric graduated from University of Bridgeport located in Connecticut, majoring in Martial Arts Studies. Master Eric is only one of five people in the world with a Martial Arts degree from an American University. He is a multi-time State Champion as well as a Bronze Medalist at 2010 National Collegiate Taekwondo Championship held in Denver, CO. In 2014, he became the spokesperson for WCT and opened WCT Tigard. Master Eric’s World Champion Taekwondo’s vision is to find and bring out the best in everybody through Taekwondo. He believes that every single person has a special talent and a gift that can be contributed in achieving something great for our generation!'
}

const MOCK_MASTER_ACHIEVEMENTS = [
  {
    year: "2005",
    title: "Oregon State Champion"
  },
  {
    year: "2006",
    title: "New York State Champion"
  },
  {
    year: "2008",
    title: "Korean American Olympics Bronze Medalist"
  },
  {
    year: "2010",
    title: "National Collegiate Bronze Medalist"
  },
  {
    year: "2010",
    title: "Recipient of Dean’s Award from University of Bridgeport"
  },
  {
    year: "2010",
    title: "B.A. Martial Arts from University of Bridgeport, USA"
  },
  {
    year: "2014",
    title: "Head Master of WCT Tigard"
  },
]

const AboutMasterTab = () => {

  renderAchievements = () => {
    return MOCK_MASTER_ACHIEVEMENTS.map((item, index) => (
      <Text key={index}>
        <Text style={{fontWeight: '500', fontSize: 11,  color: '#333'}}>{item.year}</Text>
        <Text style={{fontSize: 10,  color: '#333'}}> - {item.title}</Text>
      </Text>
    ));
  }

  return(
    <ScrollView style={{height: '100%', backgroundColor: '#eee'}}>
      <Card style={{width: '95%', alignSelf: 'center'}}>
        <CardItem header bordered>
          <Text style={{color: '#fc5344'}}>{MOCK_MASTER_INFO.masterName}</Text>
        </CardItem>
        
        <CardItem bordered>
          <Body>
            <Text style={{fontSize: 12, color: '#333'}}>
              {MOCK_MASTER_INFO.masterDescription}
            </Text>
          </Body>
        </CardItem>

        <CardItem>
          <Body style={{flex: 1/3,}}>
            <AutoHeightImage source={{uri: MOCK_MASTER_INFO.masterImageURL}} width={width / 4}/>
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