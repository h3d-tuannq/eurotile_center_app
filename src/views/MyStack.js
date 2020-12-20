import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './user/SignIn'
import SignUpScreen from './user/SignUp'
// import ForgetPassScreen from './user/ForgetPassword'

import MenuIcon from '../../assets/icon/menu.svg';

import EurotileLogo from '../../assets/icons/Logo w.svg'

import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import MyScreen from './my/MyScreen'
import UserProfileScreen from  './my/UserProfileScreen'
import PartnerInfoScreen from './my/PartnerInfoScreen'
import ChangePassword from './my/ChangePassword';
// import UpdatePartnerInfoScreen from './my/UpdatePartnerScreen'
import PartnerProfileScreen from './my/PartnerProfileScreen'


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class MyStack extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="my-screen" component={MyScreen} options={{
                     title: "Tài khoản",
                    headerLeft: () => (
                        <TouchableOpacity
                            style=  {
                                {
                                    width: Style.DRAWER_MENU_SIZE,
                                    height: Style.DRAWER_MENU_SIZE,
                                    justifyContent: 'center',
                                    paddingLeft:15 ,
                                    alignItems : 'center'
                                }
                            }
                            onPress={() => this.props.navigation.toggleDrawer()}>
                            <MenuIcon
                                width={Style.DRAWER_MENU_ICON_SIZE}
                                height={Style.DRAWER_MENU_ICON_SIZE}
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
                        // alignSelf: 'center'
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
                    headerTitleStyle: {
                        // fontWeight: 'bold',

                    },
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
                    headerTitleStyle: {
                        // fontWeight: 'bold',
                    },
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
                    headerTitleStyle: {
                        // fontWeight: 'bold',
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />
                {/*<RootStack.Screen name="update-partner" component={UpdatePartnerInfoScreen} options={{*/}
                    {/*title: 'Đăng ký Partner',*/}
                    {/*headerStyle: {*/}
                        {/*backgroundColor: Style.DEFAUT_BLUE_COLOR,*/}
                        {/*height: Style.HEADER_HEIGHT,*/}
                    {/*},*/}
                    {/*headerTintColor: '#fff',*/}
                    {/*headerTitleStyle: {*/}
                        {/*// fontWeight: 'bold',*/}
                    {/*},*/}
                    {/*headerBackImage: ()=> {*/}
                        {/*return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />*/}
                    {/*}*/}
                {/*}} />*/}


            </RootStack.Navigator>
        )
    }
}

export default MyStack;
