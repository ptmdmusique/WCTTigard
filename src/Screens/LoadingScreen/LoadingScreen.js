import React from 'react';
import material from '../../../native-base-theme/variables/material';
import getTheme from '../../../native-base-theme/components';
import { StyleSheet, WebView, Spinner, View, FlatList, Image, } from 'react-native';
import { StyleProvider } from 'native-base';

export default class LoadingScreen extends React.Component {
    state = {
        finishLoading: false
    }

    renderLoadingScreen() {
        if (finishLoading){
            return (
                <View>
                    <Text>Finish loading</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>Finish loading</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                {renderLoadingScreen()}
            </StyleProvider>
        )
    }
}
