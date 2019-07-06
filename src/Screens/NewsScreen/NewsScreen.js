import React from 'react';
import { Container, Icon, StyleProvider, Text, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import CustomHeader from '../../CommonComponents/CustomHeader';
import * as firebase from 'firebase/app';
import '@firebase/firestore';

const MOCK_NEWS = [
  {
    title: 'Test News',
    description: 'Short description',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquid scire se gaudeant? Ut necesse sit omnium rerum, quae natura vigeant, similem esse finem, non eundem. Quamquam ab iis philosophiam et omnes ingenuas disciplinas habemus; At enim hic etiam dolore. Ab his oratores, ab his imperatores ac rerum publicarum principes extiterunt. Duo Reges: constructio interrete. Ergo infelix una molestia, fellx rursus, cum is ipse anulus in praecordiis piscis inventus est? ",
    date: '9/22/2019',
    address: "15660 SW Pacific Hwy",
    locationName: 'WCTTigard',
    image: 'https://imgur.com/B8cudDx.jpg'
  },
  {
    title: 'Test News 2',
    description: 'Short description 2',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquid scire se gaudeant? Ut necesse sit omnium rerum, quae natura vigeant, similem esse finem, non eundem. Quamquam ab iis philosophiam et omnes ingenuas disciplinas habemus; At enim hic etiam dolore. Ab his oratores, ab his imperatores ac rerum publicarum principes extiterunt. Duo Reges: constructio interrete. Ergo infelix una molestia, fellx rursus, cum is ipse anulus in praecordiis piscis inventus est? ",
    date: '9/22/2019',
    address: "15660 SW Pacific Hwy",
    locationName: 'WCTTigard',
    image: 'https://imgur.com/B8cudDx.jpg'
  }
];

export default class NewsScreen extends React.Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    //TODO: CHANGE THIS
    firebase.firestore().collection('NewsScreen').doc(global.uid).get()
    .then( doc =>
      this.setState({data: doc.data().list}, () => this.setState({ isLoading: false }))
    )
    .catch(err => {
      console.log(err);
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
              <Text style={{color: '#ff5f56', fontSize: 12, fontWeight: '600', fontFamily: 'Roboto-Bold'}}>Posted: {news.date}</Text>
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