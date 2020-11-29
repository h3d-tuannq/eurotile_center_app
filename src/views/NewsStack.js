import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import MenuIcon from '../../assets/icon/menu.svg';
import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";

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
import EurotileLogo from '../../assets/icons/Logo w.svg';
import CartIcon from '../../assets/icons/cart.svg';
import Def from '../def/Def';

// function OrderDetailScreen({navigation} ) {
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
        this.state = {
            number_order: Def.order_number
        };
    }

    formatText(text){
        let rs = text;
        if(text && text.length > 10){
            rs = text.substring(0, 20) ;
        }
        return rs;
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
