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
        let params={partner_id:"", cskh_id:cskh_id , customer_type: customer_type, phone: phone, customer_name:customer_name}
        Net.sendRequest(successCallback,falseCallback,Def.URL_BASE + '/api/customer/get-customer' , Def.POST_METHOD, params );
    }

    static async  saveCustomer(customerInfo, navigation = null, successCallback, falseCallback) {
        Net.sendRequest(successCallback ? successCallback :this.saveSuccess, falseCallback? falseCallback : this.onSaveFalse,'https://eurotiledev.house3d.net/api/customer/save-customer' , Def.POST_METHOD , customerInfo, 'multipart/form-data');

    };

    static  onSaveFalse(data){
        console.log('Save customer false : ' + JSON.stringify(data));
    }

    static saveSuccess(data){
        console.log('Save customer success' + JSON.stringify(data));
    }







}
