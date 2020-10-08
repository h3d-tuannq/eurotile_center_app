import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './user/SignIn'
import SignUpScreen from './user/SignUp'
// import ForgetPassScreen from './user/ForgetPassword'

import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import MyScreen from './my/MyScreen'

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
                    title: 'Dashboard',
                    headerLeft: () => (
                        <TouchableOpacity
                            style=  {
                                {
                                    width: Style.DRAWER_MENU_SIZE,
                                    height:Style.DRAWER_MENU_SIZE,
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

                <RootStack.Screen name="my-profile" component={MyScreen} options={{
                    title: 'Thông tin cá nhân',
                    // headerLeft: () => (
                    //     <TouchableOpacity
                    //         style=  {
                    //             {
                    //                 width: 40,
                    //                 height:40,
                    //                 justifyContent: 'center',
                    //                 paddingLeft:15 ,
                    //                 alignItems : 'center'
                    //             }
                    //         }
                    //         onPress={() => this.props.navigation.toggleDrawer()}>
                    //         <MenuIcon
                    //             width="30"
                    //             height="30"
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
                        fontWeight: 'bold',
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                }} />

            </RootStack.Navigator>
        )
    }
}

export default MyStack;
