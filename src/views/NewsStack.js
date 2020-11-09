import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// function NewsListScreen({navigation} ) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>News List</Text>
//             <Button
//                 title="Go to News Details"
//                 onPress={() => navigation.navigate('news-detail')}
//             />
//         </View>
//     );
// }

import NewsScreen from './news/NewsScreen';
import NewsDetail from './news/NewsDetailScreen';
import Def from "../def/Def";

// function NewsDetailScreen({navigation} ) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>News Detail</Text>
//             <Button
//                 title="Go to News-List"
//                 onPress={() => navigation.navigate('news-list')}
//             />
//         </View>
//     );
// }

class NewsStack extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="news-list" component={NewsScreen} options={{
                    title: 'Tin Tức',
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
                            onPress={() => Def.showScanQrCode()}>
                            <Icon name="qrcode" size={25} color={Style.DEFAUT_WHITE_COLOR} />
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
                            onPress={() => Def.showScanQrCode()}>
                            <Icon name="qrcode" size={25} color={Style.DEFAUT_WHITE_COLOR} />
                        </TouchableOpacity>

                    ),
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
