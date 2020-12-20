import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProductTabScreen from  './ProductTabScreen'

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

class ProductDetailScreen extends React.Component {


    state = {
        // collection_data: null,
        stateCount: 0.0,
        configMenu: Def.config_collection_menu,
        slide_data : this.getImageForCollection(this.props.route.params.item),
        item:this.props.route.params.item,
        activeSlide:0,
    };

    constructor(props){
        super(props);
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        Def.product_detail_data = this.props.route.params.item;
        Def.product_detail_menu = this.createConfigData(Def.product_detail_data);

        this.state = {
            // collection_data: null,
            stateCount: 0.0,
            configMenu: Def.product_detail_menu,
            slide_data : this.getImageForCollection(this.props.route.params.item),
            item:this.props.route.params.item,
            activeSlide:0,
        };

        // this.setState({ activeSlide: 0});

        Def.mainNavigate = this.props.navigation;

        // if(!Def.collection_data) {
        //     NetCollection.listCollection(this.onGetCollectionSuccess, this.onGetCollectionFalse);
        // }
        // else if (!Def.config_collection_menu) {
        //     Def.config_collection_menu = this.createConfigData(Def.collection_data);
        //     this.setState({configMenu: Def.config_news_menu});
        // }

    }
    getImageForCollection(item){
        let collectionImages;
        if(item.faces){
            let subImgs = item.faces.split(',');
            subImgs = subImgs.map(x => {
                return {image_path:Def.VIETCRAFT_URL_CONTENT_BASE + x}
            });
            collectionImages = subImgs;
        }

        console.log("Slide Product data : " + JSON.stringify(collectionImages) );

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
        Def.collection_data = data["data"];
        Def.config_collection_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_collection_menu});
    }

    createConfigData(data){
        console.log("Data : " + JSON.stringify(data));
        var configData = [];
        if(data){
            if(data.viewer_url){
                let viewerUrl =  Def.LIFE_STYLE_BASE + '/viewer-3d/view?id=' + data.id;
                configData.push({key: '3D', type:'3D' ,name_vi:"3D", hidden:0, data:{url_3d:viewerUrl  , url_ar:data["viewer_url"]}});
            }
            // if(data.url_vr){
            //     configData.push({key: 'VR', type:'VR' ,name_vi:"VR", hidden:0, data:data["url_vr"]});
            // }
            configData.push({key: '2D', type:'2D' ,name_vi:"2D", hidden:0, data:this.getImageForCollection(data)});


        }
        console.log('Config Menu : ' + JSON.stringify(configData));
        return configData;

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
            <View key={index} style={[styles.cardStyle, {paddingHorizontal : 5 , backgroundColor:Style.DEFAUT_BLUE_COLOR}]}>
                <TouchableOpacity >
                    <Image  style = {[styles.cardImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                    <View style = {{justifyContent:'center'}}>

                        <Text style={[{position: 'absolute',zIndex:3 , paddingHorizontal : 4 , paddingVertical:2,bottom:0, backgroundColor: Style.DEFAUT_RED_COLOR, textAlign: 'center'}, Style.text_styles.whiteTitleText]}>
                            {"face " + index}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

    }


    render() {
        const {navigation} = this.props;
        const configMenu = this.state.configMenu;

        // console.log("Slide Product data : " + JSON.stringify(this.state.slide_data) );
        return (
            <View style={{flex:1}}>
                <View style={{height:height/2+40}}>
                    <ScrollableTabView  locked={true}   tabBarPosition={"bottom"} style={{height: height/2}} renderTabBar={() => <MyCustomizeTabBar style={{borderTopWidth:1, borderTopColor : Style.GREY_TEXT_COLOR}} navigation={navigation} />}  >
                        {
                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                console.log("Props Item: " + JSON.stringify(prop));
                                if((prop[1]["hidden"]) == 0){
                                    return (
                                        <ProductTabScreen key ={prop[0] + "acv"}  type={prop['type']} name={prop['name']} navigation={navigation}  tabLabel={this.formatText(prop[1]["name_vi"])} title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />
                                    );
                                }
                            })
                        }
                    </ScrollableTabView>
                </View>

                <View style={{flex:1, justifyContent: 'space-between', marginTop :10}}>
                <View style={styles.productInfo}>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Danh mục sản phẩm"}
                    </Text>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Mã sản phẩm " + this.state.item.model }
                    </Text>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Kích thước: "}
                    </Text>

                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Vật liệu : " + this.state.item.materials}
                    </Text>

                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Mô tả : " + this.state.item.description}
                    </Text>

                    {/*<Text style={Style.text_styles.normalText}>*/}
                        {/*{"Mô tả"}*/}
                    {/*</Text>*/}
                </View>

                <TouchableOpacity style={styles.bookingBtn}>
                    <Text style={Style.text_styles.whiteTitleText}>
                        Thêm giỏ hàng
                    </Text>
                </TouchableOpacity>
                </View>

                {/*<ScrollableTabView  renderTabBar={() => <MyCustomizeTabBar navigation={navigation} />}  >*/}
                    {/*{*/}
                        {/*configMenu && Object.entries(configMenu).map((prop, key) => {*/}
                            {/*if((prop[1]["hidden"]) == 0){*/}
                                {/*return (*/}
                                    {/*<CollectionTab key ={prop[0] + "acv"}  navigation={navigation} refresh={this.refresh} tabLabel={this.formatText(prop[1]["name_vi"])} title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />*/}
                                {/*);*/}
                            {/*}*/}
                        {/*})*/}
                    {/*}*/}
                {/*</ScrollableTabView>*/}
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
        width: width,
        height: width * 0.8,


    },
    programListStyle : {

    },
    productInfo : {
        paddingHorizontal : 10,
        paddingVertical:5,
    },

    cardImg: {
        width: width,
        paddingVertical :5,
        height: width * 0.8,
        borderRadius : 5,
        paddingHorizontal:2,
        borderWidth: 1,
        borderColor : Style.DEFAUT_BLUE_COLOR
    },

    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    bookingBtn : {
        backgroundColor: Style.DEFAUT_RED_COLOR,
        height: 60,
        justifyContent : 'center',
        alignItems: 'center',
    }

});

export default ProductDetailScreen;
