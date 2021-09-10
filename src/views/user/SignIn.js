import React, {Component} from 'react'
import {
    Text,
    Image,
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Modal,PixelRatio, Keyboard
} from 'react-native'
import Style from "../../../src/def/Style";
import FacebookIcon from '../../../assets/icon/icon-facebook.svg'
import GoogleIcon from '../../../assets/icon/icon-google.svg'
import Def from "../../../src/def/Def";
import UserController from  "../../../src/controller/UserController"
import { AppleButton } from '@invertase/react-native-apple-authentication';

const {width,height} = Dimensions.get('window');

const LoadingModal = (props) => (
    <Modal onRequestClose={() => {console.log('test')}} visible={props.visible} transparent={true} styles={{backgroundColor : '#green'}} >
        <View style={{ justifyContent : 'center', alignItems:'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#0c5890"/>
        </View>
    </Modal>
)

export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus : 0,
            email:"",
            password:"",
            isLoging : false,
        }
        this.signIn = this.signIn.bind(this);
        this.setLoader = this.setLoader.bind(this);
        this.loginFalseCallback = this.loginFalseCallback.bind(this);
        this.loginFalseCallback = this.loginFalseCallback.bind(this);
        Def.setLoader = this.setLoader;
        Def.setIsLogin = this.setLoader;
    }

    setLoader(isLoging){
        this.setState({isLoging:isLoging});
    }

    signIn(){
        if(!this.state.email.includes("@", 0) && !this.state.email.includes(".", 0)){
            alert("Email không đúng định dạng");
        } else if(this.state.password.length < 6){
            alert("Mật khẩu phải dài hơn 8 ký tự");
        }else{
            const {navigation} = this.props;
            this.setState({isLoging:true});
             UserController.login(this.state.email,this.state.password,navigation, this.loginSuccessCallback, this.loginFalseCallback);
        }
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow() {
        console.log('Keyboard show');
        // this.setState({showKeyboard : true});
    }

    _keyboardDidHide() {
        console.log('Keyboard hide');
        // this.setState({showKeyboard : false});
    }

    loginSuccessCallback(data){
        this.state.isLoging = false;
        console.log('Login success');
    }

    loginFalseCallback(data){
        alert("Login lỗi " + JSON.stringify(data));

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
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />
                    {/*<Text style={this.state.focus == 2 ? labelInputHover : labelInputNormal}>Password</Text>*/}
                    <TextInput
                        onFocus={() => this.setState({focus:2})}
                        onBlur={()=> this.setState({focus:0})}
                        style={this.state.focus == 2 ? Style.login_style.textInputHover : Style.login_style.textInputNormal}
                        value={this.state.password}
                        onChangeText={text => this.setState({password:text})}
                        secureTextEntry={true}
                        placeholder='Nhập mật khẩu'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        underlineColorAndroid = "transparent"
                    />

                    <View style={{flexDirection: 'row', justifyContent : 'flex-end', alignItems : 'center' , marginTop:10 }}>
                        <TouchableOpacity style={{alignItems: 'center', marginRight : 20}} onPress={()=> {
                            navigation.navigate('forgetPass');
                        }}>
                            <Text style={{fontSize:Style.MIDLE_SIZE, color:'#b3b3b3'}}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.login_style.loginButton} onPress={()=>this.signIn()}>
                            <Text style={Style.login_style.loginText}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <LoadingModal visible={this.state.isLoging}/>

                    <TouchableOpacity style={{alignItems: 'center', marginTop : 20, paddingVertical: 5,marginRight : 20, flexDirection : 'row', maxWidth: width -20}} onPress={()=> {
                        navigation.navigate('signUp');
                    }}>
                        <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                            Bạn chưa có tài khoản?
                        </Text>
                        <Text style={{fontSize:Style.MIDLE_SIZE, marginLeft:5 , color:Style.DEFAUT_RED_COLOR}}>
                            Đăng ký ngay
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Style.login_style.button, {backgroundColor:'#1976d2'}]}  onPress={()=>{
                        console.log('test');
                        this.setState({isLoging:true});
                        UserController.facebookLogin(navigation);
                    }}>
                        <FacebookIcon style={Style.login_style.icon}

                        />
                        <Text style={Style.login_style.buttonText}>
                            Đăng nhập với Facebook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Style.login_style.button, {backgroundColor:'#ffffff'}]} onPress={()=> {
                        this.setState({isLoging:true});
                        UserController.googleLogin(navigation);

                    }}>
                        <GoogleIcon style={Style.login_style.icon}
                        />
                        <Text style={[Style.login_style.buttonText, {color: '#b3b3b3'}]}>
                            Đăng nhập với Google
                        </Text>
                    </TouchableOpacity>

                    <AppleButton
                        cornerRadius={5}
                        style={[Style.login_style.button, {backgroundColor:'#ffffff', height : 50, alignItems : 'flex-start'}]}
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        onPress={()=> {
                            // this.setState({isLoging:true});
                            UserController.appleFirebaseLogin(navigation);

                        }}
                    />


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
