import Net from "../net/Net";
import Def from "../def/Def";
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class OrganController{

    static getVirtualStore(callback,errCallback ) {
        Net.sendRequest(callback,errCallback, Def.LIFE_STYLE_BASE + "/api/organ/get-virtual-store" ,Def.POST_METHOD);
    }
    // static getProductList(callback, errCallback){
    //     Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/organ/get-virtual-store" ,Def.POST_METHOD);
    // }
}

