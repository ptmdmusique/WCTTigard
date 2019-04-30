import React from 'react';
import { Title, Body, Right, Container, Header, Button, Left, Icon, StyleProvider, Card, CardItem, Text, Content } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import {customStyles} from '../../common/CustomStyle';

const MOCK_ALERTS = [
  {
    title: 'Trời tuyết sml',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateFrom: '9/22/2019',
    dateTo: '9/25/2019',
  },
  {
    title: 'Trời sập',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateFrom: '3/12/2019',
    dateTo: '3/12/2019',
  },
  {
    title: 'Trời tuyết sml',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateFrom: '9/22/2019',
    dateTo: '9/25/2019',
  },
]

export default class AlertScreen extends React.Component {
  renderAlerts(alert) {

    const monthNames_short = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const dateFrom = new Date(alert.dateFrom);

    return (
      <View style={{width: '90%', minHeight: 200, backgroundColor: 'white', alignSelf: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#999', marginTop: 10, overflow: 'hidden'}}>
        <View style={{position: 'absolute', right: 0, top: 0, width: '15%', height: '100%', backgroundColor: '#ff6060'}}></View>

        <View style={{flex: 4/5, flexDirection: 'row', paddingTop: 10}}>
          <View style={{flex: 1/4, alignItems: 'center'}}>
            <View>
              <Icon name="calendar" type='Feather' style={{fontSize: 60, color: '#ff6060',}}/>
              <Text style={{fontSize: 20, color: '#ff6060', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center'}}>
                {dateFrom.getDate()}
              </Text>
            </View>
            <Text style={{fontSize: 20, color: '#ff6060', fontWeight: 'bold'}}>
              {monthNames_short[dateFrom.getMonth()]}
            </Text>
          </View>
          <View style={{flex: 3/4, marginRight: 50}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ff6060'}}>{alert.title}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#999'}}>{alert.description}</Text>
          </View>
        </View>

        <View style={{flex: 1/5, backgroundColor: 'black', opacity: 0.6, justifyContent: 'center'}}>
          <Text style={{color: 'white', fontWeight: 'bold', opacity: 1, marginLeft: 10}}>
            Expired: {alert.dateFrom === alert.dateTo ? 'Same day' : alert.dateTo}
          </Text>
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
              <Title style={customStyles.headerText}>Alerts</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                style={{height: 40, width: 40}}/>
            </Right>
          </Header>

          <Content style={{flex: 1, backgroundColor: '#ddd'}}>
            <FlatList
              data={MOCK_ALERTS}
              keyExtractor={data => MOCK_ALERTS.indexOf(data).toString()}
              renderItem={data => this.renderAlerts(data.item)}
            />
          </Content>

        </Container>
      </StyleProvider>
    );
  };
}