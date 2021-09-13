import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity,Alert, Image} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Document from '../../../assets/eurotile/Document.svg';
import Ecatalog from '../../../assets/eurotile/Bookmark.svg';

import Setting from '../../../assets/eurotile/Settings.svg';
import CSKH from '../../../assets/eurotile/Headset.svg';
import QRcode from '../../../assets/eurotile/QR Code.svg';
import Social from '../../../assets/eurotile/People.svg';
import Policy from '../../../assets/eurotile/Privacy Policy.svg';
import Share from '../../../assets/eurotile/Share.svg';
import Logout from '../../../assets/eurotile/Shutdown.svg';



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
        // Def.refreshDashBoard = this.refresh;
        this.buttonClickHandle = this.buttonClickHandle.bind(this);
        this.gotoEcatalogue = this.gotoEcatalogue.bind(this);
    }

    buttonClickHandle = (buttonCode = 0) => {
        switch (buttonCode) {
            case 5:
                this.shareApplication();
                break;
            case 6:
                this.gotoTerm();
                break;
            case 0:
                this.gotoEcatalogue();
                break;
            case 7:
                this.gotoSetupInfo()
                break;
            case 8:
                if(Def.user_info){
                    UserController.logoutLocal();
                }
                break;
            default :
                Alert.alert(
                    'Thông báo',
                    'Chức năng đang phát triển',
                );
                break;

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

    gotoEcatalogue = () => {
        this.props.navigation.navigate('Expand', {'screen':'ecatalogue'});
    }


    gotoSetupInfo = () => {
        this.props.navigation.navigate('Expand', {'screen':'setup-info-screen'});
    }
    render() {
        const {navigation} = this.props;
        const {user} = this.state;
        return (
                <View style={{flex:1, backgroundColor: '#fff'}}>
                   <View style={styles.controlGroup}>
                       <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                           this.buttonClickHandle(0);
                       }}>
                            <Ecatalog width={40} height={40} />
                            <Text style={styles.buttonText}>
                                E-Catalogue
                            </Text>

                       </TouchableOpacity>
                       <TouchableOpacity style={styles.buttonStyle}onPress={() => {
                           this.buttonClickHandle(1);
                       }}>
                           <Document width={40} height={40} />
                           <Text style={styles.buttonText}>
                               Tài liệu kỹ thuât
                           </Text>

                       </TouchableOpacity>
                       <TouchableOpacity style={styles.buttonStyle}onPress={() => {
                           this.buttonClickHandle(2);
                       }}>
                           <QRcode width={40} height={40} />
                           <Text style={styles.buttonText}>
                               QR Code
                           </Text>

                       </TouchableOpacity>
                   </View>

                    <View style={styles.controlGroup}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                            this.buttonClickHandle(3);
                        }}>
                            <Social width={40} height={40} />
                            <Text style={styles.buttonText}>
                                Mạng xã hội
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle}onPress={() => {
                            this.buttonClickHandle(4);
                        }}>
                            <CSKH width={40} height={40} />
                            <Text style={styles.buttonText}>
                                Chăm sóc khách hàng
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle}onPress={() => {
                            this.buttonClickHandle(5);
                        }}>
                            <Share width={40} height={40} />
                            <Text style={styles.buttonText}>
                                Chia sẻ ứng dụng
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={styles.controlGroup}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                            this.buttonClickHandle(6);
                        }}>
                            <Policy width={40} height={40} />

                            <Text style={styles.buttonText}>
                                Điều khoản và chính sách
                            </Text>

                        </TouchableOpacity>
                        {this.state.user ?
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                    this.buttonClickHandle(7);
                                }}>
                                    <Setting width={40} height={40} />
                                    <Text style={styles.buttonText}>
                                        Cài đặt
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                    this.buttonClickHandle(8);
                                }}>
                                    <Logout width={40} height={40} />
                                    <Text style={styles.buttonText}>
                                        Đăng xuất
                                    </Text>

                                </TouchableOpacity>
                            </View>
                            : null }



                    </View>

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
    buttonText : { textAlign :'center'},
    controlGroup: {
        paddingTop:10,
        padding:5,
        marginTop:10,
        flexDirection : 'row',
    },
    buttonStyle: {
        width:width/3,
        alignItems: 'center',
        justifyContent : 'center',
    }



});

export default ExpandScreen;
