import React from 'react';
import {Title, Body, Right, Content, Container, Header, Text, Button, 
        Left, Icon, StyleProvider, Footer, Item, Label, Input} from 'native-base';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import {Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {customStyles} from '../../common/CustomStyle';

import t from 'tcomb-form-native';

//Custom data type
const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
const Phone = t.subtype(t.Number, (number) => {
    const reg = /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/;
    return reg.test(number);
});
const Age = t.subtype(t.Number, (age) => {
    return 1 <= age <= 99;
})

const Form = t.form.Form;
const Student = t.struct({
    studentName: t.String,
    age: Age,
})
const Contact = t.struct({
    parentName: t.String,
    phone: Phone,
    email: t.maybe(Email),
})
const Experience = t.struct({
    experience: t.maybe(t.String),
})
const Goal = t.struct({
    competition: t.Boolean,
    discipline: t.Boolean,
    focus: t.Boolean,
    flexibility: t.Boolean,
    leadership: t.Boolean,
    physicalFitness: t.Boolean,
    selfControl: t.Boolean,
    weightLoss: t.Boolean,
    other: t.maybe(t.String),
})
const Health = t.struct({
    add: t.Boolean,
    adhd: t.Boolean,
    autism: t.Boolean,
    other: t.maybe(t.String),
})
const Reference = t.struct({
    reference: t.maybe(t.String),
})
const Request = t.struct({
    additionalRequest: t.maybe(t.String),
})
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginLeft: 10,
        marginRight: 10,
      },
      error: {
        marginLeft: 10,
        marginRight: 10,
      },
    },
    controlLabel: {
      normal: {
        fontSize: 15,
        marginBottom: 7,
        fontWeight: '600',
        marginLeft: 10,
        paddingTop: 10,
        
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600',
        marginLeft: 10,
        paddingTop: 5,
      }
    }
}
//For switches
const switchFormStyles = {
    ...formStyles,
    formGroup: {
        normal: {
            flexDirection: 'row',
            flex: 1,   
            paddingLeft: 10,
        },
        error: {
            flexDirection: 'row',
            flex: 1,   
            paddingLeft: 10,
        },
    }, 
}
const studentOption = {
    fields: {
        studentName: {
            placeholder: 'E.g: John Doe',
            label: "Student's Name",
            error: "Can't be blank!",
        },
        age: {
            placeholder: 'E.g: 99',
            label: "Age",
            error: "Can't be blank!",
        }
    },
    stylesheet: formStyles,
}
const contactOption = {
    fields: {
        parentName: {
            placeholder: 'E.g: John Doe',
            label: 'Parent\'s Name',
            error: "Can't be blank!"
        },
        phone: {
            placeholder: 'E.g: 999-999-9999',
            error: "Must be a number with 7, 10 or 11 digits!",
        },
        email: {
            placeholder: 'E.g: a@a.com',
            error: 'Email is not valid',
        }
    },
    stylesheet: formStyles,
}
const experienceOption = {
    fields: {
        experience: {
            multiline: true,
            placeholder: 'Which one, how many years, etc...',
            label: "Martial Art Experience?",
        }
    },
    stylesheet: formStyles,
}
const goalOption = {
    stylesheet: switchFormStyles,
    fields: {
        other: {
            multiline: true,
            //We need to override the default height!
            stylesheet: {
                ...formStyles,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }
        },
        physicalFitness: {
            label: 'Physical Fitness'
        },
        selfControl: {
            label: 'Self Control'
        },
        weightLoss: {
            label: 'Weight Loss'
        },
    },
}
const healthOption = {
    stylesheet: switchFormStyles,
    fields: {
        other: {
            multiline: true,
            stylesheet: {
                ...formStyles,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }   
        },
        add: {
            label: 'ADD',
        },
        ADHD: {
            label: 'ADHD',
        },
    }
}
const referOption = {
    stylesheet: formStyles,
    fields: {
        reference: {
            multiline: true,
            stylesheet: {
                ...formStyles,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }   
        },
    }
}
const requestOption = {
    stylesheet: formStyles,
    fields: {
        additionalRequest: {
            multiline: true,
            stylesheet: {
                ...formStyles,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }   
        },
    }
}

export default class TrialClassScreen extends React.Component {
    constructor(){
        super();
        this.formList = [];
    }

    onSubmit() {
        const finalForm = [];

        //Validate
        for(list of this.formList){
            finalForm.push(list.getValue());    //Default validation based on data type
        }

        //Currently just print out a json
        console.log(finalForm);
    }

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

                    <Body style={{flex:3,}}>
                    <Title style={customStyles.headerText}>Trial Class</Title>
                    </Body>

                    <Right style={{flex:1}}>
                    <Image source={require('../../../assets/images/sidebar-logo.png')} 
                        style={{height: 40, width: 40}}/>
                    </Right>
                </Header>

                <Content>
                    {/* <Form>
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
                    </Form> */}
                    <Title style={styles.formTitle}>Student's Information</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Student}
                        options={studentOption}
                    />

                    <Title style={styles.formTitle}>Contact Information</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Contact}
                        options={contactOption}
                    />

                    <Title style={styles.formTitle}>Experience</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Experience}
                        options={experienceOption}
                    />

                    <Title style={styles.formTitle}>Goals</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Goal}
                        options={goalOption}
                    />

                    <Title style={styles.formTitle}>Health Issues</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Health}
                        options={healthOption}
                    />

                    
                    <Title style={styles.formTitle}>How did you hear about us?</Title>
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Reference}
                        options={referOption}
                    />                   
                    <Form
                        ref={component => this.formList.push(component)}
                        type= {Request}
                        options={requestOption}
                    />
                </Content>

                <Footer>
                    <Button 
                        light
                        onPress={() => this.onSubmit()}
                        style={{alignSelf: 'center',}}
                    >
                        <Text style={{color: 'black'}}>Send Form</Text>
                    </Button>
                </Footer>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    formTitle: {
        color: 'black', 
        textDecorationLine: 'underline', 
        paddingTop: 10,
    }
})