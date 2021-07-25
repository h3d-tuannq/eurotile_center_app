import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Style from '../../def/Style';
import ProductItemrenderer from "../../com/item-render/ProductItemrenderer";
import ProductAutocomplete from "../../com/common/ProductAutocomplete";
import NetNews from "../../net/NetNews";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MyCustomizeTabBar from "../../com/common/tabbar/MyCustomizeTabBar";
import NewsTab from "../news/NewsTab";
import ProductTab from "./ProductTab";
import AsyncStorage from "@react-native-community/async-storage";

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const type = 'product';

class ProductByTagScreen extends React.Component {

    constructor(props){
        super(props);
        this.onGetProductSuccess     = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse     = this.onGetProductFalse.bind(this);
        this.loadDataSuccess = this.loadDataSuccess.bind(this);
        this.refresh     = this.refresh.bind(this);
        let tagInfo = this.props.route.params.item;
        Def.mainNavigate = this.props.navigation;

        this.state = {
            productByData: Def.product_tree_data && Def.product_tree_data[tagInfo.id],
            stateCount: 0.0,
            tag: tagInfo,
            configMenu: Def.config_menus[tagInfo.id],
        };
        this.createConfigData = this.createConfigData.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }




    itemClick(item){
        let screen = 'product-detail';
        console.log('product list item click');
        this.props.navigation.navigate(screen, { item:item});

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

    refresh()
    {
        this.setState({ stateCount: Math.random() });
    }

    onGetProductSuccess = async (data) => {
        Def.product_tree_data[this.state.tag.id] = data["data"];
        await AsyncStorage.setItem('product_tree_data', JSON.stringify(Def.product_tree_data));
        Def.config_menus[this.state.tag.id] = this.createConfigData(Def.product_tree_data[this.state.tag.id]);
        console.log('Config Menu : ' + JSON.stringify(Def.config_menus[this.state.tag.id]));
        this.setState({ productData: Def.product_tree_data[this.state.tag.id] , configMenu: Def.config_menus[this.state.tag.id] });

    }


    onGetProductFalse(data){
        console.log("false data : " + data);
    }

    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    getNewDataByConfigKey(key){

    }

    loadDataSuccess = () => {

    }

    async componentDidMount(){
        let tagInfo = this.state.tag;
        if(!Def.product_tree_data[tagInfo.id]){
            let product_tree_data_raw = await AsyncStorage.getItem('product_tree_data');
            if(product_tree_data_raw){
                Def.product_tree_data = JSON.parse(product_tree_data_raw);
            }
            if(Def.product_tree_data.hasOwnProperty(tagInfo.id)) {
                Def.config_menus[tagInfo.id] = this.createConfigData(Def.product_tree_data[this.state.tag.id]);
                this.setState({configMenu: Def.config_menus[tagInfo.id]});
            } else{
                NetCollection.getProductByTag(this.onGetProductSuccess, this.onGetProductFalse, this.state.tag.id);
            }

        }
        else if (!Def.config_menus[tagInfo.id]) {
            Def.config_menus[tagInfo.id] = this.createConfigData(Def.product_tree_data[this.state.tag.id]);
            this.setState({configMenu: Def.config_menus[tagInfo.id]});
        }

         // if((!Def.product_tree_data[tagInfo.id]) || (Def.product_tree_data[tagInfo.id].length == 0) ){
         //
         //    NetCollection.getProductByTag(this.onGetProductSuccess, this.onGetProductFalse, this.state.tag.id);
         // }
    }

    render() {
        const {navigation} = this.props;
        const configMenu = this.state.configMenu;

        return (
            <View style={{flex:1}}>
                {
                    configMenu ?
                        <ScrollableTabView  style={{flex:1 }}
                                            tabBarUnderlineStyle={{
                                                position: 'absolute',
                                                height: 0,
                                                bottom: 0,
                                            }}
                                            tabBarTextStyle={{ }}
                                            tabBarActiveTextColor={Style.DEFAUT_BLUE_COLOR}
                                            tabBarInactiveTextColor={Style.GREY_TEXT_COLOR}


                    renderTabBar={() => <MyCustomizeTabBar  style={{borderWidth : 0}} navigation={navigation}/>}>
                            {
                                configMenu && Object.entries(configMenu).map((prop, key) => {
                                    if ((prop[1]["hidden"]) == 0) {
                                        return (
                                            <ProductTab key={prop[0] + "acv"} navigation={navigation} refresh={this.refresh}
                                                     tabLabel={Def.formatText(prop[1]["name_vi"])} onLoadDataSuccess={this.loadDataSuccess}
                                                     title={Def.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}/>
                                        );
                                    }
                                })
                            }
                        </ScrollableTabView>
                        :
                        <View style={{justifyContent :'center', alignItems : 'center', width: width, height: height}}>
                            <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                                {'Kéo xuống thực hiện tải lại .' + this.state.tag.id}
                            </Text>
                        </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
});

export default ProductByTagScreen;
