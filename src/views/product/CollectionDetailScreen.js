import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabbar/MyCustomizeTabBar'
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
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/24/1/main_img.jpg',
    },
    {
        id:2,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/30/2/main_img.jpg',
    }
];

let uri = "";

class CollectionDetailScreen extends React.Component {


    state = {
        // collection_data: null,
        stateCount: 0.0,
        configMenu: Def.config_collection_menu,
        slide_data : this.props.route.params.item ? this.getImageForCollection(this.props.route.params.item) : carouselItems,
        item: this.props.route.params.item,
        collection_detail_data : this.props.route.params.item["brickBox"],
        activeSlide : 0,
    };



    constructor(props){
        super(props);
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        let item = this.props.route.params.item;

        if(this.props.route.params.item.model === 'SIG.P-01') {
            uri = "https://3dplayer.house3d.net/rangdong/?file=27223000";
        } else {
            uri = "https://3dplayer.house3d.net/rangdong/?file=41712000";
        }



        console.log("Item data"+JSON.stringify(item));
        // let collectionImages = [this.props.route.params.item.image_path];
        // if(item.sub_images){
        //     let subImgs = item.sub_images.split(',');
        //     subImgs = subImgs.map(x => Def.URL_CONTENT_BASE + x);
        //     collectionImages = collectionImages.concat(subImgs);
        // }



        Def.mainNavigate = this.props.navigation;
        Def.collection_detail_data = item['brickBox'];
        Def.collection_detail_menu = this.createConfigData(Def.collection_detail_data);
        // this.setState({configMenu: Def.collection_detail_menu});
    }

    getImageForCollection(item){
        let collectionImages = [{image_path:item.image_path}];
        if(item.sub_images){
            let subImgs = item.sub_images.split(',');
            subImgs = subImgs.map(x => {
                return {image_path:Def.URL_CONTENT_BASE + x}
            });
            collectionImages = collectionImages.concat(subImgs);
        }
        console.log("Collection-Slide", JSON.stringify(collectionImages));
        return collectionImages;
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
        Def.collection_detail_data = data["data"];
        Def.collection_detail_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_collection_menu});
    }

    createConfigData(data){


        if(data){
            let configData =  Object.entries(data).map((prop, key) => {
                // console.log("Props : " + JSON.stringify(prop));
                // let reObj = {key: prop[0],name_vi:prop[1]["name"], hidden:0, data:prop[1]["product"]};
                // console.log(JSON.stringify("return-Obj" + JSON.stringify(reObj)));
                return {key: prop[0],name_vi:prop[1]["name"], hidden:0, data:prop[1]["product"]};
            });
            Object.entries(configData).map((prop, key) => {
                console.log("start" + key);
                console.log("prop[0]" + prop[0]);
                console.log("prop[1]" + prop[1]["name_vi"]);
                console.log("data" + prop[1]["data"]);
                console.log("end");
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
            <View key={index} style={Style.styles.cardStyle}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.cardImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                </TouchableOpacity>
            </View>
        );

    }


    render() {
        const {navigation} = this.props;
        const configMenu = Def.collection_detail_menu;
        return (
            <View style={{flex:1}}>
                {

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

                }

                <ScrollableTabView  renderTabBar={() => <MyCustomizeTabBar navigation={navigation} />}  >
                    {
                        configMenu && Object.entries(configMenu).map((prop, key) => {
                            if((prop[1]["hidden"]) == 0){
                                return (
                                    <CollectionTab key ={prop[0] + "acv"} displayTitle={'Sản phẩm'} type={"product"} navigation={navigation} refresh={this.refresh} tabLabel={this.formatText(prop[1]["name_vi"])} title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />
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
});

export default CollectionDetailScreen
