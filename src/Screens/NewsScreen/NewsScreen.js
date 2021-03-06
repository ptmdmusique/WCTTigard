import React from 'react';
import { Container, Icon, StyleProvider, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import Moment from 'moment';
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import RefreshView from '../../CommonComponents/RefreshView';
import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';
import '@firebase/firestore';

export default class NewsScreen extends React.Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({isLoading: true}, () => {
      //TODO: CHANGE THIS
      firebase.firestore().collection('NewsScreen').doc(global.uid).get()
      .then( doc => {
        let tempList = doc.data().list;
        console.log("--Getting News"); 
        //console.log(tempList);
        if (!tempList || tempList.length === 0){
          console.log("--Empty News");
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
        console.warn("--No News to load");
        console.warn(err);
      })
    })
  }

  renderNews(news){
    return (
      <TouchableOpacity style={{flexDirection: 'row', height: 90, marginBottom: 10}} activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('NewsDetailScreen', {news})}
      >
        <View style={{flex: 1/5, backgroundColor: '#ff5f56', justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="newspaper-o" type='FontAwesome' style={{fontSize: 45, color: 'white'}} />
        </View>
        <View style={{flex: 4/5, backgroundColor: 'white', paddingLeft: 15, paddingTop: 10}}>
          <View style={{flex: 2/3}}>
            <Text style={{color: '#333', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>{news.title}</Text>
            <Text style={{color: '#999', fontSize: 14, fontWeight: '600', fontFamily: 'Roboto-Bold'}}>{news.description}</Text>
          </View>
          <View style={{flex: 1/3, flexDirection: 'row'}}>
            <View style={{flex: 5/6, justifyContent: 'center',}}>
              <Text style={{color: '#ff5f56', fontSize: 12, fontWeight: '600', fontFamily: 'Roboto-Bold'}}>Posted: {Moment(news.date).format("MM-DD-YYYY")}</Text>
            </View>
            <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize: 20, color: '#ff5f56'}} />
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
          <CustomHeader title='News' navigation={this.props.navigation} />

          <SafeAreaView style={{ flex: 1, }}>
            <Content style={{flex: 1, backgroundColor: '#ddd'}}>
              <Text style={styles.sectionTitle}>
                NEWS
              </Text>
              <View style={{marginBottom: 10}}>
              {this.state.isLoading ? 
                    <Spinner/>
                  : <FlatList 
                    keyExtractor={item => item.title}
                    data={this.state.data}
                    renderItem={data => this.renderNews(data.item)}
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
    fontWeight: 'bold'
  },
})