import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList, RefreshControl} from 'react-native'
import DownIconSvg from '../../../assets/icon/icon-down-black.svg'
import NotificationItemrenderer from "../../com/item-render/NotificationItemrenderer";

import NotificationController from "../../controller/NotificationController"

import Def from '../../def/Def'
import Style from "../../def/Style";
import NetNews from "../../net/NetNews";
const {width, height} = Dimensions.get('window');

const notiData = [
    {
        id:'1',
        title:'Thông báo 1',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'2',
        title:'Thông báo 2',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'3',
        title:'Thông báo 3',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'4',
        title:'Thông báo 4',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'5',
        title:'Thông báo 5',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'6',
        title:'Thông báo 6',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'7',
        title:'Thông báo 7',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'8',
        title:'Thông báo 8',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    },
    {
        id:'9',
        title:'Thông báo 9',
        body: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        created_at:1607936433,
    }

]

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
    header: {
        height :Style.HEADER_HEIGHT,
        flexDirection:'row',
        paddingVertical: 10,
        width: width,


    },
    carousel: {
        paddingTop: 5,
        padding: 8,
        height: width*1,
        borderRadius: 5,
        backgroundColor: "#e6e6e6",
        marginHorizontal : 10,
        marginTop: 10,
        justifyContent:'center',

    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width-20,
        height: width,
    },
    textSlide:{
        marginTop:20,
        height:50,
        borderRadius: 10,
        width: width -20,
        marginHorizontal: 10,
        backgroundColor: '#1288c9',
        justifyContent:'center',
        paddingHorizontal:5,
        alignItems: 'center',

    },


    playerContainer: {
        marginTop:80,
        marginHorizontal:10,
        paddingHorizontal: 5,
    },
    title:{
        fontSize: Style.TITLE_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold',
        marginLeft: -20,
    },
    groupMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : 10,
        paddingBottom:5

    },
    menuBtn:{
        flexDirection : 'row',
        alignItems:'center'

    },
    menuText: {
        fontSize:Style.MIDLE_SIZE,
        marginHorizontal:5,
    },
    player: {
        // height : 100,
    },
    commentBtn: {
        height:50,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        backgroundColor : '#01a54e',
        marginHorizontal: 10,
        marginVertical : 10,
        // alignItems : 'center',
        justifyContent : 'center',
        paddingLeft: 20,
    }



});

export default NotificationScreen;
