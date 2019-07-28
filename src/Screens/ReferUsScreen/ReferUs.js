import React from 'react';
import { Title, Body, Container, Icon, StyleProvider, Card, CardItem, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { Image, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';

export default class ReferUsScreen extends React.Component {
  state = {
    data: {},
    isLoading: true,
  }

  componentDidMount() {
    firebase.firestore().collection('ReferUsScreen').doc(global.uid).get()
    .then( doc => {
      if (doc && doc.data()){
        console.log("--Retrieving refer us content")
        this.setState({data: doc.data()}, () => this.setState({ isLoading: false }))
      } else {
        this.setState({
          data: {
            rewardTitle: "",
            rewardContent: "",
            referTitle: "",
            referContent: ""
          },
          isLoading: false,
        })
      }
      
    })
    .catch(err => {
      console.warn("--No refer to load");
      this.setState({ isLoading: false })
      console.warn(err);
    })
  }
  
  render () {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <CustomHeader title='Refer Us' navigation={this.props.navigation} />

          {this.state.isLoading ? 
          <Spinner/>
          : 
          <Content style={{ flex: 1, backgroundColor: '#eee', }} contentContainerStyle={styles.container}>
            <Card style={{...styles.cardStyle, ...Platform.select({
              ios: {
                flex: 5
              }
            })}}>
              <CardItem header style={{...Platform.select({
                ios: {
                  flex: 1,
                }
              })}}>
                <Body style={{flex: 2/3, paddingLeft: 5}}>
                  <Title style={{color: "#fc5344", fontSize: Platform.OS === 'ios' ? 18 : 15}}>{this.state.data.rewardTitle || ""}</Title>
                </Body>
              </CardItem>

              <CardItem bordered style={{...Platform.select({
                ios: {
                  flex: 5,
                }
              })}}>
                <Body>
                  <Image
                    source={require('../../../assets/images/refer_gift.png')}
                    style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 10}} />
                  <Text style={{color: '#666', fontWeight: '500', fontSize: Platform.OS === 'ios' ? 16 : 12, fontFamily: 'Roboto-Bold'}}>

                    {this.state.data.rewardContent || ""}

                  </Text>
                </Body>
              </CardItem>

              <CardItem style={{...Platform.select({
                ios: {
                  flex: 1,
                }
              })}}>
                <Icon name="sun" style={{fontSize: 20, color: '#fc5344'}}/>
                <Text style={{color: '#fc5344', fontWeight: 'bold', fontSize: Platform.OS === 'ios' ? 18 : 15, fontFamily: 'Roboto-Bold'}}>
                  Thank you for using our app!
                </Text>
              </CardItem>
            </Card>

            <Card style={{...styles.cardStyle, ...Platform.select({
              ios: {
                flex: 1
              }
            })}}>
              <CardItem>
                <Text style={{fontWeight: 'bold', color: '#fc5344', fontFamily: 'Roboto-Bold'}}>Refer us through:</Text>
              </CardItem>
              <CardItem style={{justifyContent: 'space-around'}}>
              <TouchableOpacity
                  onPress={() => Linking.openURL('mailto:?subject=' + (this.state.data.referTitle || "") + '&body=' + (this.state.data.referContent || ""))}
              >
                  <Icon name="mail" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => Linking.openURL('sms:?&body=' + (this.state.data.referContent || ""))}
              >
                  <Icon name="message-square" style={styles.icon} />
              </TouchableOpacity>
              </CardItem>
            </Card>

          </Content>
          }
          
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

  container: {
    ...Platform.select({
      ios: {
        flex: 1,
      }
    })
  },

  cardStyle: {
    width: '95%', 
    alignSelf: 'center',
  }
})
