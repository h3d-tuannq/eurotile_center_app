import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    Dimensions,
    Keyboard,
    Alert,
    Image
} from 'react-native'
import Def from "../../def/Def";
import Style from "../../def/Style";



const {width, height} = Dimensions.get('window');
const BUTTON_WIDTH = (width - 60 ) / 3;
const BUTTON_HEIGHT = (width - 60 ) / 3;

class StatisticalComponent extends React.Component{

    constructor(props){
        super(props);
        let orderList = Def.orderList;
        this.state = {
           orderList: orderList,
           profit: Def.calProfitValue(Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED)),
           accomplishedOrder: props.numberOrder != null ? props.numberOrder :Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED).length,
           user : Def.user_info,
           stateCount : this.props.stateCount != null ? this.props.stateCount:  0,


        }

        Def.refreshStatistical = this.refresh.bind(this);

    }

    refresh()
    {
        let orderList = Def.orderList;
        this.setState({orderList:Def.orderList , stateCount: this.props.stateCount != null ? this.props.stateCount : 0 ,  profit: Def.calProfitValue(Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED)),
            accomplishedOrder: this.props.numberOrder != null ? this.props.numberOrder : Def.getOrderByStatus(orderList, Def.STATUS_ACCOMPLISHED).length,  });
    }
    render(){
        const {user} = this.state;
        return (
            <View style={styles.overviewInfo} >
                <View style={{justifyContent : 'center' }}>
                    <Image  style={styles.avatarImageStyle}  source={{uri: Def.getAvatarUrlFromUserInfo() }}  />
                </View>
                <View style={{flex:2, paddingLeft : 30}}>
                    <Text style={[Style.text_styles.titleText, {color:Style.DEFAUT_BLACK_COLOR, marginLeft: 0, fontSize: Style.BIG_SIZE}]}>
                        {this.state.user ? user['username'] : ''}
                    </Text>
                    <View style={styles.styleInfoItem}>
                        <Text style={styles.styleInfoText}>
                            {"Hạng" + " "}
                        </Text>
                        <Text style={[Style.text_styles.middleText, {color:Style.DEFAUT_RED_COLOR}, styles.styleInfoText]}>
                            {Def.getLevelPartnerName(user.partnerInfo.level_id) }
                        </Text>
                    </View>
                    <View style={styles.styleInfoItem}>
                        <Text style={styles.styleInfoText} >
                            {"Chiết khấu" + " "}
                        </Text>
                        <Text style={[Style.text_styles.middleText ,{color:Style.DEFAUT_RED_COLOR}, styles.styleInfoText]}>
                            {Def.partnerlevelInfo[user.partnerInfo.level_id - 1] ? Def.partnerlevelInfo[user.partnerInfo.level_id - 1].discount + "%" : "%"}
                        </Text>
                    </View>
                    <View style={styles.styleInfoItem}>
                        <Text style={styles.styleInfoText}>
                            {"Doanh số" + " "}
                        </Text>
                        <Text style={[Style.text_styles.middleText, {color:Style.DEFAUT_RED_COLOR} , styles.styleInfoText]}>
                            {Def.numberWithCommas(Def.calTotalOrderValue(Def.getOrderByStatus(this.state.orderList, Def.STATUS_ACCOMPLISHED))) + ' đ'}
                        </Text>
                    </View>

                </View>

                    {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: BUTTON_WIDTH,*/}
                    {/*        height: BUTTON_HEIGHT,*/}
                    {/*        borderRadius: 10,*/}
                    {/*        backgroundColor: '#20C0F0',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center'*/}
                    {/*    }}>*/}
                    {/*        <Text>*/}
                    {/*            {"Chiết Khấu"}*/}
                    {/*        </Text>*/}
                    {/*        <Text>*/}
                    {/*            {Def.partnerlevelInfo[user.partnerInfo.level_id - 1] ? Def.partnerlevelInfo[user.partnerInfo.level_id - 1].discount + "%" : "%"}*/}
                    {/*        </Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: BUTTON_WIDTH,*/}
                    {/*        height: BUTTON_HEIGHT,*/}
                    {/*        borderRadius: 10,*/}
                    {/*        backgroundColor: '#F19C26',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center'*/}
                    {/*    }}>*/}
                    {/*        <Text>*/}
                    {/*            Đơn hàng*/}
                    {/*        </Text>*/}
                    {/*        <Text>*/}
                    {/*            {this.state.accomplishedOrder}*/}
                    {/*        </Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: BUTTON_WIDTH,*/}
                    {/*        height: BUTTON_HEIGHT,*/}
                    {/*        borderRadius: 10,*/}
                    {/*        backgroundColor: '#20C0F0',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center'*/}
                    {/*    }}>*/}
                    {/*        <Text>*/}
                    {/*            Hoa hồng*/}
                    {/*        </Text>*/}
                    {/*        <Text>*/}
                    {/*            {Def.numberWithCommas(this.state.profit) + ' đ'}*/}
                    {/*        </Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

            </View>
                )
    }
}

const styles = StyleSheet.create({
    overviewInfo: {
        // height: height/4,
        minHeight: 200,
        flexDirection : 'row',
        width : width -20,
        marginHorizontal:10,
        paddingVertical:10,
        paddingHorizontal:10,
        // backgroundColor:'#FF5E62',
        // borderRadius:10,
        marginTop:10,
        justifyContent : 'center',
        alignItems : 'center',
        // borderColor : Style.DEFAUT_RED_COLOR,
        // borderWidth:2,
    },
    avatarImageStyle : {
        width : width /3.5,
        height : width / 3.5,

        borderRadius: width / 7,
    },
    styleInfoItem : {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth : 1,
        borderColor: Style.GREY_TEXT_COLOR,
    },
    styleInfoText : {
        fontSize :  Style.MIDLE_SIZE,
        color: Style.GREY_TEXT_COLOR,
        fontFamily : 'Roboto',

    },



});

export default StatisticalComponent;
