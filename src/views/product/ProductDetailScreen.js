import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import CollectionTab from './CollectionTab'
import MyCustomizeTabBar from  '../../com/common/tabbar/MyCustomizeTabBar'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProductDetailTab from "./ProductDetailTab";
import DefaultProgramImage from "../../../assets/icon/logo-vov.svg";

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
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
        this.refresh     = this.refresh.bind(this);

        this.state = {
            // collection_data: null,
            stateCount: 0.0,
            slide_data : this.getImageForCollection(this.props.route.params.item),
            item:this.props.route.params.item,
            configMenu: this.createTabData(this.props.route.params.item),
            activeSlide:0,
        };

        // this.setState({ activeSlide: 0});

        Def.mainNavigate = this.props.navigation;
    }
    getImageForCollection(item){
        let collectionImages;
        if(item.faces){
            let subImgs = item.faces.split(',');
            subImgs = subImgs.map(x => {
                return {image_path:Def.URL_CONTENT_BASE + x}
            });
            collectionImages = subImgs;
        }

        // console.log("Slide Product data : " + JSON.stringify(collectionImages) );

        return collectionImages;
    }

    refresh()
    {
        this.setState({ stateCount: Math.random() });
    }

    onGetCollectionSuccess(data){
        // console.log(Object.entries(data["data"]));
        Object.entries(data["data"]).map((prop, key) => {
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
            Object.entries(configData).map((prop, key) => {
            });
            return configData;
        }

    }

    createTabData(data){
        console.log("Data : " + JSON.stringify(data));
        var configData = [];
        if(data){
                configData.push({key: 'info', type:'info' ,name_vi:"Thông tin", hidden:0, data:{product:data}});
                configData.push({key: 'func', type:'func' ,name_vi:"Ứng dụng", hidden:0, data:{product:data}});
                configData.push({key: 'relation', type:'relation' ,name_vi:"Tương tự", hidden:0, data:{product:data}});
        }
        return configData;

    }

    onGetCollectionFalse(data){
        console.log("false data : " + data);
    }

    shouldComponentUpdate(){
        // this.setState({ activeSlide: 0});
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
        return (
            <View style={{flex:1, backgroundColor: '#fff'}}>
                {/*<View style={Style.styles.carousel}>*/}
                {/*    <Carousel*/}
                {/*        ref={(c) => { this._carousel = c; }}*/}
                {/*        // keyExtractor={(item, index) => `${item.id}--${item.index}`}*/}
                {/*        data={this.state.slide_data}*/}
                {/*        renderItem={this.renderItem}*/}
                {/*        itemWidth={width/2}*/}
                {/*        sliderWidth={width}*/}
                {/*        inactiveSlideOpacity={1}*/}
                {/*        inactiveSlideScale={1}*/}
                {/*        activeSlideAlignment={'start'}*/}
                {/*        // loop={true}*/}
                {/*        autoplay={true}*/}
                {/*        autoplayInterval={5000}*/}
                {/*        onSnapToItem={(index) => this.setState({ activeSlide: index }) }*/}
                {/*    />*/}
                {/*    { this.pagination }*/}
                {/*</View>*/}
                {/*<View style={Style.styles.carousel}>*/}

                {/*</View>*/}
                <View style={{alignItems : 'center' , justifyContent : 'center'}}>
                    {this.state.item.image_path ?
                        <Image  style={styles.cardImg}  source={{uri: Def.getThumnailImg(this.state.item.image_path)}}  />
                        :
                        <DefaultProgramImage style={styles.cardImg} width={this.props.styleImage.width} height={this.props.styleImage.height}/>
                    }
                    <Text style={[{ marginTop : 20 }, Style.text_styles.titleText]}>
                        {this.state.item.model}
                    </Text>
                </View>


                <View style={{flex:1, justifyContent: 'space-between', marginTop :20}}>
                    <ScrollableTabView  locked={true}   tabBarPosition={"top"} style={{height: height/2}}
                                        renderTabBar={() => <MyCustomizeTabBar style={{borderTopWidth:1, borderTopColor : Style.GREY_TEXT_COLOR}} navigation={navigation} />}  >
                        {
                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                console.log("Props Item: " + JSON.stringify(prop));
                                if((prop[1]["hidden"]) == 0){
                                    return (
                                        <ProductDetailTab key ={prop[0] + "acv"}  type={prop['type']} name={prop['name']}
                                                          navigation={navigation}  tabLabel={Def.formatText(prop[1]["name_vi"])} title={Def.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}  />
                                    );
                                }
                            })
                        }
                    </ScrollableTabView>


                {/*<TouchableOpacity style={styles.bookingBtn}>*/}
                {/*    <Text style={Style.text_styles.whiteTitleText}>*/}
                {/*        Đặt hàng*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        width: width - 20,
        paddingVertical :5,
        height: width * 0.6,
        marginTop:10,
    },
    bookingBtn : {
        backgroundColor: Style.DEFAUT_RED_COLOR,
        height: 60,
        justifyContent : 'center',
        alignItems: 'center',
    }

});

export default ProductDetailScreen;
