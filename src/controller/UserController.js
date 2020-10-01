import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'


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
        Net.sendRequest(successCallback,falseCallback,'https://eurotiledev.house3d.net/api/user/login' , Def.POST_METHOD , param);
    };

    static onLoginSuccess(data){
        console.log("on login success");
        if(data){
            let acess_token = data['access_token'];
            AsyncStorage.setItem('access_token', `Bearer ${token}`);
            AsyncStorage.setItem('user_info', data);
            Def.login_token = `Bearer ${token}`;
        }

    }

    static onLoginFalse(){
        console.log('Login false');
    }


    static resetPassword(email){
    }

}
