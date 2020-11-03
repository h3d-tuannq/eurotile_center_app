import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

import IconArrow from '../../../assets/icon/icon_arrow.svg'

import ProgramHozList from '../../../src/com/common/ProgramHozList';

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import AsyncStorage from "@react-native-community/async-storage";

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

class PartnerInfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.formatText    = this.formatText.bind(this);
        this.onGetUserInfoFun = this.onGetUserInfoFun.bind(this);

        this.state = {
            user: Def.user_info,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            project_slide_data : this.calProSlideData(Def.user_info['partnerInfo']),
            cmt_slide_data : this.calCmtSlideData(Def.user_info['userProfile']),
            activeProSlide : 0,
            activeCmtSlide : 0,
        };
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }

    }

    calCmtSlideData(userProfile){

        console.log('User Profile : ' + JSON.stringify(userProfile));

        let rs = [];
        if (userProfile){
            if(userProfile['infront_cmt_img']){
                rs.push( {
                    id : 'infrontOf',
                    image_path : Def.URL_CONTENT_BASE + userProfile['infront_cmt_img']
                });
            }
            if(userProfile['behind_cmt_img']){
                rs.push( {
                    id : 'behind',
                    image_path : Def.URL_CONTENT_BASE + userProfile['behind_cmt_img']
                });
            }
        }
        return rs;

    }

    calProSlideData(partnerInfo){
        let rs = [];

        if(partnerInfo && partnerInfo.project_img){
            let subImgs = partnerInfo.project_img.split(',');
            rs = subImgs.map(x => {
                return {image_path:Def.URL_CONTENT_BASE  + 'partnerInfo/'+ x}
            });
        }
        return rs;
    }

    onGetUserInfoFun(value){
        if(value){
            Def.user_info = JSON.parse(value);
            Def.username = Def.user_info['user_name'];
            Def.email = Def.user_info['email'];
            this.setState({user:Def.user_info, project_slide_data : this.calProSlideData(Def.user_info['partnerInfo']),
                cmt_slide_data : this.calCmtSlideData(Def.user_info['userProfile'])});
        }
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
        const { project_slide_data, activeProSlide } = this.state;
        return (
            <Pagination
                dotsLength={project_slide_data.length}
                activeDotIndex={activeProSlide}
                containerStyle={{ position:'absolute',top : 5, right : project_slide_data.length  * 5, width : project_slide_data.length  * 5,  paddingVertical: 5  }}
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

    get cmtPagination () {
        const { cmt_slide_data, activeCmtSlide } = this.state;
        return (
            <Pagination
                dotsLength={cmt_slide_data.length}
                activeDotIndex={activeCmtSlide}
                containerStyle={{ position:'absolute',top : 5, right : cmt_slide_data.length  * 5, width : cmt_slide_data.length  * 5,  paddingVertical: 5  }}
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
        const {user} = this.state;
        return (
            (!this.state.user) ?

                <View style={{justifyContent :'center',flex: 1, alignItems : 'center', width: width}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                            Vui lòng
                        </Text>
                        <TouchableOpacity onPress={this.signInBtnClick}>
                            <Text style={{fontSize:Style.TITLE_SIZE, marginLeft:5 , color:Style.DEFAUT_RED_COLOR}}>
                                đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                        để sử dụng đầy đủ tính năng cá nhân
                    </Text>

                </View> :
            <ScrollView style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR}}>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff'}}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Image  style={styles.imageStyleInfo}  source={{uri: Def.getAvatarUrlFromUserInfo()}}  />
                    <View style={{marginLeft: 10, justifyContent:'space-between'}}>
                        <Text style={Style.text_styles.middleText}>
                            {user['email']}
                        </Text>
                        <Text style={Style.text_styles.middleText}>
                            {user['userProfile'] && user['userProfile']['phone'] ? user['userProfile']['phone'] : (user['userProfile']['display_name'] ? user['userProfile']['display_name'] : "SDT không tồn tại")}
                        </Text>
                    </View>
                    </View>
                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                </View>



                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff'}}>

                        <Text style={[Style.text_styles.middleText, {}]}>
                            Xếp hạng
                        </Text>

                        <Text style={[Style.text_styles.middleText, {}]}>
                            {user['partnerInfo']['level_id']}
                        </Text>
                 </View>



                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Năm kinh nghiệm
                        </Text>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            {user['partnerInfo']['experience']}
                        </Text>

                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Phong cách
                        </Text>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            {user['partnerInfo']['tags']}
                        </Text>

                    </View>
                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Nơi làm việc
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>

                        <Text style={[Style.text_styles.middleText, {marginRight :10}]}>
                            {user['userProfile']['address']}
                        </Text>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>

                </TouchableOpacity>

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        CMND
                    </Text>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        {user['userProfile']['card_number']}
                    </Text>

                </View>

                <View>
                    <View style={Style.styles.carousel}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                            data={this.state.cmt_slide_data}
                            renderItem={this.renderItem}
                            itemWidth={width}
                            sliderWidth={width}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            activeSlideAlignment={'start'}
                            loop={true}
                            autoplay={true}
                            autoplayInterval={5000}
                            onSnapToItem={(index) => this.setState({ activeCmtSlide: index }) }
                        />
                        { this.pagination }
                    </View>
                </View>

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Dự án
                    </Text>


                </View>

                <View>
                    <View style={Style.styles.carousel}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                            data={this.state.project_slide_data}
                            renderItem={this.renderItem}
                            itemWidth={width}
                            sliderWidth={width}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            activeSlideAlignment={'start'}
                            loop={true}
                            autoplay={true}
                            autoplayInterval={5000}
                            onSnapToItem={(index) => this.setState({ activeProSlide: index }) }
                        />
                        { this.pagination }
                    </View>
                </View>



            </ScrollView>
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
    imageStyle : {
        width : width /3,
        height : width / 3,

        borderRadius: width / 6,
    },
    imageStyleInfo : {
        width : width /8,
        height : width / 8,

        borderRadius: width / 16,
    },

});

export default PartnerInfoScreen;
