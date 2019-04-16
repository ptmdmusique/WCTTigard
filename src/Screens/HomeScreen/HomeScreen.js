import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions, ImageBackground} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";
import {BlurView} from 'expo';

import {customStyles} from '../../common/CustomStyle';
import NewsCard from '../../common/NewsCard';
import ImageViewer from 'react-native-image-zoom-viewer';

//This should be dynamically retrieved from database for the "More" section
const previewRoute = [
  {
    name: "Event",
    iconName: "news",
    displayName: "Events"
  },
  {
    name: "Alert",
    iconName: "bell",
    displayName: "Alerts"
  },
  {
    name: "Schedule",
    iconName: "calendar",
    displayName: "Schedule"
  },
  {
    name: "ContactUs",
    iconName: "globe",
    displayName: "Contact Us"
  },
]

const images = [
  {
    url: "https://i.imgur.com/oZ0qFnR.jpg",
  },
  {
    url: "https://i.imgur.com/rilIkTm.png",
  },
  {
    url: "https://i.imgur.com/B8cudDx.jpg",
  },
  {
    url: "https://i.imgur.com/5KMWV7S.jpg",
  },
  {
    url: "https://i.imgur.com/KpPtEMH.png",
  },
]

var {height, width} = Dimensions.get('window');
//To format grid
const itemPerRow = 4;

export default class HomeScreen extends React.Component {
  render() {    
    //All menu
    const menuGridItems = [];
    for(let i = 0; i < previewRoute.length; i += itemPerRow){
      const row = [];      
      for(let j = 0; j < itemPerRow; j++){
        if (i + j < previewRoute.length){
          //Push a card
          row.push(
            <Col key={previewRoute[i + j].displayName}
            style={{
              alignContent: 'center',
              alignItems: 'center', 
            }}
            >
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate(previewRoute[i + j].name)}
              >
                <View style={styles.menu}>
                  <Icon style={{color: '#e53110', fontSize: 20}} name={previewRoute[i + j].iconName}/>
                  <Text style={{fontSize: 11, top: 5}}>
                      {previewRoute[i + j].displayName}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </Col>
          )
        }
      }

      menuGridItems.push(
        <Row 
          key={previewRoute[i].name} 
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
          {row}
        </Row>
      )
    }
    
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={customStyles.header}
          >
            <Left style={{flex:1}}>    
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={customStyles.headerIcon} name='menu'/>
              </Button>
            </Left>

            <Body style={{flex:1}}>
              <Title style={customStyles.headerText}>Home</Title>
            </Body>

            <Right style={{flex:1}}>
              <Image source={require('../../../assets/images/sidebar-logo.png')} 
                    style={{height: 40, width: 40}}/>
              
            </Right>
          </Header>

          <Grid style={{
              backgroundColor: '#fafafa',
              zIndex: -3,
            }}>

            <Row size={5}>
              <ImageViewer 
                imageUrls={images}
                backgroundColor='white'  
                failImageSource={{uri: '../../../assets/images/sidebar-logo.png'}}
                loadingRender={() =>
                                <View>
                                  <Image source={require('../../../assets/images/sidebar-logo.png')}/>
                                  <Spinner color={'red'}/>
                                </View>
                              }
                pageAnimateTime={200}
                renderIndicator={() => null}
                renderArrowLeft={
                  () => <BlurView
                          tint="dark"
                          intensity={100}
                        >
                          <Icon 
                          name="chevron-left" 
                          style={{
                            color:"white",
                          }}/>
                        </BlurView>}
                renderArrowRight={
                  () => <BlurView
                          tint="dark"
                          intensity={100}
                        >
                          <Icon 
                          name="chevron-right" 
                          style={{color:"white"}}/>
                        </BlurView>}
              />
            </Row>

            <Row size={5}
              style={{
                borderTopWidth: 1,
                borderTopColor: '#d9d9d9',
                }
              }
            >
              <Grid>
                <Row size={1}
                >
                  <Body style={{paddingBottom: 5, paddingTop: 10}}>
                    <Title style={{color:'black', fontSize: 15}}>Latest News!</Title>
                  </Body>              
                </Row>

                <Row size={4}>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate("Event")}
                      
                    >
                      <NewsCard
                        imageLink='https://i.imgur.com/rilIkTm.png'
                        headerText='Tournament!'
                        date='1/1/2019'
                        durationText='All day!'
                        content='Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template Template '                        
                      />
                    </TouchableNativeFeedback>
                  </Content>
                </Row>
              </Grid>
            </Row>
          </Grid>

          <Footer style={customStyles.footer}>
            <Grid style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
              {menuGridItems}
            </Grid>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({ 
  menu: {
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: (width - 120) / itemPerRow,
    height: (width - 100) / itemPerRow,
  },
})