import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import MenuIcon from '../../assets/icon/menu.svg';
import EurotileLogo from '../../assets/icons/Logo w.svg'
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import HomeScreen from './home/HomeScreen'
import Def from "../def/Def";
import NotiIcon from "../../assets/icon/icon-notification.svg";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();



class HomeStack extends React.Component {
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
                <RootStack.Screen name="home-screen" component={HomeScreen} options={{
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

export default HomeStack;
