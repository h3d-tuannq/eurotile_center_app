
export default class Def{
    static URL_BASE = "https://eurotiledev.house3d.net";
    static URL_CONTENT_BASE = "https://eurotiledev.house3d.net/data/eurotileData/";
    static URL_DEFAULT_AVATAR = "https://cdn-content1.house3d.com/uploads/2019/07/02/5d1aa12048236.jpg";



    // token nhận được sau khi đăng nhập để gửi lên server lấy token user
    static firebase_token = '';
    // token để nhận notification
    static notification_token = '';
    // token để thao tác với api vov
    static login_token = '';//'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJpc3MiOiJWT1YiLCJhdWQiOiJodHRwOlwvXC92b3YubG9jYWwiLCJqdGkiOiI0ZjFnMjNhMTJhYSIsImlhdCI6MTU5NjM0NjM4OSwiZXhwIjoxNjEyMTE0Mzg5LCJ1aWQiOjN9.ay2l1884Oz762GhmTgGXgSe25Pd5x8KykkPTBnd9JHI';
    static email = '';
    static username = '';
    static user_info = null;

    static order_number = 12;

    static os = 'android';

    // Select
    static GET_METHOD                       = "GET";
    // Insert
    static POST_METHOD                      = "POST";
    //Delete
    static DELETE_METHOD                    = "DELETE";
    //Update
    static PUT_METHOD                       = "PUT";

    static TOAST_DURATION                   = 3000; // 3 seconds
    static TOAST_ERROR_COLOR                = 'orange';
    static TOAST_SUCCESS_COLOR              = 'blue';


    static ERROR_EMAIL_MISSING                  = 'Vui lòng cung cấp email';
    static ERROR_PASSWORD_MISSING               = 'Vui lòng cung cấp pasword';
    static ERROR_PASSWORD_NOT_MATCH             = 'Password không giống nhau';

    static ERROR_LOGIN_MISSING                  = 'Vui lòng đăng nhập trước khi thực hiện hành động này';
    static ERROR_LOADING_DATA                   = 'Đang tải dữ liệu, vui lòng chờ';
    static ALERT_DISABLE_SELECTION              = "Lựa chọn này đã bị khóa, vui lòng chọn mục khác";

    static WEB_CLIENT_ID = "491520516021-1no68o939c9s80mbc87albgin4h20teb.apps.googleusercontent.com";

    static REFESH_SCREEN = [];



    static TYPE_RADIO      = 1;
    static TYPE_MUSIC      = 2;
    static TYPE_PROGRAM    = 3;
    static TYPE_NEWS       = 4;
    static TYPE_DAILYCONTENT       = 5;

    static PLAYBACK_SUB_TYPE      = 1;

    static news_data = null;
    static collection_data = null;
    static design_data = null;
    static popular_design = null;
    static config_collection_menu = null;
    static product_data = [];
    static cart_data = [];
    static customer = [];
    static collection_detail_data = null;
    static collection_detail_menu = null;

    static config_design_menu = null;

    static refreshDashBoard = null;

    static updateAddress = null;



    static getDateString(date, format) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        getPaddedComp = function(comp) {
            return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
        },
        formattedDate = format,
        o = {
            "y+": date.getFullYear(), // year
            "M+": getPaddedComp(date.getMonth()+1), //month
            "d+": getPaddedComp(date.getDate()), //day
            "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
             "H+": getPaddedComp(date.getHours()), //hour
            "m+": getPaddedComp(date.getMinutes()), //minute
            "s+": getPaddedComp(date.getSeconds()), //second
            "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
            "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
        };

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                formattedDate = formattedDate.replace(RegExp.$1, o[k]);
            }
        }
        return formattedDate;
    };

    static getAvatarUrlFromUserInfo(){
        let rsUrl = Def.URL_DEFAULT_AVATAR;
        if(Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['avatar_path']){
            if(Def.user_info['userProfile']['avatar_base_url'] && Def.user_info['userProfile']['avatar_base_url'].length > 0) {
                console.log("Avatar Url" + Def.user_info['userProfile']['avatar_base_url'].length);
                rsUrl = Def.user_info['userProfile']['avatar_base_url'] + '/' + Def.user_info['userProfile']['avatar_path'];
            }else {
                rsUrl = Def.user_info['userProfile']['avatar_path'];
            }
        }
        return rsUrl;
    }

    static getInfrontOfImg(){
        let rsUrl = '';
        if(Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['infront_cmt_img']){
            rsUrl = Def.URL_CONTENT_BASE + Def.user_info['userProfile']['infront_cmt_img'];
            console.log('' + Def.user_info['userProfile']['infront_cmt_img']);
        }
        return rsUrl;
    }

    static getBehindImg(){
        let rsUrl = '';
        if(Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['behind_cmt_img']){
            rsUrl = Def.URL_CONTENT_BASE + Def.user_info['userProfile']['behind_cmt_img'];
        }
        return rsUrl;
    }

    static getLinkOfNews(item){
        // return "https://gianglt.com/rangdong/?s=hopcom";
        console.log("link" + Def.URL_BASE + '/eurotile/news?slug=' + item.slug);
        if(item && item.slug){
            return Def.URL_BASE + '/eurotile/news?view=app&slug=' + item.slug;
        }
        return false;
    }

    static getCityItemFromUserInfo(){
        let address = Def.getAddressFromUserInfo();
        if (address && address['city']){
            return address['city']
        }
        return null;

    }

    static getDistrictItemFromUserInfo(){
        let address = Def.getAddressFromUserInfo();
        if (address && address['district']){
            return address['district']
        }
        return null;
    }
    static getWardItemFromUserInfo(){
        let address = Def.getAddressFromUserInfo();
        if (address && address['ward']){
            return address['ward']
        }
        return null;
    }

    static getAddressFromUserInfo(){
        let rs = null;
        if(Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['address']){
            rs = Def.user_info['userProfile']['address'];
        }
        return rs;
    }
    static getThumnailImg(img_path){
        rs = img_path.split(".");
        lastItem = rs.pop();
        rs = rs.join('.') + '_200x200.' + lastItem;
        // console.log(rs);
        return rs;
    }

    static getTypeAccount(){
        if(Def.user_info  && Def.user_info['partnerInfo']){
            return 'partner'
        } else if (Def.user_info){
            return 'normal'
        }
        return 'guest'

    }

    static getAddressStr(address){
        let strAddress = "";
        if(!address){
            return strAddress;
        }
        if(address['ward']){
            strAddress += address['ward']['ward_name'] + ', ';
        }

        if(address['district']){
            strAddress += address['district']['district_name'] + ', ';
        }

        if(address['city']){
            strAddress += address['city']['city_name'];
        }
        return strAddress;

    }

    static calOrderValue(order){
       let total = order.orderItems.reduce(function(acc, val) { return acc.sale_price + val.sale_price; }, 0);
       return total;
    }

}
