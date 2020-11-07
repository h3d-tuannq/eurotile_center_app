import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  './tabbar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const carouselItems = [
    {
        id:1,
        image_path : 'https://bizweb.dktcdn.net/100/125/230/themes/698647/assets/slider_3.png?1603763113314',
    },
    {
        id:2,
        image_path : 'https://bizweb.dktcdn.net/100/125/230/themes/698647/assets/slider_2.png?1603763113314',
    }
];

const demoData = {
    'gach-op-lat' : {
        "name_vi" : "Gạch Ốp Lát",
        "data" : [
            {
                "id": 1,
                "name": "6071",
                "model": "6071",
                "status": 1,
                "image_path": "../../../assets/data/6071.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Gạch Ốp Lát 6071",
                "version": null,
                "sort": 1,
                "category": "Gạch Ốp Lát",

            },
            {
                "id": 2,
                "name": "6073",
                "model": "6073",
                "status": 1,
                "image_path": "../../../assets/data/6073.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Gạch Ốp Lát 6073",
                "version": null,
                "sort": 2,
                "category": "Gạch Ốp Lát",

            },
            {
                "id": 3,
                "name": "8063",
                "model": "8063",
                "status": 1,
                "image_path": "../../../assets/data/8063.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Gạch Ốp Lát 8063",
                "version": null,
                "sort": 1,
                "category": "Gạch Ốp Lát",

            },
            {
                "id": 4,
                "name": "8064",
                "model": "8064",
                "status": 1,
                "image_path": "../../../assets/data/8064.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Gạch Ốp Lát 8064",
                "version": null,
                "sort": 1,
                "category": "Gạch Ốp Lát",

            },
        ]
    },
    'tbvs' : {
        "name_vi" : "TBVS",
        "data" : [
            {
                "id": 11,
                "name": "Vòi chậu 01",
                "model": "voichau_01",
                "status": 1,
                "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Vòi chậu 01",
                "version": null,
                "sort": 1,
                "category": "TBVS",

            },
            {
                "id": 12,
                "name": "3229B-WT",
                "model": "3229B-WT",
                "status": 1,
                "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Thiết bị vệ sinh",
                "version": null,
                "sort": 2,
                "category": "TBVS",

            },
            {
                "id": 13,
                "name": "WP-2025",
                "model": "WP-2025",
                "status": 1,
                "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Thiết bị VS",
                "version": null,
                "sort": 1,
                "category": "TBVS",

            },
            {
                "id": 4,
                "name": "WP-F525.1H",
                "model": "WP-F525.1H",
                "status": 1,
                "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Thiết bị VS",
                "version": null,
                "sort": 1,
                "category": "TBVS",

            },
        ]
    },
    'Grohe' : {
        "name_vi" : "Grohe",
        "data" : [
            {
                "id": 20,
                "name": "Talis Hansgrohe – 71403000",
                "model": "71403000",
                "status": 1,
                "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/71403000-p.jpg?v=1558672167797",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Bộ trộn sen tắm nóng lạnh Talis Hansgrohe – 71403000",
                "version": null,
                "sort": 1,
                "category": "Grohe",

            },
            {
                "id": 21,
                "name": "Rainfinity - 26844000",
                "model": "26844000",
                "status": 1,
                "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/37-hpr01954-tif.jpg?v=1590825422163",
                "sub_images": "collection/202010/03/19/collection0.jpg",
                "description": "Bộ trộn Rainfinity - 26844000",
                "version": null,
                "sort": 2,
                "category": "TBVS",

            },

        ]
    }
};

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        Def.config_collection_menu = null;
        Def.collection_data = Def.demoData;

        // if(!Def.collection_data) {
        //     NetCollection.listCollection(this.onGetCollectionSuccess, this.onGetCollectionFalse);
        // }
        if (!Def.config_collection_menu) {
            Def.config_collection_menu = this.createConfigData(Def.collection_data);
            // this.setState({configMenu: Def.config_news_menu});
        }
        this.state = {
            collection_data: Def.demoData,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0
        };
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        Def.mainNavigate = this.props.navigation;


    }

    refresh()
    {
        //NetChannel.listChannel(this.onChannelSuccess,this.onChannelFailed);
        this.setState({ stateCount: Math.random() });
    }

    onGetCollectionSuccess(data){
        // console.log(Object.entries(data["data"]));
        Object.entries(data["data"]).map((prop, key) => {
            // console.log('Start');
            // console.log(prop[0]);
            // console.log(prop[1]["data"]);
            // console.log('Start');
        });
        this.setState({ collection_data: data["data"] });
        Def.collection_data = data["data"];
        Def.config_collection_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_collection_menu});
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

    onGetCollectionFalse(data){
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

    get pagination () {
        const { slide_data, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={slide_data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position:'absolute',top : 5, right : slide_data.length  * 5 , width : slide_data.length  * 5,  paddingVertical: 5  }}
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
            <View key={index} style={Style.styles.cardStyle}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.cardImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                </TouchableOpacity>
            </View>
        );

    }


    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_collection_menu;
        return (
            <View style={{flex:1}}>
                <View style={Style.styles.carousel}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                        data={this.state.slide_data}
                        renderItem={this.renderItem}
                        itemWidth={width}
                        sliderWidth={width}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        activeSlideAlignment={'start'}
                        loop={true}
                        autoplay={true}
                        autoplayInterval={5000}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                    { this.pagination }
                </View>

                <View style={{alignItems:'center', paddingVertical:8,marginBottom:2, backgroundColor:'#fff', borderColor:Style.DEFAUT_RED_COLOR, justifyContent :'center', borderBottomWidth : 2}}>
                    <Text style={Style.text_styles.titleTextNotBold}>Sản phẩm nổi bật</Text>
                </View>

                <ScrollableTabView  renderTabBar={() => <MyCustomizeTabBar navigation={navigation} />}  >
                    {
                        configMenu && Object.entries(configMenu).map((prop, key) => {
                            if((prop[1]["hidden"]) == 0){
                                return (
                                    <CollectionTab key ={prop[0] + "acv"}  navigation={navigation} refresh={this.refresh} tabLabel={this.formatText(prop[1]["name_vi"])} title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />
                                );
                            }
                        })
                    }
                </ScrollableTabView>
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

export default HomeScreen;
