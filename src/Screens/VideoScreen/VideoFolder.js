import React from 'react';
import {LayoutAnimation, UIManager, FlatList, View, TouchableWithoutFeedback, Clipboard} from 'react-native';
import {Title, Card, CardItem, Button, Text} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';

import * as actions from '../../Redux/Actions';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';


class VideoFolder extends React.Component {
    constructor() {
        super();
        UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    componentDidUpdate(){
        LayoutAnimation.spring();
    }

    //Props consists of "folder" 
    renderItem(video) {
        return (
           <CardItem
                button  
                onPress={() =>{
                    this.props.selectVideo(video.item.link);
                }}
                onLongPress={async () => {
                    await Clipboard.setString(video.item.link);
                    Toast.show("Copied to clip board!");
                    console.log("Link: " + Clipboard.getString());
                }}
                style={{
                    marginTop: 0,
                    borderTopWidth: 1, 
                    borderTopColor: '#e1e1e1',
                    backgroundColor:  '#f9f9f9',
                }}
           >
                <Title style={styles.text}>{video.item.name}:</Title>    
                <Text style={{...styles.text, color: '#0000af'}}>   {video.item.link}</Text>
           </CardItem>
        )
    }

    expandVideoList(){
        if (this.props.expanded){
            return (
                <FlatList 
                    data={this.props.folder.videoList}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={video => video.name.toString()}
                />
            )
        } 
    }

    render(){
        return (
            <TouchableWithoutFeedback
                onPress={()=> {
                    this.props.selectFolder(this.props.folder.folderName, this.props.expanded)
                }}
            >
                <Card 
                    style={styles.containerStyle}
                >
                    <CardItem header
                        style={{height: 10}}
                    >
                        <Text style={{color: 'black'}}> 
                            {this.props.folder.folderName} 
                        </Text>                       
                    </CardItem>
                    {this.expandVideoList()}
                </Card>
            </TouchableWithoutFeedback>   
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //Expand the pressed card
    let expanded = (state.selectedItem.folderName === ownProps.folder.folderName) 
    if (expanded){
        //Check whether we have already expanded or not if we press the same card again
        expanded = expanded  === !state.selectedItem.hasExpanded;
    }
    return {expanded}
};

const styles = {
    containerStyle: {
        elevation: 3
    },
    text: {
        color: 'black', 
        fontSize: 10,
    }
}

export default connect(mapStateToProps, actions)(VideoFolder);