import Def from '../def/Def';
import Net from './Net';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class NetCollection{

    static listCollection(callback,errCallback ) {
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/collection/get-collection" ,Def.POST_METHOD);
    }
    static getProductList(callback, errCallback){
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/product/get-product" ,Def.POST_METHOD);
    }
}

