import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList, RefreshControl} from 'react-native'
import DownIconSvg from '../../../assets/icon/icon-down-black.svg'
import NotificationItemrenderer from "../../com/item-render/NotificationItemrenderer";

import NotificationController from "../../controller/NotificationController"

import Def from '../../def/Def'
import Style from "../../def/Style";
import NetNews from "../../net/NetNews";
const {width, height} = Dimensions.get('window');

class NotificationScreen extends React.Component{

    state ={
        notiData: [],
        isRefresh:false
    }
    constructor(props){
        super(props);
        console.log('class NotificationScreen extends React.Component');
        console.log(props);
        this.onNotiSuccess     = this.onNotiSuccess.bind(this);
        this.onNotiFailed     = this.onNotiFailed.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        console.log('UserInfo: ' + JSON.stringify(Def.user_info));
        if(Def.user_info){
            console.log("Call get Notification");
            NotificationController.getNotificationByCondition(this.onNotiSuccess,this.onNotiFailed, Def.user_info ? Def.user_info['id'] : "");
        }

    }

    onRefresh = () => {
        console.log('UserInfo: ' + JSON.stringify(Def.user_info));
        this.setState({isRefresh:true});
        if(Def.user_info){
            console.log("Call get Notification");
            NotificationController.getNotificationByCondition(this.onNotiSuccess,this.onNotiFailed, Def.user_info ? Def.user_info['id'] : "");
        }
    };

    onNotiSuccess(data){
        console.log("onNotiSuccess : " + JSON.stringify(data) );
        if(data['err_code']){
            alert(data['msg']);
            this.setState({isRefresh:false});
            return ;
        } else {
            this.setState({notiData:data, isRefresh:false});
        }


    }

    onNotiFailed(data){
        console.log('Noti false');
    }


    render() {
        const renderItem = ({ item }) => (

                <NotificationItemrenderer item={item} navigation={this.props.navigation} />

        );
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={styles.playList}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                        }
                        style={{ marginBottom : 120, paddingHorizontal : 5, backgroundColor : '#fff'}}
                        data={this.state.notiData}
                        renderItem={renderItem}
                        keyExtractor={item => (item.id + "")}

                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
});

export default NotificationScreen;
