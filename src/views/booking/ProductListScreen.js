import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProgramHozList from '../../../src/com/common/ProgramHozList';

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProductItemrenderer from "../../com/item-render/ProductItemrenderer";
import ProductAutocomplete from "../../com/common/ProductAutocomplete";

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const type = 'product';

class ProductListScreen extends React.Component {

    constructor(props){
        super(props);
        this.onGetProductSuccess     = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse     = this.onGetProductFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        Def.mainNavigate = this.props.navigation;
        this.state = {
            productData: Def.product_data,
            stateCount: 0.0,
        };
        this.itemClick = this.itemClick.bind(this);
    }




    itemClick(item){
        let screen = 'product-detail';
        console.log('product list item click');
        this.props.navigation.navigate(screen, { item:item});

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

    componentDidMount(){
         if((!Def.product_data) || (Def.product_data.length == 0) ){
            NetCollection.getProductList(this.onGetProductSuccess, this.onGetProductFalse);
         }
    }

    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_collection_menu;

        const renderItem = ({ item }) => (
            <ProductItemrenderer click={this.itemClick} type={"product"} item={item} favorite={true} styleImage={{width:PROGRAM_IMAGE_WIDTH -2, height:PROGRAM_IMAGE_HEIGHT-5, marginRight:6, marginBottom : 5 }} />
        );

        console.log("product Data" + this.state.productData.length);

        return (
            <View style={{flex:1}}>
                {/*<View style={{marginTop :8, flex:1, alignItems: 'center'}}>*/}
                    <ProductAutocomplete
                        data={this.state.productData}
                        filterAttr={'model'}
                        itemClick={this.itemClick}
                        title={"Sản phẩm"}
                    />

                    {/*<FlatList*/}
                        {/*data={this.state.productData}*/}
                        {/*renderItem={renderItem}*/}
                        {/*keyExtractor={item => item.id}*/}
                        {/*showsHorizontalScrollIndicator={false}*/}
                        {/*numColumns={2}*/}
                    {/*/>*/}


                {/*</View>*/}

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
});

export default ProductListScreen;
