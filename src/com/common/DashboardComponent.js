import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text, FlatList, TextInput, Dimensions, Keyboard,Alert} from 'react-native'
import Def from "../../def/Def";
import Style from "../../def/Style";



const {width, height} = Dimensions.get('window');
const BUTTON_WIDTH = (width - 60 ) / 3;
const BUTTON_HEIGHT = (width - 60 ) / 3;

class DashboardComponent extends React.Component{

    constructor(props){
        super(props);
        let orderList = Def.orderList;
        this.state = {
           profit: Def.calProfitValue(Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED)),
           accomplishedOrder: Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED).length,
           user : Def.user_info,
           stateCount : this.props.stateCount != null ? this.props.stateCount:  0,
        }

        Def.refreshDashBoard = this.refresh.bind(this);

    }

    refresh()
    {
        let orderList = Def.orderList;
        this.setState({ stateCount: this.props.stateCount != null ? this.props.stateCount : 0 ,  profit: Def.calProfitValue(Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED)),
            accomplishedOrder: Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED).length,  });
    }
    render(){
        const {user} = this.state;
        return (
            <View style={styles.overviewInfo} >
                <View>
                    <Text style={[Style.text_styles.titleText, {color:Style.DEFAUT_RED_COLOR, marginLeft: 0}]}>
                        {this.state.user ? user['username'] : ''}
                    </Text>
                    <View>
                        <Text style={[Style.text_styles.middleText, {color:Style.DEFAUT_RED_COLOR}]}>
                            {Def.numberWithCommas(Def.calTotalOrderValue(Def.getOrderByStatus(Def.orderList, Def.STATUS_ACCOMPLISHED))) + ' đ'}
                        </Text>
                    </View>

                </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <TouchableOpacity style={{
                            width: BUTTON_WIDTH,
                            height: BUTTON_HEIGHT,
                            borderRadius: 10,
                            backgroundColor: '#20C0F0',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>
                                {"Chiếu Khấu"}
                            </Text>
                            <Text>
                                {Def.partnerlevelInfo[user.partnerInfo.level_id - 1] ? Def.partnerlevelInfo[user.partnerInfo.level_id - 1].discount + "%" : "%"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: BUTTON_WIDTH,
                            height: BUTTON_HEIGHT,
                            borderRadius: 10,
                            backgroundColor: '#F19C26',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>
                                Đơn hàng
                            </Text>
                            <Text>
                                {this.state.accomplishedOrder}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: BUTTON_WIDTH,
                            height: BUTTON_HEIGHT,
                            borderRadius: 10,
                            backgroundColor: '#20C0F0',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>
                                Hoa hồng
                            </Text>
                            <Text>
                                {Def.numberWithCommas(this.state.profit) + ' đ'}
                            </Text>
                        </TouchableOpacity>
                    </View>

            </View>
                )
    }
}

const styles = StyleSheet.create({
    overviewInfo: {
        // height: height/4,
        minHeight: 200,
        width : width -20,
        marginHorizontal:10,
        paddingVertical:10,
        paddingHorizontal:10,
        marginTop:10,
        borderColor : Style.DEFAUT_RED_COLOR,
        borderWidth:2,
    },


});

export default DashboardComponent;
