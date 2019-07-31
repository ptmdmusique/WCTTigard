import React from 'react';
import { Container, Icon, StyleProvider, Text, Content, Spinner, } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, } from 'react-native';
import RefreshView from '../../CommonComponents/RefreshView';
import Moment from 'moment';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';
import '@firebase/firestore';

export default class EventScreen extends React.Component {

  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({isLoading: true}, () => {
      console.log("--Loading Event")
      firebase.firestore().collection('EventScreen').doc(global.uid).get()
      .then( doc => {
        tempList = doc.data().list;
        tempList.sort((a, b) => {
          var returnVal = new Date(b.dateFrom) - new Date(a.dateFrom);

          if (returnVal === 0){
            returnVal = new Date(b.dateTo) - new Date(a.dateTo);
          }

          return returnVal;
        })

        this.setState({data: tempList}, () => this.setState({ isLoading: false }))
      })
      .catch(err => {
        //TODO: Add some alert here
        this.setState({ isLoading: false });
        console.warn("--No Event to load");
        console.warn(err);
      })
    })
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
      <TouchableOpacity style={{flexDirection: 'row', height: 100, marginBottom: 10}} activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('EventDetailScreen', {event})}
      >
        <View style={{flex: 1/5, backgroundColor: '#d67535', justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Icon name="calendar" type='Feather' style={{fontSize: 60, color: 'white',}}/>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center', fontFamily: 'Roboto-Bold'}}>
              {dateFrom.getDate()}
            </Text>
          </View>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
            {monthNames_short[dateFrom.getMonth()]}
          </Text>
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>{event.title}</Text>
            <Text style={{color: '#999', fontSize: 14, fontWeight: '600', fontFamily: 'Roboto-Bold'}}>{event.description}</Text>
          </View>
          <View style={{flex: 1/3, flexDirection: 'row'}}>
            <View style={{flex: 5/6, justifyContent: 'center',}}>
              <Text style={{color: '#d67535', fontSize: 12, fontWeight: '600', paddingBottom: 5,}}>
                Start: {Moment(event.dateFrom).format("MM-DD-YYYY")}
                {'\n'}
                End:   {Moment(event.dateTo).format("MM-DD-YYYY")}
              </Text>
            </View>
            <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center',}}>
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
          <CustomHeader title='Events' navigation={this.props.navigation} />

          <SafeAreaView style={{ flex: 1, }}>
            <Content style={{flex: 1, backgroundColor: '#ddd'}}>
              <Text style={styles.sectionTitle}>
                EVENTS
              </Text>
              <View>
                {this.state.isLoading ? 
                    <Spinner/>
                  : <FlatList 
                    keyExtractor={(item, index) => item.title + index}
                    data={this.state.data}
                    renderItem={data => this.renderEvents(data.item)}
                  />
                }
              </View>
            </Content>
          </SafeAreaView>

          <RefreshView refresh={this.refresh} navigation={this.props.navigation}/>
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
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
 })