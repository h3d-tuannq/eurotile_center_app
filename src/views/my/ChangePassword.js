import React, {Component} from 'react'
import {Text, Image, StyleSheet, View, TextInput, Dimensions, TouchableOpacity} from 'react-native'
import Style from "../../../src/def/Style";
import Def from "../../../src/def/Def";
import FacebookIcon from "../../../assets/icon/icon-facebook.svg";
import GoogleIcon from "../../../assets/icon/icon-google.svg";
import UserController from "../../controller/UserController";

const {width,height} = Dimensions.get('window');

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus : 0,
            display_name : Def.user_info && Def.user_info.userProfile ?Def.user_info.userProfile.display_name :"",
            email:"",
            password:"",
            re_password:""
        }
        this.signUp = this.signUp.bind(this);
    }

    signUp(){
        if(!this.state.display_name){
            alert("Vui nhập tên hiển thị");
        }else if(this.state.password != this.state.re_password){
            alert("Mật khẩu và mật khẩu xác nhận phải giống nhau");
        } else if(this.state.password.length < 6){
            alert("Mật khẩu phải dài hơn 8 ký tự");
        }else{
            const {navigation} = this.props;
            // UserController.signup(this.state.email,this.state.password, this.state.disableNextPrev,navigation);
        }
    }
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
                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 1 ? textInputHover : textInputNormal}
                        value={this.state.email}
                        onChangeText={text => this.setState({email:text})}
                        placeholder='Mật khẩu hiện tại'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />
                    <TextInput
                        onFocus={() => this.setState({focus:2})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 2 ? textInputHover : textInputNormal}
                        value={this.state.password}
                        onChangeText={text => this.setState({password:text})}
                        secureTextEntry={true}
                        placeholder='Nhập mật khẩu'
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
                        placeholder='Nhập lại mật khẩu'
                        autoCapitalize = 'none'
                        placeholderTextColor="#b3b3b3"
                    />
                    <TouchableOpacity style={[loginButton, {marginTop:10}]} onPress={()=>this.signUp()}>
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
