import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager, AccessToken , GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {Alert, Platform} from 'react-native'



export default class CustomerController{

    constructor(props){
        supper(props);
        this._responseInfoCallback = this._responseInfoCallback.bind(this);
    }

    static setScreenView(screen_name){

    }

    static async getCustomerByCondition( successCallback, falseCallback, partnerId = null, cskh_id = null, customer_type = null, phone= "", customer_name= null   ){
        let params={partnerId:partnerId, cskh_id:cskh_id , customer_type: customer_type, phone: phone, customer_name:customer_name}
        Net.sendRequest(successCallback,falseCallback,'https://eurotiledev.house3d.net/api/customer/get-customer' , Def.POST_METHOD, params );
    }






}