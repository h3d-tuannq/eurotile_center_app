import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import CollectionDetailTabScreen from './CollectionDetailTabScreen';

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
const carouselItems = [
    {
        id:1,
        image_path : 'https://eurotiledev.house3d.net/data/eurotileData/collection/202009/24/1/main_img.jpg',
    },
    {
        id:2,
        image_path : 'https://eurotiledev.house3d.net/data/eurotileData/collection/202009/30/2/main_img.jpg',
    }
];

let uri = "";

class CollectionDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        Def.mainNavigate = this.props.navigation;
        Def.collection_detail_data = this.props.route.params.item;
        Def.collection_detail_menu = this.createConfigData(Def.collection_detail_data);

        this.state = {
            // collection_data: null,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            // slide_data : this.props.route.params.item ? this.getImageForCollection(this.props.route.params.item) : carouselItems,
            item: this.props.route.params.item,
            // collection_detail_data : this.props.route.params.item["brickBox"],
            // activeSlide : 0,
        };

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
        console.log("Data : " + JSON.stringify(data));
        var configData = [];
        if(data){
            if(data.url_3d){
                configData.push({key: '3D', type:'3D' ,name_vi:"3D", hidden:0, data:{url_3d:data["url_3d"], url_ar:data["url_ar"]}});
            }
            if(data.url_vr){
                configData.push({key: 'VR', type:'VR' ,name_vi:"VR", hidden:0, data:data["url_vr"]});
            }
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
                <View style={{height:height/1.5}}>
                    {/*{*/}
                        {/*! (this.state.item.model === 'SIG.P-01' || this.props.route.params.item.model === 'SIG.P-02') ?*/}

                    {/*<View style={Style.styles.carousel}>*/}
                        {/*<Carousel*/}
                            {/*ref={(c) => { this._carousel = c; }}*/}
                            {/*// keyExtractor={(item, index) => `${item.id}--${item.index}`}*/}
                            {/*data={this.state.slide_data}*/}
                            {/*renderItem={this.renderItem}*/}
                            {/*itemWidth={width}*/}
                            {/*sliderWidth={width}*/}
                            {/*inactiveSlideOpacity={1}*/}
                            {/*inactiveSlideScale={1}*/}
                            {/*activeSlideAlignment={'start'}*/}
                            {/*loop={true}*/}
                            {/*autoplay={true}*/}
                            {/*autoplayInterval={5000}*/}
                            {/*onSnapToItem={(index) => this.setState({ activeSlide: index }) }*/}
                        {/*/>*/}
                        {/*{ this.pagination }*/}
                    {/*</View>:*/}
                            {/*<View style={styles.webView}>*/}
                                {/*<WebView*/}
                                    {/*source={{ uri: uri }}*/}
                                {/*/>*/}
                            {/*</View>*/}

                    {/*}*/}

                    <ScrollableTabView  locked={false}   tabBarPosition={"bottom"} style={{height: height/2}} renderTabBar={() => <MyCustomizeTabBar style={{borderTopWidth:1, borderTopColor : Style.GREY_TEXT_COLOR}} navigation={navigation} />}  >
                        {
                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                console.log("Props Item: " + JSON.stringify(prop));
                                if((prop[1]["hidden"]) == 0){
                                    return (
                                        <CollectionDetailTabScreen key ={prop[0] + "acv"}  type={prop['type']} name={prop['name']} navigation={navigation}  tabLabel={this.formatText(prop[1]["name_vi"])} title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />
                                    );
                                }
                            })
                        }
                    </ScrollableTabView>
                </View>
                <View style={{flex:1, justifyContent: 'space-between', marginTop :10}}>
                    <View style={{alignItems:'center', paddingVertical:8,marginBottom:2, backgroundColor:'#fff', borderColor:Style.DEFAUT_RED_COLOR, justifyContent :'center', borderBottomWidth : 2}}>
                        <Text style={Style.text_styles.titleTextNotBold}>Thông số sản phẩm</Text>
                    </View>
                    <View style={styles.productInfo}>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Tên sản phẩm: " + this.state.item.name}
                        </Text>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Mã sản phẩm: " + this.state.item.model }
                        </Text>
                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Danh mục sản phẩm: " + this.state.item.category}
                        </Text>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Tình trang: " + (this.state.item.status ? "Còn hàng" : 'Hết hàng')}
                        </Text>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Giá sản phẩm : " + (this.state.item.price)}
                        </Text>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Kích thước: 600*600*600"}
                        </Text>

                        {/*<Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>*/}
                            {/*{"Đóng hộp: 6 viên"}*/}
                        {/*</Text>*/}

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Trọng lượng: 36 kg"}
                        </Text>

                        <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                            {"Bề mặt: Sứ, in kỹ thuật số"}
                        </Text>
                        {/*<Text style={Style.text_styles.normalText}>*/}
                        {/*{"Mô tả"}*/}
                        {/*</Text>*/}
                    </View>

                    <TouchableOpacity style={styles.bookingBtn}>
                        <Text style={Style.text_styles.whiteTitleText}>
                            Đặt hàng
                        </Text>
                    </TouchableOpacity>
                </View>

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

    webView : {
        height : height * 0.4,
        backgroundColor: '#e6e6e6',
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
    productInfo : {
        paddingHorizontal : 10,
        paddingVertical:5,
    },
    bookingBtn : {
        backgroundColor: Style.DEFAUT_RED_COLOR,
        height: 60,
        justifyContent : 'center',
        alignItems: 'center',
    }
});

export default CollectionDetailScreen
