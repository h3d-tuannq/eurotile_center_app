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
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/24/1/main_img.jpg',
    },
    {
        id:2,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/30/2/main_img.jpg',
    }
];

class UserProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.formatText    = this.formatText.bind(this);
        this.onGetUserInfoFun = this.onGetUserInfoFun.bind(this);

        this.state = {
            user: Def.user_info,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0,
        };
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }

    }

    onGetUserInfoFun(value){
        if(value){
            Def.user_info = JSON.parse(value);
            console.log("Usser info from storage : " +  JSON.stringify(Def.user_info));
            Def.username = Def.user_info['user_name'];
            Def.email = Def.user_info['email'];
            this.setState({user:Def.user_info});
            console.log("State : " +  JSON.stringify(this.state.user));
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
            <View style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR}}>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff'}}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Image  style={styles.imageStyleInfo}  source={{uri: Def.getAvatarUrlFromUserInfo() }}  />
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


                {
                user['partnerInfo'] && user['partnerInfo']['status'] ?
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff'}}>

                    {/*<View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between'}}>*/}
                        <Text style={[Style.text_styles.middleText, {}]}>
                            Loại tài khoản
                        </Text>

                        <Text style={[Style.text_styles.middleText, {}]}>
                            Partner
                        </Text>

                    {/*</View>*/}

                 </View> :
                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Trở thành Partner
                            </Text>
                    </TouchableOpacity>
                }


                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Tên
                        </Text>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            {user['userProfile']['display_name']}
                        </Text>

                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Điện thoại
                        </Text>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            {user['userProfile']['phone']}
                        </Text>

                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Giới tính
                        </Text>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            {user['userProfile']['gender']}
                        </Text>

                    </View>

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Ngày sinh
                    </Text>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        {user['userProfile']['date_of_birth']}
                    </Text>

                </View>

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        CMND
                    </Text>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        {user['userProfile']['card_number']}
                    </Text>

                </View>

                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between'}}>

                {/*<View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:10}}>*/}
                    {/*<Text style={[Style.text_styles.middleText,{}]}>*/}
                        {/*Địa chỉ*/}
                    {/*</Text>*/}
                    {/*<Text style={[Style.text_styles.middleText,{}]}>*/}
                        {/*{user['userProfile']['address']}*/}
                    {/*</Text>*/}
                    {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                {/*</View>*/}

                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Địa chỉ
                    </Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>

                        <Text style={[Style.text_styles.middleText, {marginRight :10}]}>
                            {user['userProfile']['address'] ? Def.user_info['userProfile']['address']['detail_address'] : ""}
                        </Text>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </View>

                </TouchableOpacity>



            </View>
        )
    }
}

const styles = StyleSheet.create({
});

export default UserProfileScreen;
