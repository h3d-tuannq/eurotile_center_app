import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SchemeScreen from './scheme/SchemeScreen'
import DesignListScreen from  './scheme/DesignListScreen'
import DetailDesignScreen from  './scheme/DetailDesignScreen'

import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";
import EurotileLogo from '../../assets/icons/Logo w.svg';
import Def from '../def/Def';
import NotiIcon from '../../assets/icon/icon-notification.svg';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class SchemeStack extends React.Component {
    constructor(props){
        super(props);
        this.getOrderNumber = this.getOrderNumber.bind(this);
        this.state = {
            new_noti: Def.order_number
        };
        this.showNotification = this.showNotification.bind(this);
    }

    showNotification() {

        if(this.props.navigation){
            Def.mainNavigate = this.props.navigation;
        }
        Def.mainNavigate.navigate('Notification', {screen:'noti-screen', params:{refresh:1}});
    }

    goProductList() {
        console.log("Go to Product List");
        if(this.props.navigation){
            this.props.navigation.navigate('Booking', {screen:'cart'});
        }
    }
    getOrderNumber(){
        return Def.cart_data.length;
    }

    formatOrderNumber(order_number){
        return order_number < 100 ? order_number : '99+';
    }

    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="scheme-screen" component={SchemeScreen} options={{
                    title: null,
                    headerLeft: () => (
                        <TouchableOpacity
                            style=  {
                                {
                                    width: Style.LOGO_WIDTH + 20,
                                    height:Style.DRAWER_MENU_SIZE,
                                    justifyContent: 'center',
                                    paddingLeft:15 ,
                                    alignItems : 'center'
                                }
                            }>
                            <EurotileLogo
                                width={Style.LOGO_WIDTH}
                                height={Style.LOGO_HEIGHT}
                            />
                        </TouchableOpacity>

                    ),

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
                            onPress={this.showNotification}>
                            <NotiIcon
                                width={Style.CART_ICON_SIZE -5}
                                height={Style.CART_ICON_SIZE }
                            />
                        </TouchableOpacity>

                    ),

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        // fontWeight: 'bold',
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />


                <RootStack.Screen name="design-list" component={DesignListScreen} options=
                {({route}) => ({
                        title: route.params && route.params.item ? route.params.item.category_name_vi :  null,
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


                <RootStack.Screen name="detail-design" component={DetailDesignScreen} headerMode='none' options=
                    {({route}) => ({
                            title: route.params && route.params.item ? route.params.item.name :  'Chi tiết thiết kế',
                            headerStyle: {
                                backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                height: Style.HEADER_HEIGHT,
                            },
                            headerMode:'none',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackImage: ()=> {
                                return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                            }
                    }
                    )
                    } />


            </RootStack.Navigator>
        )
    }
}
export default SchemeStack;
