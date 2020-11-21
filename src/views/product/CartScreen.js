import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList, KeyboardAvoidingView} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProductItemrenderer from "../../com/item-render/ProductItemrenderer";
import OrderItemrenderer from "../../com/item-render/OrderItemrenderer";

import ProductAutocomplete from "../../com/common/ProductAutocomplete";

import Box from "../../../assets/icons/box.svg";
import Style from "../../def/Style";

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const type = 'product';
import Modal from 'react-native-modal';
import TermScreen from "../../com/common/TermScreen";

class CartScreen extends React.Component {

    constructor(props){
        super(props);
        this.onGetProductSuccess     = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse     = this.onGetProductFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.closeFunction = this.closeFunction.bind(this);
        this.booking = this.booking.bind(this);
        this.orderItemChange = this.orderItemChange.bind(this);

        Def.mainNavigate = this.props.navigation;
        this.state = {
            cart_data: Def.cart_data,
            stateCount: 0.0,
            productData:Def.product_data ? Def.product_data: [],
            choseProduct: false,
            canOrder : this.checkCanOrder()
        };
        this.itemClick = this.itemClick.bind(this);
        this.orderItemClick = this.orderItemClick.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
    }



    orderItemClick = (item) => {
        console.log('OrderItem Click');
    }

    booking(){
        // console.log("Booking Data : " + JSON.stringify(Def.cart_data));
        console.log("Goto booking")
        this.props.navigation.navigate('Product', {screen:'select-customer'});

    }
    // callback when item change
    orderItemChange = (item) => {
        const found = Def.cart_data.findIndex(element => element.product.id == item.product.id);
        if(found !== -1){
            Def.cart_data[found].quantity = item.quantity;
            Def.cart_data[found].selectValue = item.selectValue;
        }
        this.setState({canOrder:this.updateCartOrder()});
    }



    itemClick(item){
        const found = Def.cart_data.findIndex(element => element.product.id == item.id);
        if(found !== -1){
            // let foundObj = Def.cart_data[found];
            // let newOrderItem = {
            //     product:foundObj.product,
            //     selectValue: foundObj.selectValue,
            //     quantity:foundObj.quantity + 1,
            //     area:item['brickBoxInfo']['total_area'],
            //     saleArea:item['brickBoxInfo']['total_area']
            // }
            // // Def.cart_data[found] = newOrderItem;
            // Def.cart_data.splice(found, 1);
            // Def.cart_data.push(newOrderItem);
            Def.cart_data[found].quantity++;
            Def.cart_data[found].selectValue = true;

            // console.log("Quantity item found : " + Def.cart_data[found].quantity);
            // this.forceUpdate();

        } else {
            let orderItem = {
                product:item,
                selectValue: true,
                quantity:1,
                area:item['brickBoxInfo']['total_area'],
                saleArea:item['brickBoxInfo']['total_area']
            }

            Def.cart_data.push(orderItem);
        }

        let newCartData = [];

        // Def.cart_data.forEach(function(item){
        //     newCartData.push(item)
        // });

        this.setState({cart_data: Def.cart_data, choseProduct:false, canOrder: this.checkCanOrder()});
        this.forceUpdate();

        // console.log("CartData : " + JSON.stringify(this.state.cart_data))

        // this.closeFunction(null);

    }

    addItemToCart(item){

    }

    updateCartOrder(){

    }

    checkCanOrder(){
       return Def.cart_data.findIndex(element => element.selectValue === true) ;
    }

    refresh()
    {
        this.setState({ stateCount: Math.random() });
    }

    onGetProductSuccess(data){
        this.setState({ productData: data["data"] });
        Def.product_data = data["data"];
    }

    createConfigData(data){
        if(data){
            let configData =  Object.entries(data).map((prop, key) => {
                // console.log("Props : " + JSON.stringify(prop));
                return {key: prop[0],name_vi:prop[1]["name_vi"], hidden:0, data:prop[1]["data"]};
            });
            return configData;
        }
    }

    onGetProductFalse(data){
        console.log("false data : " + data);
    }

    formatText(text){
        let rs = text;
        if(text && text.length > 10){
            rs = text.substring(0, 20) ;
        }
        return rs;
    }

    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    getNewDataByConfigKey(key){

    }

    closeFunction = (item) => {
       console.log('Back click');
       this.setState({choseProduct: false})
    }

    componentDidMount(){
         if((!this.state.productData) || (this.state.productData.length == 0) ){
            NetCollection.getProductList(this.onGetProductSuccess, this.onGetProductFalse);
         }
    }

    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_collection_menu;

        const renderItem = ({ item }) => (
            <ProductItemrenderer click={this.itemClick} type={"product"} item={item} favorite={true} styleImage={{width:PROGRAM_IMAGE_WIDTH -2, height:PROGRAM_IMAGE_HEIGHT-5, marginRight:6, marginBottom : 5 }} />
        );

        const renderOrderItem = ({item}) => (
            <OrderItemrenderer type={"order-item"} item={item} itemChange={this.orderItemChange} click={this.orderItemClick}  styleImage={{width:PROGRAM_IMAGE_WIDTH-5, height:PROGRAM_IMAGE_HEIGHT-5 }} />
        );

        return (
            <View style={{flex:1}}>
                {
                    (this.state.cart_data && this.state.cart_data.length > 0) ? <FlatList
                        data={this.state.cart_data}
                        renderItem={renderOrderItem}
                        keyExtractor={item => item.product.id +"-" + item.quantity}
                        showsHorizontalScrollIndicator={false}
                    /> :
                    <View style={{height:300, justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{marginTop:20, justifyContent:'center', alignItems:'center'}}>
                            <Box style={{width:300, height:300}}/>
                            <Text style={{fontSize: Style.MIDLE_SIZE, color: Style.GREY_TEXT_COLOR}} >
                                Bạn chưa chọn sản phẩm!
                            </Text>
                        </View>

                    </View>

                }
                <View style={{alignItems:'center', justifyContent: 'space-around', marginBottom :10, flexDirection:'row', }}>
                    <TouchableOpacity enabled={true} onPress={() => {
                        this.booking();
                    }}
                        style={{width: width / 2.5, height:50, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent : 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}>
                            Đặt hàng
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.setState({choseProduct:true});
                    }} style={{width: width/2.5, height:50, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent : 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}>
                            Chọn sản phẩm
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal  onBackButtonPress={this.closeFunction} isVisible={this.state.choseProduct} avoidKeyboard={false}    style={styles.modalView}
                        keyboardShouldPersistTaps={true}
                >
                    <KeyboardAvoidingView enabled  behavior={Platform.OS === "android" ? undefined : "position"}>
                        <View  style={{flex:1}} scrollEnabled={false} keyboardShouldPersistTaps="handled">
                    <ProductAutocomplete
                        data={this.state.productData}
                        filterAttr={'model'}
                        itemClick={this.itemClick}
                        title={"Sản phẩm"}
                    />
                        </View>
                    </KeyboardAvoidingView>
                    {/*<Text>*/}
                        {/*this is Modal*/}
                    {/*</Text>*/}
                </Modal>

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
    modalView: {
        // margin: 20,
        // width:width,
        margin : 0,
        // backgroundColor: 'red',
        borderRadius: 20,
        alignItems: "center",
        // justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        // elevation: 50,
        // height:height,
        zIndex:10,
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default CartScreen;
