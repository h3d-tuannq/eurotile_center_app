import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import MenuIcon from '../../assets/icon/menu.svg';
import NotiIcon from '../../assets/icon/icon-notification.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
import NewsScreen from './news/NewsScreen';
import NewsDetail from './news/NewsDetailScreen';
import EurotileLogo from '../../assets/icons/Logo w.svg';
import CartIcon from '../../assets/icons/cart.svg';
import Def from '../def/Def';
class NewsStack extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            new_noti: Def.order_number
        };
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
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="news-list" component={NewsScreen} options={{
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

                <RootStack.Screen name="news-detail" component={NewsDetail} options= {({route}) => ({
                    title: 'Chi tiết tin tức',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    },
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                })} />

            </RootStack.Navigator>
        )
    }
}

export default NewsStack;
