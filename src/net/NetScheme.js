import Def from '../def/Def';
import Net from './Net';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class NetScheme{

    static getAllDesign(callback,errCallback ) {
        console.log('get collection');
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/design/get-design" ,Def.POST_METHOD);
    }

    static getPopularDesign(callback,errCallback ) {
        console.log('get collection');
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/design/get-popular-design" ,Def.POST_METHOD);
    }
    static getDesignCategory(callback,errCallback ) {
        console.log('get collection');
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/design/get-design-category" ,Def.POST_METHOD);
    }

}

