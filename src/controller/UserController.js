import Net from "../net/Net";
import Def from "../def/Def";


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


    static resetPassword(email){
    }

}
