import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, Left, Icon, StyleProvider, Footer, Card, CardItem } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import {View, Image, StyleSheet, TouchableNativeFeedback, Dimensions} from 'react-native';
import { Row, Grid, Col } from "react-native-easy-grid";

import {customStyles} from './CustomStyle';

export default class NewsCard extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Card style={{width: '90%', alignSelf: 'center'}}>
                    <Grid>
                    <Col size={3} 
                        style={{
                        justifyContent: 'center',
                        borderRightWidth: 0.2,
                        borderRightColor: '#d9d9d9'
                        }}>
                        <View 
                        style={{
                            width: '60%', 
                            height: '60%', 
                            alignSelf: 'center', 
                        }}>
                            <Image source={{uri: this.props.imageLink}} 
                                style={{flex: 1, width: undefined, height: undefined}}/>
                        </View>
                    </Col>
                    <Col size={7}>
                        <View style={{paddingTop: 10,}}>
                            <Header style={{height: 20, elevation: 0}}>
                                <Title style={{fontSize: 14, color: "black"}}>{this.props.headerText}</Title>
                            </Header>
                            <Content style={{height: 100,}}>
                                <Text 
                                style={{alignSelf: 'center', fontSize: 12,}}
                                >
                                {this.props.date}
                                </Text>
                                <Text 
                                style={{alignSelf: 'center', fontSize: 12, paddingTop: 2}}
                                >
                                {this.props.durationText}
                                </Text>
                                <Text 
                                style={{alignSelf: 'center', fontSize: 12, paddingRight: 10, paddingLeft: 10}}
                                >
                                {this.props.content}
                                </Text>
                            </Content>
                            <Footer style={{height: 25, elevation: 0.25}}>
                                <Image source={require('../../assets/images/michaelangelo.png')} 
                                    style={{width: 20, height: 20, paddingBottom: 5}}
                                />          
                            </Footer>
                        </View>
                    </Col>
                    </Grid>
                </Card>
            </StyleProvider>
        )
    }
}