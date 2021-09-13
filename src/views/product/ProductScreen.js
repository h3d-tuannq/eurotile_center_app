import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProgramHozList from '../../../src/com/common/ProgramHozList';

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProgramVerList from "../../com/common/ProgramVerList";
import ProductItemRenderer from '../../../src/com/item-render/ProductItemrenderer'
import Icon from 'react-native-vector-icons/FontAwesome';

const PROGRAM_IMAGE_WIDTH = (width - 20) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 20) /2;
const carouselItems = [
    {
        id:1,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/24/1/main_img.jpg',
    },
    {
        id:2,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/30/2/main_img.jpg',
    }
];

const ITEM_HEIGHT = 38;
import AsyncStorage from "@react-native-community/async-storage";

class ProductScreen extends React.Component {
    criteria = {};
    constructor(props){
        super(props);
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        Def.mainNavigate = this.props.navigation;
        if(!Def.collection_data) {
            NetCollection.listCollection(this.onGetCollectionSuccess, this.onGetCollectionFalse);
        }
        else if (!Def.config_collection_menu) {
            Def.config_collection_menu = this.createConfigData(Def.collection_data);
            // this.setState({configMenu: Def.config_news_menu});
        }

        console.log("UserInfo Permission: " + Def.checkPartnerPermission());
        this.getOrderNumber = this.getOrderNumber.bind(this);

        let currentCart = this.props.route.params && this.props.route.params.currentCart ? this.props.route.params.currentCart : Def.currentCart;

        this.state = {
            collection_data: null,
            stateCount: 0.0,
            currentCart: currentCart,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0,
            isRefresh: false,
            productData: Def.product_data,
            orderItems: currentCart ? currentCart.orderItems : [],
            choseProduct: false,
            canOrder : false,
            name:'',

        };
        this.itemClick = this.itemClick.bind(this);
        this.renderProductItem = this.renderProductItem.bind(this);
        this.onGetProductSuccess = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse = this.onGetProductFalse.bind(this);
        this.createOrderItemInfo = this.createOrderItemInfo.bind(this);

        this.filterDataByCondition = this.filterDataByCondition.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
        this.filterFunc = this.filterFunc.bind(this);
        this.resetCriteria = this.resetCriteria.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
    }

    searchButtonClick = () => {
        this.criteria['name'] = this.state.name;
        this.filterDataByCondition();
    }

    filterDataByCondition = () => {
        this.criteria['name'] = this.state.name;
        console.log('Run Filter Criteria : ' + JSON.stringify(this.criteria));
        let dataFilter =  Def.product_data.filter(this.filterFunc);
        console.log('Filter-Data : ' + dataFilter.length);
        this.setState({productData:dataFilter});
    }

    filterFunc = (item) => {
        let rs = true;
        if(this.criteria.building){
            rs = item.building_id == this.criteria.building.id;
        }
        if(rs && this.criteria.customer){
            rs = item.customer_code == this.criteria.customer.code;
        }

        if(rs && this.criteria.status){
            rs = item.status == this.criteria.status['id'];
        }
        if(rs && this.criteria.deliverDate){
            // console.log('Item : ' + JSON.stringify(item.deliverDate));
            rs = item.deliver_date && Def.compairDate(item.deliver_date * 1000, this.criteria.deliverDate, Def.COMPARE_DATE);
        }
        if(rs && this.criteria.name && this.criteria.name.length > 0){
            const regex = new RegExp(`${this.criteria.name.trim()}`, 'i');
            rs = item.model.search(regex) >= 0;
        }
        return rs;
    }

    resetCriteria = () => {
        this.setState({building: null, customer:null, name: "", deliverDate: null});
        this.criteria = {};
    }

    createOrderItemInfo(){
        let order = this.state.order;
        var orderItemInfo = order.orderItems.map((item) => {
            return {product_id: item.product.id, amount: item.amount, price: Def.getPriceByRole(item.product, Def.getUserRole())};
        });
        return orderItemInfo;

    }

    componentDidMount(){
        if(!this.state.productData || Def.product_data.length < 1){
            NetCollection.getProductList(this.onGetProductSuccess, this.onGetProductFalse);
        } else {
        }

        if(Def.currentCart && Def.currentCart.orderItems) {
            this.getOrderNumber();

        } else {
            AsyncStorage.getItem('current_cart').then((value) => {
                if(value){
                    Def.currentCart = JSON.parse(value);
                    this.getOrderNumber();
                }
            });
        }

        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;

        if(navigation){
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        }

    }

    componentWillUnmount() {
        // Remove the event listener
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
            this.focusListener.remove();
        }

    }

    forcusFunction = () => {
        this.setState({orderItems : Def.currentCart && Def.currentCart.orderItems ? Def.currentCart.orderItems :  []});
    };

    getOrderNumber(){
        if(Def.calCartOrderNumber(Def.currentCart.orderItems)){
            let numerOrder = Def.calCartOrderNumber(Def.currentCart.orderItems);
            if(Def.updateCartNumber)
            {
                Def.updateCartNumber(Def.calCartOrderNumber(Def.currentCart.orderItems));
            }

        }
    }

    onGetProductSuccess(data){
        Def.product_data = data["data"];
        this.setState({productData: Def.product_data,});
    }


    onGetProductFalse(data){
        console.log(" False data : " + data);
    }


    refresh()
    {
        //NetChannel.listChannel(this.onChannelSuccess,this.onChannelFailed);
        this.setState({ stateCount: Math.random() });
    }

    onRefresh = () => {
        console.log("Refresh!");
        this.setState({isRefresh:true});
        NetCollection.listCollection(this.onGetCollectionSuccess, this.onGetCollectionFalse);
    }

    onGetCollectionSuccess(data){
        Object.entries(data["data"]).map((prop, key) => {
        });
        this.setState({ collection_data: data["data"] , isRefresh : false});
        Def.collection_data = data["data"];
        Def.config_collection_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_collection_menu});
    }

    createConfigData(data){
        if(data){
            let configData =  Object.entries(data).map((prop, key) => {
                return {key: prop[0],name_vi:prop[1]["name_vi"], hidden:0, data:prop[1]["data"]};
            });
            return configData;
        }

    }

    onGetCollectionFalse(data){
        console.log("false data : " + data);
        this.setState({isRefresh: false});
    }


    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    getNewDataByConfigKey(key){

    }

    get pagination () {
        const { slide_data, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={slide_data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position:'absolute',top : 5, right : slide_data.length  * 5, width : slide_data.length  * 5,  paddingVertical: 5  }}
                dotContainerStyle={{marginHorizontal : 6,}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    borderWidth : 1,
                    backgroundColor : 'rgba(179, 179, 179, 0.92)',
                }}
                inactiveDotStyle={{

                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
    renderItem = ({item, index}) => {

        return (
            <View key={index} style={Style.styles.schemeCardStyle}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.schemeSlideImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                </TouchableOpacity>
            </View>
        );

    }

    itemClick = (item) => {
        let orderItems = this.state.orderItems;
        let currentCart = this.state.currentCart;
        if(!Array.isArray(orderItems)) {
            console.log('Order item is not array ');
            orderItems = [];
        }
        const found = orderItems.findIndex(element => element.product.id == item.id);
        if(found !== -1){
            orderItems[found].amount++;
            orderItems[found].selectValue = true;
        } else {
            let orderItem = {
                product:item,
                selectValue: true,
                amount:1,
                area:item['brickBoxInfo']['total_area'],
                saleArea:item['brickBoxInfo']['total_area']
            }
            orderItems.push(orderItem);
        }
        let newCartData = [];
        if(!currentCart || currentCart.length < 1) {
            currentCart = {
                orderItems: []
            };
        }
        currentCart.orderItems = orderItems;
        this.setState({orderItems: orderItems, cart:currentCart});
        Def.currentCart = currentCart;
        if(Def.updateCartNumber){
            Def.updateCartNumber(Def.calCartOrderNumber(orderItems));
        }
        AsyncStorage.setItem('current_cart', JSON.stringify(Def.currentCart));
    }

     renderProductItem = ({ item }) => (
        <ProductItemRenderer  type={"product"} click={this.itemClick}
                              item={item} favorite={true} styleImage={{width:PROGRAM_IMAGE_WIDTH -2, height:PROGRAM_IMAGE_HEIGHT-5, marginRight:6, marginBottom : 5 }} />
    );
    render() {

        const ListHeader = () => (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'flex-start'}}>
                    <View style={{marginLeft:5, paddingBottom:5}}>
                        <Text style={styles.titleStyle}>{ (this.state.productData ? this.state.productData.length : 0 )+ " Sản phẩm"}</Text>
                    </View>
                </View>
            </View>
        );

        return (
            <View style={{ backgroundColor:'#fff', paddingHorizontal:10}}>
                <View style={{ width : width -20, borderWidth : 0, height:ITEM_HEIGHT + 10 ,borderBottomWidth:1 ,borderColor:Style.GREY_BACKGROUND_COLOR, flexDirection : 'row',alignItems : 'center', marginTop : 0, marginBottom : 5,}}>
                    <TextInput value={this.state.name} onChangeText={text => this.setState({ name : text })} placeholder={"Nhập mã sản phẩm"} style={[styles.textInput, {backgroundColor:'#fff',marginTop:5, width: width -70, paddingHorizontal:10}]}>
                    </TextInput>
                    <TouchableOpacity onPress={this.searchButtonClick} style={{paddingLeft:5,paddingRight:0, paddingVertical:5 ,  }} >
                        <Icon style={styles.searchIcon} name="search" size={27} color={Style.GREY_TEXT_COLOR}/>
                    </TouchableOpacity>
                </View>

                <ProgramVerList
                data={this.state.productData}
                navigation={this.props.navigation}
                renderFunction={this.renderProductItem}
                styleList={{height: height - Style.HEADER_HEIGHT - ITEM_HEIGHT - 50}}
                header={ListHeader}
                numberColumns={2}
                type={'design'}
                stack={'scheme'}
                screen={'detail-design'}

            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    programListStyle : {

    },
});

export default ProductScreen;
