import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {Alert} from 'react-native'


export default class UserController{

    static setScreenView(screen_name){
    }


    static googlesignOut = async () => {
    };

    static onLoginSuccess(data){


    }

    static logout(){
    }

    static onLoginFailed(data){
    }

    static async  googleLogin(navigation=null) {
    };

    static async facebookLogin(navigation=null) {

    }

    static async  login(email, password ,navigation=null, successCallback, falseCallback) {

        let param = {'username' : email, 'password' : password};

        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/login' , Def.POST_METHOD , param);
        if(Def.setLoader)
            Def.setLoader(false);

        navigation.navigate('Home');
    };


    static async  signup(email, password , displayName,navigation=null, successCallback, falseCallback) {

        let param = {'display_name' : displayName, 'email' : email ,'password' : password, 'password_confirm' : password};

        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/sign-up' , Def.POST_METHOD , param);
        if(Def.setLoader)
            Def.setLoader(false);

        navigation.navigate('Home');
    };

    static onLoginSuccess(data){
        console.log("on login success 1: " + JSON.stringify(data));
        try {
            if(data){
                let acess_token = data['access_token'];
                AsyncStorage.setItem('access_token', `Bearer ${acess_token}`);
                AsyncStorage.setItem('user_info', JSON.stringify(data));
                AsyncStorage.setItem('email', data['email']);

                Def.login_token = `Bearer ${acess_token}`;
                Def.email = data['email'];
                Def.username = data['username'];
                Def.user_info = data;

            }
        } catch (err){
            console.log('Error : ' + err);
        }



    }

    static onLoginFalse(data){
        console.log('Login false 1');
        Alert.alert(
            'Thông báo',
            JSON.stringify(data),
            [
                {
                    text: 'Ok',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );
    }


    static resetPassword(email){
    }

}
