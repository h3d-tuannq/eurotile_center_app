import React, {Component} from 'react'
import {Text, Image, StyleSheet, View, TextInput, Dimensions, TouchableOpacity, Button} from 'react-native'
import Style from "../../../src/def/Style";
import FacebookIcon from "../../../assets/icon/icon-facebook.svg";
import GoogleIcon from "../../../assets/icon/icon-google.svg";
import UserController from "../../controller/UserController";
import ImagePicker  from 'react-native-image-picker'
import Def from '../../def/Def';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const {width,height} = Dimensions.get('window');

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus : 0,
            display_name : "",
            email:"",
            password:"",
            re_password:"",
            isPartner:false,
            avatarSource:{uri:Def.URL_DEFAULT_AVATAR},

        }
        this.signUp = this.signUp.bind(this);
    }
    signUp(){
        if(!this.state.email.includes("@", 0) && !this.state.email.includes(".", 0)){
            alert("Email không đúng định dạng");
        }else if(this.state.password != this.state.re_password){
            alert("Mật khẩu và mật khẩu xác nhận phải giống nhau");
        } else if(this.state.password.length < 6){
            alert("Mật khẩu phải dài hơn 8 ký tự");
        }else{
            const {navigation} = this.props;
            UserController.signup(this.state.email, this.state.password ,this.state.display_name,navigation);
        }
    }
    render() {
        const {navigation} = this.props;

        return (
            <View style={Style.login_style.wraper}>

                <View style={[loginform, {marginTop:-10}]}>
                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 1 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
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
                        style={this.state.focus == 1 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
                        value={this.state.email}
                        onChangeText={text => this.setState({email:text})}
                        placeholder='Nhập Email'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />
                    <TextInput
                        onFocus={() => this.setState({focus:2})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 2 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
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
                        style={this.state.focus == 2 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
                        value={this.state.re_password}
                        onChangeText={text => this.setState({re_password:text})}
                        secureTextEntry={true}
                        placeholder='Nhập lại mật khẩu'
                        autoCapitalize = 'none'
                        placeholderTextColor="#b3b3b3"
                    />


                    <View style={{flexDirection: 'row', justifyContent : 'flex-end', alignItems : 'center' , marginTop:10 }}>
                        <TouchableOpacity style={{alignItems: 'center', marginRight : 20}} onPress={()=> {
                            navigation.navigate('forgetPass');
                        }}>
                            <Text style={{fontSize:Style.MIDLE_SIZE, color:'#b3b3b3'}}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.login_style.loginButton} onPress={()=>this.signUp()}>
                            <Text style={loginText}>
                                Đăng ký
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{alignItems: 'center', marginTop : 20, paddingVertical: 5,marginRight : 20, flexDirection : 'row'}} onPress={()=> {
                        navigation.navigate('signIn');
                    }}>
                        <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                            Tài khoản bạn đã sẵn sàng?
                        </Text>
                        <Text style={{fontSize:Style.MIDLE_SIZE, marginLeft:5 , color:Style.DEFAUT_RED_COLOR}}>
                            Đăng nhập ngay
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Style.login_style.button, {backgroundColor:'#1976d2'}]} onPress={()=> FirebaseController.facebookLogin(navigation)}>
                        <FacebookIcon style={Style.login_style.icon}/>
                        <Text style={Style.login_style.buttonText}>
                            Đăng nhập với Facebook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Style.login_style.button, {backgroundColor:'#ffffff'}]} onPress={()=> FirebaseController.googleLogin(navigation)}>
                        <GoogleIcon style={Style.login_style.icon}/>
                        <Text style={[Style.login_style.buttonText, {color: '#b3b3b3'}]}>
                            Đăng nhập với Google
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
