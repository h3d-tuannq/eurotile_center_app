import {PureComponent} from "react";
import {Image, StyleSheet, TouchableOpacity, Text, View,Alert} from "react-native";

import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";
import React from "react";
import FavoriteIcon from "../../../assets/icon/icon-unlike.svg";
import FavoriteIconSelect from "../../../assets/icon/icon-like.svg";


import Def from '../../def/Def'
import Style from "../../def/Style";

class ProgramItemrenderer extends PureComponent{
    state = {
        stateCount: 0.0,

    };

    callbackIndex = 0;

    constructor(props) {
        super(props);
    }


    formatText(text, maxCharacter = 20){
        let rs = text;
        if(text.length > maxCharacter -2){
            rs = text.substring(0, maxCharacter -2) + " ...";
        }
        return rs;
    }


    render(){
        const model = this.props.item;
        const click = this.props.click;
        //console.log(model);
        const FavoriteItem = ()=> {
            if(this.props.favorite ){

                if(model.favorite!=null){
                    return (
                        <FavoriteIconSelect style={styles.favoriteIcon}
                        />)
                } else {
                    return ( <FavoriteIcon style={styles.favoriteIcon}/> )
                }

            }
            return null;
        };

        return (
            <View>

            <TouchableOpacity style={[styles.itemStyle, this.props.styleImage]} onPress={
                () => {
                    click(model);
                }
            } >
                {/*{this.props.favorite ?*/}
                    {/*<TouchableOpacity style={styles.favoriteIcon} onPress={this.favoriteClickHandle}>*/}
                        {/*<FavoriteItem />*/}
                    {/*</TouchableOpacity>*/}
                    {/*:*/}
                    {/*null*/}
                {/*}*/}


                {model.image_path ?
                    <Image  style={[this.props.styleImage, styles.imageStyle ]}  source={{uri:model.image_path}}  />
                    :
                    <DefaultProgramImage style={styles.imageStyle} width={this.props.styleImage.width} height={this.props.styleImage.height}/>
                }

                </TouchableOpacity>
                {/*{*/}
                     {/*this.props.type == 'music' ? <Text style={{marginTop:5, zIndex: 10, fontSize : Style.SMALL_SIZE, color : '#b3b3b3', width:this.props.styleImage.width}}>{this.formatText(model.name, 15)}</Text> : null*/}
                {/*}*/}
            </View>

        )
    }
}

const  styles = StyleSheet.create({
    itemStyle : {
            borderRadius: 5,
            marginRight: 5,
            alignItems : 'flex-start',
            marginTop: 5,

    },
    imageStyle : {

        borderRadius: 5,
    },

    favoriteIcon : {
        width:20,
        height:20,
        position: 'absolute',
        top:3,
        right: 3,
        zIndex : 10,
        padding : 5,
    }
});

export default ProgramItemrenderer;
