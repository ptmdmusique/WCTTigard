import React from 'react';
import { StyleSheet, View, FlatList, Platform, Dimensions, SafeAreaView } from 'react-native';
import { Container, Icon, StyleProvider, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import Moment from 'moment';
import { BoxShadow } from 'react-native-shadow';

import RefreshView from '../../CommonComponents/RefreshView';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase/app';

var {height, width} = Dimensions.get('window');

export default class AlertScreen extends React.Component {
  state = {
    isLoading: false,
    data: null,
  }
  
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ isLoading: true }, () => {
      firebase.firestore().collection('AlertScreen').doc(global.uid).get()
      .then( doc => {
        let tempList = doc.data().list;
        console.log("--Getting alert"); 
        //console.log(tempList);
        if (!tempList || tempList.length === 0){
          console.log("--Empty alert");
          this.setState({ isAlertLoading: false } );
          return;
        }
  
        tempList.sort((a, b) => {
          var returnVal = new Date(b.date) - new Date(a.date);
          return returnVal;
        })

        this.setState({data: tempList}, () => this.setState({ isLoading: false }))
      })
      .catch(err => {
        //TODO: Add some alert here
        this.setState({ isLoading: false });
        console.warn("--No Alert to load");
        console.warn(err);
      })
    })
  }

  renderAlerts(alert, index) {
    const monthNames_short = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    Moment(alert.date).format("MM-DD-YYYY");

    const shadowOpt = {
      width: width * 0.9,
      height:200,
      color:"#fff",
      border:6,
      radius:15,
      opacity:0.1,
      x:0,
      y:0,
      style:{marginTop: 10, marginBottom: 10, alignSelf: 'center'}
    }

    return (
      <Animatable.View animation="lightSpeedIn" delay={index * 200}>
        <BoxShadow setting={shadowOpt}>
          <View style={{width: '100%', minHeight: 200, backgroundColor: 'white', alignSelf: 'center', borderWidth: 0, borderRadius: 15, borderColor: '#fff', overflow: 'hidden'}}>
            {/* <View style={{position: 'absolute', right: 0, top: 0, width: '15%', height: '100%', backgroundColor: '#414953', zIndex: 1}}></View> */}

            <View style={{flex: 4/5, flexDirection: 'row', backgroundColor: '#FF6557'}}>
              <View style={{flex: 1/4, alignItems: 'center', paddingTop: 10, borderRightColor: '#fff', borderRightWidth: 1, backgroundColor: '#FF6557'}}>
                <View>
                  <Icon name="calendar" type='Feather' style={[{fontSize: 60, color: '#fff',}, styles.glowingRed]}/>
                  <Text style={[{fontSize: 20, color: '#fff', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center', fontFamily: 'Roboto-Bold'}, styles.glowingRed]}>
                    {Moment(alert.date).format("D")}
                  </Text>
                </View>
                <Text style={[{fontSize: 20, color: '#fff', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}, styles.glowingRed]}>
                  {monthNames_short[parseInt(Moment(alert.date).format("M")) - 1]}
                </Text>
              </View>

              <View style={{flex: 3/4, paddingTop: 10, paddingLeft: 10, backgroundColor: '#fff'}}>
                <Text style={[styles.alertCardTitle, styles.glowing]}>{alert.title}</Text>
                <Text style={[styles.alertCardDescription]}>{alert.content}</Text>
              </View>
            </View>

            <View style={{flex: 1/5, backgroundColor: '#FF6D60', opacity: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderTopColor: '#fff', borderTopWidth: 1}}>
              <Icon name="clock" style={styles.dateIcon}/>
              <Text style={[styles.dateText, styles.glowing]}>
                {/* Expired: {alert.dateFrom === alert.dateTo ? 'Same day' : alert.dateTo} */}
                Effective Date: {Moment(alert.date).format("MM-DD-YYYY")}
              </Text>
            </View>
          </View>
        </BoxShadow>
      </Animatable.View>
    );
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{backgroundColor: '#ddd'}}>
          <CustomHeader title='Alerts' navigation={this.props.navigation} />

          <SafeAreaView style={{ flex: 1, }}>
            <Content style={{flex: 1, backgroundColor: 'transparent'}}>
              {this.state.isLoading ? <Spinner/> :
                <FlatList
                  data={this.state.data}
                  keyExtractor={(data, index) => index.toString()}
                  renderItem={(data, index) => this.renderAlerts(data.item, index)}
                />
              }
            </Content>
          </SafeAreaView>

          <RefreshView refresh={this.refresh} navigation={this.props.navigation}/>
        </Container>
      </StyleProvider>
    );
  };
}

const styles = StyleSheet.create({
  glowing: {
    // textShadowColor: 'rgba(255, 255, 255, 0.3)',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 10,
  },
  glowingRed: {
    // textShadowColor: 'rgba(255, 69, 69, 0.5)',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 10,
  },
  alertCardTitle: {
    fontSize: 20, fontWeight: 'bold', color: '#111', fontFamily: 'Roboto-Bold'
  },
  alertCardDescription: {
    fontSize: 16, color: '#333', paddingRight: 1, fontFamily: 'Roboto'
  },
  dateIcon: {
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