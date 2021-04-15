import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, RefreshControl} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProgramHozList from '../../../src/com/common/ProgramHozList';

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProgramVerList from "../../com/common/ProgramVerList";
import ProductItemRenderer from '../../../src/com/item-render/ProductItemrenderer'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
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

class ProductScreen extends React.Component {
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
        };
        this.itemClick = this.itemClick.bind(this);
        this.renderProductItem = this.renderProductItem.bind(this);
        this.onGetProductSuccess = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse = this.onGetProductFalse.bind(this);
        this.createOrderItemInfo = this.createOrderItemInfo.bind(this);
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
            console.log("Leng Data : " + Def.product_data.length);
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
        // console.log(Object.entries(data["data"]));
        console.log('Get Collection');
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

        console.log("Item click ");
        let orderItems = this.state.orderItems;
        let currentCart = this.state.currentCart;
        if(!Array.isArray(orderItems)) {
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
        currentCart.orderItems = orderItems;
        this.setState({orderItems: orderItems, cart:currentCart});
        // AsyncStorage.setItem('cart_data', JSON.stringify(Def.cart_data));
    }

     renderProductItem = ({ item }) => (
        <ProductItemRenderer  type={"product"} click={this.itemClick}
                              item={item} favorite={true} styleImage={{width:PROGRAM_IMAGE_WIDTH -2, height:PROGRAM_IMAGE_HEIGHT-5, marginRight:6, marginBottom : 5 }} />
    );


    render() {

        return (
            <View style={{ backgroundColor:'#fff', alignItems:'center'}}>
                <ProgramVerList
                data={this.state.productData}
                navigation={this.props.navigation}
                renderFunction={this.renderProductItem}
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
