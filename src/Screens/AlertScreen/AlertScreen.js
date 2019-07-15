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
        <View style={{width: '90%', minHeight: 200, backgroundColor: 'white', alignSelf: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#fff', marginTop: 10, marginBottom: 10, overflow: 'hidden'}}>
          {/* <View style={{position: 'absolute', right: 0, top: 0, width: '15%', height: '100%', backgroundColor: '#414953', zIndex: 1}}></View> */}

          <View style={{flex: 4/5, flexDirection: 'row', backgroundColor: '#3d4248'}}>
            <View style={{flex: 1/4, alignItems: 'center', paddingTop: 10, borderRightColor: '#fff', borderRightWidth: 1, backgroundColor: '#333'}}>
              <View>
                <Icon name="calendar" type='Feather' style={[{fontSize: 60, color: '#ff4545',}, styles.glowingRed]}/>
                <Text style={[{fontSize: 20, color: '#ff4545', fontWeight: 'bold', position: 'absolute', top: '42%', alignSelf: 'center', fontFamily: 'Roboto-Bold'}, styles.glowingRed]}>
                  {Moment(alert.date).format("D")}
                </Text>
              </View>
              <Text style={[{fontSize: 20, color: '#ff4545', fontWeight: 'bold', fontFamily: 'Roboto-Bold'}, styles.glowingRed]}>
                {monthNames_short[parseInt(Moment(alert.date).format("M")) - 1]}
              </Text>
            </View>
            <View style={{flex: 3/4, paddingTop: 10, paddingLeft: 10, backgroundColor: '#222'}}>
              <Text style={[styles.alertCardTitle, styles.glowing]}>{alert.title}</Text>
              <Text style={[styles.alertCardDescription]}>{alert.content}</Text>
            </View>
          </View>

          <View style={{flex: 1/5, backgroundColor: '#666', opacity: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderTopColor: '#fff', borderTopWidth: 1}}>
            <Icon name="clock" style={styles.dateIcon}/>
            <Text style={[styles.dateText, styles.glowing]}>
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
        <Container style={{backgroundColor: '#2d3238'}}>
          <CustomHeader title='Alerts' navigation={this.props.navigation} isHome />

          <Content style={{flex: 1, backgroundColor: 'transparent'}}>
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
  glowing: {
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  glowingRed: {
    textShadowColor: 'rgba(255, 69, 69, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  alertCardTitle: {
    fontSize: 20, fontWeight: 'bold', color: '#fff', fontFamily: 'Roboto-Bold'
  },
  alertCardDescription: {
    fontSize: 16, color: '#ccc', paddingRight: 1, fontFamily: 'Roboto'
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