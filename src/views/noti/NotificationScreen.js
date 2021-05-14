import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList, RefreshControl} from 'react-native'
import NotificationItemrenderer from "../../com/item-render/NotificationItemrenderer";

import NotificationController from "../../controller/NotificationController"

import Def from '../../def/Def'
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

        this.notiClickHandle = this.notiClickHandle.bind(this);

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

    notiClickHandle = (item) => {
        this.props.navigation.navigate('Notification', {screen:'noti-detail', params: { item: item}});
    }



    render() {
        const renderItem = ({ item }) => (

                <NotificationItemrenderer item={item} navigation={this.props.navigation} click={this.notiClickHandle} />

        );
        return (
            <View style={{ backgroundColor:'#fff'}}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                        }
                        style={{ paddingHorizontal : 5, backgroundColor : '#fff'}}
                        data={this.state.notiData}
                        renderItem={renderItem}
                        keyExtractor={item => (item.id + "")}

                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
});

export default NotificationScreen;
