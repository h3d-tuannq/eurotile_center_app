import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native'
import DownIconSvg from '../../../assets/icon/icon-down-black.svg'
import NotificationItemrenderer from "../../com/item-render/NotificationItemrenderer";

import Def from '../../def/Def'
import Style from "../../def/Style";
const {width, height} = Dimensions.get('window');

const notiData = [
    {
        id:'1',
        title:'Thông báo 1',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'2',
        title:'Thông báo 2',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'3',
        title:'Thông báo 3',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'4',
        title:'Thông báo 4',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'5',
        title:'Thông báo 5',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'6',
        title:'Thông báo 6',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'7',
        title:'Thông báo 7',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'8',
        title:'Thông báo 8',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    },
    {
        id:'9',
        title:'Thông báo 9',
        content: 'Nội dung bình luận, nội dung bình luận, nội dung bình luận, nội dùng bình luận',
        create_datetime:'3/6/2020',
    }

]

class NotificationScreen extends React.Component{

    state ={
        notiData: notiData
    }
    constructor(props){
        super(props);
        console.log('class NotificationScreen extends React.Component');
        console.log(props);

        this.onNotiSuccess     = this.onNotiSuccess.bind(this);
        this.onNotiFailed     = this.onNotiFailed.bind(this);

        // NetUser.listNotification(this.onNotiSuccess,this.onNotiFailed);

    }

    onNotiSuccess(data){
        console.log("onNotiSuccess");
        this.setState({notiData:data["data"]});
    }

    onNotiFailed(data){
        //
    }


    render() {
        const renderItem = ({ item }) => (

                <NotificationItemrenderer item={item} navigation={this.props.navigation} />

        );
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={styles.playList}>
                    <FlatList
                        style={{ marginBottom : 120, paddingLeft : 10, backgroundColor : '#fff'}}
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
