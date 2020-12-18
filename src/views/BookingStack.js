import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SelectCustomerScreen from  './booking/SelectCustomerScreen'
import CreateCustomerScreen from  './booking/CreateCustomerScreen'
import BookingScreen from './booking/BookingScreen'
import ChangeOrderAddressScreen from './booking/ChangeOrderAddressScreen'
import CartScreen from "./booking/CartScreen";


import OrderScreen from "./booking/OrderScreen";
import OrderDetailScreen from "./booking/OrderDetailScreen"


import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";
import Def from "../../src/def/Def";

import AddIcon from '../../assets/icons/Plus circle.svg'

import TileIcon from '../../assets/icons/product-tab.svg';

import CartIcon from '../../assets/icons/cart.svg'
import PaymentScreen from "./booking/PaymentScreen";


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class BookingStack extends React.Component {
    constructor(props){
        super(props);
        this.getOrderNumber = this.getOrderNumber.bind(this);
        this.state = {
          number_order: Def.cart_data.length
        };
        this.goProductList = this.goProductList.bind(this);
        this.goToCreateCustomer = this.goToCreateCustomer.bind(this);
    }

    goProductList() {
        console.log("Go to Product List");
        if(this.props.navigation){
            this.props.navigation.navigate('Product', {screen:'product-screen'});
        }
    }

    goToCreateCustomer() {

        if(this.props.navigation){
            Def.mainNavigate = this.props.navigation;
        }

        console.log('Go to create customer');

        Def.mainNavigate.navigate('Booking', {screen:'create-customer', params:{refresh:1}});
    }

    goToProduct(){

    }


    getOrderNumber(){
        return Def.cart_data.length;
    }

    formatOrderNumber(order_number){
        return order_number < 100 ? order_number : '99+';
    }

    render() {
        return (
            <RootStack.Navigator mode='modal' >
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}

                <RootStack.Screen name="cart" component={CartScreen} options=
                    {({route}) => ({
                        title: 'Tạo đơn hàng',
                        headerStyle: {
                            backgroundColor: Style.DEFAUT_BLUE_COLOR,
                            height: Style.HEADER_HEIGHT,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        // headerRight: () => (
                        //     <TouchableOpacity
                        //         style=  {
                        //             {
                        //                 width: Style.DRAWER_MENU_SIZE,
                        //                 height: Style.DRAWER_MENU_SIZE,
                        //                 justifyContent: 'center',
                        //                 paddingRight:15 ,
                        //                 alignItems : 'center'
                        //             }
                        //         }
                        //         onPress={this.goProductList}>
                        //         { this.state.number_order ?
                        //             <View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>
                        //                 <Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>
                        //                     {this.formatOrderNumber(this.state.number_order)}
                        //                 </Text>
                        //             </View>
                        //             :<View/>
                        //         }
                        //
                        //         <CartIcon
                        //             width={Style.CART_ICON_SIZE}
                        //             height={Style.CART_ICON_SIZE}
                        //         />
                        //     </TouchableOpacity>
                        //
                        // ),
                        headerBackImage: ()=> {
                            return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                        }
                    })}
                />

                <RootStack.Screen name="select-customer" component={SelectCustomerScreen} options=
                    {({route}) => ({
                            title: 'Khách hàng',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerRight: () => (
                                <TouchableOpacity
                                    style=  {
                                        {
                                            width: Style.DRAWER_MENU_SIZE,
                                            height: Style.DRAWER_MENU_SIZE,
                                            justifyContent: 'center',
                                            paddingRight:15 ,
                                            alignItems : 'center'
                                        }
                                    }
                                    onPress={this.goToCreateCustomer}>
                                    {/*{ this.state.number_order ?*/}
                                        {/*<View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>*/}
                                            {/*<Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>*/}
                                                {/*{this.formatOrderNumber(this.state.number_order)}*/}
                                            {/*</Text>*/}
                                        {/*</View>*/}
                                        {/*:<View/>*/}
                                    {/*}*/}

                                    <AddIcon
                                        width={Style.CART_ICON_SIZE}
                                        height={Style.CART_ICON_SIZE}
                                    />
                                </TouchableOpacity>

                            ),

                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />

                <RootStack.Screen name="create-customer" component={CreateCustomerScreen} options=
                    {({route}) => ({
                            title: 'Khách hàng mới',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />

                <RootStack.Screen name="booking" component={BookingScreen} options=
                    {({route}) => ({
                            title: 'Đặt hàng',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },

                            headerRight: () => (
                                <TouchableOpacity
                                    style=  {
                                        {
                                            width: Style.DRAWER_MENU_SIZE,
                                            height: Style.DRAWER_MENU_SIZE,
                                            justifyContent: 'center',
                                            paddingRight:15 ,
                                            alignItems : 'center'
                                        }
                                    }
                                    onPress={this.goProductList}>
                                    {/*{ this.state.number_order ?*/}
                                    {/*<View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>*/}
                                    {/*<Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>*/}
                                    {/*{this.formatOrderNumber(this.state.number_order)}*/}
                                    {/*</Text>*/}
                                    {/*</View>*/}
                                    {/*:<View/>*/}
                                    {/*}*/}

                                    <TileIcon
                                        width={Style.CART_ICON_SIZE}
                                        height={22}
                                    />
                                </TouchableOpacity>

                            ),

                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />

                <RootStack.Screen name="change-order-address" component={ChangeOrderAddressScreen} options=
                    {({route}) => ({
                            title: 'Cập nhật địa chỉ',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />

                <RootStack.Screen name="order-list" component={OrderScreen} options=
                {({route}) => ({
                        title: 'Danh sách đơn hàng',
                        headerStyle: {
                            backgroundColor: Style.DEFAUT_BLUE_COLOR,
                            height: Style.HEADER_HEIGHT,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerBackImage: ()=> {
                            return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                        }}
                )
                } />

                <RootStack.Screen name="order-detail-screen" component={OrderDetailScreen} options=
                    {({route}) => ({
                            title: 'Chi tiết đơn hàng',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />

                <RootStack.Screen name="payment" component={PaymentScreen} options=
                    {({route}) => ({
                            title: 'Thanh toán',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }}
                    )
                    } />




            </RootStack.Navigator>
        )
    }
}

export default BookingStack;
