import React from 'react'
import {View, Text, StyleSheet, Dimensions,Linking,TouchableOpacity, Image} from  'react-native'
import PlusCircleIcon from "../../../assets/icons/Plus circle.svg";


import Def from '../../def/Def'
import Style from "../../def/Style";

const {width, height} = Dimensions.get('window');

class NotificationItemrenderer extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        const {item} =  this.props;
        return (
            <TouchableOpacity onPress={() => this.props.click(item)} style={styles.noti}>
                <View style={styles.imageContainer} >
                    {item.image ? <Image style={styles.itemImage} source={{uri:item.image}} /> :
                        <Image  style={styles.itemImage}  source={require('../../../assets/icon/eurotile_notification.jpg')}  />}
                </View>
                <View style={styles.info}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <Text style={styles.date}>{item.created_at ? Def.getDateString(new Date(item.created_at * 1000), "dd-MM-yyyy") : ""}
                        </Text>

                    </View>

                    <View style={styles.content}>
                        <Text style={{fontSize : Style.NORMAL_SIZE}}>
                            {item.body}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    noti: {
        backgroundColor : '#f0f1f2',
        minHeight: 60,
        marginVertical :5,
        // marginHorizontal:10,
        borderRadius : 5,
        flexDirection: 'row',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems:'center'
    },
    imageContainer:{
        flex: 1,
        // backgroundColor: "red",
        // borderRadius :5,
        justifyContent:'center'
    },
    itemImage: {
        width : width / 5,
        height : width / 7,
        borderRadius : 5,
    },
    title : {
        fontSize : Style.MIDLE_SIZE,
        fontWeight: 'bold',
        marginBottom : 4,
        // flex: 1,
    },
    date: {
        // flex: 1,
        fontSize : Style.SMALL_SIZE,
    },
    content: {
    },
    info : {
        flex: 3.5,
        // backgroundColor: 'red',
        paddingHorizontal:5,
    }

});

export default NotificationItemrenderer;
