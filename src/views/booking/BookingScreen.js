import React, {useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform, Modal, Keyboard, FlatList} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';
import LocationIcon from '../../../assets/icons/Location.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';


import OrderController from  '../../controller/OrderController'


const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 30;

import OrderitemItemrenderer from "../../com/item-render/OrderitemItemrenderer";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class BookingScreen extends React.Component {
    constructor(props){
        super(props);
        this.saveOrder = this.saveOrder.bind(this);
        this.orderItemChange = this.orderItemChange.bind(this);
        this.parseDataToView = this.parseDataToView.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        let address = this.props.route.params && this.props.route.params.address ? this.props.route.params.address : Def.order ? Def.order.address : null;

        this.state = {
            focus : 0,
            isUpdate: 0,
            stateCount: 0.0,
            order:Def.order,
            gender : 0,
            mobile:'',
            address : address,
            addressStr : this.props.route.params && this.props.route.params.addressStr ? this.props.route.params.addressStr : Def.getAddressStr(address),
            showKeyboard : false,
            receipt_date: new Date(),
            orderItems: Def.order ? Def.order.orderItems : [],
            paymentMethod:0,

        };



        Def.mainNavigate = this.props.navigation;
        this.refresh = this.refresh.bind(this);
        Def.updateAddress = this.refresh;
    }

    refresh(){
        console.log('Refresh : ' + Def.getAddressStr(Def.order.address) );
        this.setState({address:Def.order.address, addressStr: Def.getAddressStr(Def.order.address)});
    }

    changeAddress(){
        this.props.navigation.navigate('Booking', {screen:'change-order-address'});
    }

    componentDidMount(){
        console.log("Component Did mount");
    }

    orderItemChange(){

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

    buildAddress(address){
        let submitAddress = {};
            submitAddress.id = address ? address['id'] : null;
            submitAddress.address_detail = address.address_detail;
            submitAddress.city_code = address.city_code;
            submitAddress.district_code = address.district_code;
            submitAddress.ward_code = address.ward_code;
        return submitAddress;
    }


    saveOrder() {
        const {navigation} = this.props;
        let orderInfo = {
            customer_id : Def.order.customer ? Def.order.customer['id'] : "",
            id: Def.order.id ? Def.order.id : "",
            partner_id:Def.order.partner_id,
            booker_id:  Def.user_info ? Def.user_info['id'] : null,
            receipt_date:this.state.receipt_date ?  Def.getDateString(this.state.receipt_date , "yyyy-MM-dd") : "",
            referral_code:'',
            address: JSON.stringify(this.buildAddress(Def.order.address)),
            order_item: JSON.stringify(this.createOrderItemInfo()),

        };

        console.log('Sava Order Info: ' + JSON.stringify(orderInfo));

        if(orderInfo){
            OrderController.saveOrder(orderInfo, this.props.navigation);
        }
    }

    createOrderItemInfo(){
        var orderItemInfo = Def.order.orderItems.map((item) => {
            return {product_id: item.product.id, amount: item.amount, price: item.product.sale_price};
        });
        return orderItemInfo;

    }


    hideDateTimePicker = () => {
        let showDateVisible = 'isDateTimePickerVisible';
        this.setState({  [showDateVisible] : false });
    };
    handleDatePicked = date => {
        this.hideDateTimePicker();
        this.setState({  receipt_date : date });
    };

    showDateTimePicker = (attr = null) => {
        let showDateVisible = 'isDateTimePickerVisible';
        this.setState({ [showDateVisible]: true });
    };

    shouldComponentUpdate(){
        console.log("Should Update");
        if(this.props.route.params && this.props.route.params.refresh){
            this.setState({address:Def.order.address});
        }
        return true;
    }

    render() {
        const {navigation} = this.props;
        const {address} = this.state;
        const renderOrderItem = ({item, index}) => (
            <OrderitemItemrenderer type={"order-item"} item={item} index={index} disabled={true} itemChange={this.orderItemChange} click={this.orderItemClick} styleImage={{width:PROGRAM_IMAGE_WIDTH-5, height:PROGRAM_IMAGE_HEIGHT-5 }} />
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
                                {Def.calOrderValue(this.state.order) + " đ"}
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
                            {this.state.order.customer.name}
                        </Text>
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}
                            onPress={this.changeAddress}
                        >
                            <View style={styles.orderInfo}>
                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR}]}>
                                    {'(+84) '+ this.state.order.customer.phone}
                                </Text>
                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR, marginTop:3}]}>
                                    {this.state.addressStr ? this.state.addressStr :Def.getAddressStr(address)}
                                </Text>

                                <Text style={[Style.text_styles.middleText, {color:Style.GREY_TEXT_COLOR, marginTop:3}]}>
                                    {address.address_detail}
                                </Text>
                            </View>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </TouchableOpacity>
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
                                this.state.paymentMethod == 0 ? "Ví điện tử VNPAY" : "Thanh toán sau"
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
                        }} onPress={() => this.showDateTimePicker('receipt_date')}>
                            <Text style={[Style.text_styles.titleTextNotBold, {
                                justifyContent: 'center',
                                paddingLeft: 5,
                                color: Style.GREY_TEXT_COLOR
                            }]}>
                                {this.state.receipt_date ? Def.getDateString(this.state.receipt_date, "yyyy-MM-dd") : "YYYY-MM-DD"}
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
                { this.state.order ?
                <View keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: '#fff', paddingLeft : 10, paddingRight: 5, paddingTop:10}}>
                    <View>
                        <FlatList
                        data={this.state.orderItems}
                        renderItem={renderOrderItem}
                        keyExtractor={item => item.product.id +"-" + item.amount}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={bookingHeader}
                        // ListFooterComponent={footerComponent}
                        />
                    </View>
                </View>:<View/>}
                <View>

                </View>
                <View style={{marginTop:10,  borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:20, paddingVertical:5}}>
                    <View style={styles.orderInfo}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between' }}>
                            <Text style={[Style.text_styles.middleText]}>
                                {"Thanh toán"}
                            </Text>
                            <Text style={[Style.text_styles.priceText, { marginTop:3, fontWeight:'bold'}]}>
                                {Def.numberWithCommas(Def.calOrderValue(this.state.order)) + " đ"}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}
                                  onPress={this.saveOrder}>
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
