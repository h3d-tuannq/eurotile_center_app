import React, {useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform, Modal, Keyboard} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';
import AsyncStorage from '@react-native-community/async-storage'

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 40;

import {Picker} from '@react-native-community/picker';
import UserController from "../../controller/UserController";
import Autocomplete from 'react-native-autocomplete-input';
import AutocompleteModal from '../../com/common/AutocompleteModal'
import Net from "../../net/Net";
import moment from 'moment'
import CustomerController from "../../controller/CustomerController";
// import RNPickerSelect from 'react-native-picker-select';

class CreateCustomerScreen extends React.Component {
    constructor(props){
        super(props);
        this.saveCustomer = this.saveCustomer.bind(this);
        this.saveCustomerSuccess = this.saveCustomerSuccess.bind(this);
        this.saveCustomerFalse = this.saveCustomerFalse.bind(this);

        this.onGetCites = this.onGetCites.bind(this);
        this.onGetCitesFalse = this.onGetCitesFalse.bind(this);
        this.onGetAddress = this.onGetAddress.bind(this);
        this.onGetAddressFalse = this.onGetAddressFalse.bind(this);

        this.choseCityClick = this.choseCityClick.bind(this);
        this.choseDistrictClick = this.choseDistrictClick.bind(this);
        this.choseWardClick = this.choseWardClick.bind(this);
        this.showAutocompleteModal = this.showAutocompleteModal.bind(this);
        this.parseDataToView = this.parseDataToView.bind(this);
        this.setDate = this.setDate.bind(this);
        this.showAddressModal = this.showAddressModal.bind(this);
        let user = this.props.route.params.user;
        let address = user && user.userProfile ? user.userProfile.address : null;
        console.log("Address : " + JSON.stringify(address));

        this.state = {

            user:user,
            userAddress: address,
            focus : 0,
            isUpdate: 0,
            stateCount: 0.0,
            name : user && user.userProfile ? user.userProfile.display_name : "",
            gender : user && user.userProfile ? user.userProfile.gender : 0,
            mobile: user && user.userProfile ? user.userProfile.phone : "" ,
            address : address ? address.address_detail : '',
            cities : [],
            district : [],
            ward:[],
            city_item: address ? address.city: null,
            district_item: address ? address.district : null,
            ward_item: address ? address.ward : null,
            query : '',
            choseAddress : false,
            currentAddress : 1, // 1 select city, 2 select district, 3 select ward
            nextAddress : 1, // 1 select city, 2 select district, 3 select ward
            filterAttr: 'city_name',
            filterData: [],
            showKeyboard : false,
            addressTitle: 'Tỉnh/Thành phố',
            customer_type: 0,

        };

        this.refresh = this.refresh.bind(this);
        Def.mainNavigate = this.props.navigation;
        Def.setLoader = this.refresh;
    }

    componentDidMount(){
        console.log('component did mount recall');
        Net.sendRequest(this.onGetCites,this.onGetCitesFalse,Def.URL_BASE + '/api/user/city' , Def.POST_METHOD);
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

        // setTimeout(this.showAddressModal, 500);

    }

    showAddressModal(){
        let title = this.state.currentAddress == 1 ? "Tỉnh/Thành phố" : this.state.currentAddress == 2 ? "Quận/huyện" : "Phường/Thị trấn";

        this.setState({choseAddress: true, addressTitle : title});
    }

    choseDistrictClick(){
        if(!this.state.city_item){
            this.choseCityClick();
            return;
        }

        this.setState({currentAddress:2});
        if(!this.state.district || this.state.district.length == 0){
            console.log('Chưa tồn tại District : ');
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: this.state.city_item.city_code}, this.showAutocompleteModal);
        }else {
            console.log('Isset District: ' + JSON.stringify(this.state.district));
            this.setState({ filterData: this.state.district, filterAttr: 'district_name'});
            this.showAddressModal();
        }

        // setTimeout(this.showAddressModal, 500);
    }

    choseWardClick(){
        if(!this.state.city_item){
            this.choseCityClick();
            return;
        }

        if(!this.state.district_item){
            this.choseDistrictClick();
            return;
        }

        this.setState({currentAddress:3});
        if(!this.state.ward || this.state.ward.length == 0){
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: this.state.district_item.district_code}, this.showAutocompleteModal);
        }else {
            this.setState({filterData: this.state.ward, filterAttr: 'ward_name'});
            this.showAddressModal();
        }
        // setTimeout(this.showAddressModal, 500);
    }


    closeFunction = (item) => {
        if (item) {
            if(this.state.currentAddress == 1){
               if (!this.state.city_item || (this.state.city_item.city_code !== item.city_code)){
                   this.setState({nextAddress:2, district_item : null, ward_item : null });
                   this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: item.city_code});
               }
            }

            if(this.state.currentAddress == 2){
                if (!this.state.district_item || this.state.district_item.district_code !== item.district_code){
                    this.setState({nextAddress:3 , ward_item : null});
                    this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: item.district_code});
                }
            }

            let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
            this.setState({[unit]: item, choseAddress: false});

        } else {
            this.setState({choseAddress: false})
        }
    }
    parseDataToView(){

        let user = this.props.route.params.user;
        let address = user && user.userProfile ? user.userProfile.address : null;
        console.log("Address : " + JSON.stringify(address));

        this.state = {

            user:user,
            userAddress: address,
            focus : 0,
            isUpdate: 0,
            stateCount: 0.0,
            name : user && user.userProfile ? user.userProfile.display_name : "",
            gender : user && user.userProfile ? user.userProfile.gender : 0,
            mobile: user && user.userProfile ? user.userProfile.phone : "" ,
            address : address ? address.address_detail : '',
            cities : [],
            district : [],
            ward:[],
            city_item: address ? address.city: null,
            district_item: address ? address.district : null,
            ward_item: address ? address.ward : null,
            query : '',
            choseAddress : false,
            currentAddress : 1, // 1 select city, 2 select district, 3 select ward
            nextAddress : 1, // 1 select city, 2 select district, 3 select ward
            filterAttr: 'city_name',
            filterData: [],
            showKeyboard : false,
            addressTitle: 'Tỉnh/Thành phố',
            customer_type: 0,

        };


        // this.setState({
        //     name : "",
        //     gender : 0,
        //     mobile:'',
        //     address : '',
        //     city_item: null,
        //     district_item: null,
        //     ward_item: null,
        //     stateCount: Math.random(),
        //     customer_type:0,
        // });
    }


    validate(is_create = true){
        if (is_create) {
            if (!this.state.full_name) {
                alert("Vui lòng nhập tên khách hàng");
                return false;
            } else if (!this.state.mobile) {
                alert("Vui lòng điền số điện thoại");
                return false;
            } else if (!this.state.gender) {
                alert("Vui lòng nhập thông tin giới tính");
                return false;
            }
        }
    }

    validateAddress(){

        let err = 0;
        if(!this.state.address) {
            if (!this.state.city_item) {
                err = 1;
            }

            if (!this.state.district_item) {
                err = 2;
            }

            if (!this.state.ward_item) {
                err = 3;
            }
        }
        return err;
    }


    buildAddress(){
        // let address = Def.getAddressFromUserInfo();
        if (this.state.address || this.state.city_item){
            let submitAddress = {};
            submitAddress.id = this.state.userAddress ? this.state.userAddress.id :"";
            submitAddress.address_detail = this.state.address;
            submitAddress.city_code = this.state.city_item ? this.state.city_item.city_code : "";
            submitAddress.district_code = this.state.district_item ? this.state.district_item.district_code : "";
            submitAddress.ward_code = this.state.ward_item ? this.state.ward_item.ward_code : "";
            return submitAddress;
        }
        return "";
    }


    saveCustomer() {
        const {navigation} = this.props;
        console.log('Update user info');
        if (!this.state.name) {
            alert("Vui lòng cập nhật tên khách hàng");
            return false;
        } else if (!this.state.mobile) {
            alert("Vui lòng điền số điện thoại");
        }
        let err = this.validateAddress();
        if(err != 0) {
            console.log('Err : ' + err);
            alert("Vui lòng nhập thông tin địa chỉ");
            return false;

        }
        let customerInfo = {
            id:"" ,
            user_id: this.state.user ? this.state.user.id : "",
            create_by : Def.user_info ? Def.user_info['id'] : 14,
            name: this.state.name,
            mobile: this.state.mobile,
            address: JSON.stringify(this.buildAddress()),
            gender: this.state.gender == "1" ? 1 :0,
            customer_type:this.state.customer_type == "1" ? 1: 0,
            partner_id:  Def.user_info['id'],
        };
        // console.log('Customer Info: ' + JSON.stringify(customerInfo));

        CustomerController.saveCustomer(customerInfo, navigation, this.saveCustomerSuccess, this.saveCustomerFalse);

        Def.setLoader = this.refresh.bind(this);
        // }
    }

    saveCustomerSuccess(customer){
        console.log("Customer Info : " + JSON.stringify(customer));
        if(customer['result'] != 1 ){
            alert(customer['msg']);
            return ;
        }

        customer = customer['customer'];

        if(Def.currentOrder){
            Def.currentOrder['customer'] = customer;
            Def.currentOrder.address = customer.address;
        }
        Def.currentCustomer = customer;

        if(customer.user_id && customer.user_id ==  Def.user_info.id){
            Def.user_info.customer = customer;
            AsyncStorage.setItem('user_info', JSON.stringify(Def.user_info));
        }

        if(Def.user_info.customer){
            console.log('Customer info exits');
        }
        let findCus = Def.customer.findIndex(element => element.id == customer.id);
        if(findCus){
            Def.customer[findCus] = customer;
        }else  {
            Def.customer.push(customer);
        }
        Def.isUpdating = true;
        this.props.navigation.navigate('Booking', {screen: 'booking', params : {order:Def.currentOrder}});
        console.log("Navigate to Booking");
    }

    saveCustomerFalse(data){
        console.log("Customer save false: " + JSON.stringify(data));
    }

    showDateTimePicker = (attr = null) => {
        let showDateVisible =     attr == 'birth_day' ? 'isDateTimePickerVisible' : 'isDateTimePickerVisibleIssueOn';

        this.setState({ [showDateVisible]: true , selectedDate : this.state[attr] ? this.state[attr] : new Date() , dateAttribute : attr });
    };

    hideDateTimePicker = () => {
        let showDateVisible =     this.state.dateAttribute == 'birth_day' ? 'isDateTimePickerVisible' : 'isDateTimePickerVisibleIssueOn';
        this.setState({  [showDateVisible] : false });
    };

    setDate(){
        let dateAttr = this.state.dateAttribute;
        this.setState({  selectedDate : this.state[dateAttr], isDateTimePickerVisible: false})
    }


    handleDatePicked = date => {
        let dateAttr = this.state.dateAttribute;
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
        this.setState({[dateAttr] : date });
    };

    refresh()
    {
        this.parseDataToView();

        // this.setState({ stateCount: Math.random() });
    }

    shouldComponentUpdate(){
        const index = Def.REFESH_SCREEN.indexOf('update-partner-screen');

        if (index > -1 || (this.props.route && this.props.route.param && this.props.route.param.refresh)) {
            if(index > -1){
                Def.REFESH_SCREEN.splice(index, 1);
            }
            this.refresh();
        }

        return true;
    }

    render() {
        const {navigation} = this.props;
        const {user} = this.state;
        // const data = this.filterData(this.state.query);
        return (
            <View style={{flex:1, marginBottom : 5, backgroundColor: '#fff'}}>
                <ScrollView keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR, paddingHorizontal : 5}}>
                        <View>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Tên
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() => this.setState({focus: 0})}
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                        value={this.state.name}
                                        placeholder={'Tên khách hàng'}
                                        onChangeText={text => this.setState({name: text})}
                                    />
                                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Điện thoại
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() => this.setState({focus: 0})}
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                        value={this.state.mobile}
                                        placeholder={'Nhập số điện thoại'}
                                        onChangeText={text => this.setState({mobile: text})}
                                    />
                                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Giới Tính
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                    {/*<Dropdown/>*/}
                                    <View style={{
                                        marginRight: 10,
                                        paddingRight: 10,
                                        height: ITEM_HEIGHT,
                                        backgroundColor: '#fff',
                                        borderRadius: 5,paddingTop: 10
                                    }}>
                                        <Picker
                                            placeholder={{}}
                                            onValueChange={(itemValue, itemIndex) => {
                                                console.log("Gender change: " + itemValue);
                                                this.setState({gender: itemValue});
                                            }}
                                            style={{justifyContent:'center', alignItems:'center', paddingTop: 20, marginTop: 20}}
                                            items={[
                                                { label: 'Nam', value: '0' },
                                                { label: 'Nữ', value: '1' },

                                            ]}
                                        />
                                    </View>
                                    {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Loại khách hàng
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                        {/*<Dropdown/>*/}
                                        <View style={{
                                            marginRight: 10,
                                            paddingRight: 10,
                                            height: ITEM_HEIGHT,
                                            backgroundColor: '#fff',
                                            borderRadius: 5,paddingTop: 10
                                        }}>
                                            <RNPickerSelect
                                                placeholder={{}}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    console.log("Gender change: " + itemValue);
                                                    this.setState({customer_type: itemValue});
                                                }}
                                                style={{justifyContent:'center', alignItems:'center', paddingTop: 20, marginTop: 20}}
                                                items={[
                                                    { label: 'Chủ nhà', value: '0' },
                                                    { label: 'Kiến trúc sư', value: '1' },

                                                ]}
                                            />
                                        </View>
                                        {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

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
                </ScrollView>
                <Modal onRequestClose={() => {this.closeFunction(null)}} visible={this.state.choseAddress}  transparent={false} styles={{backgroundColor : 'green'}} >
                    {/*{this.state.choseAddress ?*/}
                    <AutocompleteModal
                        data={this.state.filterData}
                        filterAttr={this.state.filterAttr}
                        closeFunction={this.closeFunction}
                        addressTitle={this.state.addressTitle}

                    />
                </Modal>
                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}  onPress={this.saveCustomer}>

                    <Text style={styles.buttonText}>
                        Thêm mới và chọn
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
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 5, marginTop : 5, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center', paddingHorizontal : 5
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


});

export default CreateCustomerScreen;
