import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import {Alert} from 'react-native'

GoogleSignin.configure({
    webClientId: Def.WEB_CLIENT_ID,
});


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
        try {
            console.log("hasPlayServices");
            await GoogleSignin.hasPlayServices();
            console.log("hasPlayServices");
            console.log('test -1');
            const data = await GoogleSignin.signIn();
            console.log('test -12');
            console.log(data);
            const {accessToken, idToken} = data;
            console.log("Token: " + accessToken + "," +  idToken);
            const credential = auth.GoogleAuthProvider.credential( idToken, accessToken,);
            const googleUserCredential = await auth().signInWithCredential(credential);

            auth().currentUser.getIdToken( true).then(function(idToken) {
                console.log(`TOKEN: ${idToken}`);
                if(navigation)
                    navigation.navigate('Home');
                AsyncStorage.setItem('firebase_token', idToken);
                // NetUser.signIn(FirebaseController.onLoginSuccess,FirebaseController.onLoginFailed,idToken);
            }).catch(function(error) {

                console.log(`error: ${error}`);

                analytics().logEvent('google_login', {
                    is: 'failed',
                    message: `error: ${error}`
                } );
            });


            //await auth().signInWithCredential(credential);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow

                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
                alert('test' + JSON.stringify(error));

            }


            if(  Def.setLoader)
                Def.setLoader(false);
        }
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

    static async  updatePartnerInfo(updateInfo, navigation = null, successCallback, falseCallback) {
        Net.uploadImage(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/update-partner' , Def.POST_METHOD , updateInfo, 'multipart/form-data');
        if(Def.setLoader)
            Def.setLoader(false);
        // if(navigation)
        //     navigation.navigate('Home');
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
