import {PureComponent} from "react";
import {View, Button, StyleSheet, Image, Dimensions, Text, TouchableOpacity, Alert} from "react-native";
import React from "react";
import Def from '../../def/Def'
import Style from "../../def/Style";

const {width, height} = Dimensions.get('window');

class HotNewsVerItemrenderer extends PureComponent{
    constructor(props) {
        super(props);
        this.onClickNews = this.onClickNews.bind(this);
    }

    onClickNews(){
        console.log("onClickNews");
        const model = this.props.item;
        if(model.reader_link) {
            Def.setItemNews(model);
        } else {
            Alert.alert(
                "Thông báo",
                "Tin tức này chưa có dữ liệu âm thanh",
                [
                    { text: "Đồng ý", onPress: () => {
                            return;
                        } }
                ],
                { cancelable: false }
            );
        }
    }

    render(){
        const model = this.props.item;

        return (

            <View style={Style.styles.cardStyle}>
                <TouchableOpacity onPress={
                    () => {
                        this.props.click(model);
                    }

                } >
                    <Image  style = {[Style.styles.cardImg , {resizeMode : 'stretch', flex: 1}]} source={{ uri: model.thumbnail_url}} />
                    <View style = {{position:'absolute', width : width -20,  paddingVertical: 3 , paddingHorizontal:10, alignSelf:'center', backgroundColor : Style.DEFAUT_RED_COLOR }}>
                        <Text style={[Style.text_styles.whiteTitleText , {  }]}>
                            {Def.formatText(model.title, 90)}
                        </Text>
                    </View>


                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        // height : 120,
        paddingRight:15,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom : 5,
    },

    imageContainer:{
        flex: 1,
        // backgroundColor: "red",
        borderRadius :5,
        justifyContent:'center'
    },
    itemImage: {
        width : width /3.5,
        height : width /5.5,
        borderRadius : 5,
    },
    listenView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        flex: 1,
    },
    listenButton :{
        justifyContent : 'space-around',alignItems: 'center', flexDirection:'row' , width: width /3,
         paddingHorizontal: 10,
        borderRadius: 5,
        height :30
    }
    ,
    info: {
        marginLeft:20,
        flex: 2.2,
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    titleInfo : {
        fontWeight: 'bold',
        fontSize : Style.NORMAL_SIZE,
        paddingBottom : 8,
        flex: 1,
    },
    infoText : {
        fontSize : Style.NORMAL_SIZE,
        color: '#ffffff'
    },
    favoriteIcon : {
        width : 20,
        height : 20,
    }
});

export default HotNewsVerItemrenderer;


