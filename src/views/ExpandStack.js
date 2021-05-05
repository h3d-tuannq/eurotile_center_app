import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import EurotileLogo from '../../assets/icons/Logo w.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

import ExpandScreen from './expand/ExpandScreen'

const Stack = createStackNavigator();
const RootStack = createStackNavigator();



class ExpandStack extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="home-screen" component={ExpandScreen} options={{
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
                            }
                            onPress={() => this.props.navigation.toggleDrawer()}>
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

export default ExpandStack;
