import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import NotificationScreen from  './noti/NotificationScreen'

import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";
import Def from "../../src/def/Def";
import NotiDetailScreen from "./noti/NotiDetailScreen";
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class NotificationStack extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          number_noti: 90,
        };
    }


    render() {
        return (
            <RootStack.Navigator mode='modal' >

                <RootStack.Screen name="noti-screen" component={NotificationScreen} options=
                    {({route}) => ({
                        title: 'Thông báo',
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
                    })}
                />

                <RootStack.Screen name="noti-detail" component={NotiDetailScreen} options=
                    {({route}) => ({
                        title: 'Chi tiết thông báo',
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
                    })}
                />

            </RootStack.Navigator>
        )
    }
}

export default NotificationStack;
