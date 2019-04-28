import React from 'react';
import { Title, Body, Right, Container, Header, Button, Left, Icon, StyleProvider, Card, CardItem, Text, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import {customStyles} from '../../common/CustomStyle';
//import { FlatList } from 'react-native-gesture-handler';

const MOCK_NEWS = [
  {
    title: 'Duc ngu khuyen mai',
    description: 'Thang ngu tai` tro.',
    content: "hot hot hot",
    date: '9/22/2019'
  },
  {
    title: 'clgt.tv',
    description: 'ASD',
    content: "just for today!",
    date: '9/22/2019'
  }
];

const MOCK_EVENTS = [
  {
    title: '300 Spartans',
    description: 'Greek warriors, led by 300 Spartans, fight against a Persian army of almost...',
    content: "hot hot hot",
    dateFrom: '7/16/2008 12:15 AM',
    dateTo: '7/23/2008 05:11 PM',
  },
  {
    title: 'Battle of the Blackwater',
    description: 'The largest battle in the War of the Five Kings to date.',
    content: "hot hot hot",
    dateFrom: '3/12/2008 12:15 AM',
    dateTo: '7/23/2008 05:11 PM',
  },
  {
    title: 'Dau truong lon',
    description: 'Chien dau vi lon.',
    content: "hot hot hot",
    dateFrom: '9/22/2008 12:15 AM',
    dateTo: '7/23/2008 05:11 PM',
  },
];

export default class NewsAndEventScreen extends React.Component {
  renderNews(news){
    return (
      <TouchableOpacity style={{flexDirection: 'row', height: 90, marginBottom: 10}} activeOpacity={0.8}>
        <View style={{flex: 1/5, backgroundColor: '#ff5f56', justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="newspaper-o" type='FontAwesome' style={{fontSize: 45, color: 'white'}} />
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 18, fontWeight: 'bold'}}>{news.title}</Text>
            <Text style={{color: '#999', fontSize: 14, fontWeight: '600'}}>{news.description}</Text>
          </View>
          <View style={{flex: 1/3, flexDirection: 'row'}}>
            <View style={{flex: 5/6, justifyContent: 'center',}}>
              <Text style={{color: '#ff5f56', fontSize: 12, fontWeight: '600'}}>Posted: {news.date}</Text>
            </View>
            <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize: 20, color: '#ff5f56'}} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderEvents(event){
    // const monthNames = [
    //   "January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"
    // ];

    const monthNames_short = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const dateFrom = new Date(event.dateFrom);

    return (
      <TouchableOpacity style={{flexDirection: 'row', height: 100, marginBottom: 10}} activeOpacity={0.8}>
        <View style={{flex: 1/5, backgroundColor: '#d67535', justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Icon name="calendar" type='Feather' style={{fontSize: 60, color: 'white',}}/>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center'}}>
              {dateFrom.getDate()}
            </Text>
          </View>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
            {monthNames_short[dateFrom.getMonth()]}
          </Text>
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 18, fontWeight: 'bold'}}>{event.title}</Text>
            <Text style={{color: '#999', fontSize: 14, fontWeight: '600'}}>{event.description}</Text>
          </View>
          <View style={{flex: 1/3, flexDirection: 'row'}}>
            <View style={{flex: 5/6, justifyContent: 'center',}}>
              <Text style={{color: '#d67535', fontSize: 12, fontWeight: '600'}}>
                Start: {event.dateFrom}
                {'\n'}
                End:   {event.dateTo}
              </Text>
            </View>
            <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize: 20, color: '#d67535'}} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header} hasTabs>
            <Left style={{flex:1}}>    
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={customStyles.headerIcon} name='menu'/>
              </Button>
            </Left>

            <Body style={{flex:3}}>
              <Title style={customStyles.headerText}>News & Events</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

          <Content style={{flex: 1, backgroundColor: '#ddd'}}>
            <Text style={styles.sectionTitle}>
              NEWS
            </Text>
            <View style={{marginBottom: 10}}>
              <FlatList 
                keyExtractor={item => item.title}
                data={MOCK_NEWS}
                renderItem={data => this.renderNews(data.item)}
              />
            </View>

            <Text style={styles.sectionTitle}>
              EVENTS
            </Text>
            <View>
              <FlatList 
                keyExtractor={item => item.title}
                data={MOCK_EVENTS}
                renderItem={data => this.renderEvents(data.item)}
              />
            </View>
          </Content>

        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  icon: {
    color: "#fc5344", 
    fontSize: 35,
  },
  sectionTitle: {
    width: '100%', 
    backgroundColor: '#939393', 
    color: 'white', 
    paddingVertical: 10,
    marginBottom: 10,
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: 'bold'
  },
})