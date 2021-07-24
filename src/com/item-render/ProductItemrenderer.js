import {PureComponent} from "react";
import {Image, StyleSheet, TouchableOpacity, Text, View,Alert} from "react-native";

import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";
import React from "react";
import PlusCircleIcon from "../../../assets/icons/Plus circle.svg";


import Def from '../../def/Def'
import Style from "../../def/Style";

class ProductItemrenderer extends PureComponent{
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
        return (
            <View>

            <TouchableOpacity style={[ this.props.styleItem]} onPress={
                () => {
                    click(model);
                }
            } >



                {model.image_path ?
                    <Image  style={[this.props.styleImage ]}  source={{uri: Def.getThumnailImg(model.image_path)}}  />
                    :
                    <DefaultProgramImage style={styles.imageStyle} width={this.props.styleImage.width} height={this.props.styleImage.height}/>
                }

                </TouchableOpacity>

                <View style = {{width:this.props.styleImage.width, justifyContent:'center',
                    backgroundColor: this.props.type == 'product' ? Style.DEFAUT_BLUE_COLOR :Style.DEFAUT_RED_COLOR,
                    alignItems: (this.props.type == 'product' ? 'center' :'center')}}>

                    <Text style={[{position: 'absolute',zIndex:3 , paddingHorizontal : 4 , paddingVertical:1 , borderRadius : 0,
                        backgroundColor: this.props.type == 'product' ? 'rgba(48, 94, 117, 0.6)' :'rgba(48, 94, 117, 0.6)',
                        width:this.props.styleImage.width,
                        bottom:10, left:5,
                        textAlign: 'center'}, { fontSize: Style.MIDLE_SIZE , color: '#fff' }]}>
                          {this.formatText(this.props.type == 'product' ? model.model + (model.brickBoxInfo ? " - " + model.brickBoxInfo.width + "x" + model.brickBoxInfo.height : ""):model.name, 20)}
                    </Text>
                </View>
            </View>

        )
    }
}

const  styles = StyleSheet.create({
    itemStyle : {
            borderRadius: 0,
            alignItems : 'flex-start',
            backgroundColor : 'red',

    },
    imageStyle : {


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

export default ProductItemrenderer;
