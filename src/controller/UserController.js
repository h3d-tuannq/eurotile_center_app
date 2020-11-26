import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager, AccessToken , GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {Alert, Platform} from 'react-native'

GoogleSignin.configure({
    webClientId: Def.WEB_CLIENT_ID,
});


export default class UserController{

    constructor(props){
        supper(props);
        this._responseInfoCallback = this._responseInfoCallback.bind(this);
    }

    static setScreenView(screen_name){
    }


    static googlesignOut = async () => {
    };

    static onUpdateSuccess(data){
        console.log('Update success');
        UserController.updateData(data);

        // if(Def.setLoader)
        //     Def.setLoader(false);
        Def.mainNavigate.navigate('My');
        Def.REFESH_SCREEN.push('my-screen', 'update-partner-screen');

        // if(Def.refreshDashBoard)
        //     Def.refreshDashBoard();


    }

    static onLoginSuccess(data){
        try {
            if(data){
                console.log('data login success' + JSON.stringify(data));
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

        Def.REFESH_SCREEN.push('my-screen', 'update-partner-screen');
        // if(Def.setLoader)
        //     Def.setLoader(false);
        //
        // if(Def.refreshDashBoard)
        //     Def.refreshDashBoard();
        //
        // Def.mainNavigate.navigate('My');
    }


    static logout(){
    }

    static onLoginFailed(data){
    }

    static async  googleLogin(navigation=null) {
        try {
            await GoogleSignin.hasPlayServices();
            console.log("hasPlayServices");
            const data = await GoogleSignin.signIn();
            console.log("Data :" + JSON.stringify(data));
            const {accessToken, idToken} = data;
            const credential = auth.GoogleAuthProvider.credential( idToken, accessToken,);
            const googleUserCredential = await auth().signInWithCredential(credential);

            auth().currentUser.getIdToken( true).then(function(idToken) {
                console.log(`TOKEN: ${idToken}`);
                if(navigation)
                    navigation.navigate('Product');
                AsyncStorage.setItem('firebase_token', idToken);

                const result = {};
                result.oauth_client = 'google';
                result.token = idToken;
                result.email = data.user.email;
                result.name = data.user.name;
                result.id = data.user.id;
                result.first_name = data.user.givenName;
                result.last_name = data.user.familyName;
                result.photo = data.user.photo;
                UserController.loginFirebase(result);

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
            // if(  Def.setLoader)
            //     Def.setLoader(false);
        }
    };



    static async facebookLogin(navigation=null) {
        // if (Platform.OS === "android") {
        //     LoginManager.setLoginBehavior("web_only")
        // }
        LoginManager.setLoginBehavior("web_only")
        console.log('Start login facebook : ');
            const result = await LoginManager.logInWithPermissions([ 'email', 'public_profile']);

        console.log('Facebook result data : ' + JSON.stringify(result));
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        } else {
            console.log("Data" + JSON.stringify(data));
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential);

        const request = new GraphRequest(
            '/me',
            {
                accessToken: data.accessToken,
                parameters: {
                    fields: {
                        string: 'id,first_name,last_name,name,email,gender,address,birthday'
                    }
                }
            }, (error, result) => {
                if (error) {
                    console.log("Error : " + JSON.stringify(error));
                } else {
                    console.log("result : " + JSON.stringify(result));
                    result.oauth_client = 'facebook';
                    result.token = data.accessToken;
                    this.loginFirebase(result);

                }
            }
        )

        new GraphRequestManager().addRequest(request).start();


        // const infoRequest = new GraphRequest(
        //     '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
        //     null,
        //     this._responseInfoCallback
        //
        // );
        // try {
        //     console.log('STart get info');
        //     new GraphRequestManager().addRequest(infoRequest).start();
        //     console.log('end get info');
        // }catch (err) {
        //     console.log(JSON.stringify(err));
        // }

    }

    _responseInfoCallback(rs) {
        console.log("Call back facebook graph API");
        console.log('Error fetching data: ' + JSON.stringify(rs));
    }

    static async  login(email, password ,navigation=null, successCallback, falseCallback) {

        let param = {'username' : email, 'password' : password};

        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/login' , Def.POST_METHOD , param);
        if(Def.setLoader)
            Def.setLoader(false);

        navigation.navigate('Home');
    };

    static async  loginFirebase(param ,navigation=null, successCallback, falseCallback) {

        // let param = {'email' : params.email, 'name' : params.name};

        console.log('Login with firebase' + JSON.stringify(param));

        Net.sendRequest(this.onLoginFirebaseSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/firebase-login' , Def.POST_METHOD , param);
        // if(Def.setLoader)
        //     Def.setLoader(false);

        // navigation.navigate('Home');
    };

    static async getCities ( ){
        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/city' , Def.POST_METHOD);
    }


    static async  signup(email, password , displayName,navigation=null, successCallback, falseCallback) {

        let param = {'display_name' : displayName, 'email' : email ,'password' : password, 'password_confirm' : password};

        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/sign-up' , Def.POST_METHOD , param);
        if(Def.setLoader)
            Def.setLoader(false);

        navigation.navigate('My', {'screen':'update-partner'});
    };

    static async  updatePartnerInfo(updateInfo, navigation = null, successCallback, falseCallback) {
        Net.uploadImage(this.onUpdateSuccess,this.onLoginFalse,'https://eurotiledev.house3d.net/api/user/update-partner' , Def.POST_METHOD , updateInfo, 'multipart/form-data');
        // if(Def.setLoader)
        //     Def.setLoader(false);
        navigation.navigate('My', {'screen':'my-screen'});
        // if(navigation)
        //     navigation.navigate('Home');
    };


    static onLoginFirebaseSuccess(data){

        console.log('Login Success');
        // console.log("onLoginFirebaseSuccess: " + JSON.stringify(data));
        var is_new = false;
        try {
            if(data){
                is_new = data['is_new'];
                data = data['user'];

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

        Def.REFESH_SCREEN = ['my-screen', 'update-partner-screen'];

        // if(Def.setLoader)
        //     Def.setLoader(false);
        //
        // if(Def.refreshDashBoard)
        //     Def.refreshDashBoard();

        if(is_new){
            console.log('Goto update Partner');
            Def.mainNavigate.navigate('My', {'screen':'update-partner'});
        } else {
            console.log('Goto My-Screen');
            Def.mainNavigate.navigate('My', {'screen':'my-screen', params: { userInfo: Def.user_info}});
        }
    }

    static updateData(userData){
        try {
            if(userData){
                let acess_token = userData['access_token'];
                AsyncStorage.setItem('access_token', `Bearer ${acess_token}`);
                AsyncStorage.setItem('user_info', JSON.stringify(userData));
                AsyncStorage.setItem('email', userData['email']);
                Def.login_token = `Bearer ${acess_token}`;
                Def.email = userData['email'];
                Def.username = userData['username'];
                Def.user_info = userData;
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

    static onSetNotiSuccess(data){

        console.log("onLoginSuccess");
        //console.log(data);
        if(data['success']){
            token = data["data"]["token"];
            AsyncStorage.setItem('login_token', `Bearer ${token}`);
            Def.login_token = `Bearer ${token}`;
            console.log(Def.login_token);
        }else{
            //FirebaseController.onLoginFailed(data["data"]["message"]);
        }

    }


    static onSetNotiFailed(data){

        console.log("onLoginFailed");
        //console.log(data);
    }

    static async requestUserPermission () {
        // console.log("request token");
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken);
                // console.log("Your Firebase Token is:", fcmToken);

                Def.notification_token = fcmToken;
                AsyncStorage.setItem('notification_token', fcmToken);

                AsyncStorage.getItem("email").then((value) => {
                    if (value){
                        Def.email = value;
                    }
                    // NetUser.setNotification(FirebaseController.onSetNotiSuccess,FirebaseController.onSetNotiFailed);
                }).done();



            } else {
                // console.log("Failed", "No token received");
            }

            console.log('Authorization status:', authStatus);
        } else {
            // console.log("Firebase not enable");
        }
    }


}
