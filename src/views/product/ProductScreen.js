import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, RefreshControl} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProgramHozList from '../../../src/com/common/ProgramHozList';

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

        this.state = {
            collection_data: null,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0,
            isRefresh: false
        };
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


    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_collection_menu;
        return (
            <ScrollView style={{flex:1, backgroundColor: '#fff'}}
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                        }
            >
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

                <View style={{flex:1, paddingLeft:15}}>

                {
                    configMenu && Object.entries(configMenu).map((prop, key) => {
                        prop[0] = (prop[0] == "" ? "Khác" : prop[0]);
                        return (

                            <View key={key} style={[styles.programListStyle, {marginTop: key == 0 ? 5 : 10}]}>
                                <ProgramHozList refresh={this.refresh} stack={'Product'}
                                screen={'collection-detail-screen'} favorite={true}
                                navigation={this.props.navigation} name={prop[0]}
                                style={styles.programListStyle} data={prop[1]["data"]} title={Def.formatText(prop[1]["name_vi"])}/>
                            </View>
                        )
                        }
                    )

                }
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    programListStyle : {

    },
});

export default ProductScreen;
