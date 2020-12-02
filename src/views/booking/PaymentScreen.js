import React, {PureComponent} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import Def from '../../def/Def'
import Style from "../../def/Style";
import OrderitemItemrenderer from '../../com/item-render/OrderitemItemrenderer';
import LocationIcon from '../../../assets/icons/Location.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2
const ITEM_HEIGHT =40


class PaymentScreen extends React.Component {
    constructor(props){
        super(props);
        let item = this.props.route.params && this.props.route.params.item ? this.props.route.params.item : null;
        console.log("Item : "+ JSON.stringify(item));
        this.state = {
            order:item,
            editable: false,
            paymentMethod : 0,
        };
    }
    render() {
        const {navigation} = this.props;
        const {address} = this.state;
        return (
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                { this.state.order ?
                    <View keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: '#fff', paddingLeft : 10, paddingRight: 5, paddingTop:10}}>
                        <View>
                            <FlatList
                                data={this.state.orderItems}
                                renderItem={renderOrderItem}
                                keyExtractor={item => item.product.id +"-" + item.amount}
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={bookingHeader}
                                // ListFooterComponent={footerComponent}
                            />
                        </View>
                    </View>:<View/>}
                <View>

                </View>
                <View style={{marginTop:10,  borderBottomWidth:1, borderColor:Style.GREY_TEXT_COLOR, marginHorizontal:20, paddingVertical:5}}>
                    <View style={styles.orderInfo}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between' }}>
                            <Text style={[Style.text_styles.middleText]}>
                                {"Thanh toán"}
                            </Text>
                            <Text style={[Style.text_styles.priceText, { marginTop:3, fontWeight:'bold'}]}>
                                {/*{Def.calOrderValue(this.state.order) + " đ"}*/}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45, marginBottom:5}]}
                                  onPress={this.saveOrder}>
                    <Text style={styles.buttonText}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
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
    imageStyle : {
        width : width /3,
        height : width / 3,

        borderRadius: width / 6,
    },
    imageStyleInfo : {
        width : width /8,
        height : width / 8,
        borderRadius: width / 16,
    },

    button : {
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 20, marginTop : 15, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center', paddingHorizontal : 5, marginHorizontal:10
    },
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginVertical:3, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginVertical:3, paddingHorizontal: 10 },

    textEditableNormal : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE , marginRight : 5, textAlign: 'right'},
    textEditableForcus : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE  , marginRight : 5, textAlign: 'right'},

    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 2},
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },

    orderInfo: {
        marginTop:10,
    },


});


export default OrderDetailScreen;
