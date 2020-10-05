import Def from '../def/Def';
import Net from './Net';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class NetCollection{

    static listCollection(callback,errCallback ) {
        Net.sendRequest(callback,errCallback,"https://eurotiledev.house3d.net/api/collection/get-collection" ,Def.POST_METHOD);
    }
}

