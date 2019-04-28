import React from 'react';
import { Title, Body, Right, Container, Header, Button, Left, Icon, StyleProvider, Card, CardItem, Text, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, View, FlatList, ScrollView } from 'react-native';

import {customStyles} from '../../common/CustomStyle';
//import { FlatList } from 'react-native-gesture-handler';

const MOCK_NEWS = [
  {
    title: 'Duc ngu khuyen mai',
    description: 'Thang ngu tai` tro.',
    content: "hot hot hot",
    date: '1/1/2019'
  },
  {
    title: 'clgt.tv',
    description: 'ASD',
    content: "just for today!",
    date: '1/1/2019'
  }
];

const MOCK_EVENTS = [
  {
    title: '300 Spartas',
    description: 'Aaaaa',
    content: "hot hot hot",
    dateFrom: '1/1/2019',
    dateTo: '2/1/2019',
  },
  {
    title: '300 Spartasasd',
    description: 'Aaaaa',
    content: "hot hot hot",
    dateFrom: '1/1/2019',
    dateTo: '2/1/2019',
  },
  {
    title: '300 Spartaszxczxc',
    description: 'Aaaaa',
    content: "hot hot hot",
    dateFrom: '1/1/2019',
    dateTo: '2/1/2019',
  },
];

export default class NewsAndEventScreen extends React.Component {
  renderNews(news){
    return (
      <View style={{flexDirection: 'row', height: 90, marginBottom: 10}}>
        <View style={{flex: 1/5, backgroundColor: '#ff5f56', justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="newspaper-o" type='FontAwesome' style={{fontSize: 45, color: 'white'}} />
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 20, fontWeight: 'bold'}}>{news.title}</Text>
            <Text style={{color: '#999', fontSize: 16, fontWeight: '600'}}>{news.description}</Text>
          </View>
          <View style={{flex: 1/3, justifyContent: 'flex-start'}}>
            <Text style={{color: '#ff5f56', fontSize: 14, fontWeight: '600'}}>Posted: {news.date}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderEvents(events){
    return (
      <View style={{flexDirection: 'row', height: 100, marginBottom: 10}}>
        <View style={{flex: 1/5, backgroundColor: '#d67535', justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Icon name="calendar" type='Feather' style={{fontSize: 60, color: 'white',}}/>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center'}}>31</Text>
          </View>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>APR</Text>
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 20, fontWeight: 'bold'}}>{events.title}</Text>
            <Text style={{color: '#999', fontSize: 16, fontWeight: '600'}}>{events.description}</Text>
          </View>
          <View style={{flex: 1/3, justifyContent: 'flex-start'}}>
            <Text style={{color: '#d67535', fontSize: 14, fontWeight: '600'}}>Date: {events.dateFrom} - {events.dateTo}</Text>
          </View>
        </View>
      </View>
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

          <Content style={{flex: 1, backgroundColor: '#ccc'}}>
            <Text style={styles.sectionTitle}>
              NEWS
            </Text>
            <View>
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
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: 'bold'
  },
})