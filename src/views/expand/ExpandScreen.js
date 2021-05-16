import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import RuleIcon from '../../../assets/icon/icon-rule.svg';
import Style from '../../def/Style';
import AsyncStorage from "@react-native-community/async-storage";

import  UserController from '../../../src/controller/UserController'

const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
class ExpandScreen extends React.Component {
    constructor(props){
        super(props);
        Def.mainNavigate = this.props.navigation;

        this.onGetUserInfoFun = this.onGetUserInfoFun.bind(this);
        if(this.props.navigation){
            console.log('isset naviagtion');
        }
        if(!Def.user_info){
            AsyncStorage.getItem('user_info').then(this.onGetUserInfoFun);
        }
        this.state = {
            user: Def.user_info,
            stateCount: 0.0,
            configMenu: Def.config_collection_menu,
            activeSlide : 0,
        };

        this.gotoContact = this.gotoContact.bind(this);
        this.gotoTerm = this.gotoTerm.bind(this);
        this.shareApplication = this.shareApplication.bind(this);
        this.gotoSetupInfo = this.gotoSetupInfo.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
        Def.refreshDashBoard = this.refresh;

    }

    onGetUserInfoFun(value){
        if(value){
            Def.user_info = JSON.parse(value);
            Def.username = Def.user_info['user_name'];
            Def.email = Def.user_info['email'];
            // this.setState({user:Def.user_info});
            this.refresh();
        }
    }

    onGetUserInfoFun(value){
        if(value){
            Def.user_info = JSON.parse(value);
            Def.username = Def.user_info['user_name'];
            Def.email = Def.user_info['email'];
            // this.setState({user:Def.user_info});
            this.refresh();
        }
    }

    componentDidMount(){
            let {navigation} = this.props;
            navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;

            if(navigation){
                console.log('Add EventListener');
                this.focusListener = navigation.addListener("focus", this.forcusFunction);
            }
    }

    forcusFunction = () => {
        console.log('forcus in');
        this.setState({user:Def.user_info});
    };

    componentWillUnmount() {
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
            this.focusListener.remove();
        }

    }

    signInBtnClick(){
        this.props.navigation.navigate('Login', {'screen': 'signIn'});
    }

    gotoContact = () => {
        this.props.navigation.navigate('Expand', {'screen':'contact-screen'});
    }

    shareApplication = () => {
        this.props.navigation.navigate('Expand', {'screen':'share-app-screen'});
    }

    gotoTerm = () => {
        this.props.navigation.navigate('Expand', {'screen':'term-screen'});
    }


    gotoSetupInfo = () => {
        this.props.navigation.navigate('Expand', {'screen':'setup-info-screen'});
    }
    render() {
        const {navigation} = this.props;
        const {user} = this.state;
        return (
                <View style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR}}>
                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:2}}
                                      onPress={this.gotoContact}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <Icon name="file-signature" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                {'Liên hệ'}
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}
                                      onPress={this.shareApplication}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <Icon name="share" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Chia sẻ ứng dụng
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:2}}
                                      onPress={this.gotoTerm}
                    >
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <RuleIcon width={25} height={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Điều khoản, chính sách sử dụng
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}
                                      onPress={this.gotoSetupInfo}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <View style={{width :30}}>
                                <Icon name="user-cog" size={25} color={Style.GREY_TEXT_COLOR} />
                            </View>
                            <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                Cài đăt thông tin người dùng
                            </Text>
                        </View>
                        <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                    </TouchableOpacity>
                    {
                        user ?
                        <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}
                                          onPress={()=>{UserController.logoutLocal()}}
                        >
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <View style={{width :30}}>
                                    <Icon name="sign-out-alt" size={25} color={Style.GREY_TEXT_COLOR} />
                                </View>
                                <Text style={[Style.text_styles.middleText, {marginLeft :10}]}>
                                    Đăng xuất
                                </Text>
                            </View>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </TouchableOpacity>
                        : null
                    }

                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        paddingLeft: 15,
        // justifyContent: 'flex-start',
        // marginVertical : 5,
        marginBottom : 125,
        backgroundColor: '#fff'
    },
    slider: {
        justifyContent: 'center',
        paddingTop: 5,
        padding: 8,
        height: 120,
        borderRadius: 5,
        backgroundColor: "#e6e6e6",
        marginRight : 15
    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width-20,
        height: width/2,

    },
    programListStyle : {

    },
    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    imageStyle : {
        width : width /3,
        height : width / 3,

        borderRadius: width / 6,
    },
    imageStyleInfo : {
        width : width /8,
        height : width / 8,

        borderRadius: width / 16,
    },
    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 8, marginLeft : 15},

});

export default ExpandScreen;
