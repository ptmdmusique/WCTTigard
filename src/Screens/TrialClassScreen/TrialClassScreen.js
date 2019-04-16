import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, 
        Left, Icon, StyleProvider, Footer, Form, Item, Label, Input} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {customStyles} from '../../common/CustomStyle';

import {Field, reduxForm} from 'redux-form';

const renderField = ({}) => {

}

export default class TrialClassScreen extends React.Component {
    render() {
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
                    <Title style={customStyles.headerText}>Trial Class</Title>
                    </Body>

                    <Right style={{flex:1}}>
                    <Image source={require('../../../assets/images/sidebar-logo.png')} 
                        style={{height: 40, width: 40}}/>
                    </Right>
                </Header>

                <Content>
                    <Form>
                        <Item fixedLabel style={{paddingTop: 10, alignSelf: 'center'}}>
                            <Text>Student Information</Text>
                        </Item>
                        <Item floatingLabel>
                            <Label>First name</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Last name</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Age</Label>
                            <Input/>
                        </Item>
                    </Form>
                </Content>

                <Footer>
                    <Button>
                        <Text>Something</Text>
                    </Button>
                </Footer>
                </Container>
            </StyleProvider>
        )
    }
}