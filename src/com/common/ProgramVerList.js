import React from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native';

import DesignItemrenderer from '../item-render/DesignItemrenderer'
import Style from "../../../src/def/Style";
import Def from "../../../src/def/Def";

const {width, height} = Dimensions.get('window');

const PROGRAM_IMAGE_WIDTH = (width - 30) ;
const PROGRAM_IMAGE_HEIGHT = (width * 0.6);



class ProgramVerList extends React.Component{
    constructor(props){
        super(props);
        this.sectionClick= this.sectionClick.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    sectionClick(){
       console.log('section click');
        // this.props.navigation.navigate(this.props.group,{name: this.props.name});
    }

    itemClick(item){
        console.log("itemClick(item))))))))))))))))))))))))))))))))))))))))))))))))");
        let stack = this.props.stack ? this.props.stack :false;
        let screen = this.props.screen ? this.props.screen :'detail-design';
        if(stack){
            this.props.navigation.navigate(stack, {screen:screen, params: { item: item }});
        } else {
            this.props.navigation.navigate(screen, { item: item });
        }
    }



    render() {
        const {iconStyleHome, titleStyle,titleView, } = styles;
        const renderItem = ({item}) => {
            return (
                <View style={{paddingHorizontal : 15}}>
                    <DesignItemrenderer
                        item ={item} click={this.itemClick} canPlayBack={this.props.canPlayBack}
                        styleImage={{width: PROGRAM_IMAGE_WIDTH , height: PROGRAM_IMAGE_HEIGHT}}
                        type={this.props.type}
                    />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList

                    style={[styles.programList, { marginBottom :  0, backgroundColor:'#fff'}]}
                    data={this.props.data ? this.props.data : [] }
                    renderItem={renderItem}
                    keyExtractor={(item,index) => item.id + "" + index.toString()}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={this.props.header}
                    ListFooterComponent={this.props.footer ? this.props.footer : null}
                    showsVerticalScrollIndicator ={false}
                     onEndReached={() => {this.props.endListReach ? this.props.endListReach() : console.log('list ended');}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        // marginTop : 5,
        backgroundColor : '#fff'
    },
    titleStyle: {
        fontSize: Style.TITLE_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold',
        marginRight : 10
    },
    titleView: {
        paddingVertical : 10,
        flexDirection : 'row',
        alignItems: 'center'
    }
    ,
    iconStyleHome: {
        width: 15, height: 15
    },
    programList: {
        marginBottom : 120,

    }
})

export default ProgramVerList;
