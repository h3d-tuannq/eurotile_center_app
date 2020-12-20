import {PureComponent} from "react";
import {Image, StyleSheet, TouchableOpacity, Text, View, Alert, Dimensions} from "react-native";

const {width, height} = Dimensions.get('window');

import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";
import React from "react";
import FavoriteIcon from "../../../assets/icon/icon-unlike.svg";
import FavoriteIconSelect from "../../../assets/icon/icon-like.svg";


import Def from '../../def/Def'
import Style from "../../def/Style";

class OrganItemrenderer extends PureComponent{
    state = {
        stateCount: 0.0,

    };

    callbackIndex = 0;

    constructor(props) {
        super(props);
    }


    formatText(text, maxCharacter = 20){
        let rs = text;
        // if(this.props.type == "product"){
        //     rs = text.replace("Sản phẩm ", '');
        // }

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
            <TouchableOpacity style={[styles.itemStyle]} onPress={
                () => {
                    click(model);
                }
            } >
                <View style={styles.imageContainer}>
                    {model.image_path ?
                        <Image  style={[styles.itemImage ]}  source={{uri: Def.getThumnailImg(model.image_path)}}  />
                        :
                        <DefaultProgramImage style={styles.imageStyle} width={this.props.styleImage.width} height={this.props.styleImage.height}/>
                    }

                </View>

                <View style={styles.info}>
                        <Text style={{fontSize:Style.MIDLE_SIZE , paddingRight:5}}>
                            {model.organ.OrganName+""}
                        </Text>

                        <Text style={{fontSize:Style.MIDLE_SIZE , paddingTop:5, paddingRight:5}}>
                            {model.organ.phone+""}
                        </Text>
                        <Text style={{fontSize:Style.MIDLE_SIZE , paddingTop:5, paddingRight:5}}>
                            {model.organ.website+""}
                        </Text>
                        <Text style={{fontSize:Style.MIDLE_SIZE,  paddingTop:5, paddingRight:5}}>
                            {model.organ.email+""}
                        </Text>
                </View>


                </TouchableOpacity>

            </View>

        )
    }
}

const  styles = StyleSheet.create({
    itemStyle : {
            borderRadius: 5,
            marginRight: 5,
            alignItems : 'flex-start',
            marginTop: 10,
            paddingVertical : 10,
            flexDirection : 'row',



    },
    imageStyle : {

        borderRadius: 5,
    },

    imageContainer:{
        flex: 1,
        // backgroundColor: "red",
        borderRadius :5,
        justifyContent:'center'
    },
    itemImage: {
        width : width /4,
        height : width /4,
        borderRadius : 5,
        borderWidth : 2,
        borderColor : Style.GREY_TEXT_COLOR,
    },


    info: {
        marginLeft:5,
        flex: 2.2,
        // justifyContent: 'space-around',
        // paddingVertical: 5,
        // backgroundColor : 'red'
    },
    titleInfo : {
        fontWeight: 'bold',
        fontSize : Style.NORMAL_SIZE,
        paddingBottom : 8,
        flex: 1,
    },
    infoText : {
        fontSize : Style.NORMAL_SIZE,
        color: '#ffffff'
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

export default OrganItemrenderer;
