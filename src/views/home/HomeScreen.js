import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabbar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import NetNews from '../../net/NetNews'
import Def from '../../def/Def'
import OrderController from '../../controller/OrderController';
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import HotNewsVerItemrenderer from '../../../src/com/item-render/HotNewsVerItemrenderer'
import MyCarousel from '../../../src/com/common/MyCarousel';

import ProgramVerList from '../../com/common/ProgramVerList';
import AsyncStorage  from '@react-native-community/async-storage'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const BUTTON_WIDTH = (width - 60 ) / 3;
const BUTTON_HEIGHT = (width - 60 ) / 3;


const carouselItems = [
    {
        id:1,
        thumbnail_url : Def.URL_BASE + '/data/eurotileData/1/wuChCa3qD616OzWresrKxTKiE6OPv1j8.jpg',
        slug: "eurotile-don-kien-truc-su-trong-buoi-gap-mat-dau-xuan-tai-ha-noi",
    },
    {
        id:2,
        thumbnail_url : Def.URL_BASE + '/eurotileData/1/euHYKYXEj7WPpwH_7eaAv_4QglT5iwe1.png',
        slug: "tinh-te-hoa-chat-luong-song-de-mai-am-va-cuoc-song-diu-dang-hon",
    }
];

const centerItems = [
    {
        id:1,
        name : 'EUROTILE CENTER HÀ NỘI',
        contact: "(024)73008166",
        address: 'M03-04 Võ Chí Công, P.Xuân La, Q. Tây Hồ, Hà Nội'
    },
    {
        id:2,
        name : 'EUROTILE CENTER VINH',
        contact: "0913522308",
        address: 'Lô C1+C2, KDT Minh Khang, Đại lộ Lenin, TP. Vinh'
    },
    {
        id:3,
        name : 'EUROTILE CENTER ĐÀ NẴNG',
        contact: "(023) 6366 6899",
        address: '297 Nguyễn Văn Linh, Q. Thanh Khê, TP. Đà Nẵng'
    },
    {
        id:4,
        name : 'EUROTILE CENTER ĐẮK LẮK',
        contact: "0913446525",
        address: '332-334 Phan Bội Châu, TP. Buôn Mê Thuột'
    },
    {
        id:5,
        name : 'EUROTILE CENTER HỒ CHÍ MINH',
        contact: "(038)62876899",
        address: '433 Cộng Hòa, P.15, Q. Tân Bình, TP. Hồ Chí Minh'
    },
    {
        id:6,
        name : 'EUROTILE CENTER CẦN THƠ',
        contact: "0916639668",
        address: '353 đường 30/4, Q. Ninh Kiều, TP. Cần Thơ'
    },
];


class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.onGetCollectionSuccess     = this.onGetCollectionSuccess.bind(this);
        this.onGetCollectionFalse     = this.onGetCollectionFalse.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.getPopularNews = this.getPopularNews.bind(this);
        this.getPopularNewsSuccess = this.getPopularNewsSuccess.bind(this);
        this.getPopularNewsFalse = this.getPopularNewsFalse.bind(this);
        this.getOrderSuccess = this.getOrderSuccess.bind(this);


        Def.mainNavigate = this.props.navigation;

        if(!Def.collection_data) {
            NetCollection.listCollection(this.onGetCollectionSuccess, this.onGetCollectionFalse);
        }
        else if (!Def.config_collection_menu) {
            Def.config_collection_menu = this.createConfigData(Def.collection_data);
        }

        if(!Def.popularNews || Def.popularNews.length == 0){
            this.getPopularNews();
        }

        this.state = {
            collection_data: null,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : Def.popularNews,
            activeSlide : 0,
            popularNews : Def.popularNews
        };

        this.setActiveItem = this.setActiveItem.bind(this);


    }


    getPopularNews = () => {
        console.log('Get Popular News');
        NetNews.getPopularArticle(this.getPopularNewsSuccess, this.getPopularNewsFalse);
    };

    getPopularNewsSuccess = (data) => {

        console.log('PopularNewsSuccess');
        if(data['result'] == 1){
            this.setState({slide_data : data['data']});
            AsyncStorage.setItem('popularNews', JSON.stringify(Def.popularNews))
        } else {
            console.log("GetPopularMessage : " + data['message']);
        }
    };
    getPopularNewsFalse = (data) => {
        console.log('GetPopularNewsFalse Err ' + JSON.stringify(data));
    };

    componentDidMount(){
        if(!Def.popularNews || Def.popularNews.length == 0){
            this.getPopularNews();
        }
        if((!Def.orderList || Def.orderList.length == 0 ) && Def.user_info) {
            console.log('Get OrderList ++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            OrderController.getOrder(this.getOrderSuccess);
            this.refresh();
        }

    }

     getOrderSuccess(data){
        Def.orderList = data['data'];
        this.refresh();
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

    itemClick = (item)=>
    {
        console.log(item.id);
        // this.props.navigation.navigate('news-detail', { item:item});
        this.props.navigation.navigate('News', {screen:'news-detail', params: { item: item }});

    };

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
                dotContainerStyle={{marginHorizontal : 6}}
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
            <HotNewsVerItemrenderer item={item} click={this.itemClick} />
        );

    }

    setActiveItem = (index) => {
        console.log('setActiveItem');
        this.setState({ activeSlide: index });
    }


    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_collection_menu;
        const renderCenterItem = ({item}) => {

            return (
                <View style={{width: width - 20, padding:5, marginTop:5, marginHorizontal:10, borderBottomWidth : 1 ,  borderColor: Style.DEFAUT_RED_COLOR}} >
                    <Text style={[Style.text_styles.titleText, {color:Style.DEFAUT_RED_COLOR, marginLeft: 0, fontSize : Style.MIDLE_SIZE}]}>
                        {item.name}
                    </Text>
                    <Text style={[Style.text_styles.titleText, {color:'#000', marginLeft: 0,fontSize : Style.MIDLE_SIZE, fontWeight:'800'}]}>
                        {item.address}
                    </Text>
                    <Text style={[Style.text_styles.titleText, {color:'#000', marginLeft: 0, fontSize : Style.MIDLE_SIZE, fontWeight:'800'}]}>
                        {item.contact}
                    </Text>

                </View>
                            )
          };

        const ListHeader = () => (
            <View >
                <View style={[Style.styles.carousel, {marginTop:0}]}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.slide_data}
                        renderItem={this.renderItem}
                        itemWidth={width -20}
                        sliderWidth={width -20}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        activeSlideAlignment={'start'}
                        loop={true}
                        autoplay={true}
                        autoplayInterval={5000}
                        // onSnapToItem={(index) => {
                        //     this.setState({ activeSlide: index });
                        // }}
                    />

                    {/*<MyCarousel*/}
                        {/*// data={this.state.slide_data}*/}
                        {/*renderItem={this.renderItem}*/}
                        {/*onSnap={this.setActiveItem}*/}
                    {/*/>*/}

                    {/*<View style={{ position:'absolute',top : 5, right :   5 , width : 40,  paddingVertical: 5  }}>*/}
                        {/*<Text>*/}
                            {/*{(this.state.activeSlide + 1) + "/" + this.state.slide_data.length}*/}
                        {/*</Text>*/}
                    {/*</View>*/}

                    {/*{ this.pagination }*/}
                </View>

                {
                Def.user_info && Def.user_info.partnerInfo ?


                <View style={styles.overviewInfo} >
                    <View>
                        <Text style={[Style.text_styles.titleText, {color:Style.DEFAUT_RED_COLOR, marginLeft: 0}]}>
                            {Def.user_info ? Def.user_info['username'] : ''}
                        </Text>
                        <View>
                            <Text style={[Style.text_styles.middleText, {color:Style.DEFAUT_RED_COLOR}]}>
                                {Def.getLevelPartnerName(Def.user_info.partnerInfo.level_id)}
                            </Text>
                            <Text style={[Style.text_styles.middleText, {color:Style.DEFAUT_RED_COLOR}]}>
                                {Def.calTotalOrderValue(Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED))}
                            </Text>
                        </View>

                    </View>

                    <View style={{flexDirection:'row', justifyContent: 'space-between' , marginTop:10}}>
                        <TouchableOpacity style={{width:BUTTON_WIDTH, height: BUTTON_HEIGHT , borderRadius : 10, backgroundColor : '#20C0F0' , justifyContent:'center', alignItems:'center'}}>
                            <Text>
                                {Def.getLevelPartnerName(Def.user_info.partnerInfo.level_id) ? Def.getLevelPartnerName(Def.user_info.partnerInfo.level_id) : "CK" }
                            </Text>
                            <Text>
                                {Def.partnerlevelInfo[Def.user_info.partnerInfo.level_id] ? Def.partnerlevelInfo[Def.user_info.partnerInfo.level_id].discount + "%" : "%"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:BUTTON_WIDTH, height:BUTTON_HEIGHT , borderRadius : 10, backgroundColor : '#F19C26' , justifyContent:'center', alignItems:'center'}}>
                            <Text>
                                Đơn hàng
                            </Text>
                            <Text>
                                {Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED).length}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:BUTTON_WIDTH, height: BUTTON_HEIGHT , borderRadius : 10, backgroundColor : '#20C0F0' , justifyContent:'center', alignItems:'center'}}>
                            <Text>
                                Hoa hồng
                            </Text>
                            <Text>
                                {Def.calProfitValue(Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED))}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View> : null

                }

                <View style={{ paddingHorizontal:10}}>
                    <Text style={[{marginLeft:10, marginTop : 20 }, Style.text_styles.titleText]}>
                        HỆ THỐNG EUROTILE CENTER
                    </Text>
                </View>

            </View>
        );

        return (

            <View style={{flex:1, paddingTop:0}}>
                <ProgramVerList
                    data={centerItems}
                    navigation={this.props.navigation}
                    header={ListHeader}
                    renderFunction={renderCenterItem}
                    type={'design'}
                    stack={'scheme'}
                    screen={'detail-design'}
                />

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

    overviewInfo: {
        // height: height/4,
        minHeight: 200,
        width : width -20,
        marginHorizontal:10,
        paddingVertical:10,
        paddingHorizontal:10,
        // backgroundColor:'#FF5E62',
        // borderRadius:10,
        marginTop:10,
        borderColor : Style.DEFAUT_RED_COLOR,
        borderWidth:2,
    },

    centerInfo: {
        height: 300,
        minHeight: 200,
        width : width -20,
        marginHorizontal:10,
        paddingVertical:10,
        paddingHorizontal:10,
        // backgroundColor:'#FF5E62',
        borderRadius:10,
        marginTop:10,
        borderColor : Style.DEFAUT_RED_COLOR,
        borderWidth:2,
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
