import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native'
import DownIconSvg from '../../../assets/icon/icon-down-black.svg'
import Style from "../../../src/def/Style";

const {width, height} = Dimensions.get('window');


class ContactScreen extends React.Component{
    render() {
        return (
            <View style={{flex:1}}>
                <Text>
                    Màn hình liên hệ
                </Text>

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
        // flex:1,


    },

    title:{
        fontSize: Style.TITLE_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold',
        marginLeft: -20,
    },


});

export default ContactScreen;
