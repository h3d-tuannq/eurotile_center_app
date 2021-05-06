import React from 'react'
import {Text, View, Button, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

import ProductScreen from './product/ProductScreen'
import CollectionDetailScreen from  './product/CollectionDetailScreen'
import ProductDetailScreen from  './product/ProductDetailScreen'



import BackIconSvg from '../../assets/icon/icon-back.svg'
import Style from "../../src/def/Style";
import Def from "../../src/def/Def";


import CartIcon from '../../assets/icons/cart.svg'


import EurotileLogo from '../../assets/icons/Logo w.svg'

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

class ProductStack extends React.Component {
    // focusListener = null;

    constructor(props){
        super(props);
        this.getOrderNumber = this.getOrderNumber.bind(this);

        this.state = {
          number_order: Def.cart_data.length
        };
        this.goProductList = this.goProductList.bind(this);
        this.goToCreateCustomer = this.goToCreateCustomer.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
        this.updateCartNumber = this.updateCartNumber.bind(this);
        Def.updateCartNumber = this.updateCartNumber;
        this.getOrderNumber = this.getOrderNumber.bind(this);
    }

    goProductList() {
        console.log("Go to Product List");
        if(this.props.navigation){
            this.props.navigation.navigate('Booking', {screen:'cart'});
        }
    }

    goToCreateCustomer() {
        if(this.props.navigation){
            this.props.navigation.navigate('Booking', {screen:'create-customer'});
        }
    }

    getOrderNumber(){
        if(Def.calCartOrderNumber(Def.currentCart.orderItems)  != this.state.number_order){
            let numerOrder = Def.calCartOrderNumber(Def.currentCart.orderItems);
            console.log('Number Order : ' + numerOrder);
            this.setState({number_order:numerOrder});
            console.log('Number state : ' + this.state.number_order);

        }
        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;

        if(navigation){
            console.log('Isset Navigation : ' + JSON.stringify(navigation));
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        }
    }

    updateCartNumber = (number) => {
        console.log('Update Number Order : '+ number);
        this.setState({number_order:number});
    }

    formatOrderNumber(order_number){
        return order_number < 100 ? order_number : '99+';
    }

    shouldComponentUpdate(){
        console.log('Product Stack should update');
        return true;
    }



    componentDidMount(){
        // if(Def.currentCart && Def.currentCart.orderItems) {
        //     console.log('Current Cart exits ');
        //     this.getOrderNumber();
        //
        // } else {
        //     console.log('Current Cart not exits ');
        //     AsyncStorage.getItem('current_cart').then((value) => {
        //         if(value){
        //             Def.currentCart = JSON.parse(value);
        //             this.getOrderNumber();
        //         }
        //     });
        // }

        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;

        if(navigation){
            console.log('Isset Navigation : ' + JSON.stringify(navigation));
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        }
    }

    forcusFunction = () => {
        console.log('forcus Product-Stack');
      this.setState({number_order:Def.currentCart && Def.currentCart.orderItems ? Def.calCartOrderNumber(Def.currentCart.orderItems) : 0});
    };

    componentWillUnmount() {
        // Remove the event listener
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
             this.focusListener.remove();
        }

    }


    render() {
        return (
            <RootStack.Navigator>
                {/*<RootStack.Screen name="mainTv" component={MainStack} />*/}
                <RootStack.Screen name="product-screen" component={ProductScreen} options={{
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
                            onPress={this.goProductList}>
                            { this.state.number_order ?
                                <View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>
                                    <Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>
                                        {this.formatOrderNumber(this.state.number_order)}
                                    </Text>
                                </View>
                                :<View/>
                            }

                            <CartIcon
                                width={Style.CART_ICON_SIZE}
                                height={Style.CART_ICON_SIZE}
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



                <RootStack.Screen name="collection-detail-screen" component={CollectionDetailScreen} options=
                    {({route}) => ({
                    title: route.params.item && route.params.item.name ? route.params.item.name :'Bộ sưu tập',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
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
                            onPress={this.goProductList}>
                            { this.state.number_order ?
                                <View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>
                                    <Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>
                                        {this.formatOrderNumber(this.state.number_order)}
                                    </Text>
                                </View>
                                :<View/>
                            }

                            <CartIcon
                                width={Style.CART_ICON_SIZE}
                                height={Style.CART_ICON_SIZE}
                            />
                        </TouchableOpacity>

                    ),
                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }
                    })}
                />

                <RootStack.Screen name="product-detail" component={ProductDetailScreen} options=
                    {({route}) => ({
                    title: route.params.item && route.params.item.name ? route.params.item.name :'Sản phẩm chi tiết',
                    headerStyle: {
                        backgroundColor: Style.DEFAUT_BLUE_COLOR,
                        height: Style.HEADER_HEIGHT,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
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
                            onPress={this.goProductList}>
                            { this.state.number_order ?
                                <View style={{width:20, zIndex: 1, top:-3, left : -8 ,height:20, borderRadius:10, backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent: 'center', alignItems : 'center', position : 'absolute'}}>
                                    <Text style={{color: 'white', fontSize: this.state.number_order > 10 ? Style.SMALL_SIZE : Style.NORMAL_SIZE}}>
                                        {this.formatOrderNumber(this.state.number_order)}
                                    </Text>
                                </View>
                                :<View/>
                            }

                            <CartIcon
                                width={Style.CART_ICON_SIZE}
                                height={Style.CART_ICON_SIZE}
                            />
                        </TouchableOpacity>

                    ),

                    headerBackImage: ()=> {
                        return <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    }}
                    )
                    } />

            </RootStack.Navigator>
        )
    }
}

export default ProductStack;
