import Net from "../net/Net";
import Def from "../def/Def";


import {Alert, Platform} from 'react-native'



export default class NotificationController{

    constructor(props){
        supper(props);
        this._responseInfoCallback = this._responseInfoCallback.bind(this);
    }

    static setScreenView(screen_name){

    }

    static async getNotificationByCondition( successCallback, falseCallback, userId = '', type = ''){
        let params={user_id:userId}
        Net.sendRequest(successCallback,falseCallback,Def.URL_BASE + '/api/fcm/get-notification' , Def.POST_METHOD, params );
    }
}
