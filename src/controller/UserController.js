import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager, AccessToken , GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {Alert, Platform} from 'react-native'
import RNRestart from 'react-native-restart';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

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
        Def.REFESH_SCREEN.push('my-screen', 'update-partner');
        Def.mainNavigate.navigate('My',{screen:'my-screen', params: {'refresh' : true}});

        // if(Def.refreshDashBoard)
        //     Def.refreshDashBoard();


    }

    static async onLoginSuccess(data ){
        console.log('return data');
        try {

            if(data){
                if( data['result'] == 0 ||data['err_code']) {
                    Alert.alert(
                        "Cảnh báo",
                        data['msg'],
                        [
                            {
                                text: "Thử lại",
                                onPress: () => {Def.setIsLogin(false)},
                                style: 'cancel',
                            }
                        ],
                        {cancelable: false},
                    );
                    return ;
                }

                console.log('data login success' + JSON.stringify(data));
                data = data['user'];
                let acess_token = data['access_token'];
                AsyncStorage.setItem('access_token', `Bearer ${acess_token}`);
                AsyncStorage.setItem('user_info', JSON.stringify(data));
                AsyncStorage.setItem('email', data['email']);
                Def.login_token = `Bearer ${acess_token}`;
                Def.email = data['email'];
                Def.username = data['username'];
                Def.user_info = data;

                let token = await messaging().getToken();

                console.log('');


                AsyncStorage.setItem('fcmId', token);
                UserController.registerFcmId(token);

            }
        } catch (err){
            console.log('Error : ' + err);
        }
        Def.REFESH_SCREEN.push('my-screen', 'update-partner', 'update-profile');
        if(Def.mainNavigate){

            if(Def.isSignup) {
                Def.mainNavigate.navigate('My', {'screen':'update-profile'});
                Def.isSignup = false;
            } else {
                console.log("Go to MyScreen");
                Def.mainNavigate.navigate('My', {'screen':'my-screen', params: { userInfo: Def.user_info}});
            }
        }



         // Def.mainNavigate.navigate('My',{screen:'my-screen', params: {'refresh' : true}});
         console.log("Go to MyScreen");

        // if(Def.setLoader)
        //     Def.setLoader(false);
        //
        // if(Def.refreshDashBoard)
        //     Def.refreshDashBoard();
        //
        // Def.mainNavigate.navigate('My');
    }

    static async onChangeInfoSuccess(data ){
        console.log('return data');
        try {
            if(data){
                if( data['result'] == 0 ||data['err_code']) {
                    Alert.alert(
                        "Cảnh báo",
                        data['msg'],
                        [
                            {
                                text: "Ok",
                                style: 'cancel',
                            }
                        ],
                        {cancelable: false},
                    );
                    return ;
                }

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
        Def.REFESH_SCREEN.push('my-screen', 'update-partner', 'update-profile','setup-info-screen');
        if(Def.mainNavigate){
            Def.mainNavigate.navigate('My', {'screen':'my-screen', params: { userInfo: Def.user_info}});
        }
    }


    static onLoginFailed(data){
    }

    static async  googleLogin(navigation=null) {
        try {
            await GoogleSignin.hasPlayServices();
            // console.log("hasPlayServices");
            const data = await GoogleSignin.signIn();
            // console.log("Data :" + JSON.stringify(data));
            const {accessToken, idToken} = data;
            const credential = auth.GoogleAuthProvider.credential( idToken, accessToken,);
            const googleUserCredential = await auth().signInWithCredential(credential);

            auth().currentUser.getIdToken( true).then(function(idToken) {
                // console.log(`TOKEN: ${idToken}`);
                // if(navigation)
                //     navigation.navigate('Product');
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
            if(Def.setIsLogin)
                Def.setIsLogin(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('Cancel login with google!');

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

    static async appleFirebaseLogin (navigation = null) {
        console.log('Apple login start');
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });


        // 2). if the request was successful, extract the token and nonce
        const { identityToken, nonce } = appleAuthRequestResponse;

        // can be null in some scenarios
        if (identityToken) {
            // 3). create a Firebase `AppleAuthProvider` credential
            const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

            // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
            //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
            //     to link the account to an existing user
            const userCredential = await firebase.auth().signInWithCredential(appleCredential);

            // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
            console.log('Login Data ' + JSON.stringify(userCredential));

            let verifyInfo = await AsyncStorage.getItem('verifyInfo');
            if(verifyInfo){
                console.log('verifyInfo is not null' + JSON.stringify(verifyInfo));
                Def.verifyInfo = JSON.parse(verifyInfo);
            }
            // Lan very file dau tien
            if(userCredential.user.email){
                let fullName = userCredential.user.displayName && userCredential.user.displayName.length > 0 ? userCredential.user.displayName  :userCredential.user.providerData[0].displayName;
                console.log("Fullname " + userCredential.user.providerData[0].displayName);
                Def.verifyInfo[userCredential.user.email] = {
                    email : userCredential.user.email,
                    fullName : fullName,
                };
                await AsyncStorage.setItem('verifyInfo', JSON.stringify(Def.verifyInfo));
                const result = {};
                result.oauth_client = 'apple';
                result.token = identityToken;
                result.email = Def.verifyInfo[userCredential.user.email]['email'];
                result.id = userCredential.user.uid;
                result.name = fullName ;
                result.first_name = '';
                result.last_name = '';
                result.photo = userCredential.user.photoURL  && userCredential.user.photoURL.length > 0 ? userCredential.user.photoURL  :userCredential.user.providerData[0].photoURL;
                console.log('Result : ' + JSON.stringify(result));
                if(result.email){

                     UserController.loginFirebase(result);
                }
            }


        } else {
            console.log('Login error');
            // handle this - retry?
        }
    }


    static async appleLogin(navigation = null){
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        console.log('Login Data 1 ' + JSON.stringify(appleAuthRequestResponse));

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated


            let verifyInfo = await AsyncStorage.getItem('verifyInfo');
            if(verifyInfo){
                console.log('verifyInfo is not null' + JSON.stringify(verifyInfo));
                Def.verifyInfo = JSON.parse(verifyInfo);
            }
            // Lan very file dau tien
            if(appleAuthRequestResponse.email){
                Def.verifyInfo[appleAuthRequestResponse.user] = {
                  email : appleAuthRequestResponse.email,
                  fullName : appleAuthRequestResponse.fullName,
                };
                await AsyncStorage.setItem('verifyInfo', JSON.stringify(Def.verifyInfo));
            }

            const result = {};
            result.oauth_client = 'apple';
            result.token = appleAuthRequestResponse.identityToken;


            if(Def.verifyInfo[appleAuthRequestResponse.user]){
                result.email = Def.verifyInfo[appleAuthRequestResponse.user]['email'];
                result.id = appleAuthRequestResponse.user;
                let fullName = Def.verifyInfo[appleAuthRequestResponse.user]['fullName'];
                result.name = fullName['familyName'] + ' ' + fullName['givenName'] ;
                result.first_name = fullName['givenName'];
                result.last_name = fullName['familyName'];
                result.photo = '';
            } else {
                const decodeData = jwt_decode(appleAuthRequestResponse.identityToken);
                result.email = decodeData.email;
                result.id = appleAuthRequestResponse.user;
                result.name = decodeData.email;
                result.first_name = 'Tuan';
                result.last_name = 'Nguyen Quan';
                result.photo = '';
                console.log('Login Data ' + JSON.stringify(decodeData));

            }
            if(result.email){

                UserController.loginFirebase(result);
            }








        }
    }



    static async facebookLogin(navigation=null) {
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
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
        if(navigation){
            Def.mainNavigate = navigation;
        }
        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,Def.URL_BASE + '/api/user/login' , Def.POST_METHOD , param);
        // if(Def.setLoader)
        //     Def.setLoader(false);

        // Def.REFESH_SCREEN.push('my-screen', 'update-partner-screen');
        // navigation.navigate('My', {'screen':'my-screen'});

    };


    static async logout(successCallback, falseCallback){
        let param = {'username': Def.user_info['email'], access_token: Def.user_info['access_token'], fcmId :Def.fcmId};
        if(navigation){
            Def.mainNavigate = navigation;
        }
        Net.sendRequest(this.logoutCallback,this.onLoginFalse,Def.URL_BASE + '/api/user/logout' , Def.POST_METHOD , param);
    }

    static async registerFcmId(fcmId = null, successCallback = null, falseCallback = null){

        messaging().getToken().then((token) => {
            console.log("Token " +   JSON.stringify(token));
        } );

        if(fcmId){
            fcmId = await messaging().getToken();
        }
        Def.fcmId = fcmId;

        let param = { user_id:Def.user_info['id'], 'username': Def.user_info['email'], access_token: Def.user_info['access_token'], fcm_id :fcmId};

        console.log('Register Fcm Params: ' + JSON.stringify(param));

        Net.sendRequest(this.setFcmCallback,this.setFcmCallback,Def.URL_BASE + '/api/user/set-fcm' , Def.POST_METHOD , param);
    }

    static setFcmCallback(data){
        console.log('setFcmResult : ' + JSON.stringify(data));
    }

    static  logoutCallback = async (data) => {
        if(data['err_code']){
            Alert.alert(
                "Cảnh báo",
                data['msg'],
                [
                    {
                        text: "Thử lại",
                        onPress: () => {Def.setIsLogin(false)},
                        style: 'cancel',
                    }
                ],
                {cancelable: false},
            );
            return ;
        }

        try {
            let keys = ['email','login_token','user_info','username','firebase_token', 'cart_data'];
            await AsyncStorage.multiRemove(keys);
        }catch (e){

        }
        RNRestart.Restart();
    }

    static logoutLocal = async () => {
        try {
            let keys = ['email','login_token','user_info','username','firebase_token', 'cart_data', 'current_cart'];

            await AsyncStorage.multiRemove(keys);
            Def.ressetCart();
            if(Def.mainNavigate){
                Def.mainNavigate.navigate('home', {'screen':'home-screen'});
            }
            RNRestart.Restart();

        }
        catch (e){
        }


    }


    static successCallBack = null;

    static async  changePassword(param,navigation=null, successCallback = null, falseCallback) {

        // let param = {'email' : email, 'password' : newPass, 'old_password': oldPassword, 'display_name':displayName};
        if(navigation){
            Def.mainNavigate = navigation;
        }
        Net.sendRequest(this.onChangeInfoSuccess,this.onLoginFalse,Def.URL_BASE + '/api/user/change-account-info' , Def.POST_METHOD , param);

        // if(Def.setLoader)
        //     Def.setLoader(false);

        // Def.REFESH_SCREEN.push('my-screen', 'update-partner-screen');
    };




    static async  loginFirebase(param ,navigation=null, successCallback, falseCallback) {

        // let param = {'email' : params.email, 'name' : params.name};

        console.log('Login with firebase');

        Net.sendRequest(this.onLoginFirebaseSuccess,this.onLoginFalse,Def.URL_BASE + '/api/user/firebase-login' , Def.POST_METHOD , param);
        // if(Def.setLoader)
        //     Def.setLoader(false);

        // navigation.navigate('Home');
    };

    static async getCities ( ){
        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,Def.URL_BASE + '/api/user/city' , Def.POST_METHOD);
    }


    static async  signup(email, password , displayName,navigation=null, successCallback, falseCallback) {

        Def.isSignup = true;

        let param = {'display_name' : displayName, 'email' : email ,'password' : password, 'password_confirm' : password};

        Net.sendRequest(this.onLoginSuccess,this.onLoginFalse,Def.URL_BASE + 'api/user/sign-up' , Def.POST_METHOD , param);
        if(Def.setLoader)
            Def.setLoader(false);


    };

    static async  updatePartnerInfo(updateInfo, navigation = null, successCallback, falseCallback) {
        Net.uploadImage(this.onUpdateSuccess,this.onLoginFalse,Def.URL_BASE + 'api/user/update-partner' , Def.POST_METHOD , updateInfo, 'multipart/form-data');
        // if(Def.setLoader)
        //     Def.setLoader(false);
        navigation.navigate('My', {'screen':'my-screen'});
        // if(navigation)
        //     navigation.navigate('Home');
    };


    static async onLoginFirebaseSuccess(data){

        console.log('Login Success : ' + JSON.stringify(data));
        // console.log("onLoginFirebaseSuccess: " + JSON.stringify(data));
        // return;
        var is_new = false;
        try {
            if(data && data['user']){
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
                let token = await messaging().getToken();
                AsyncStorage.setItem('fcmId', token);
                UserController.registerFcmId(token);

            } else {
                let msg = data['msg'] ? data['msg'] : 'Đăng nhập không thành công.';
                Alert.alert(
                    'Thông báo',
                    'Đăng nhập không thành công.',
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
            if(userData && userData['id']){
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
