import Def from '../def/Def';
import Net from './Net';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class NetCollection{

    static listCollection(callback,errCallback ) {
        console.log('get collection');
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/collection/get-collection" ,Def.POST_METHOD);
    }
    static getProductList(callback, errCallback){
        console.log('Get Product Info');
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/product/get-product" ,Def.POST_METHOD);
    }
}

