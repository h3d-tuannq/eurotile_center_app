import {PureComponent} from "react";
import {Image, StyleSheet, TouchableOpacity, Text, View, Alert, Dimensions} from "react-native";

import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";
import React from "react";
import PlusCircleIcon from "../../../assets/icons/Plus circle.svg";
const {width,  height} = Dimensions.get('window');


import Def from '../../def/Def'
import Style from "../../def/Style";
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from "react-native-input-spinner";
import Icon from 'react-native-vector-icons/FontAwesome5';


class OrderItemrenderer extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            isCancel: this.props.item.is_delete == 1? true: false,
            stateCount: 0.0,
            selectValue: this.props.item.selectValue,
        };

        this.updateOrder = this.updateOrder.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    deleteHandleClick = (item) => {
        this.props.itemChange(item, true);
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

    checkBoxChange = (newValue) => {
        this.setState({selectValue : newValue});
        let item = this.state.item;
        item.selectValue = newValue;
        // console.log("Item : "+ JSON.stringify(item));
        this.props.itemChange(item);
    }

    quantityChange = (newValue) => {
        this.setState({amount : newValue});
        let item = this.state.item;
        item.selectValue = newValue;
        this.props.itemChange(item);
    }


    updateOrder = () => {

    }


    //
    // shouldComponentUpdate(){
    //     // this.setState({ configMenu: Def.config_news_menu});
    //     // console.log('SortData ddd:' + JSON.stringify(this.props.route));
    //     return true;
    // }




    render(){
        const model = this.state.item;
        const click = this.props.click;
        return (
            <View style={{flexDirection:'row', paddingVertical:5, marginHorizontal:10, borderBottomWidth : 0, borderBottomColor: Style.GREY_TEXT_COLOR}}>

                {/*<CheckBox*/}
                    {/*style={styles.checkBoxStyle}*/}
                    {/*disabled={false}*/}
                    {/*value={this.state.selectValue}*/}
                    {/*onValueChange={(newValue) => this.checkBoxChange(newValue)}*/}
                {/*/>*/}

                <Text style={this.state.isCancel ? styles.checkIndexCancel: styles.checkIndex}>
                    {
                        this.props.index + 1
                    }
                </Text>
                <TouchableOpacity  disabled = {this.props.disabled}  style={styles.item} onPress={
                    () => {
                        this.props.click(model);
                    }
                }>
                    {/*<View style={styles.imageContainer} >*/}
                        {/*{model.image_path ? <Image style={styles.itemImage} source={{uri:model.image_path}} /> :*/}
                            {/*<Image  style={styles.itemImage}  source={require('../../../assets/icon/logo_vov_16_9.png')}  />}*/}
                    {/*</View>*/}

                    <View style={styles.info}>
                        <View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={this.state.isCancel ? styles.titleInfoCancel :styles.titleInfo}>{model.code}</Text>
                                {/*<TouchableOpacity style={{marginTop:-3 , paddingHorizontal:5, paddingVertical:3}} onPress={() => {this.deleteHandleClick(this.props.item)}}>*/}
                                    {/*<Icon name="trash-alt"  size={17} color={Style.GREY_TEXT_COLOR} />*/}
                                {/*</TouchableOpacity>*/}
                                <Text style={this.state.isCancel ? styles.priceTextCancel :styles.priceText}>{Def.numberWithCommas(model['total_value']) + " đ" }</Text>
                            </View>


                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Khách hàng"  }</Text>
                                <Text style={this.state.isCancel ? styles.valueTextCancel :styles.valueText}>{model['customer']['name']  }</Text>
                                {/*<Text style={styles.priceText}>{model['total_value'] + " đ" }</Text>*/}
                            </View>

                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Điện thoại"  }</Text>
                                <Text style={this.state.isCancel ? styles.valueTextCancel :styles.valueText}>{model['customer']['phone']  }</Text>
                                {/*<Text style={styles.priceText}>{model['total_value'] + " đ" }</Text>*/}
                            </View>
                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Ngày giao hàng"  }</Text>
                                <Text style={this.state.isCancel ? styles.valueTextCancel :styles.valueText}>{model['deliver_date'] ? Def.getDateString(new Date(model['deliver_date'] * 1000) , "yyyy-MM-dd") : ""}</Text>
                                {/*<Text style={styles.priceText}>{model['total_value'] + " đ" }</Text>*/}
                            </View>

                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Ngày tạo"  }</Text>
                                <Text style={this.state.isCancel ? styles.valueTextCancel :styles.valueText}>{model['created_at'] ? Def.getDateString(new Date(model['created_at'] * 1000) , "yyyy-MM-dd") : ""}</Text>
                                {/*<Text style={styles.priceText}>{model['total_value'] + " đ" }</Text>*/}
                            </View>
                        </View>

                        <View style={styles.listenView}>
                            <View style={styles.groupInfo}>
                                {/*<Text style={styles.infoText}>{"Ngày giao hàng" }</Text>*/}
                                <Text style={this.state.isCancel ? styles.valueTextCancel :styles.valueText}>{Def.getAddressStr(model.address)}</Text>
                                {/*<Text style={styles.priceText}>{Def.getAddressStr(model.address) }</Text>*/}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const  styles = StyleSheet.create({
    item: {
        // height : 120,
        paddingRight:15,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom : 5,
        alignItems : 'flex-start',
        paddingTop : 10 ,
        // backgroundColor : 'red',
        flex:1
    },

    checkBoxStyle: {
        marginTop: width/15
    },

    checkIndex: {
        // marginTop: width/15,
        paddingVertical :5,
        paddingTop:10,
        paddingLeft: 5,
        paddingRight: 10
    },
    checkIndexCancel:{
        paddingVertical :5,
        paddingTop:10,
        paddingLeft: 5,
        paddingRight: 10,
        color: Style.GREY_TEXT_COLOR
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
        flex: 2.2,
        // justifyContent: 'space-around',
        // paddingVertical: 5,
        // backgroundColor : 'red'
    },
    groupInfo: {
      flexDirection : 'row',
        marginTop :2,
      justifyContent: 'space-between',
      alignItems:'center'
    },

    titleInfo : {
        fontWeight: 'bold',
        fontSize : Style.NORMAL_SIZE,
        paddingBottom : 8,
        flex: 1,
    },
    titleInfoCancel : {
        fontWeight: 'bold',
        fontSize : Style.NORMAL_SIZE,
        paddingBottom : 8,
        color: Style.GREY_TEXT_COLOR,
        flex: 1,
    },
    infoText : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.GREY_TEXT_COLOR
    },
    valueText : {
        fontSize : Style.NORMAL_SIZE,
        // color: Style.GREY_TEXT_COLOR
    },
    valueTextCancel : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.GREY_TEXT_COLOR
    },


    priceText : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold'
    },
    priceTextCancel : {
        fontSize : Style.NORMAL_SIZE,
        color: Style.GREY_TEXT_COLOR,
        fontWeight: 'bold'
    },

    favoriteIcon : {
        width : 20,
        height : 20,
    }
});

export default OrderItemrenderer;
