import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './user/SignIn'
import SignUpScreen from './user/SignUp'
// import ForgetPassScreen from './user/ForgetPassword'

import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import HomeScreen from './home/HomeScreen'

const Stack = createStackNavigator();
const RootStack = createStackNavigator();



class HomeStack extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="home-screen" component={HomeScreen} options={{
                    title: 'Trang chủ',
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

            </RootStack.Navigator>
        )
    }
}

export default HomeStack;
