import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import UpdateProfileScreen from "./my/UpdateProfileScreen";

import SignInScreen from './user/SignIn'
import SignUpScreen from './user/SignUp'
// import ForgetPassScreen from './user/ForgetPassword'

import MenuIcon from '../../assets/icons/expand.svg';

import EurotileLogo from '../../assets/icons/Logo w.svg'

import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import MyScreen from './my/MyScreen'
import UserProfileScreen from  './my/UserProfileScreen'
import ChangePassword from './my/ChangePassword';
import UpdatePartnerInfoScreen from './my/UpdatePartnerScreen'
import PartnerProfileScreen from './my/PartnerProfileScreen'
import NotiIcon from "../../assets/icon/icon-notification.svg";
import CheckIcon from "../../assets/eurotile/check.svg";
import Def from "../def/Def";


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class MyStack extends React.Component {
    constructor(props){
        super(props);
        this.showNotification = this.showNotification.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    showNotification() {

        if(this.props.navigation){
            Def.mainNavigate = this.props.navigation;
        }

        console.log('Go to create Notification');

        Def.mainNavigate.navigate('Notification', {screen:'noti-screen', params:{refresh:1}});
    }

    saveProfile() {
      if(Def.updateProfileFunc){
          Def.updateProfileFunc();
      }
    }

    render() {
        return (
            <RootStack.Navigator
                screenOptions={{
                    headerBackTitleVisible: false,
                    headerTitleStyle: {
                        textTransform: 'uppercase'
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
                            onPress={this.showNotification}>
                            {/*{ this.state.new_noti ?*/}
                            {/*<View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>*/}
                            {/*<Text style={{color: 'white', fontSize: this.state.new_noti > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>*/}
                            {/*{Def.formatOrderNumber(this.state.new_noti)}*/}
                            {/*</Text>*/}
                            {/*</View>*/}
                            {/*:<View/>*/}
                            {/*}*/}

                            <NotiIcon
                                width={Style.CART_ICON_SIZE -5}
                                height={Style.CART_ICON_SIZE }
                            />
                        </TouchableOpacity>

                    )
                }}
            >
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="my-screen" component={MyScreen} options={{
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
                    //         onPress={() => this.props.navigation.toggleDrawer()}>
                    //         <MenuIcon
                    //             width={Style.DRAWER_MENU_ICON_SIZE}
                    //             height={Style.DRAWER_MENU_ICON_SIZE}
                    //         />
                    //     </TouchableOpacity>
                    //
                    // ),

                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        alignSelf: 'center',
                        textTransform: 'uppercase'
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="my-profile" component={UserProfileScreen} options={{
                    title: 'Thông tin cá nhân',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />


                <RootStack.Screen name="partner-info" component={PartnerProfileScreen} options={{
                    title: 'Hồ sơ Partner',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="change-password" component={ChangePassword} options={{
                    title: 'Thiết lập tài khoản',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />
                <RootStack.Screen name="update-partner" component={UpdatePartnerInfoScreen} options={{
                    title: 'Đăng ký Partner',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

                <RootStack.Screen name="update-profile" component={UpdateProfileScreen} options={{
                    title: 'Thông tin cá nhân',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
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
                            onPress={this.saveProfile}>

                            <CheckIcon
                                width={Style.CART_ICON_SIZE -5}
                                height={Style.CART_ICON_SIZE }
                            />
                        </TouchableOpacity>

                    )

                }} />


            </RootStack.Navigator>
        )
    }
}

export default MyStack;
