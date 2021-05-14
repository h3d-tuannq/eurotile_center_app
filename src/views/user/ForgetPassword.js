import React, {Component} from 'react'
import {Text, Image, StyleSheet, View, TextInput, Dimensions, TouchableOpacity} from 'react-native'
import Style from "../../../src/def/Style";
import UserController from "../../controller/UserController";


const {width,height} = Dimensions.get('window');

export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus : 0,
            email:""
        }
        this.resetPassword = this.resetPassword.bind(this);
    }

    resetPassword(){
        if(this.state.email.includes("@", 0) && this.state.email.includes(".", 0)){
            UserController.resetPassword(this.state.email);
            alert("Bạn vui lòng làm theo hướng dẫn trong email để reset password");
            const {navigation} = this.props;
            navigation.navigate('signIn');
        }else{
            alert("Email không đúng định dạng");

        }
    }
    render() {
        const {navigation} = this.props;

        return (
            <View style={Style.login_style.wraper}>
                <View style={[Style.login_style.loginform, {marginTop:-10}]}>
                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 1 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
                        value={this.state.email}
                        onChangeText={text => this.setState({email:text})}
                        placeholder='Nhập Email'
                        autoCapitalize = 'none'
                        placeholderTextColor="#b3b3b3"
                        // underlineColorAndroid = "transparent"
                    />

                    <View style={{flexDirection: 'row', justifyContent : 'flex-end', alignItems : 'center' , marginTop:10 }}>

                        <TouchableOpacity style={[Style.login_style.loginButton, {justifyContent:'center', alignItems:'center'}]}
                                          disabled={this.state.email == null ||  this.state.email == ""} onPress={()=>this.resetPassword()}>

                            <Text style={Style.login_style.loginText}>
                                Gửi Email
                            </Text>
                        </TouchableOpacity>
                    </View>
                <View>
                </View>
                <TouchableOpacity style={[Style.login_style.button, {justifyContent:'center', alignItems:'center'}]} onPress={()=> {
                    navigation.navigate('signIn');
                }}>
                    <Text style={[Style.login_style.buttonText, {marginLeft : 0}]}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
});
