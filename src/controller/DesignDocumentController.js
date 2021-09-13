import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager, AccessToken , GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {Alert, Platform} from 'react-native'



export default class DesignDocumentController{

    constructor(props){
        supper(props);
    }


    static async getDocumentByCondition( successCallback, falseCallback, CategoryCode = "" , name = ""   ){
        let params={CategoryCode:CategoryCode, name:name}
        Net.sendRequest(successCallback,falseCallback,Def.URL_BASE + '/api/design-document/get-document' , Def.POST_METHOD, params );
    }



}
