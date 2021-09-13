import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import EurotileLogo from '../../assets/icons/Logo w.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import ExpandScreen from './expand/ExpandScreen'
import ChangeUserInfo from "./expand/ChangeUserInfo";
import ContactScreen from './expand/ContactScreen'
import ShareAppScreen from './expand/ShareAppScreen'
import TermScreen from './expand/TermScreen'
import EcatalogueScreen from "./expand/EcatalogueScreen";
import Def from "../def/Def";
import NotiIcon from "../../assets/icon/icon-notification.svg";


const Stack = createStackNavigator();
const RootStack = createStackNavigator();



class ExpandStack extends React.Component {
    constructor(props){
        super(props);
        this.showNotification = this.showNotification.bind(this);
    }

    showNotification() {

        if(this.props.navigation){
            Def.mainNavigate = this.props.navigation;
        }

        console.log('Go to create Notification');

        Def.mainNavigate.navigate('Notification', {screen:'noti-screen', params:{refresh:1}});
    }


    render() {
        return (
            <RootStack.Navigator
                screenOptions={{
                    headerBackTitleVisible: false,
                    headerTitleStyle: {
                        textTransform: 'uppercase'
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
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
                    //         onPress={this.showNotification}>
                    //         <NotiIcon
                    //             width={Style.CART_ICON_SIZE -5}
                    //             height={Style.CART_ICON_SIZE }
                    //         />
                    //     </TouchableOpacity>
                    //
                    // )
                }}
            >
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="expand-screen" component={ExpandScreen} options={{
                    title: "Mở rộng",
                    headerLeft: () => (
                        <TouchableOpacity
                            style=  {
                                {
                                    // width: Style.LOGO_WIDTH + 20,
                                    // height:Style.DRAWER_MENU_SIZE,
                                    justifyContent: 'center',
                                    paddingLeft:15 ,
                                    alignItems : 'center'
                                }
                            }
                            onPress={() => this.props.navigation.goBack()}
                        >

                            <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                        </TouchableOpacity>

                    ),

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="ecatalogue" component={EcatalogueScreen} options={{
                    title: "Ecatalogue",
                    headerLeft: () => (
                        <TouchableOpacity
                            style=  {
                                {
                                    // width: Style.LOGO_WIDTH + 20,
                                    // height:Style.DRAWER_MENU_SIZE,
                                    justifyContent: 'center',
                                    paddingLeft:15 ,
                                    alignItems : 'center'
                                }
                            }
                            onPress={() => this.props.navigation.goBack()}
                        >

                            <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                        </TouchableOpacity>

                    ),

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />


                <RootStack.Screen name="contact-screen" component={ContactScreen} options={{
                    title: 'Liên hệ',

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="share-app-screen" component={ShareAppScreen} options={{
                    title: 'Chia sẻ ứng dụng',

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="setup-info-screen" component={ChangeUserInfo} options={{
                    title: 'Cài đặt',

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="term-screen" component={TermScreen} options={{
                    title: 'Điều khoản',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />


            </RootStack.Navigator>
        )
    }
}

export default ExpandStack;
