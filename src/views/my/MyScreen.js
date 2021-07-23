import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import OrderTab from "../booking/OrderTab";
import AsyncStorage from "@react-native-community/async-storage";

import MyCustomizeTabBar from  '../../com/common/tabbar/MyCustomizeTabBar'
import DashboardComponent from "../../com/common/DashboardComponent";

import Def from '../../def/Def'
import Style from "../../def/Style";
import OrderController from '../../controller/OrderController';
const {width, height} = Dimensions.get('window');
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

class MyScreen extends React.Component {
    constructor(props){
        super(props);
        // console.log("Def.news", JSON.stringify(Def.news_data));
        this.onGetOrderSuccess     = this.onGetOrderSuccess.bind(this);
        this.onGetOrderNewsFailed     = this.onGetOrderNewsFailed.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.gotoPartnerInfo = this.gotoPartnerInfo.bind(this);
        Def.refreshMyDashboard = this.refreshMyDashboard.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
        this.getOrderSuccess = this.getOrderSuccess.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.signInBtnClick = this.signInBtnClick.bind(this);

        if(!Def.orderList || Def.orderList.length == 0) {
            OrderController.getOrder(this.onGetOrderSuccess, this.onGetOrderNewsFailed);
        }
        else if (!Def.config_order_menu || Def.config_order_menu.length == 0) {
            console.log("Create order config: " + Def.config_order_menu);

            Def.config_order_menu = this.createConfigData(Def.orderList);
            // this.setState({configMenu: Def.config_news_menu});
        }
        this.state = {
            order_data: Def.orderList,
            stateCount: 0.0,
            configMenu: Def.config_order_menu,
            user : Def.user_info,
        };
        Def.mainNavigate = this.props.navigation;
    }

    gotoPartnerInfo(){
        let screen = 'partner-info';
        if(Def.checkPartnerPermission() <0){
            screen = 'update-partner';
        }
        console.log('Screen : ' + screen);

        this.props.navigation.navigate('My', {'screen':screen});
    }

    signInBtnClick(){
        this.props.navigation.navigate('Login', {'screen': 'signIn'});
    }

    updateProfile(){
        console.log('Update Profile !');
        let screen = 'update-profile';
        this.props.navigation.navigate('My', {'screen':screen});
    }

    getOrderSuccess(data){
        Def.orderList = data['data'];
        if(Def.refreshDashBoard && (typeof  Def.refreshDashBoard == 'function')) {
            Def.refreshDashBoard();
        }
    }

    refresh()
    {
            this.setState( {
                user: Def.user_info,
                stateCount: 0.0,
            });
            if(!Def.user_info){
                AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
            }
            if(Def.refreshDashBoard && typeof Def.refreshDashBoard == 'function') {
                Def.refreshDashBoard();
            }
    }

    onGetOrderSuccess(data){
        console.log('Return order list' +  data["data"]);
        this.setState({ order_data: data["data"] });
        Def.orderList = data["data"];
        Def.config_order_menu = this.createConfigData(data["data"]) ;
        if(Def.refreshStatistical && (typeof  Def.refreshStatistical == 'function')){
            Def.refreshStatistical();
        }
        this.setState({ configMenu: Def.config_order_menu});
    }

    forcusFunction = () => {

        if((!Def.orderList || Def.orderList.length == 0 ) && Def.user_info) {
            OrderController.getOrder(this.getOrderSuccess);
            this.refresh();
        }
        this.setState({stateCount:Math.random()});
        if(Def.refreshDashBoard && typeof Def.refreshDashBoard == 'function' && Def.user_info){
            Def.refreshDashBoard();
        }
    };

    refreshMyDashboard(){
        this.setState({stateCount:Math.random()})
    }

    createConfigData(data){
        if(data){
            let configData =  Object.entries(Def.OrderStatus).map((key, status) => {

                return {key: status,name_vi:key[1], hidden:0, data: Def.getOrderByStatus(Def.orderList, status)};
            });
            return configData;
        }

    }

    onGetOrderNewsFailed(data){
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
        const index = Def.REFESH_SCREEN.indexOf('my-screen');
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.refresh();
        }

        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;
        if(navigation){
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        } else {
        }

        if(!Def.orderList) {
            OrderController.getOrder(this.onGetOrderSuccess, this.onGetOrderNewsFailed);
        }
        else if (!Def.config_order_menu) {
            Def.config_order_menu = this.createConfigData(Def.orderList);
            this.setState({configMenu: Def.config_order_menu});
        }

        return true;
    }

    getNewDataByConfigKey(key){

    }

    async componentDidMount(){

        if(!this.state.user) {
            if (!Def.user_info) {
                let user_info_raw = await AsyncStorage.getItem('user_info');
                if (user_info_raw) {
                    Def.user_info = JSON.parse(user_info_raw);
                    this.setState({user: Def.user_info})
                } else {
                    console.log('Return data');
                    return;
                }
            }
            this.setState({user: Def.user_info});
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
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        } else {
        }

        if(!Def.orderList) {
            OrderController.getOrder(this.onGetOrderSuccess, this.onGetOrderNewsFailed);
        }
        else if (!Def.config_order_menu) {
            Def.config_order_menu = this.createConfigData(Def.orderList);
            this.setState({configMenu: Def.config_order_menu});
        }

    }
    componentWillUnmount() {
        // Remove the event listener
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
            this.focusListener.remove();
        }

    }

    render() {
        const {navigation} = this.props;
        const configMenu = this.state.configMenu;

        // console.log("Config : " + JSON.stringify(configMenu))

        return (


            <View style={{flex: 1}}
            >
                {
                    (this.state.user) ?

                        <View style={{flex: 1}}>
                            {
                                Def.user_info && Def.user_info.partnerInfo ?
                                    <DashboardComponent stateCount={this.state.stateCount}
                                                        updateInfo={this.updateProfile}/>
                                    : null


                            }
                            {
                                configMenu ?
                                    <ScrollableTabView renderTabBar={() => <MyCustomizeTabBar navigation={navigation}

                                    />}

                                    >
                                        {
                                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                                if ((prop[1]["hidden"]) == 0) {
                                                    return (
                                                        <OrderTab key={prop[0] + "acv"} navigation={navigation}
                                                                  refresh={this.refresh}
                                                                  tabLabel={this.formatText(prop[1]["name_vi"])}
                                                                  onLoadDataSuccess={this.onGetOrderSuccess}
                                                                  title={this.formatText(prop[1]["name_vi"])}
                                                                  data={prop[1]["data"]}/>
                                                    );
                                                }
                                            })
                                        }
                                    </ScrollableTabView>
                                    :
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: width,
                                        height: height
                                    }}>
                                        <Text style={{fontSize: Style.TITLE_SIZE, color: '#b3b3b3'}}>
                                            Ứng dụng đang tải dữ liệu
                                        </Text>
                                    </View>
                            }
                        </View>
                        :
                        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', width: width}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: Style.TITLE_SIZE, color: '#b3b3b3'}}>
                                    Vui lòng
                                </Text>
                                <TouchableOpacity onPress={this.signInBtnClick}>
                                    <Text style={{
                                        fontSize: Style.TITLE_SIZE,
                                        marginLeft: 5,
                                        color: Style.DEFAUT_RED_COLOR
                                    }}>
                                        đăng nhập
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontSize: Style.TITLE_SIZE, color: '#b3b3b3'}}>
                                để sử dụng đầy đủ tính năng cá nhân
                            </Text>

                        </View>
                }


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

export default MyScreen;
