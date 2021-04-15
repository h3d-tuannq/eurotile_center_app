import * as React from 'react';

import {Component, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,Button,
    Alert,StatusBar, PixelRatio

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BackIcon from './assets/icon/icon-back.svg';
import OrderController from './src/controller/OrderController'


import PolicyIcon from './assets/icon/icon-policy.svg';
import GuideIcon from './assets/icon/icon-how-to-use.svg'
import RuleIcon from './assets/icon/icon-rule.svg';

import UserProfileSelectedIcon from './assets/icons/User b.svg';
import UserProfileIcon from './assets/icons/user.svg';

import NewsSelectedIcon from './assets/icons/News b.svg';
import NewsIcon from './assets/icons/News.svg';

import TileSelectedIcon from './assets/icons/Tile b.svg';
import TileIcon from './assets/icons/Tile.svg';

import GallerySelectedIcon from './assets/icons/List b.svg';
import GalleryIcon from './assets/icons/list.svg';


import Icon from 'react-native-vector-icons/FontAwesome5';
const myIcon = <Icon name="far fa-user-circle" size={30} />;

const {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
import NetNews from './src/net/NetNews'
import NetCollection from './src/net/NetCollection'
import NetScheme from './src/net/NetScheme'
import Modal from 'react-native-modal';
import PartnerController from './src/controller/PartnerController'

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: Style.TITLE_SIZE,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    tabBarIconStyle: {
        width: 27,
        height: 18,
        color: 'red',
    },

    infoText: {
        fontSize: Style.NORMAL_SIZE,
        color: '#b3b3b3',
        marginVertical: PixelRatio.get() < 2 ? 6 :10,
    },

    modalView: {
        position: 'absolute',
        bottom :Style.HEADER_HEIGHT,
        margin : 0,
        borderRadius: 10,
        // borderWidth : 1,
        zIndex:20,
        alignItems: "center",
        minHeight:45,
        shadowColor: "#000",
        shadowOffset: {
            width: 15,
            height: 3,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 2,
    },

});


function MyTabBar(props) {
    const {state, descriptors, navigation} = props;
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    //console.log('Routes :'+JSON.stringify(state.routes) + 'Index ' + state.index )

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View>
            {/*{!(*/}
                {/*state.index == 1  &&*/}
                {/*state.routes[1] &&*/}
                {/*state.routes[1].state &&*/}
                {/*state.routes[1].state.routes &&*/}
                {/*state.routes[1].state.routes[state.routes[1].state.index].state.index == 1) ? (*/}
                {/*<View />*/}
            {/*) : (*/}
                {/*<View />*/}
            {/*)}*/}
            <View style={{flexDirection: 'row',
                backgroundColor : '#fff',
                borderTopWidth:1,
                borderTopColor : '#d1d3d4'
            }}
            >
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const icon =
                        options.tabBarIcon !== undefined ? options.tabBarIcon : null;

                    const activeTintColor = props.activeTintColor
                        ? props.activeTintColor
                        : '#673ab7';
                    const inactiveTintColor = props.inactiveTintColor
                        ? props.inactiveTintColor
                        : '#222';

                    const color = isFocused ? activeTintColor : inactiveTintColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[
                                {
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                                props.tabStyle,
                            ]}
                            key={index}>
                            {icon({route, focused: isFocused, color})}

                            <Text style={[{color: color}, props.labelStyle]}>{label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator
            style={{height: 120, paddingVertical: 20 , backgroundColor : 'red'}}

            tabBar={(props) => <MyTabBar {...props} item={null} />}
            initialRouteName={'home'}
            tabBarOptions={{
                activeTintColor: Style.DEFAUT_RED_COLOR,
                inactiveTintColor: '#b3b3b3',
                labelStyle: {
                    fontSize: Style.NORMAL_SIZE,
                },
                style: {height: 50},
                tabStyle: {
                    paddingVertical: 5,
                    paddingTop :8,
                },
                // item:program
            }}>

            <Tab.Screen
                name="home"
                component={HomeStack}
                options={(route) => {
                    return false
                        ? {tabBarVisible: false}
                        : {
                            tabBarLabel: 'Trang chủ',
                            tabBarIcon: ({focused, color, size}) => {
                                if (focused) {
                                    return <GallerySelectedIcon style={styles.tabBarIconStyle} />;
                                    // return <MyProfileIconSelect style={styles.tabBarIconStyle} />;
                                }
                                return <GalleryIcon style={styles.tabBarIconStyle} />;
                            },
                        };
                }}
            />

            {/*<Tab.Screen*/}
                {/*name="scheme"*/}
                {/*component={SchemeStack}*/}
                {/*options={(route) => {*/}
                    {/*return false*/}
                        {/*? {tabBarVisible: false}*/}
                        {/*: {*/}
                            {/*tabBarLabel: 'Thiết kế',*/}
                            {/*tabBarIcon: ({focused, color, size}) => {*/}
                                {/*if (focused) {*/}
                                    {/*return <GallerySelectedIcon style={styles.tabBarIconStyle} />;*/}
                                    {/*// return <MyProfileIconSelect style={styles.tabBarIconStyle} />;*/}
                                {/*}*/}
                                {/*return <GalleryIcon style={styles.tabBarIconStyle} />;*/}
                            {/*},*/}
                        {/*};*/}
                {/*}}*/}
            {/*/>*/}

            <Tab.Screen
                name="Product"
                component={ProductStack}
                options={(route) => {
                    return false
                        ? {tabBarVisible: false}
                        : {
                            tabBarLabel: 'Sản phẩm',
                            tabBarIcon: ({focused, color, size}) => {
                                if (focused) {
                                    return <TileSelectedIcon style={styles.tabBarIconStyle} />;
                                    return <Icon name="th" size={25} color={Style.DEFAUT_RED_COLOR} />
                                    // return <MyProfileIconSelect style={styles.tabBarIconStyle} />;
                                }
                                return <TileIcon style={styles.tabBarIconStyle} />;
                            },
                        };
                }}
            />
            {/*<Tab.Screen*/}
                {/*name="News"*/}
                {/*component={NewsStack}*/}
                {/*options={(route) => {*/}
                    {/*return false*/}
                        {/*? {tabBarVisible: false}*/}
                        {/*: {*/}
                            {/*tabBarLabel: 'Tin tức',*/}
                            {/*tabBarIcon: ({focused, color, size}) => {*/}
                                {/*if (focused) {*/}
                                    {/*return <NewsSelectedIcon style={styles.tabBarIconStyle} />;*/}
                                    {/*// return <MyProfileIconSelect style={styles.tabBarIconStyle} />;*/}
                                {/*}*/}
                                {/*return <NewsIcon style={styles.tabBarIconStyle} />;*/}
                            {/*},*/}
                        {/*};*/}
                {/*}}*/}
            {/*/>*/}

            <Tab.Screen
                name="My"
                component={MyStack}
                options={(route) => {
                    return false
                        ? {tabBarVisible: false}
                        : {
                            tabBarLabel: 'Cá nhân',
                            tabBarIcon: ({focused, color, size}) => {
                                if (focused) {
                                    // return <Icon name="user-circle" size={25} color={Style.DEFAUT_RED_COLOR} />
                                    return <UserProfileSelectedIcon style={styles.tabBarIconStyle} />;
                                }
                                // return <Icon name="user-circle" size={25} color={Style.GREY_TEXT_COLOR} />
                                return <UserProfileIcon style={styles.tabBarIconStyle} />;
                            },
                        };
                }}
            />

            <Tab.Screen
                name="Expand"
                component={ExpandStack}
                options={(route) => {
                    return false
                        ? {tabBarVisible: false}
                        : {
                            tabBarLabel: 'Mở rộng',
                            tabBarIcon: ({focused, color, size}) => {
                                if (focused) {
                                    return <Icon name="expand-arrows-alt" size={25} color={Style.DEFAUT_RED_COLOR} />
                                    return <UserProfileSelectedIcon style={styles.tabBarIconStyle} />;
                                }
                                return <Icon name="expand-arrows-alt" size={25} color={Style.GREY_TEXT_COLOR} />
                                return <UserProfileIcon style={styles.tabBarIconStyle} />;
                            },
                        };
                }}
            />



        </Tab.Navigator>
    );
}

function AppStack() {
    return (
        <RootStack.Navigator headerMode="none">
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Login" component={LoginStack} />
            <Stack.Screen name="Booking" component={BookingStack} />
            <Stack.Screen name="News" component={NewsStack} />
            <Stack.Screen name="Notification" component={NotificationStack} />
        </RootStack.Navigator>
    );
}

import {
    createDrawerNavigator,
    DrawerItemList,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();


const logoutFunction = async () => {
    try {
        let keys = ['email','login_token','user_info','username','firebase_token', 'cart_data'];
        await AsyncStorage.multiRemove(keys);
        // AsyncStorage.removeItem('email');
        // AsyncStorage.removeItem('login_token');
        // AsyncStorage.removeItem('user_info');
        // AsyncStorage.removeItem('username');
        // AsyncStorage.removeItem('firebase_token');
        // AsyncStorage.removeItem('cart_data');
    }catch (e){

    }
    RNRestart.Restart();
}

function CustomDrawerContent(props) {
    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    height: Style.HEADER_HEIGHT,
                    backgroundColor: Style.DEFAUT_BLUE_COLOR,
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{padding: 5}}
                    onPress={() => {
                        props.navigation.closeDrawer();
                    }}>
                    <BackIcon width={25} height={25} />
                </TouchableOpacity>
                <Text style={{marginLeft: 30, fontSize: Style.TITLE_SIZE , color: '#fff'}}>
                    {Def.email == null || Def.email == '' ? 'Cài đặt' : Def.email}
                </Text>
                <View />
            </View>
            <DrawerContentScrollView {...props}>
                <View style={{flex: 1}}>
                    {Def.email == null || Def.email == '' ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: PixelRatio.get() < 2 ? 3 :5,
                                paddingHorizontal: 10,
                                marginTop: PixelRatio.get() < 2 ? 6 :10,
                                marginBottom: PixelRatio.get() < 2 ? 6 :10,
                                // backgroundColor : 'red'
                            }}>
                            <TouchableOpacity
                                style={{
                                    width: width * 0.35,
                                    borderRadius: 5,
                                    paddingVertical: PixelRatio.get() < 2 ? 5 :8,
                                    backgroundColor: Style.DEFAUT_BLUE_COLOR,
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    props.navigation.navigate('Login', {screen: 'signIn'});
                                }}>
                                <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}> Đăng nhập </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: width * 0.35,
                                    borderRadius: 5,
                                    paddingVertical: PixelRatio.get() < 2 ? 5 :8,
                                    backgroundColor: Style.DEFAUT_RED_COLOR,
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    props.navigation.navigate('Login', {screen: 'signUp'});
                                }}>
                                <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}> Đăng ký </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: PixelRatio.get() < 2 ? 3 :5,
                                paddingHorizontal: 10,
                                marginTop: PixelRatio.get() < 2 ? 6 :10,
                                marginBottom: PixelRatio.get() < 2 ? 6 :10,
                            }}>
                            <TouchableOpacity
                                style={{
                                    width: width * 0.35,
                                    borderRadius: 5,
                                    paddingVertical: PixelRatio.get() < 2 ? 5 :8,
                                    backgroundColor: 'green',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    // AsyncStorage.removeItem('email');
                                    // AsyncStorage.removeItem('login_token');
                                    // AsyncStorage.removeItem('user_info');
                                    // AsyncStorage.removeItem('username');
                                    // AsyncStorage.removeItem('firebase_token');
                                    // AsyncStorage.removeItem('cart_data');
                                    // RNRestart.Restart();
                                    UserController.logoutLocal();
                                }}>
                                <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}> Đăng xuất </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 5,
                    paddingLeft: 10,
                    zIndex: 10,
                }}>
                <Text style={styles.infoText}>Hotline: 0902798538</Text>
                <Text style={styles.infoText}>Email: admin-eurtile@gmail.com</Text>
                <Text style={styles.infoText}>Website: http://eurotiledev.house3d.net</Text>
                <Text style={styles.infoText}>Phiên bản 1.0</Text>
            </View>
        </View>
    );
}


import Style from './src/def/Style';
import Def from './src/def/Def'

import PrivacyScreen from './src/com/common/PrivacyScreen';
import TermScreen from './src/com/common/TermScreen';


import GuideScreen from "./src/com/common/GuideScreen";
import LoginStack from "./src/views/LoginStack";
import ProductStack from "./src/views/ProductStack";
import NewsStack from "./src/views/NewsStack";
import MyStack from "./src/views/MyStack";
import HomeStack from "./src/views/HomeStack"
import ExpandStack from "./src/views/ExpandStack"
import SchemeStack from "./src/views/SchemeStack"
import BookingStack from "./src/views/BookingStack"
import NotificationStack from "./src/views/NotificationStack"



// function HomeScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 onPress={() => navigation.navigate('Notifications')}
//                 title="Go to notifications"
//             />
//         </View>
//     );
// }

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}



function AppDrawer() {
    const iconSize = PixelRatio.get() <2 ? 18 : 20;
    return (
        <Drawer.Navigator
            drawerStyle={{
                width: width * 0.8,
            }}

            drawerContentOptions={{
                // activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 0, height : PixelRatio.get() < 2 ? 35 :40, paddingVertical:0, justifyContent:'center'},
            }}
             drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Center"
                component={AppStack}
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <GuideIcon width={iconSize} height={iconSize} />;
                    },
                }}
            />
            <Drawer.Screen
                name="Hướng dẫn sử dụng"
                component={GuideScreen}
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <GuideIcon width={iconSize} height={iconSize} />;
                    },
                }}
            />


            <Drawer.Screen
                name="Điều khoản sử dụng"
                component={TermScreen}
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <RuleIcon width={iconSize} height={iconSize} />;
                    },
                }}
            />

            <Drawer.Screen
                name="Chính sách bảo mật"
                component={PrivacyScreen}
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <PolicyIcon width={iconSize} height={iconSize} />;
                    },
                }}
            />
        </Drawer.Navigator>
    );
}

//import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import UserController from "./src/controller/UserController";

// messaging().getToken().then((token) => {
//     console.log("Token " +   JSON.stringify(token));
// } );

 messaging().subscribeToTopic('all').then(() => console.log('Subscribed to topic!'));

messaging().getToken().then((token) => {
    console.log("Token " +   JSON.stringify(token));
} );






export default class App extends Component {
    state = {
        showNoti:false,
        noti:"Thông báo từ hệ thống Eurotile-Center",
    };
    constructor(props) {
        super(props);
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                Def.login_token = value;
                NetNews.listNews(this.onNewSuccess, this.onNewFailed);
            }
        });

        this.onGetProductSuccess = this.onGetProductSuccess.bind(this);
        this.onGetProductFalse = this.onGetProductFalse.bind(this);
        this.onDesignSuccess = this.onDesignSuccess.bind(this);
        this.onDesignFalse = this.onDesignFalse.bind(this);

        this.onPopularDesignSuccess = this.onPopularDesignSuccess.bind(this);
        this.onPopularDesignFalse = this.onPopularDesignFalse.bind(this);

        this.onDesignCateSuccess = this.onDesignCateSuccess.bind(this);
        this.onDesignCateFalse = this.onDesignCateFalse.bind(this);
        this.setDisplayNoti = this.setDisplayNoti.bind(this);
        this.setHideNoti = this.setHideNoti.bind(this);




        NetCollection.listCollection(this.onCollectionSuccess, this.onNewFailed);
        NetNews.listNews(this.onNewSuccess, this.onNewFailed);



        // AsyncStorage.getItem('access_token').then((value) => {
        //     if (value) {
        //         Def.login_token = value;
        //         console.log(Def.login_token);
        //         console.log('load new collection');
        //         NetCollection.listCollection(this.onCollectionSuccess, this.onNewFailed);
        //     }
        // });

        AsyncStorage.getItem('user_info').then((value) => {
             if(value){
                 Def.user_info = JSON.parse(value);
                 Def.username = Def.user_info['user_name'];
                 Def.email = Def.user_info['email'];
             }
        });

        UserController.requestUserPermission();
        // if(!Def.news_data){
        // }

    }

    onGetProductSuccess(data){
        Def.product_data = data["data"];
    }


    onGetProductFalse(data){
        console.log(" False data : " + data);
    }

    onNewSuccess(data){
        Def.news_data = data['data'];
        console.log('Data News : ');
    }

    onCollectionSuccess(data){
        console.log('onCollectionSuccess : ');
        Def.collection_data = data['data'];
    }

    onDesignSuccess(data){
        Def.design_data = data['data'];
    }

    onDesignFalse(data){
        console.log('Get Design False');
    }

    onPopularDesignSuccess(data){
        console.log('onPopularDesignSuccess : ');

        Def.popular_design = data['data'];
    }


    onPopularDesignFalse(data){
        console.log('Get Popular Design False');
    }

    onDesignCateSuccess(data){
        Def.design_cate = data['data'];
    }

    onDesignCateFalse(data){
        console.log('Get Design Cate False');
    }


    onNewFailed(data){
        console.log('onNewFailed d: ' + JSON.stringify(data));
    }



    componentDidMount() {
        SplashScreen.hide();
        console.log('Get Product Info From Scratch');
        NetCollection.getProductList(this.onGetProductSuccess, this.onGetProductFalse);
        NetScheme.getAllDesign(this.onDesignSuccess, this.onDesignFalse);
        NetScheme.getPopularDesign(this.onPopularDesignSuccess, this.onPopularDesignFalse);
        NetScheme.getDesignCategory(this.onDesignCateSuccess, this.onDesignCateFalse);

        OrderController.getOrder();


        AsyncStorage.getItem('cart_data').then((value) => {
            if(value){
                Def.cart_data = JSON.parse(value);
            }
        });

        AsyncStorage.getItem('order').then((value) => {
            if(value){
                Def.order = JSON.parse(value);
            }
        });

        AsyncStorage.getItem('partnerlevelInfo').then((value) => {
            if(value){
                Def.partnerlevelInfo = JSON.parse(value);
            } else {
                PartnerController.getPartnerLevel();
            }
        });

        AsyncStorage.getItem('popularNews').then((value) => {
            if(value){
                Def.popularNews = JSON.parse(value);
            } else {
                console.log('Async Storage PopularNews not exits');
            }
        });



        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                setLoading(false);
            });








        messaging().onMessage(async (remoteMessage) => {
            this.setState({noti:remoteMessage && remoteMessage.notification ? remoteMessage.notification.body :"", showNoti:true});
            console.log("Remote Message : " + JSON.stringify(remoteMessage));

            //
            //alert(JSON.stringify(remoteMessage));
            // Alert.alert(
            //     remoteMessage.notification.title,
            //     remoteMessage.notification.body,
            //     [
            //         {
            //             text: 'Bỏ qua',
            //             onPress: () => console.log('Cancel Pressed'),
            //             style: 'cancel',
            //         },
            //         {
            //             text: 'Đồng ý',
            //             onPress: () => {
            //                 goLink(remoteMessage.data.url);
            //             },
            //         },
            //     ],
            //     {cancelable: false},
            // );
        });

    }

    setDisplayNoti = () => {
      this.setState({showNoti:true});
    };

    setHideNoti = () => {
        this.setState({showNoti:false});
    };


    render() {
        return (
            <NavigationContainer>
                <StatusBar backgroundColor={Style.DEFAUT_BLUE_COLOR} />
                <AppDrawer />
                <View>
                    <Modal isVisible={this.state.showNoti}  coverScreen={true} hasBackdrop={true}
                           backdropOpacity={0}
                           onBackdropPress={this.setHideNoti}
                           // deviceWidth={width}
                           // deviceHeight={500}
                    >
                        <TouchableOpacity style={[styles.modalView,{backgroundColor:'#fff', width:0.9 * width}]}>
                            {/*<View style={{flexDirection:'row', justifyContent:'space-between'}} >*/}
                                {/*<View/>*/}
                                <TouchableOpacity style={{width:30,height:30, padding:2, position:'absolute', zIndex:25, right:-10 , top: -10 }}
                                    onPress={this.setHideNoti}
                                    >
                                    <Icon name="times" size={25} color={Style.DEFAUT_RED_COLOR} />
                                </TouchableOpacity>

                            {/*</View>*/}
                            <View style={{marginLeft: 5,marginRight:10, marginTop:10}}>
                                <Text style={[Style.text_styles.titleTextNotBold, {}]}>
                                    {this.state.noti}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </Modal>
                </View>
            </NavigationContainer>
        );

    }
}
