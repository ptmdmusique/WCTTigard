import React from 'react';
import { Container, Icon, StyleProvider, Text, Content, Spinner, Button } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import { BoxShadow, BorderShadow } from 'react-native-shadow';


import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';
import '@firebase/firestore';

var {height, width} = Dimensions.get('window');

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
      .then( doc =>
        this.setState({data: doc.data().list}, () => this.setState({ isLoading: false }))
      )
      .catch(err => {
        //TODO: Add some alert here
        this.setState({ isLoading: false });
        console.log("--No Event to load");
        console.log(err);
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
                Start: {event.dateFrom}
                {'\n'}
                End:   {event.dateTo}
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

          <View style={ styles.reloadContainer }>
            <View style={{ alignSelf: 'center', }}>
              <BoxShadow setting={shadowOpt}>
                <Button 
                  onPress={() => this.refresh()}
                  style={ [styles.refreshButton, styles.glowingRed] } 
                  rounded >
                  <Icon 
                    name="md-refresh" 
                    type="ionicons"
                    style={{ color: 'white', fontSize: 25, marginRight: 0, marginLeft: 0, }} 
                  />
                </Button>
              </BoxShadow>    
              <Text style={{ marginTop: 10, color: 'white', }}>
                Refresh
              </Text>
            </View>
          </View>
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
  reloadContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 0.15 * height,
    width: width,
    backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
    alignItems: 'center',
    alignContent: 'center', 
    justifyContent: 'center', 
  },
  refreshButton: {
    height: 50,
    width: 50,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#FE4141',
    backgroundColor: 'transparent',
    alignSelf: 'center',    
    alignItems: 'center',   
    justifyContent: 'center',
  },
  glowing: {
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  glowingRed: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
})

const shadowOpt = {
  height: 50,
  width: 50,
  color:"#ab000d",
  border: 1,
  radius: 25, 
  opacity: 0.07,
  x:0,
  y:0,
}