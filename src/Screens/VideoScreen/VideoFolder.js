import React from 'react';
import {LayoutAnimation, UIManager, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, Clipboard, ScrollView, Linking} from 'react-native';
import {Title, Card, CardItem, Button, Text, Icon } from 'native-base';
import { Thumbnail } from 'react-native-thumbnail-video';

import * as actions from '../../Redux/Actions';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';


export default class VideoFolder extends React.Component {
    constructor() {
        super();

        console.disableYellowBox = true;

        UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    //Props consists of "folder" 
    renderItem(video) {
        // return (
        //    <CardItem
        //         button  
        //         onPress={() =>{
        //             this.props.selectVideo(video.item.link);
        //         }}
        //         onLongPress={async () => {
        //             await Clipboard.setString(video.item.link);
        //             Toast.show("Toast! Link is copied!");
        //         }}
        //         style={{
        //             marginTop: 0,
        //             borderTopWidth: 1, 
        //             borderTopColor: '#e1e1e1',
        //             backgroundColor:  '#f9f9f9',
        //         }}
        //    >
        //         <Title style={styles.text}>{video.item.name}:</Title>    
        //         <Text style={{...styles.text, color: '#0000af'}}>   {video.item.link}</Text>
        //    </CardItem>
        // )

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '95%', alignSelf: 'center', backgroundColor: 'white',
                    flexDirection: 'row', marginTop: 20, height: 100, elevation: 2,
                    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2,
                }}
                onPress={() => this.props.selectVideo(video.link)}
            >
                <View style={{flex: 3}}>
                    <Thumbnail
                        url={video.link}
                        showPlayIcon={false}
                        style={{height: '100%', width: '100%'}}
                        onPress={() => this.props.selectVideo(video.link)} />
                </View>

                <View style={{flex: 4}}>
                    <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, paddingVertical: 5}}>
                        <Text style={{color: '#444', fontWeight: '600'}}>{video.name}</Text>
                        <ScrollView>
                            <Text style={{color: '#888', fontSize: 12, marginTop: 7}}>{video.description}</Text>
                        </ScrollView>
                        {/* <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{color: '#888', fontSize: 12}}>{video.description}</Text>
                        </View> */}
                    </View>
                </View>

                <TouchableOpacity
                    style={{position: 'absolute', top: -10, right: 5, width: 30, height: 30, backgroundColor: '#ff2b2b', borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center', elevation: 5}}
                    activeOpacity={0.9}
                    onPress={() => {Linking.openURL(video.link)}}
                >
                    <Icon name="controller-play" type="Entypo" style={{color: 'white', fontSize: 20}} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
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
        // return (
        //     <TouchableWithoutFeedback
        //         onPress={()=> {
        //             this.props.selectFolder(this.props.folder.folderName, this.props.expanded)
        //         }}
        //     >
        //         <Card 
        //             style={styles.containerStyle}
        //         >
        //             <CardItem header
        //                 style={{height: 10}}
        //             >
        //                 <Text style={{color: 'black'}}> 
        //                     {this.props.folder.folderName} 
        //                 </Text>                       
        //             </CardItem>sắp de
        //             {this.expandVideoList()}
        //         </Card>
        //     </TouchableWithoutFeedback>   
        // )

        return (
            <View style={{marginTop: 10, marginBottom: 20,}}>
                <View style={{borderBottomColor: '#888', borderBottomWidth: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, marginLeft: 3, marginRight: 8,}}>
                    <Text style={{color: '#333', fontSize: 18, fontWeight: '500', paddingLeft: 5}}>{this.props.folder.folderName}</Text>
                </View>

                <FlatList 
                    data={this.props.folder.videoList}
                    renderItem={data => this.renderItem(data.item)}
                    keyExtractor={video => video.name.toString()}
                />
            </View>
        );
    }
}

// const mapStateToProps = (state, ownProps) => {
//     //Expand the pressed card
//     let expanded = (state.selectedItem.folderName === ownProps.folder.folderName) 
//     if (expanded){
//         //Check whether we have already expanded or not if we press the same card again
//         expanded = expanded  === !state.selectedItem.hasExpanded;
//     }
//     return {expanded}
// };

// const styles = {
//     containerStyle: {
//         elevation: 3
//     },
//     text: {
//         color: 'black', 
//         fontSize: 10,
//     }
// }

// export default connect(mapStateToProps, actions)(VideoFolder);