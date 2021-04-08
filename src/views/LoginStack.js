import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './user/SignIn'
import SignUpScreen from './user/SignUp'
import ForgetPassScreen from './user/ForgetPassword'

import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import PrivacyScreen from '../../src/com/common/PrivacyScreen';
import TermScreen from '../../src/com/common/TermScreen';


import GuideScreen from "../../src/com/common/GuideScreen";


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class LoginStack extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RootStack.Navigator  mode='modal' >
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="signIn" component={SignInScreen} options={{
                    title: 'Đăng nhập',
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
                    }
                }} />
                <RootStack.Screen name="signUp" component={SignUpScreen}
                                  options={{
                                      title: 'Đăng ký',
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
                                  }}
                />
                <RootStack.Screen name="forgetPass" component={ForgetPassScreen}
                                  options={{
                                      title: 'Quên mật khẩu',
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
                                  }}

                />

                <RootStack.Screen name="term-screen" component={TermScreen}
                                  options={{
                                      title: 'Điều khoản',
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
                                  }}

                />

                <RootStack.Screen name="guide-screen" component={GuideScreen}
                                  options={{
                                      title: 'Hướng dẫn',
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
                                  }}

                />

            </RootStack.Navigator>
        )
    }
}

export default LoginStack;
