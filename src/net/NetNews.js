import Def from '../def/Def';
import Net from './Net';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class NetNews{

    static listNews(callback,errCallback ) {
        console.log("List News");
        Net.sendRequest(callback,errCallback,Def.URL_BASE + "/api/article/news" ,Def.POST_METHOD, {'slug': 'xu-huong-thiet-ke,tin-chuyen-mon,su-kien'});
    }

}

