import React, {useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform, Modal, Keyboard, FlatList} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';
import LocationIcon from '../../../assets/icons/Location.svg';

import CalendarIcon from '../../../assets/icons/calendar.svg';


import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 30;

import {Picker} from '@react-native-community/picker';
import UserController from "../../controller/UserController";
import Autocomplete from 'react-native-autocomplete-input';
import AutocompleteModal from '../../com/common/AutocompleteModal'
import Net from "../../net/Net";
import OrderItemrenderer from "../../com/item-render/OrderItemrenderer";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class BookingScreen extends React.Component {
    constructor(props){
        super(props);
        this.updatePartnerInfo = this.updatePartnerInfo.bind(this);
        this.onGetCites = this.onGetCites.bind(this);
        this.onGetCitesFalse = this.onGetCitesFalse.bind(this);
        this.onGetAddress = this.onGetAddress.bind(this);
        this.onGetAddressFalse = this.onGetAddressFalse.bind(this);

        this.choseCityClick = this.choseCityClick.bind(this);
        this.choseDistrictClick = this.choseDistrictClick.bind(this);
        this.choseWardClick = this.choseWardClick.bind(this);
        this.showAutocompleteModal = this.showAutocompleteModal.bind(this);
        this.parseDataToView = this.parseDataToView.bind(this);
        this.showAddressModal = this.showAddressModal.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);

        this.state = {
            focus : 0,
            isUpdate: 0,
            stateCount: 0.0,
            full_name : "",
            gender : 0,
            mobile:'',
            address : '',
            cities : [],
            district : [],
            ward:[],
            city_item: null,
            district_item: null,
            ward_item: null,
            query : '',
            choseAddress : false,
            currentAddress : 1, // 1 select city, 2 select district, 3 select ward
            nextAddress : 1, // 1 select city, 2 select district, 3 select ward
            filterAttr: 'city_name',
            filterData: [],
            showKeyboard : false,
            addressTitle: 'Tỉnh/Thành phố',
            deliverDate: new Date(),
            orderItems: Def.order.orderItems,
            paymentMethod:0,

        };
        Def.mainNavigate = this.props.navigation;
    }

    componentDidMount(){
        console.log('component did mount recall');
        Net.sendRequest(this.onGetCites,this.onGetCitesFalse,'https://eurotiledev.house3d.net/api/user/city' , Def.POST_METHOD);
    }



    onGetCites(res){
        console.log('Load Cities Return');
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
        console.log("Get Res Data : " + JSON.stringify(res));
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
            this.getAdministrativeUnit('https://eurotiledev.house3d.net/api/user/city', null, this.showAutocompleteModal);
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
            this.getAdministrativeUnit('https://eurotiledev.house3d.net/api/user/district', {city_code: this.state.city_item.city_code}, this.showAutocompleteModal);
        }else {
            console.log('Isset District: ' + JSON.stringify(this.state.district));
            this.setState({ filterData: this.state.district, filterAttr: 'district_name'});
            this.showAddressModal();
        }

    }

    choseWardClick(){
        this.setState({currentAddress:3});
        if(!this.state.ward || this.state.ward.length == 0){
            this.getAdministrativeUnit('https://eurotiledev.house3d.net/api/user/ward', {district_code: this.state.district_item.district_code}, this.showAutocompleteModal);
        }else {
            this.setState({filterData: this.state.ward, filterAttr: 'ward_name'});
            this.showAddressModal();
        }
    }


    closeFunction = (item) => {
        if (item) {
            if(this.state.currentAddress == 1){
               if (!this.state.city_item || (this.state.city_item.city_code !== item.city_code)){
                   this.setState({nextAddress:2, district_item : null, ward_item : null });
                   this.getAdministrativeUnit('https://eurotiledev.house3d.net/api/user/district', {city_code: item.city_code});
               }
            }

            if(this.state.currentAddress == 2){
                if (!this.state.district_item || this.state.district_item.district_code !== item.district_code){
                    this.setState({nextAddress:3 , ward_item : null});
                    this.getAdministrativeUnit('https://eurotiledev.house3d.net/api/user/ward', {district_code: item.district_code});
                }
            }

            let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
            this.setState({[unit]: item, choseAddress: false});

        } else {
            this.setState({choseAddress: false})
        }
    }
    parseDataToView(){
        let projectImg = this.getProjectImage();
        this.setState({
            full_name : "",
            gender : 0,
            mobile:'',
            address : '',
            city_item: null,
            district_item: null,
            ward_item: null,
            stateCount: Math.random(),
        });
    }


    validate(is_create = true){
        if (is_create) {
            if (!this.state.full_name) {
                alert("Vui lòng cập nhật ảnh Avatar");
            } else if (!this.state.mobile) {
                alert("Vui lòng điền số điện thoại");
            } else if (!this.state.gender) {
                alert("Vui lòng nhập thông tin giới tính");
            }
        }
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
            submitAddress.city_code = this.state.city_item.city_code;
            submitAddress.district_code = this.state.district_item.district_code;
            submitAddress.ward_code = this.state.ward_item.ward_code;
        return submitAddress;
    }


    updatePartnerInfo() {
        const {navigation} = this.props;
        console.log('Update user info');
        if (!this.state.full_name) {
            alert("Vui lòng cập nhật ảnh Avatar");
        } else if (!this.state.mobile) {
            alert("Vui lòng điền số điện thoại");
        } else if (!this.state.gender) {
            alert("Vui lòng nhập thông tin giới tính");
        }
        // this.validateAddress();
        let userInfo = {
            user_id : Def.user_info ? Def.user_info['id'] : 14,
            card_no: this.state.card_no,
            birth_day: this.state.birth_day ?  Def.getDateString(this.state.birth_day , "yyyy-MM-dd") : "",
            mobile: this.state.mobile,
            address: JSON.stringify(this.buildAddress()),
            issue_on: this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd") : "",
            issue_at: this.state.issue_at,
            gender: this.state.gender == "1" ? 1 :0,
            full_name: this.state.full_name,
        };

        console.log('UserInfo: ' + JSON.stringify(userInfo));
        UserController.updatePartnerInfo(userInfo, navigation);
    }
    hideDateTimePicker = () => {
        let showDateVisible =      'isDateTimePickerVisible' ;
        this.setState({  [showDateVisible] : false });
    };
    handleDatePicked = date => {
        this.hideDateTimePicker();
        this.setState({  deliverDate : date });
    };

    showDateTimePicker = (attr = null) => {
        let showDateVisible = 'isDateTimePickerVisible';

        this.setState({ [showDateVisible]: true });
    };




    render() {
        const {navigation} = this.props;

        const renderOrderItem = ({item}) => (
            <OrderItemrenderer type={"order-item"} item={item} itemChange={this.orderItemChange} click={this.orderItemClick}  styleImage={{width:PROGRAM_IMAGE_WIDTH-5, height:PROGRAM_IMAGE_HEIGHT-5 }} />
        );

        const footerComponent = () => (
            <View style={{paddingBottom: 20, borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:10}}>
                <View style={{marginTop:10}}>
                    <Text style={[Style.text_styles.titleTextNotBold, {fontSize: Style.MIDLE_SIZE}]}>
                        {"Tổng đơn hàng"}
                    </Text>
                    <View style={styles.orderInfo}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between' }}>
                            <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR}]}>
                                {"Giá trị"}
                            </Text>
                            <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR, marginTop:3}]}>
                                {10000000 + " đ"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )

        const bookingHeader = () => (
            <View>

            <View style={{paddingBottom: 20, borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:10}}>
                <View style={{flexDirection:'row', marginLeft:0}}>
                    <LocationIcon style={{width: 30, height:30}}/>
                    <Text style={Style.text_styles.titleText}>
                        Thông tin nhận hàng
                    </Text>
                </View>
                <View style={{marginLeft:0}}>
                    <View style={{marginTop:10}}>
                        <Text style={[Style.text_styles.titleTextNotBold, {fontSize: Style.MIDLE_SIZE}]}>
                            {Def.order.customer.name}
                        </Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View style={styles.orderInfo}>
                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR}]}>
                                    {'(+84) '+ Def.order.customer.phone}
                                </Text>
                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR, marginTop:3}]}>
                                    {Def.getAddressStr(Def.order['address'])}
                                </Text>

                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR, marginTop:3}]}>
                                    {Def.order.address.address_detail}
                                </Text>
                            </View>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </View>
                </View>
            </View>

                <TouchableOpacity style={{
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                    borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:10,
                    // paddingLeft: 10,
                    paddingVertical: 20,
                    backgroundColor: '#fff',
                    marginTop: 1,

                }}>
                    <Text style={[Style.text_styles.titleTextNotBold, {fontSize: Style.MIDLE_SIZE}]}>
                        Thanh toán
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <View style={{ marginTop:15,height: ITEM_HEIGHT, alignItems:'center'}}>
                            <Text style={[{color:Style.GREY_TEXT_COLOR }, Style.text_styles.middleText]}>
                                {
                                this.state.paymentMethod == 0 ? "Ví điện tử VNPAY" : "Thanh toán khi nhận hàng"
                                }
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>
                </TouchableOpacity>


                <View style={{
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                    borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:10,
                    // paddingLeft: 10,
                    paddingVertical: 20,
                    backgroundColor: '#fff',
                    marginTop: 1,

                }}>
                    <Text style={[Style.text_styles.titleTextNotBold, {fontSize: Style.MIDLE_SIZE}]}>
                        Ngày yêu cầu nhận hàng
                    </Text>
                        <TouchableOpacity style={{
                            marginRight: 5,
                            marginTop:10,
                            height: ITEM_HEIGHT,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            borderColor: Style.GREY_TEXT_COLOR
                        }} onPress={() => this.showDateTimePicker('deliverDate')}>
                            <Text style={[Style.text_styles.titleTextNotBold, {
                                justifyContent: 'center',
                                paddingLeft: 5,
                                color: Style.GREY_TEXT_COLOR
                            }]}>
                                {this.state.deliverDate ? Def.getDateString(this.state.deliverDate, "yyyy-MM-dd") : "YYYY-MM-DD"}
                            </Text>
                            <CalendarIcon width={24} height={24} color={Style.GREY_TEXT_COLOR}/>

                        </TouchableOpacity>


                    <DateTimePickerModal
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date) => {
                            this.handleDatePicked(date);
                            // this.hideDateTimePicker();
                        }}
                        onCancel={this.hideDateTimePicker}
                        date={this.state.birth_day}
                        mode={'date'}
                        display='spinner'
                        style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                        datePickerModeAndroid='spinner'
                        timePickerModeAndroid='spinner'
                    />

                </View>




            </View>
        );


        return (
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                { Def.order ?
                <View keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: '#fff', paddingLeft : 10, paddingRight: 5, paddingTop:10}}>
                    <View>
                        <FlatList
                        data={this.state.orderItems}
                        renderItem={renderOrderItem}
                        keyExtractor={item => item.product.id +"-" + item.quantity}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={bookingHeader}
                        // ListFooterComponent={footerComponent}
                        />
                    </View>
                </View>:<View/>}
                <View>

                </View>

                <Modal onRequestClose={() => {this.closeFunction(null)}} visible={this.state.choseAddress}  transparent={false} styles={{backgroundColor : 'green'}} >
                    <AutocompleteModal
                        data={this.state.filterData}
                        filterAttr={this.state.filterAttr}
                        closeFunction={this.closeFunction}
                        addressTitle={this.state.addressTitle}

                    />
                </Modal>

                <View style={{marginTop:10,  borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:20, paddingVertical:5}}>
                    <View style={styles.orderInfo}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between' }}>
                            <Text style={[Style.text_styles.middleText]}>
                                {"Thanh toán"}
                            </Text>
                            <Text style={[Style.text_styles.priceText, { marginTop:3, fontWeight:'bold'}]}>
                                {10000000 + " đ"}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}  onPress={this.updatePartnerInfo}>
                    <Text style={styles.buttonText}>
                        Đặt hàng
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

export default BookingScreen;
