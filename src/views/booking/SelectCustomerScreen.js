import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList, TextInput} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Style from '../../def/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomerItemRenderer from "../../com/item-render/CustomerItemrenderer";
import Autocomplete from 'react-native-autocomplete-input'
import CustomerController from '../../../src/controller/CustomerController'
// import PhoneInput from 'react-native-phone-input'
import PhoneInput from "react-native-phone-number-input";

import AddIcon from '../../../assets/icons/Plus circle.svg'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const type = 'product';

class SelectCustomerScreen extends React.Component {
    phoneInput;

    constructor(props){
        super(props);
        let order = this.props.route.params && this.props.route.params.order ? this.props.route.params.order : Def.currentOrder;
        Def.currentOrder = order;
        this.state = {
            data : this.props.params && this.props.params.customers.length > 0 ? this.props.params.customers : Def.customer,
            query : "",
            order: order,
            pickerData: null,
            valid: "",
            type: "",
            value: "032657897",
            isValid:false,
            formattedValue : null,
            displayInfo : false,
            customerInfo : null,
        };


        this.itemClick = this.itemClick.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onCustomerGetSuccess = this.onCustomerGetSuccess.bind(this);
        this.onGetFalse = this.onGetFalse.bind(this);


        this.filterData = this.filterData.bind(this);

        this.updateInfo = this.updateInfo.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.onPressFlag = this.onPressFlag.bind(this);
        this.checkCustomer = this.checkCustomer.bind(this);
        this.checkCustomerSuccess = this.checkCustomerSuccess.bind(this);
        this.checkCustomerFalse = this.checkCustomerFalse.bind(this);
    }

    filterData = (query) => {
        const { data } = this.state;
        if (query === '' || query === null) {
            return data;
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        let filterData = data.filter(item => item['phone'].search(regex)>= 0);
        // console.log("Filter Data: " + JSON.stringify(filterData));
        return filterData;

    }

    checkCustomer(){
        if (this.state.value && this.state.isValid){
            CustomerController.checkCustomerByPhone(this.checkCustomerSuccess, this.checkCustomerFalse, this.state.value);
        }

    }

    checkCustomerSuccess = (data) => {
        console.log("Check Succes" + JSON.stringify(data));
        if(data['err_code']){
            alert(data['msg']);
        } else {
            this.setState({
                customerInfo: data,
                displayInfo:true,
            });
        }
    }

    checkCustomerFalse = (data) => {
        console.log("Check customer false : " + JSON.stringify(data));
    }





    updateInfo() {
        this.setState({
            valid: this.phone.isValidNumber(),
            type: this.phone.getNumberType(),
            value: this.phone.getValue()
        });
    }

    renderInfo() {
        if (this.state.value) {
            return (
                <View style={styles.info}>
                    <Text>
                        Is Valid:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            {this.state.valid.toString()}
                        </Text>
                    </Text>
                    <Text>
                        Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
                    </Text>
                    <Text>
                        Value:{" "}
                        <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
                    </Text>
                </View>
            );
        }
    }

    onCustomerGetSuccess(data){
        console.log("Get customer success : "+ JSON.stringify(data));
        Def.customer = data;
        this.setState({ data: Def.customer});
    }

    onGetFalse(data){
        console.log('Get Customer False : ' + JSON.stringify(data));
    }

    shouldComponentUpdate(){
        console.log('Should update select Customer');
        return true;
    }

    // item_click = (item) => {
    //     this.props.closeFunction(item);
    // }

    itemClick(item){
        console.log("Customer Selected: "+ JSON.stringify(item));
        let order = null;
        if(this.state.order){
           order = this.state.order;
           Def.currentOrder = order;
        }else {
           order = Def.currentOrder;
        }
        if(order){
            order['customer'] = item;
            order.address = item.address;
        }
        this.props.navigation.navigate('Booking', {screen: 'booking', params: {order:order}});
        console.log("Navigate to Booking");
    }



    onEndReached(){
        console.log('End Flatlist : ');
    }

    componentDidMount(){
        if((!this.state.productData) || (this.state.productData.length == 0) ){
            // CustomerController.getCustomerByCondition(this.onCustomerGetSuccess, this.onGetFalse , Def.user_info['id'] );
        }
    }
    onPressFlag(){
        console.log('OnPress select phone number');
    }


    render() {

        const filterData = this.filterData(this.state.query);
        const renderItem = ({ item }) => (
            <CustomerItemRenderer click={(item)=> {this.itemClick(item)}}  item={item} favorite={true}  />
        );

        return (
            <View style={{height: height-Style.HEADER_HEIGHT, width: width,paddingTop: 5, borderTopLeftRadius :0, borderTopRightRadius :0 , backgroundColor:'#fff', alignItems:'center', paddingBottom:20}}>
                {
                    this.state.data && false ?
                    <Autocomplete
                        data={filterData}
                        defaultValue={this.state.query}
                        keyExtractor={(item,index) => "hoz" + index + item.id}
                        renderItem={renderItem}
                        renderTextInput={()=> (
                            <View style={{ width : width -20, borderWidth : 0, borderBottomWidth:1 ,borderColor:Style.GREY_BACKGROUND_COLOR, flexDirection : 'row',alignItems : 'center', marginHorizontal : 10, marginBottom : 10}}>
                                <Icon style={styles.searchIcon} name="search" size={24} color={Style.GREY_TEXT_COLOR}/>
                                <TextInput onChangeText={text => this.setState({ query : text })} placeholder={"Nhập số điện thoại"} style={[styles.textInput, {marginTop:10}]}>
                                </TextInput>
                            </View>
                        )
                        }

                        flatListProps = {{
                            alignItems : 'center',
                            onEndReached : this.onEndReached,
                            keyboardShouldPersistTaps:"handled",

                        }}

                        // keyboardShouldPersistTaps='handled'
                        inputContainerStyle={{borderWidth:0}}
                        listStyle={{borderWidth:0, marginBottom:80}}

                    /> :



                    <View style={{justifyContent :'flex-start',flex: 1, alignItems: 'center', width: width}}>
                         <View style={{flexDirection:'row', justifyContent:'space-between' ,  marginTop:10 , borderBottomWidth:1 , width: 0.9 * width,  height:50}}>
                            <PhoneInput
                                containerStyle={{marginHorizontal : 0, marginTop : 0, paddingHorizontal:0 ,borderBottomWidth:0 , width: width * 0.8 , height:48 , backgroundColor : '#fff' }}
                                textContainerStyle={{marginHorizontal : 0, marginTop : 0, paddingVertical:0 ,paddingHorizontal:0 , width: width * 0.8 , height:48 , backgroundColor : '#fff' }}
                                ref={(ref) => { this.phoneInput = ref; }}
                                defaultValue={this.state.value}
                                defaultCode="VN"
                                layout="first"
                                onChangeText={(text) => {
                                    console.log("Change text: " + text);
                                    if(text.length > 8 && this.phoneInput.isValidNumber(text)){
                                        console.log("IsValid");
                                        this.setState({value:text, isValid :true });
                                    }else {
                                        this.setState({value : text , isValid: false});
                                    }

                                }}
                                onChangeFormattedText={(text) => {
                                    this.setState({formattedValue : text});
                                }}
                                placeholder={"Nhập số điện thoại"}
                                value={this.state.value}
                                textInputProps={{
                                    maxLength:10
                                    }
                                }
                                flagButtonStyle={{width:50}}
                                disableArrowIcon={true}
                                // withDarkTheme
                                // withShadow
                                modalVisible={false}
                                countryPickerProps={{withAlphaFilter:true}}
                                // disabled={true}

                                autoFocus
                                textInputStyle={{ height:50 , backgroundColor : '#fff', width: width * 0.8}}
                                // flagButtonStyle={{width : 60, height :35}}
                                // countryPickerButtonStyle={{width:0}}

                            />
                            <TouchableOpacity disabled={!this.state.isValid} onPress={this.checkCustomer} style={{justifyContent : 'center', alignItems: 'center'}}>
                                <Icon style={styles.searchIcon} name="search" size={22} color={ this.state.isValid ? Style.DEFAUT_RED_COLOR :  Style.GREY_TEXT_COLOR}/>
                            </TouchableOpacity>

                            {/*{this.renderInfo()}*/}
                         </View>

                        { this.state.displayInfo && this.state.customerInfo?
                            <View style={styles.info}>
                                <Text style={styles.titleInfo}>{'(+84) ' + this.state.customerInfo.phone}</Text>
                                <View style={styles.groupInfo}>
                                    <Text style={styles.addressText}>{ this.state.customerInfo.name }</Text>
                                </View>
                                {
                                    this.state.customerInfo['address'] ?
                                        <View style={styles.address}>
                                            <Text style={styles.addressText}>{Def.getAddressStr(this.state.customerInfo['address'])}</Text>
                                        </View>
                                        : null
                                }
                            </View>
                            : null
                        }
                    </View>

                }
            </View>
        );
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
    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     padding: 20,
    //     paddingTop: 60
    // },
    info: {
        // width: 200,
        flex:1,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginTop: 20,
        width: width * 0.9
    },
    button: {
        marginTop: 20,
        padding: 10
    },

    titleInfo: {

    },
    groupInfo : {

    },

    addressText: {

    },
    address:{

    },


    searchIcon : {
        // marginTop :10,
    },
    textInput : {height: 40, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 0, borderBottomWidth:0 ,color:'black', fontSize : Style.MIDLE_SIZE, borderRadius: 5, paddingHorizontal: 10  },
});

export default SelectCustomerScreen;
