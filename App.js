import * as React from 'react';

import {Component, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,StatusBar, PixelRatio

} from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import RadioIcon from './assets/icon/icon-radio.svg';
import RadioIconSelect from './assets/icon/icon_radio_select.svg';

import BackIcon from './assets/icon/icon-back.svg';


import PolicyIcon from './assets/icon/icon-policy.svg';
import GuideIcon from './assets/icon/icon-how-to-use.svg'
import AlarmIcon from './assets/icon/icon-sleep-time.svg'
import FeedbackIcon from './assets/icon/icon-feedback2.svg'
import RuleIcon from './assets/icon/icon-rule.svg';

const {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

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
            {!(
                state.index == 1  &&
                state.routes[1] &&
                state.routes[1].state &&
                state.routes[1].state.routes &&
                state.routes[1].state.routes[state.routes[1].state.index].state.index == 1) ? (
                <View />
            ) : (
                <View />
            )}
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
            tabBar={(props) => <MyTabBar {...props} item={program} />}
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
                name="Home"
                component={RadioStack}
                options={(route) => {
                    return route.route.state &&
                    route.route.state.routes &&
                    route.route.state.routes[1] &&
                    route.route.state.routes[1].params.screen == 'player'
                        ? {tabBarVisible: false}
                        : {
                            tabBarLabel: 'Radio',
                            tabBarIcon: ({focused, color, size}) => {
                                analytics().setCurrentScreen(Def.TAB_RADIO);
                                if (focused) {
                                    return <RadioIconSelect style={styles.tabBarIconStyle} />;
                                }
                                return <RadioIcon style={styles.tabBarIconStyle} />;
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
            <Stack.Screen name="Login" component={LoginStack} />
        </RootStack.Navigator>
    );
}

import {
    createDrawerNavigator,
    DrawerItemList,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import {Container, Content, Header, Left, Body, Icon} from 'native-base';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    height: Style.HEADER_HEIGHT,
                    backgroundColor: Style.DEFAUT_RED_COLOR,
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
                <Text style={{marginLeft: 30, fontSize:(Def.email == null || Def.email == '') ? Style.TITLE_SIZE : Style.NORMAL_SIZE, color: '#fff'}}>
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
                                    AsyncStorage.removeItem('email');
                                    AsyncStorage.removeItem('firebase_token');
                                    RNRestart.Restart();
                                }}>
                                <Text style={{fontSize: Style.TITLE_SIZE, color: '#fff'}}> Đăng xuất </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <DrawerItemList {...props} />
                    {/*<DrawerItem*/}
                    {/*label="Help"*/}
                    {/*onPress={() => {console.log('item click')}}*/}
                    {/*/>*/}
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
                <Text style={styles.infoText}>Hotline: (024).38256622</Text>
                <Text style={styles.infoText}>Email: trungtamkythuatvov@gmail.com</Text>
                <Text style={styles.infoText}>Website: http://kythuatvov.vn</Text>
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

function AppDrawer() {
    const iconSize = PixelRatio.get() <2 ? 18 : 20;
    analytics().setCurrentScreen(Def.SCREEN_APP_DRAWER);
    return (
        <Drawer.Navigator
            drawerStyle={{
                width: width * 0.8,
            }}

            drawerContentOptions={{
                // activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 0, height : PixelRatio.get() < 2 ? 35 :40, paddingVertical:0, justifyContent:'center'},
            }}

            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            {/*<Drawer.Screen*/}
                {/*name="Eurotile Center"*/}
                {/*component={AppStack}*/}
                {/*options={{*/}
                    {/*drawerIcon: ({focused: boolean, color: string, size: number}) => {*/}
                        {/*return <NotiIcon width={iconSize} height={iconSize} />;*/}
                    {/*},*/}
                {/*}}*/}
            {/*/>*/}
            <Drawer.Screen
                name="Góp ý, báo lỗi"
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <FeedbackIcon width={iconSize} height={iconSize} />;
                    },
                }}>
                {(props) => (
                    <FeedbackScreen
                        {...props}
                        title={'Góp ý phản hồi'}
                        hidePlayer={true}
                    />
                )}
            </Drawer.Screen>

            <Drawer.Screen
                name="Hẹn giờ tắt"
                component={ShutDownAlarmModal}
                options={{
                    drawerIcon: ({focused: boolean, color: string, size: number}) => {
                        return <AlarmIcon width={iconSize} height={iconSize} />;
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

export default class App extends Component {
    state = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {


    }


    render() {
        return (
            <NavigationContainer>
                <StatusBar backgroundColor={Style.DEFAUT_RED_COLOR} />
                <AppDrawer />
            </NavigationContainer>
        );

    }
}
