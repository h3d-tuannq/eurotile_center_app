import React, {Component} from 'react'
import {Text, Image, StyleSheet, View, TextInput, Dimensions, TouchableOpacity} from 'react-native'
import Style from "../../../src/def/Style";
import Def from "../../../src/def/Def";
import UserController from "../../controller/UserController";

const {width,height} = Dimensions.get('window');

export default class ChangeUserInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus : 0,
            display_name : Def.user_info && Def.user_info.userProfile ?Def.user_info.userProfile.display_name :"",
            email: Def.user_info ? Def.user_info.email : "",
            oldpass:"",
            password:"",
            re_password:""
        }
        this.updatePass = this.updatePass.bind(this);
        this.clearData = this.clearData.bind(this);
        this.forcusFunction = this.forcusFunction.bind(this);
    }

    clearData(){
        this.setState({
            oldpass:"",
            password:"",
            re_password:""
        });
    }

    updatePass(){
        if(!this.state.display_name){
            alert("Vui nhập tên hiển thị");
            return;
        }else if(!this.state.oldpass &&  !Def.user_info.oauth_client){
            alert("Vui nhập mật khẩu hiện tại");
            return;
        }
        else if(this.state.password != "") {
            if(this.state.password != this.state.re_password && !Def.user_info.oauth_client){
                alert("Mật khẩu và mật khẩu xác nhận phải giống nhau");
                return;
            } else if(this.state.password.length < 6 && !Def.user_info.oauth_client) {
                alert("Mật khẩu phải dài hơn 6 ký tự " + this.state.password);
                return;
            }
        }
        const {navigation} = this.props;
        const params = {'email' : this.state.email, 'password' : this.state.password, 'old_password': this.state.oldpass, 'display_name':this.state.display_name};
        UserController.changePassword(params,navigation, this.clearData);

    }
    componentDidMount() {
        let {navigation} = this.props;
        navigation =  this.props.navigation ? this.props.navigation : Def.mainNavigate ;
        if(navigation){
            this.focusListener = navigation.addListener("focus", this.forcusFunction);
        }

    }

    forcusFunction = () => {
        console.log('forcus function in Change Info');
        const index = Def.REFESH_SCREEN.indexOf('setup-info-screen');
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.clearData();
        }
        return true;
    };


    render() {
        const {navigation} = this.props;
        const {wraper,loginform, loginButton, loginText , labelInputNormal ,
            labelInputHover, textInputHover, textInputNormal, buttonText, button } = styles;

        return (
            <View style={wraper}>

                <View style={[loginform, {marginTop:10}]}>

                    {/*<Text style={{fontSize:Style.BIG_SIZE, fontWeight: 'bold', color: '#000', marginBottom :20}}>*/}
                    {/*Đăng ký*/}
                    {/*</Text>*/}

                    {/*<Text style={this.state.focus == 1 ? labelInputHover : labelInputNormal}>Email</Text>*/}
                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 1 ? textInputHover : textInputNormal}
                        value={this.state.display_name}
                        onChangeText={text => this.setState({display_name:text})}
                        placeholder='Tên hiển thị'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />
                    {
                        Def.user_info && Def.user_info.oauth_client ?
                            <View/> :
                            <View>
                                <TextInput
                                    onFocus={() => this.setState({focus:1})}
                                    onBlur={()=> this.setState({focus:0})}
                                    style={this.state.focus == 1 ? textInputHover : textInputNormal}
                                    value={this.state.oldpass}
                                    onChangeText={text => this.setState({oldpass:text})}
                                    placeholder='Mật khẩu hiện tại'
                                    placeholderTextColor="#b3b3b3"
                                    autoCapitalize = 'none'
                                    secureTextEntry={true}
                                    // underlineColorAndroid = "transparent"
                                />
                                <TextInput
                                    onFocus={() => this.setState({focus:2})}
                                    onBlur={()=> this.setState({focus:0})}
                                    style={this.state.focus == 2 ? textInputHover : textInputNormal}
                                    value={this.state.password}
                                    onChangeText={text => this.setState({password:text})}
                                    secureTextEntry={true}
                                    placeholder='Nhập mật khẩu mới'
                                    autoCapitalize = 'none'
                                    placeholderTextColor="#b3b3b3"
                                />
                                <TextInput
                                    onFocus={() => this.setState({focus:2})}
                                    onBlur={()=> this.setState({focus:0})}
                                    style={this.state.focus == 2 ? textInputHover : textInputNormal}
                                    value={this.state.re_password}
                                    onChangeText={text => this.setState({re_password:text})}
                                    secureTextEntry={true}
                                    placeholder='Nhập lại mật khẩu mới'
                                    autoCapitalize = 'none'
                                    placeholderTextColor="#b3b3b3"
                                />
                            </View>
                    }

                    <TouchableOpacity style={[loginButton, {marginTop:10}]} onPress={()=>this.updatePass()}>
                        <Text style={loginText}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wraper : {flex:1, alignItems: 'center' , backgroundColor: '#fff'},
    loginform : { width : width * 0.95,marginTop:20},
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginTop: 10, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginTop: 10, paddingHorizontal: 10 },
    loginButton : { backgroundColor : Style.DEFAUT_RED_COLOR ,borderRadius : 5, paddingLeft: 20, paddingRight : 10 },
    button : {
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 5, paddingLeft: 20, marginTop : 20, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center',
    },
    icon : {
        width :25,
        height : 25
    },
    loginText : { color:'#fff', fontSize : 18, textAlign : 'center', paddingVertical: 8},
    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 8, marginLeft : 15},
    labelInputNormal : { color:'#9e9e9e', fontSize : 14, marginTop : 20 },
    labelInputHover : { color:'#48a5ea', fontSize : 14, marginTop : 20 },
    logoContainer : {alignItems : 'center', width :  width * 0.8, justifyContent: 'center', paddingBottom : 10 , marginTop: height / 10 },
    logoStyle : {width : width /5 , height : width /5 }
});
