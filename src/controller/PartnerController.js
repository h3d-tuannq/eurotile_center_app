import Net from "../net/Net";
import Def from "../def/Def";

import {Alert, Platform} from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage'

export default class PartnerController{
    static getPartnerLevel(callback,errCallback ) {
            Net.sendRequest(callback ? callback : this.getPartnerLevelSuccess,errCallback? errCallback: this.getPartnerLevelFalse ,Def.URL_BASE + "/api/partner/get-partner-level" ,Def.POST_METHOD);
    }

    static getPartnerLevelSuccess(data){
        if(data['result'] == 1) {
            Def.partnerlevelInfo = data['data'];
            AsyncStorage.setItem('partnerlevelInfo', JSON.stringify(Def.partnerlevelInfo));
        }
    }

    static getPartnerLevelFalse(data){
        console.log("getPartnerLevelFalse : " + JSON.stringify(data));
    }
}
