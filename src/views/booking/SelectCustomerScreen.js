import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList, TextInput} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Style from '../../def/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomerItemRenderer from "../../com/item-render/CustomerItemrenderer";
import Autocomplete from 'react-native-autocomplete-input'
import CustomerController from '../../../src/controller/CustomerController'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const type = 'product';

class SelectCustomerScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data : Def.customer > 0 ? Def.customer : [],
            query : ""
        };
        this.itemClick = this.itemClick.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onCustomerGetSuccess = this.onCustomerGetSuccess.bind(this);
        this.onGetFalse = this.onGetFalse.bind(this);
    }

    filterData = (query) => {
        console.log("query" + query);
        const { data } = this.state;
        if (query === '' || query === null) {
            return data.length < 50 ? data: data.slice(0,50);
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(item => item['phone'].search(regex) >= 0);
    }

    onCustomerGetSuccess(data){
        Def.customer = data;
        this.setState({ data: Def.customer});
    }

    onGetFalse(data){
        console.log('Get Customer False : ' + JSON.stringify(data));
    }

    // item_click = (item) => {
    //     this.props.closeFunction(item);
    // }

    itemClick(item){
        console.log("Customer Selected: "+ JSON.stringify(item));
        if(Def.order){
            console.log("Isset Customer");
            Def.order['customer'] = item;
            // Def.order['cityItem'] = item.address.city;
            // Def.order['districtItem'] = item.address.city;
            // Def.order['wardItem'] = item.address.city;
            // Def.order['detail_address'] = item.address.address_detail ? item.address.address_detail :'';
            Def.order.address = item.address;
        }
        let order = Def.order;
        this.props.navigation.navigate('Booking', {screen: 'booking'});
        console.log("Navigate to Booking");
    }

    onEndReached(){
        console.log('End Flatlist : ');
    }

    componentDidMount(){
        if((!this.state.productData) || (this.state.productData.length == 0) ){
            CustomerController.getCustomerByCondition(this.onCustomerGetSuccess, this.onGetFalse , Def.user_info['id'] );
        }
    }


    render() {

        const filterData = this.filterData(this.state.query);
        const renderItem = ({ item }) => (
            <CustomerItemRenderer click={(item)=> {this.itemClick(item)}}  item={item} favorite={true}  />
        );

        return (
            <View style={{height: height-Style.HEADER_HEIGHT, width: width,paddingTop: 5, borderTopLeftRadius :0, borderTopRightRadius :0 , backgroundColor:'#fff', alignItems:'center', paddingBottom:20}}>
                <Autocomplete
                    data={filterData}
                    defaultValue={this.state.query}
                    keyExtractor={(item,index) => "hoz" + index}
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

                />
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
    searchIcon : {
        marginTop :10,
    },
    textInput : {height: 40, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 0, borderBottomWidth:0 ,color:'black', fontSize : Style.MIDLE_SIZE, borderRadius: 5, paddingHorizontal: 10  },
});

export default SelectCustomerScreen;
