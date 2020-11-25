import React, {useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform, Modal, Keyboard, FlatList} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';


import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 40;

import AutocompleteModal from '../../com/common/AutocompleteModal'
import Net from "../../net/Net";

class ChangeOrderAddressScreen extends React.Component {
    constructor(props){
        super(props);
        this.updateOrderAddress = this.updateOrderAddress.bind(this);
        this.onGetCites = this.onGetCites.bind(this);
        this.onGetCitesFalse = this.onGetCitesFalse.bind(this);
        this.onGetAddress = this.onGetAddress.bind(this);
        this.onGetAddressFalse = this.onGetAddressFalse.bind(this);

        this.choseCityClick = this.choseCityClick.bind(this);
        this.choseDistrictClick = this.choseDistrictClick.bind(this);
        this.choseWardClick = this.choseWardClick.bind(this);
        this.showAutocompleteModal = this.showAutocompleteModal.bind(this);
        this.showAddressModal = this.showAddressModal.bind(this);
        this.state = {
            focus : 0,
            isUpdate: 0,
            stateCount: 0.0,
            cities :  [],
            district :  [],
            ward: [],
            city_item: Def.order && Def.order.address ? Def.order.address.city : [],
            district_item: Def.order && Def.order.address ? Def.order.address.district : [],
            ward_item: Def.order && Def.order.address ? Def.order.address.ward : [],
            address : Def.order && Def.order.address ? Def.order.address.address_detail :"",
            choseAddress : false,
            currentAddress : 1, // 1 select city, 2 select district, 3 select ward
            nextAddress : 1, // 1 select city, 2 select district, 3 select ward
            filterAttr: 'city_name',
            filterData: [],
            showKeyboard : false,
            addressTitle: 'Tỉnh/Thành phố',

        };
    }

    componentDidMount(){
        if(this.state.cities.length > 0){
        Net.sendRequest(this.onGetCites,this.onGetCitesFalse,Def.URL_BASE + '/api/user/city' , Def.POST_METHOD);

        }
    }


    onGetCites(res){
        this.setState({cities: res});
    }

    getAdministrativeUnit(url, params = null, callBack = null){
        Net.sendRequest(callBack !== null ? callBack : this.onGetAddress,this.onGetCitesFalse,url , Def.POST_METHOD, params);
    }



    onGetAddress(res){
        let unit = this.state.nextAddress == 1 ? 'cities' : this.state.nextAddress == 2 ? 'district' : 'ward';
        this.setState({[unit]: res});
    }

    onGetAddressFalse(err){
        console.log('onGetAddressFalse' + JSON.stringify(err));
    }


    onGetCitesFalse(res){

    }

    showAutocompleteModal(res){
        let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
        if(this.state.currentAddress == 1){
            this.setState({ filterData: res, cites: res, filterAttr: 'city_name'});
        }

        if(this.state.currentAddress == 2){
            this.setState({filterData: res, district: res, filterAttr: 'district_name'});
        }
        if(this.state.currentAddress == 3){
            this.setState({filterData: res, ward: res, filterAttr: 'ward_name'});
        }
        this.showAddressModal();
        // setTimeout(this.showAddressModal, 5);
    }


    choseCityClick(){
        this.setState({currentAddress:1});
        if(!this.state.cities || this.state.cities.length == 0 ){
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/city', null, this.showAutocompleteModal);
        } else {
            this.setState({filterData: this.state.cities, filterAttr: 'city_name'});
            this.showAddressModal();
        }
    }

    showAddressModal(){
        let title = this.state.currentAddress == 1 ? "Tỉnh/Thành phố" : this.state.currentAddress == 2 ? "Quận/huyện" : "Phường/Thị trấn";
        this.setState({choseAddress: true, addressTitle : title});
    }

    choseDistrictClick(){
        this.setState({currentAddress:2});
        if(!this.state.district || this.state.district.length == 0){
            console.log('Chưa tồn tại District : ');
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: this.state.city_item.city_code}, this.showAutocompleteModal);
        }else {
            console.log('Isset District: ' + JSON.stringify(this.state.district));
            this.setState({ filterData: this.state.district, filterAttr: 'district_name'});
            this.showAddressModal();
        }

    }

    choseWardClick(){
        this.setState({currentAddress:3});
        if(!this.state.ward || this.state.ward.length == 0){
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: this.state.district_item.district_code}, this.showAutocompleteModal);
        }else {
            this.setState({filterData: this.state.ward, filterAttr: 'ward_name'});
            this.showAddressModal();
        }
    }


    closeFunction = (item) => {
        if (item) {
            if(this.state.currentAddress == 1){
               if (!this.state.city_item || (this.state.city_item.city_code !== item.city_code)){
                   this.setState({nextAddress:2, district_item : null, ward_item : null, address:"" });
                   this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: item.city_code});
               }
            }

            if(this.state.currentAddress == 2){
                if (!this.state.district_item || this.state.district_item.district_code !== item.district_code){
                    this.setState({nextAddress:3 , ward_item : null, address:""});
                    this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: item.district_code});
                }
            }

            let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
            this.setState({[unit]: item, choseAddress: false, address:""});

        } else {
            this.setState({choseAddress: false})
        }
    }
    parseDataToView(){
        let projectImg = this.getProjectImage();
        this.setState({
            address : '',
            city_item: null,
            district_item: null,
            ward_item: null,
            stateCount: Math.random(),
        });
    }


    validate(is_create = true){
    }

    validateAddress(){
        let err = 0;
        if(!this.state.city_item){
            alert("Vui cập nhật dữ liệu tỉnh/thành phố");
            err = 1;
        }

        if(!this.state.district_item){
            alert("Vui cập nhật dữ liệu quận/huyện");
            err = 2;
        }

        if(!this.state.ward_item){
            alert("Vui cập nhật dữ liệu phường/xã");
            err = 3;
        }
        return err;
    }


    buildAddress(){
        let address = Def.getAddressFromUserInfo();
        let submitAddress = {};
            submitAddress.id = address ? address['id'] : null;
            submitAddress.address_detail = this.state.address;
            submitAddress.city_code = this.state.city_item ? this.state.city_item.city_code  : "";
            submitAddress.district_code = this.state.district_item ? this.state.district_item.district_code : "";
            submitAddress.ward_code = this.state.ward_item ? this.state.ward_item.ward_code : "";
        return submitAddress;
    }


    updateOrderAddress() {
       console.log('Order Address');

       Def.order.address = {
           id: "",
           city_code: this.state.city_item ? this.state.city_item.city_code  : "",
           district_code: this.state.district_item ? this.state.district_item.district_code : "",
           ward_code: this.state.ward_item ? this.state.ward_item.ward_code : "",
           address_detail: this.state.address,
           city: this.state.city_item,
           district: this.state.district_item,
           ward: this.state.ward_item,
       };

       // this.props.navigation.navigate('Product', {screen:'booking'});
       this.props.navigation.navigate('Product', {screen: 'booking'});
       if(Def.updateAddress){
            Def.updateAddress();
       }
    }

    render() {
        const {navigation} = this.props;

        return (
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:5}}
                                  onPress={this.choseCityClick}
                >
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Tỉnh/Thành phố
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>

                        <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                            {this.state.city_item ? this.state.city_item.city_name : 'Chọn tỉnh/thành phố'}
                        </Text>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}
                                  onPress={this.choseDistrictClick}
                >
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Quận/Huyện
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>

                        <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                            {this.state.district_item ? this.state.district_item.district_name : 'Chọn quận/huyện'}
                        </Text>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}
                                  onPress={this.choseWardClick}
                >
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Phường/Xã
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>

                        <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                            {this.state.ward_item ? this.state.ward_item.ward_name : 'Chọn phường/xã'}
                        </Text>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:1}}>
                    <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                        Địa chỉ cụ thể
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <TextInput
                            onFocus={() => this.setState({focus:1, showKeyboard: true})}
                            onBlur={()=> this.setState({focus:0, showKeyboard: false})}
                            style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                            value={this.state.address.toString()}
                            onChangeText={text => {
                                this.setState({address:text})
                            }}

                            onSubmitEditing={Keyboard.dismiss}

                            placeholder={'Số nhà, tên đường'}
                        />
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>
                </TouchableOpacity>

                <Modal onRequestClose={() => {this.closeFunction(null)}} visible={this.state.choseAddress}  transparent={false} styles={{backgroundColor : 'green'}} >
                    <AutocompleteModal
                        data={this.state.filterData}
                        filterAttr={this.state.filterAttr}
                        closeFunction={this.closeFunction}
                        addressTitle={this.state.addressTitle}

                    />
                </Modal>


                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}  onPress={this.updateOrderAddress}>
                    <Text style={styles.buttonText}>
                        Cập nhật
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        paddingLeft: 15,
        // justifyContent: 'flex-start',
        // marginVertical : 5,
        marginBottom : 125,
        backgroundColor: '#fff'
    },
    slider: {
        justifyContent: 'center',
        paddingTop: 5,
        padding: 8,
        height: 120,
        borderRadius: 5,
        backgroundColor: "#e6e6e6",
        marginRight : 15
    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width-20,
        height: width/2,

    },
    programListStyle : {

    },
    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    imageStyle : {
        width : width /3,
        height : width / 3,

        borderRadius: width / 6,
    },
    imageStyleInfo : {
        width : width /8,
        height : width / 8,
        borderRadius: width / 16,
    },

    button : {
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 20, marginTop : 15, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center', paddingHorizontal : 5, marginHorizontal:10
    },
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginVertical:3, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginVertical:3, paddingHorizontal: 10 },

    textEditableNormal : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE , marginRight : 5, textAlign: 'right'},
    textEditableForcus : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE  , marginRight : 5, textAlign: 'right'},

    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 2},
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },

    orderInfo: {
        marginTop:10,
    },


});

export default ChangeOrderAddressScreen;
