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
        // console.log("Order Info: "+ orderInfo);

        Net.sendRequest(successCallback ?successCallback : this.onUpdateSuccess, falseCallback ? falseCallback : this.onSaveFalse, Def.URL_BASE + 'api/order/create-order' , Def.POST_METHOD , orderInfo, 'multipart/form-data');

    };


    static onUpdateSuccess(data){
        console.log('Update Order success: '+ JSON.stringify(data));

        if(data){
            Def.mainNavigate.navigate('Booking', {screen:'order-detail-screen', params:{item:data}});
            let orderIndex = -1;
            if(Def.orderList){
                orderIndex = Def.orderList.findIndex(order => order.id == data.id);
            }
            if(orderIndex === -1){
                Def.orderList.push(data);
                Def.ressetCart();
            } else {
                Def.orderList[orderIndex] = data;
            }

        }
    }

    static onSaveFalse(data){
        console.log("Update Error : " + JSON.stringify(data));
    }


    static getOrder(callback,errCallback ) {
        console.log("Get Order : " + Def.orderList.length);
        if(Def.user_info){
            console.log("Call Get Order");
            Net.sendRequest(callback ? callback : this.getOrderSuccess,errCallback? errCallback: this.getOrderFalse ,Def.URL_BASE + "/api/order/get-order" ,Def.POST_METHOD, {booker_id:Def.user_info['id']});
        } else {
            AsyncStorage.getItem('user_info').then((value) => {
                if(value){
                    Def.user_info = JSON.parse(value);
                    Def.username = Def.user_info['user_name'];
                    Def.email = Def.user_info['email'];
                    Net.sendRequest(callback ? callback : this.getOrderSuccess,errCallback? errCallback: this.getOrderFalse ,Def.URL_BASE + "/api/order/get-order" ,Def.POST_METHOD, {booker_id:Def.user_info['id']});
                }
            });
        }
    }


    static getOrderSuccess(data){
        Def.orderList = data['data'];
        if(Def.refreshStatistical){
            Def.refreshStatistical();
        }
    }

    static getOrderFalse(data){
        console.log("Get Order False : " + JSON.stringify(data));
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
