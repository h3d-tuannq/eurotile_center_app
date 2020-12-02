import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList , RefreshControl} from 'react-native'
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar  }  from 'react-native-scrollable-tab-view';
import OrderTab from './OrderTab'
import MyCustomizeTabBar from  './tabbar/MyCustomizeTabBar'

import Def from '../../def/Def'
import Style from "../../def/Style";
import OrderController from '../../controller/OrderController';
const {width, height} = Dimensions.get('window');
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2

class OrderScreen extends React.Component {


    state = {
        order_data: null,
        stateCount: 0.0,
        configMenu: Def.config_order_menu,
        isRefresh:false,
    };

    constructor(props){
        super(props);
        // console.log("Def.news", JSON.stringify(Def.news_data));
        this.onGetOrderSuccess     = this.onGetOrderSuccess.bind(this);
        this.onGetOrderNewsFailed     = this.onGetOrderNewsFailed.bind(this);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        this.onRefresh = this.onRefresh.bind(this);

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
            configMenu: Def.config_order_menu
        };
        Def.mainNavigate = this.props.navigation;
    }

    refresh()
    {
        //NetChannel.listChannel(this.onChannelSuccess,this.onChannelFailed);
        this.setState({ stateCount: Math.random() });
    }

    onGetOrderSuccess(data){
        this.setState({ order_data: data["data"] });
        Def.orderList = data["data"];
        Def.config_order_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_order_menu});
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
        return true;
    }

    getNewDataByConfigKey(key){

    }

    componentDidMount(){
        if(!Def.orderList) {
            OrderController.getOrder(this.onGetOrderSuccess, this.onGetOrderNewsFailed);
        }
        else if (!Def.config_order_menu) {
            Def.config_order_menu = this.createConfigData(Def.orderList);
            this.setState({configMenu: Def.config_order_menu});
        }

    }

    onRefresh = ()=> {
        OrderController.getOrder(this.onGetOrderSuccess, this.onGetOrderNewsFailed);
        this.setState({isRefresh:true});
    }


    render() {
        const {navigation} = this.props;
        const configMenu = this.state.configMenu;

        // console.log("Config : " + JSON.stringify(configMenu))

        return (
            <View style={{flex:1}}>
                {
                    configMenu ?
                    <ScrollableTabView   renderTabBar={() => <MyCustomizeTabBar navigation={navigation}/>}
                                         refreshControl={
                                             <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                                         }
                    >
                        {
                            configMenu && Object.entries(configMenu).map((prop, key) => {
                                if ((prop[1]["hidden"]) == 0) {
                                    return (
                                        <OrderTab key={prop[0] + "acv"} navigation={navigation} refresh={this.refresh}
                                                  tabLabel={this.formatText(prop[1]["name_vi"])}
                                                  title={this.formatText(prop[1]["name_vi"])} data={prop[1]["data"]}/>
                                    );
                                }
                            })
                        }
                    </ScrollableTabView>
                        :
                            <View style={{justifyContent :'center', alignItems : 'center', width: width, height: height}}>
                                <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                                    Ứng dụng đang tải dữ liệu
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

export default OrderScreen;
