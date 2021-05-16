import Net from "../net/Net";
import Def from "../def/Def";

import {Alert, Platform} from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage'

export default class EurotileController{
    static getCenters(callback,errCallback ) {
            Net.sendRequest(callback ? callback : this.getPartnerLevelSuccess,errCallback? errCallback: this.getPartnerLevelFalse ,Def.URL_BASE + "/api/eurotile/get-center" ,Def.POST_METHOD);
    }

    static getCenterSuccess(data){
        if(data['rs'] == 1) {
            Def.centerInfo = data['data'];
            AsyncStorage.setItem('centerInfo', JSON.stringify(Def.centerInfo));
        }
    }

    static getCenterFalse(data){
        console.log("getPartnerLevelFalse : " + JSON.stringify(data));
    }
}
