import React from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';
import { Container, Icon, StyleProvider, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import Moment from 'moment';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase/app';

export default class AlertScreen extends React.Component {
  state = {
    isLoading: false,
    data: null,
  }
  
  componentDidMount() {
    //TODO: CHANGE THIS
    firebase.firestore().collection('AlertScreen').doc(global.uid).get()
    .then( doc =>
      this.setState({data: doc.data().list}, () => this.setState({ isLoading: false }))
    )
    .catch(err => {
      //TODO: Add some alert here
      this.setState({ isLoading: false });
      console.log("--No Alert to load");
      console.log(err);
    })
  }

  renderAlerts(alert, index) {
    const monthNames_short = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    Moment(alert.date).format("MM-DD-YYYY")

    return (
      <Animatable.View animation="lightSpeedIn" delay={index * 200}>
        <View style={{width: '90%', minHeight: 200, backgroundColor: 'white', alignSelf: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#999', marginTop: 10, overflow: 'hidden'}}>
          <View style={{position: 'absolute', right: 0, top: 0, width: '15%', height: '100%', backgroundColor: '#ff6060'}}></View>

          <View style={{flex: 4/5, flexDirection: 'row', paddingTop: 10}}>
            <View style={{flex: 1/4, alignItems: 'center'}}>
              <View>
                <Icon name="calendar" type='Feather' style={{fontSize: 60, color: '#ff6060',}}/>
                <Text style={{fontSize: 20, color: '#ff6060', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center', fontFamily: 'Roboto-Bold'}}>
                  {Moment(alert.date).format("D")}
                </Text>
              </View>
              <Text style={{fontSize: 20, color: '#ff6060', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>
                {monthNames_short[Moment(alert.date).format("M")]}
              </Text>
            </View>
            <View style={{flex: 3/4, marginRight: 50}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ff6060', fontFamily: 'Roboto-Bold'}}>{alert.title}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#999', paddingRight: 1, fontFamily: 'Roboto-Bold'}}>{alert.content}</Text>
            </View>
          </View>

          <View style={{flex: 1/5, backgroundColor: 'black', opacity: 0.6, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
            <Icon name="clock" style={styles.icon}/>
            <Text style={styles.dateText}>
              {/* Expired: {alert.dateFrom === alert.dateTo ? 'Same day' : alert.dateTo} */}
              Effective Date: {Moment(alert.date).format("MM-DD-YYYY")}
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='Alerts' navigation={this.props.navigation} />

          <Content style={{flex: 1, backgroundColor: '#ddd'}}>
            {this.state.isLoading ? <Spinner/> :
              <FlatList
                data={this.state.data}
                keyExtractor={(data, index) => index.toString()}
                renderItem={(data, index) => this.renderAlerts(data.item, index)}
              />   
            }
          </Content>

        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 10,
  },
  dateText: {
    color: 'white', 
    fontWeight: 'bold', 
    opacity: 1, 
    marginLeft: 10, 
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
  }
})