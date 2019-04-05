import React from 'react';
import {LayoutAnimation, UIManager, FlatList} from 'react-native';
import {Body, Card, CardItem, Button, Text} from 'native-base';

import {selectFolder} from '../../Redux/Actions';
import {connect} from 'react-redux';

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
        console.log(video.item);
        return (
            <Button
                //onPress={}      //Reducer, connect with video screen!
            >
                <Text style={{color: 'black'}}>{video.item.name}</Text>    
                <Text style={{color: 'black'}}>{video.item.link}</Text>
            </Button>
        )
    }

    expandVideoList(){
        if (this.props.expanded){
            return (
                <CardItem>
                    <Body>
                        <FlatList 
                            data={this.props.folder.videoList}
                            renderItem={this.renderItem}
                            keyExtractor={video => video.name.toString()}
                        />
                    </Body>
                </CardItem>
            )
        }
    }

    render(){
        return (
            <Button
                // style={{backgroundColor:'red'}}
                transparent
                onPress={()=> {
                    //console.log(this.props.expanded);
                    //console.log(this.props.folder.folderName + " " + this.props.expanded);
                    this.props.selectFolder(this.props.folder.folderName)
                }}
            >
                <Card 
                    style={styles.containerStyle}
                    >
                    <CardItem header>
                        <Text style={{color: 'black'}}> 
                            {this.props.folder.folderName} 
                        </Text>
                    </CardItem>
                    {this.expandVideoList()}
                </Card>
            </Button>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state.selectedFolder.folderName + " " + ownProps.folder.folderName);
    const expanded = (state.selectedFolder.folderName === ownProps.folder.folderName);
    return {expanded}
};

const styles = {
    containerStyle: {
        marginRight: 0,
        width: '100%',
    }
}

export default connect(mapStateToProps, {selectFolder})(VideoFolder);