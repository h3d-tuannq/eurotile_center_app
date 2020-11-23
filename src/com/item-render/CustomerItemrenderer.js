import {PureComponent} from "react";
import {Image, StyleSheet, TouchableOpacity, Text, View, Alert, Dimensions} from "react-native";

import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";
import React from "react";
const {width,  height} = Dimensions.get('window');
import PlusCircleIcon from "../../../assets/icons/Plus circle.svg";

import Def from '../../def/Def'
import Style from "../../def/Style";

class CustomerItemrenderer extends PureComponent{

    callbackIndex = 0;
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            stateCount: 0.0,
        };
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

    // shouldComponentUpdate(){
    //     // this.setState({ configMenu: Def.config_news_menu});
    //     // console.log('SortData ddd:' + JSON.stringify(this.props.route));
    //     return true;
    // }


    render(){
        const model = this.state.item;
        // console.log( "Model-Item : " + JSON.stringify(model));

        // console.log('Order Item : ' + JSON.stringify(this.state.item.quantity) );

        const click = this.props.click;
        return (
            <View style={styles.item}>
                <TouchableOpacity  onPress={
                    () => {
                        this.props.click(model);
                    }
                }>
                    <View style={styles.info}>
                            <Text style={styles.titleInfo}>{'(+84) ' + model.phone}</Text>
                            <View style={styles.groupInfo}>
                                <Text style={styles.addressText}>{ model['name'] }</Text>
                            </View>
                        {
                            model['address'] ?
                            <View style={styles.address}>
                                <Text style={styles.addressText}>{Def.getAddressStr(model['address'])}</Text>
                            </View>
                            : <View/>
                        }
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const  styles = StyleSheet.create({
    item: {
        flexDirection:'row', paddingVertical:5, marginHorizontal:10, borderBottomWidth : 1, borderBottomColor: Style.GREY_TEXT_COLOR, width: width -20,
        marginHorizontal:10,
        paddingVertical: 5,
    },

    checkBoxStyle: {
        marginTop: width/15
    },

    imageContainer:{
        flex: 1,
        // backgroundColor: "red",
        borderRadius :5,
        justifyContent:'center'
    },
    itemImage: {
        width : width /5.5,
        height : width /5.5,
        borderRadius : 5,
        // marginTop: 10
    },
    listenView: {
        marginTop :5,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems : 'center',
        flex: 1,
    },
    listenButton :{
        justifyContent : 'space-around',alignItems: 'center', flexDirection:'row' , width: width /3,
        paddingHorizontal: 10,
        borderRadius: 5,
        height :30
    }
    ,
    info: {
        // marginLeft:20,
        // flex: 2.2,
        // justifyContent: 'space-around',
        // paddingVertical: 5,
        // backgroundColor : 'red'
    },
    groupInfo: {
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },

    titleInfo : {
        fontWeight: 'bold',
        fontSize : Style.NORMAL_SIZE,
        paddingBottom : 8,
        flex: 1,
    },
    infoText : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.GREY_TEXT_COLOR
    },
    priceText : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold'
    },
    favoriteIcon : {
        width : 20,
        height : 20,
    },
    addressText: {
        fontSize : Style.NORMAL_SIZE,
    },
    address: {
        marginTop :5
    }
});

export default CustomerItemrenderer;
