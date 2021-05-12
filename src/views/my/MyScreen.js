import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

import GuideIcon from '../../../assets/icon/icon-how-to-use.svg'
import RuleIcon from '../../../assets/icon/icon-rule.svg';

import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import AsyncStorage from "@react-native-community/async-storage";

import  UserController from '../../../src/controller/UserController'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const BUTTON_WIDTH = (width - 60 ) / 3;
const BUTTON_HEIGHT = (width - 60 ) / 3;
import StatisticalComponent from "../../com/common/StatisticalComponent";
import OrderController from "../../controller/OrderController";
import DashboardComponent from "../../com/common/DashboardComponent";

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



class MyScreen extends React.Component {
    constructor(props){
        super(props);
        this.formatText    = this.formatText.bind(this);
        this.onGetUserInfoFun = this.onGetUserInfoFun.bind(this);
        console.log('MyScreen init');
        Def.mainNavigate = this.props.navigation;
        if(this.props.navigation){
            console.log('isset naviagtion');
        }
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }

        this.state ={
            user: Def.user_info,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0,
            number_order: Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED).length,
        };
        this.gotoProfile = this.gotoProfile.bind(this);
        this.gotoPartnerInfo = this.gotoPartnerInfo.bind(this);
        this.gotoChangePass = this.gotoChangePass.bind(this);
        this.updatePartnerInfo = this.updatePartnerInfo.bind(this);
        this.signInBtnClick = this.signInBtnClick.bind(this);
        this.gotoOrderList = this.gotoOrderList.bind(this);
        this.gotoOrderGuide = this.gotoOrderGuide.bind(this);
        this.gotoOrderTerm = this.gotoOrderTerm.bind(this);
        this.refresh = this.refresh.bind(this);
        Def.refreshDashBoard = this.refresh;
        Def.refreshMyDashboard = this.refreshMyDashboard.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
        this.getOrderSuccess = this.getOrderSuccess.bind(this);

    }

    componentDidMount(){
        console.log("User info: " + Def.user_info);
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }
        const index = Def.REFESH_SCREEN.indexOf('my-screen');
        console.log("Index in refresh : " + index);
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.refresh();
        }
        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;
        if(navigation){
            console.log('set event forcus');
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        } else {
            console.log('not exit navigation')
        }
    }

    getOrderSuccess(data){
        Def.orderList = data['data'];
        if(Def.refreshStatistical && (typeof  Def.refreshStatistical == 'function')) {
            Def.refreshStatistical();
        }
    }

    forcusFunction = () => {

        if((!Def.orderList || Def.orderList.length == 0 ) && Def.user_info) {
            OrderController.getOrder(this.getOrderSuccess);
            this.refresh();
        }
        console.log('Number Order : ' + Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED).length);

        this.setState({stateCount:Math.random(),  number_order: Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED).length,});

        if(Def.refreshDashBoard && typeof Def.refreshDashBoard == 'function'){
            Def.refreshDashBoard();
        }
    };

    componentWillUnmount() {
        // Remove the event listener
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
            this.focusListener.remove();
        }

    }

    signInBtnClick(){
        this.props.navigation.navigate('Login', {'screen': 'signIn'});
    }

    gotoProfile(){
        this.props.navigation.navigate('My', {'screen':'my-profile'});
    }

    gotoPartnerInfo(){
        let screen = 'partner-info';
        if(Def.checkPartnerPermission() <0){
            screen = 'update-partner';
        }
        this.props.navigation.navigate('My', {'screen':screen});
    }

    updatePartnerInfo(){
        this.props.navigation.navigate('My', {'screen':'update-partner'});
    }

    gotoChangePass() {
        this.props.navigation.navigate('My', {'screen':'change-password'});
    }

    gotoOrderList() {
        this.props.navigation.navigate('Booking', {'screen':'order-list'});
    }

    gotoOrderTerm() {
        this.props.navigation.navigate('Login', {'screen':'term-screen'});
    }

    gotoOrderGuide() {
        this.props.navigation.navigate('Login', {'screen':'guide-screen'});
    }

    refreshMyDashboard(){
         this.setState({stateCount:Math.random()})
    }


    onGetUserInfoFun(value){
        if(value){
            Def.user_info = JSON.parse(value);
            Def.username = Def.user_info['user_name'];
            Def.email = Def.user_info['email'];
            // this.setState({user:Def.user_info});
            this.refresh();
        }
    }

    refresh()
    {
        this.setState( {
            user: Def.user_info,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            slide_data : carouselItems,
            activeSlide : 0,
        });
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        } else {
           console.log('exits User info');
        }
        if(Def.refreshDashBoard && typeof Def.refreshDashBoard == 'function') {
            Def.refreshDashBoard();
        }

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

        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }
        const index = Def.REFESH_SCREEN.indexOf('my-screen');
        console.log("Index in refresh : " + index);
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.refresh();
        }

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
            (!user) ?

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

                    <View style={{alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginBottom: 10}}>

                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Image  style={styles.imageStyle}  source={{uri: Def.getAvatarUrlFromUserInfo() }}  />

                        </View>
                        <View style={{marginTop: 10, justifyContent:'space-between'}}>
                            <Text style={Style.text_styles.titleTextNotBold}>
                                {user['email']}
                            </Text>
                            {/*<Text style={Style.text_styles.middleText}>*/}
                            {/*{user['userProfile'] && user['userProfile']['phone'] ? user['userProfile']['phone'] : (user['userProfile']['display_name'] ? user['userProfile']['display_name'] : "SDT không tồn tại")}*/}
                            {/*</Text>*/}
                        </View>
                        {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                    </View>

                    {/*<TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff'}}*/}
                        {/*onPress={this.gotoProfile}*/}
                        {/*>*/}
                        {/*<View style={{flexDirection : 'row', alignItems : 'center'}}>*/}
                        {/*<Image  style={styles.imageStyleInfo}  source={{uri:Def.getAvatarUrlFromUserInfo() }}  />*/}
                        {/*<View style={{marginLeft: 10, justifyContent:'space-between'}}>*/}
                            {/*<Text style={Style.text_styles.middleText}>*/}
                                {/*{user['email']}*/}
                            {/*</Text>*/}
                            {/*/!*<Text style={Style.text_styles.middleText}>*!/*/}
                                {/*/!*{user['userProfile'] && user['userProfile']['phone'] ? user['userProfile']['phone'] : (user['userProfile']['display_name'] ? user['userProfile']['display_name'] : "SDT không tồn tại")}*!/*/}
                            {/*/!*</Text>*!/*/}
                        {/*</View>*/}
                        {/*</View>*/}
                        {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                    {/*</TouchableOpacity>*/}

                    {
                        Def.user_info && Def.user_info.partnerInfo ?
                            <DashboardComponent orderList={Def.orderList} stateCount={this.state.stateCount}  />
                       : null


                    }
                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}
                        onPress={this.gotoPartnerInfo}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                            <Icon name="id-card" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                {Def.checkPartnerPermission() <0 ?'Đăng ký Partner' : 'Hồ sơ Partner'}
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                            <Icon name="credit-card" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Cài đặt thanh toán
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:2}}
                                      onPress={this.gotoOrderList}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <Icon name="shopping-cart" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Danh sách đơn hàng
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}
                                      onPress={this.gotoOrderGuide}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <GuideIcon width={25} height={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Chính sách bán hàng Eurotile
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:2}}
                                      onPress={this.gotoOrderTerm}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <RuleIcon width={25} height={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Điều khoản trở thành Partner
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}*/}
                                      {/*onPress={ ()=>{UserController.logoutLocal()}}*/}
                    {/*>*/}
                        {/*<View style={{flexDirection : 'row', alignItems : 'center'}}>*/}
                            {/*<View style={{width :30}}>*/}
                                {/*<Icon name="sign-out-alt" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                            {/*</View>*/}
                            {/*<Text style={[Style.text_styles.middleText, {marginLeft :10}]}>*/}
                               {/*Đăng xuất*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                        {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:2}}*/}
                                      {/*onPress={this.updatePartnerInfo}*/}
                    {/*>*/}
                        {/*<View style={{flexDirection : 'row', alignItems : 'center'}}>*/}
                            {/*<View style={{width :30}}>*/}
                                {/*<Icon name="shopping-cart" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                            {/*</View>*/}
                            {/*<Text style={[Style.text_styles.middleText, {marginLeft :10}]}>*/}
                                {/*Cập nhật Hồ sơ Partner*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                        {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                    {/*</TouchableOpacity>*/}

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
    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 8, marginLeft : 15},
    overviewInfo: {
        // height: height/4,
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

});

export default MyScreen;
