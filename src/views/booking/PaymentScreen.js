import React, {PureComponent} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Style from "../../def/Style";

const {width, height} = Dimensions.get('window');

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Def from "../../def/Def";
import { WebView } from 'react-native-webview';


const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2
const ITEM_HEIGHT =40

const radiogroup_options = [
    {id: 0, label: 'Thanh toán VNPAY', value:0 },
    {id: 1, label: 'Thanh toán sau' , value:1},
];



class PaymentScreen extends React.Component {
    constructor(props){
        super(props);
        let item = this.props.route.params && this.props.route.params.order ? this.props.route.params.order : null;
        console.log("Item id " + item.id);
        this.state = {
            order:item,
            editable: false,
            paymentMethod : 0,
            isPayment:false,
            paymentUrl: Def.createPaymentUrl(item.id),
        };
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
            {
            this.state.isPayment ?
            <View style={{ flex:1, backgroundColor:'#ffffff', justifyContent:'space-between'}}>
                <RadioForm
                    radio_props={radiogroup_options}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={Style.DEFAUT_RED_COLOR}
                    selectedButtonColor={Style.DEFAUT_RED_COLOR}
                    animation={true}
                    buttonSize={15}
                    buttonOuterSize={25}
                    // buttonStyle={{marginTop:10}}
                    style={{marginHorizontal:10, marginTop:10}}
                    onPress={(value) => {this.setState({paymentMethod:value})}}
                />

                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45, marginBottom:10}]}
                                  onPress={this.saveOrder}>
                    <Text style={styles.buttonText}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View> :
                <View style={{flex:1}}>
                    <View style={styles.webView}>
                        <WebView
                            source={{ uri: this.state.paymentUrl }}
                        />
                    </View>
                </View>
            }
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
        backgroundColor: '#fff',
        marginHorizontal:10
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
    }
    ,
    webView : {
        height : height -60,
        backgroundColor: '#e6e6e6',
        // marginRight: 15,
    },

});


export default PaymentScreen;
