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

    callbackIndex = 0;
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            stateCount: 0.0,
            selectValue: this.props.item.selectValue,
            quantity: this.props.item.quantity,
            area: this.props.item.area,
            saleArea: this.props.item.saleArea
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
        this.setState({quantity : newValue});
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
        const model = this.state.item.product;

        // console.log('Order Item : ' + JSON.stringify(this.state.item.quantity) );

        const click = this.props.click;
        return (
            <View style={{flexDirection:'row', paddingVertical:5, marginHorizontal:10, borderBottomWidth : 1, borderBottomColor: Style.GREY_TEXT_COLOR}}>

                {/*<CheckBox*/}
                    {/*style={styles.checkBoxStyle}*/}
                    {/*disabled={false}*/}
                    {/*value={this.state.selectValue}*/}
                    {/*onValueChange={(newValue) => this.checkBoxChange(newValue)}*/}
                {/*/>*/}

                <Text style={styles.checkIndex}>
                    {
                        this.props.index + 1
                    }
                </Text>

                <TouchableOpacity style={styles.item} onPress={
                    () => {
                        this.props.click(model);
                    }
                }>
                    <View style={styles.imageContainer} >
                        {model.image_path ? <Image style={styles.itemImage} source={{uri:model.image_path}} /> :
                            <Image  style={styles.itemImage}  source={require('../../../assets/icon/logo_vov_16_9.png')}  />}
                    </View>

                    <View style={styles.info}>
                        <View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={styles.titleInfo}>{model.name}</Text>
                                <TouchableOpacity style={{marginTop:-3 , paddingHorizontal:5, paddingVertical:3}} onPress={() => {this.deleteHandleClick(this.props.item)}}>
                                    <Icon name="trash-alt"  size={17} color={Style.GREY_TEXT_COLOR} />
                                </TouchableOpacity>
                            </View>


                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{model['brickBoxInfo']['width'] + "x"+ model['brickBoxInfo']['height'] + "  -  " +model['brickBoxInfo']['brick_number'] + " viên/hộp" }</Text>
                                <Text style={styles.priceText}>{model['sale_price'] + " đ" }</Text>
                            </View>
                        </View>

                        <View style={styles.listenView}>
                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Số hộp"}</Text>
                                <InputSpinner
                                    width={100}
                                    height={28}
                                    min={1}
                                    rounded={false}
                                    showBorder={false}
                                    // colorMin={Style.DEFAUT_BLUE_COLOR}
                                    // colorMax={Style.DEFAUT_BLUE_COLOR}
                                    color={'#fff'}
                                    style={{borderRadius:3, borderWidth:2}}
                                    buttonTextColor={Style.DEFAUT_RED_COLOR}

                                    inputStyle={{width:80, height:35}}
                                    buttonStyle={{borderWidth : 2,borderRadius:1,borderColor:'#000' }}
                                    max={10000} onChange={(newValue) => {this.quantityChange(newValue)}}
                                    value={this.state.quantity}/>

                            </View>
                            <View style={styles.groupInfo}>
                                <Text style={styles.infoText}>{"Diện tích" }</Text>
                                <Text style={styles.priceText}>{model['brickBoxInfo']['total_area']/1000000  * this.state.quantity+ " m" }</Text>

                            </View>
                            {/*<TouchableOpacity style={[styles.listenButton, { backgroundColor: model.reader_link ? 'red' : '#cccccc'}]} onPress={this.onClickNews}>*/}
                            {/*<SpeakerIcon style={styles.favoriteIcon}  />*/}
                            {/*<Text style={[styles.infoText,{ marginLeft:5}]}>*/}
                            {/*Nghe tin tức*/}
                            {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
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
        marginTop: width/15,
        paddingLeft: 5,
        paddingRight: 10
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
    }
});

export default OrderItemrenderer;
