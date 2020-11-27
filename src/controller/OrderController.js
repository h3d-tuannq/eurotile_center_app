import Net from "../net/Net";
import Def from "../def/Def";

import AsyncStorage  from '@react-native-community/async-storage'

import {Alert, Platform} from 'react-native'
import UserController from "./UserController";



export default class OrderController{

    constructor(props){
        supper(props);
    }
    static async  saveOrder(orderInfo, navigation = null, successCallback, falseCallback) {
        console.log("Order Info: "+ orderInfo);
        Net.sendRequest(this.onUpdateSuccess,this.onSaveFalse,'https://eurotiledev.house3d.net/api/order/create-order' , Def.POST_METHOD , orderInfo, 'multipart/form-data');

    };


    static onUpdateSuccess(data){
        console.log('Update success');
        OrderController.updateData(data);
        // Def.mainNavigate.navigate('My');
        // Def.REFESH_SCREEN.push('my-screen', 'update-partner-screen');
    }

    static onSaveFalse(data){
        console.log("Update Error : " + JSON.stringify(data));
    }

    static updateData(userData){
        return true;
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
}
