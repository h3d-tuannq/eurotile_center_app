import AsyncStorage from "@react-native-community/async-storage";
import {Dimensions, Platform} from 'react-native'

export default class Def {
    // static URL_BASE = "https://eurotile-prod.house3d.net/";
    // static URL_CONTENT_BASE = "https://eurotile-prod.house3d.net/data/eurotileData/";

    static URL_BASE = "https://eurotiledev.house3d.net/";
    static URL_CONTENT_BASE = "https://eurotiledev.house3d.net/data/eurotileData/";

    static URL_DEFAULT_AVATAR = "https://cdn-content1.house3d.com/uploads/2019/07/02/5d1aa12048236.jpg";

    static PRIVACY_URL = "https://eurotile-prod.house3d.net/page/terms-and-policy?view=app";

    static PARTNER_ACTIVE_STATUS = 1;

    static DEFAULT_MAX_SIZE = 1024;

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

    static isSignup = false;

    static refreshHome = [];

    static os = 'android';

    // Select
    static GET_METHOD = "GET";
    // Insert
    static POST_METHOD = "POST";
    //Delete
    static DELETE_METHOD = "DELETE";
    //Update
    static PUT_METHOD = "PUT";

    static TOAST_DURATION = 3000; // 3 seconds
    static TOAST_ERROR_COLOR = 'orange';
    static TOAST_SUCCESS_COLOR = 'blue';


    static ERROR_EMAIL_MISSING = 'Vui lòng cung cấp email';
    static ERROR_PASSWORD_MISSING = 'Vui lòng cung cấp pasword';
    static ERROR_PASSWORD_NOT_MATCH = 'Password không giống nhau';

    static ERROR_LOGIN_MISSING = 'Vui lòng đăng nhập trước khi thực hiện hành động này';
    static ERROR_LOADING_DATA = 'Đang tải dữ liệu, vui lòng chờ';
    static ALERT_DISABLE_SELECTION = "Lựa chọn này đã bị khóa, vui lòng chọn mục khác";

    static WEB_CLIENT_ID = "491520516021-1no68o939c9s80mbc87albgin4h20teb.apps.googleusercontent.com";

    static REFESH_SCREEN = [];


    static TYPE_RADIO = 1;
    static TYPE_MUSIC = 2;
    static TYPE_PROGRAM = 3;
    static TYPE_NEWS = 4;
    static TYPE_DAILYCONTENT = 5;

    static orderItemChange = {};

    static PLAYBACK_SUB_TYPE = 1;

    static OrderStatus = {0: "Chưa tiếp nhận", 1: "Xác nhận", 2: "Thanh toán", 3: "Giao hàng", 4: "Hoàn thành"}; // DRAFT, CONFIRM, PAID, DELIVERING, ACCOMPLISHED

    static STATUS_DRAFT = 0;
    static STATUS_CONFIRMED = 1;
    static STATUS_PAID = 2;
    static STATUS_DELIVERING = 3;
    static STATUS_ACCOMPLISHED = 4;

    static news_data = null;
    static collection_data = null;
    static design_data = null;
    static popular_design = null;
    static config_collection_menu = null;
    static design_cate = null;
    static product_data = [];
    static product_tree_data = {};
    static collection_tree_data = {};

    static cart_data = [];
    static currentCart = [];
    static customer = [];
    static currentOrder = null; // Model đang thực hiện thao tác
    static popularNews = [];
    static config_menus = [];

    static currentCustomer = null;

    static orderList = [];
    static refreshOrderList = [];
    static config_order_menu = [];
    static OrderListForStatus = [];

    static setIsLogin = null;

    static collection_detail_data = null;
    static collection_detail_menu = null;

    static config_design_menu = null;

    static refreshDashBoard = null;

    static refreshStatistical = {};

    static updateProfileFunc = null;

    static isUpdating = false;

    static resetCart = false;

    static mainNavigate = null;

    static updateAddress = null;

    static redirectScreen = null;

    static customerTypes = {0: 'Chủ nhà', 1: 'Kiến trúc sư'};

    static getDateString(date, format) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            getPaddedComp = function (comp) {
                return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
            },
            formattedDate = format,
            o = {
                "y+": date.getFullYear(), // year
                "M+": getPaddedComp(date.getMonth() + 1), //month
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

    static getAvatarUrlFromUserInfo(user_info = null) {
        let rsUrl = Def.URL_DEFAULT_AVATAR;
        if(!user_info) {
            user_info = Def.user_info;
        }
        if (user_info && user_info['userProfile'] && user_info['userProfile']['avatar_path']) {
            if (user_info['userProfile']['avatar_base_url'] && user_info['userProfile']['avatar_base_url'].length > 0) {
                rsUrl = user_info['userProfile']['avatar_base_url'] + '/' + user_info['userProfile']['avatar_path'];
            } else {
                rsUrl = user_info['userProfile']['avatar_path'];
            }
        }
        return rsUrl;
    }

    static getInfrontOfImg() {
        let rsUrl = null;
        if (Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['infront_cmt_img']) {
            rsUrl = Def.URL_CONTENT_BASE + Def.user_info['userProfile']['infront_cmt_img'];
            console.log('' + Def.user_info['userProfile']['infront_cmt_img']);
        }
        return rsUrl;
    }

    static getBehindImg() {
        let rsUrl = null;
        if (Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['behind_cmt_img']) {
            rsUrl = Def.URL_CONTENT_BASE + Def.user_info['userProfile']['behind_cmt_img'];
        }
        return rsUrl;
    }

    static getLinkOfNews(item) {
        // return "https://gianglt.com/rangdong/?s=hopcom";
        console.log("link" + Def.URL_BASE + '/eurotile/news?slug=' + item.slug);
        if (item && item.slug) {
            return Def.URL_BASE + '/eurotile/news?view=app&slug=' + item.slug;
        }
        return false;
    }

    static getCityItemFromUserInfo() {
        let address = Def.getAddressFromUserInfo();
        if (address && address['city']) {
            return address['city']
        }
        return null;

    }

    static getDetailAddressFromUserInfo() {
        let address = Def.getAddressFromUserInfo();
        if (address && address['address_detail']) {
            return address['address_detail'];
        }
        return "";

    }

    static getDistrictItemFromUserInfo() {
        let address = Def.getAddressFromUserInfo();
        if (address && address['district']) {
            return address['district']
        }
        return null;
    }

    static getWardItemFromUserInfo() {
        let address = Def.getAddressFromUserInfo();
        if (address && address['ward']) {
            return address['ward']
        }
        return null;
    }

    static getAddressFromUserInfo() {
        let rs = null;
        if (Def.user_info && Def.user_info['userProfile'] && Def.user_info['userProfile']['address']) {
            rs = Def.user_info['userProfile']['address'];
        }
        return rs;
    }

    static getThumnailImg(img_path) {
        // img_path = Def.URL_CONTENT_BASE + img_path;
        let rs = img_path.split(".");
        let lastItem = rs.pop();
        rs = rs.join('.') + '_200x200.' + lastItem;
        return rs;
    }

    static getTypeAccount() {
        if (Def.user_info && Def.user_info['partnerInfo']) {
            return 'partner'
        } else if (Def.user_info) {
            return 'normal'
        }
        return 'guest'

    }

    static getAddressStr(address) {
        let strAddress = "";
        if (!address) {
            return strAddress;
        }
        if(address['address_detail']) {
            strAddress += address['address_detail'] + ', '  ;
        }

        if (address['ward']) {
            strAddress += address['ward']['ward_name'] + ', ';
        }

        if (address['district']) {
            strAddress += address['district']['district_name'] + ', ';
        }

        if (address['city']) {
            strAddress += address['city']['city_name'];
        }
        if(strAddress.length > 2){
            strAddress = strAddress.slice(0, -2);
        }
        return strAddress;

    }

    static calOrderValue(order) {
        var total = 0;
        // return total;
        if (order.orderItems && Array.isArray(order.orderItems)) {
            order.orderItems.forEach(item =>  {
                total += Def.getPriceByRole(item.product , Def.getUserRole()) * item.amount *  item.product.brickBoxInfo['total_area'] / 1000000;
            });
        }
        return total;
    }

    static totalValue = 100;

    static calOrderValueByOrderItems(orderItems) {
        var total = 0;
        // return total;
        if (orderItems && Array.isArray(orderItems)) {
            orderItems.forEach(item =>  {
                total += Def.getPriceByRole(item.product , Def.getUserRole()) * item.amount *  item.product.brickBoxInfo['total_area'] / 1000000;
            });
        }
        return total;
    }

    static calTotalOrderValue(orderList) {
        var total = 0;
        orderList.forEach(item =>  {
            total += item.sale_value;
        });
        return total;
    }

    static calCartOrderNumber(orderList) {
        var total = 0;
        orderList.forEach(item =>  {
            total += item.amount;
        });
        return total;
    }

    static calProfitValue(orderList) {
        var total = 0;
        orderList.forEach(item =>  {
            total += item.sale_value * item.partner_discount / 100;
        });
        return total;
    }

    static getOrderByStatus(orderList, status) {
        let filterData = [];
        // console.log("Status : "  + status);
        if (orderList && Array.isArray(orderList)) {
            filterData = orderList.filter((item) =>
                item.status == status
            );
        }

        // console.log("Status : " + status + " Length : " + filterData.length + " OrderList Length : " + orderList.length);

        return filterData;
    }




    static numberWithCommas(x) {
        // x = Math.floor(x);
        return x != null ?  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
    }

    static clearCartData() {
        Def.cart_data = null;
    }

    static checkPartnerPermission() {
        if (Def.user_info && Def.user_info['partnerInfo']) {
            if(Def.user_info['partnerInfo']['status'] == Def.PARTNER_ACTIVE_STATUS){
                return Def.user_info['partnerInfo']['level_id'];
            }else {
                return -1; // Yêu cầu trở thành partner đang chờ phê duyệt
            }

        }

        if (Def.user_info){
            return -2; // trong trường hợp tk thường trả về -2
        }

        return -3;
    }

    static partnerlevelInfo = {1:'Vàng' , 2: 'Bạch kim', 3: 'Kim cương'};
    static centerInfo = [
        {
            id:100,
            name : 'MIỀN BẮC',
            type : 1,
        },
        {
            id:1,
            name : 'EUROTILE CENTER HÀ NỘI',
            phone: "(024)73008166",
            address: 'M03-04 Võ Chí Công, P.Xuân La, Q. Tây Hồ, Hà Nội',
            type : 0,
        },
        {
            id:101,
            name : 'MIỀN TRUNG',
            type : 1,
        },
        {
            id:2,
            name : 'EUROTILE CENTER VINH',
            phone: "0913522308",
            address: 'Lô C1+C2, KDT Minh Khang, Đại lộ Lenin, TP. Vinh',
            type : 0,
        },
        {
            id:3,
            name : 'EUROTILE CENTER ĐÀ NẴNG',
            phone: "(023) 6366 6899",
            address: '297 Nguyễn Văn Linh, Q. Thanh Khê, TP. Đà Nẵng',
            type : 0,
        },
        {
            id:4,
            name : 'EUROTILE CENTER ĐẮK LẮK',
            phone: "0913446525",
            address: '332-334 Phan Bội Châu, TP. Buôn Mê Thuột',
            type : 0,
        },
        {
            id:102,
            name : 'MIỀN NAM',
            type : 1,
        },
        {
            id:5,
            name : 'EUROTILE CENTER HỒ CHÍ MINH',
            phone: "(038)62876899",
            address: '433 Cộng Hòa, P.15, Q. Tân Bình, TP. Hồ Chí Minh',
            type : 0,
        },
        {
            id:6,
            name : 'EUROTILE CENTER CẦN THƠ',
            phone: "0916639668",
            address: '353 đường 30/4, Q. Ninh Kiều, TP. Cần Thơ',
            type : 0,
        },
    ];

    static centerInfoHardCode = [
        {
            id:100,
            name : 'MIỀN BẮC',
            type : 1,
        },
        {
            id:1,
            name : 'EUROTILE CENTER HÀ NỘI',
            phone: "(024)73008166",
            address: 'M03-04 Võ Chí Công, P.Xuân La, Q. Tây Hồ, Hà Nội',
            type : 0,
        },
        {
            id:101,
            name : 'MIỀN TRUNG',
            type : 1,
        },
        {
            id:2,
            name : 'EUROTILE CENTER VINH',
            phone: "0913522308",
            address: 'Lô C1+C2, KDT Minh Khang, Đại lộ Lenin, TP. Vinh',
            type : 0,
        },
        {
            id:3,
            name : 'EUROTILE CENTER ĐÀ NẴNG',
            phone: "(023) 6366 6899",
            address: '297 Nguyễn Văn Linh, Q. Thanh Khê, TP. Đà Nẵng',
            type : 0,
        },
        {
            id:4,
            name : 'EUROTILE CENTER ĐẮK LẮK',
            phone: "0913446525",
            address: '332-334 Phan Bội Châu, TP. Buôn Mê Thuột',
            type : 0,
        },
        {
            id:102,
            name : 'MIỀN NAM',
            type : 1,
        },
        {
            id:5,
            name : 'EUROTILE CENTER HỒ CHÍ MINH',
            phone: "(038)62876899",
            address: '433 Cộng Hòa, P.15, Q. Tân Bình, TP. Hồ Chí Minh',
            type : 0,
        },
        {
            id:6,
            name : 'EUROTILE CENTER CẦN THƠ',
            phone: "0916639668",
            address: '353 đường 30/4, Q. Ninh Kiều, TP. Cần Thơ',
            type : 0,
        },
    ];

    static getLevelPartnerName(levelId){
        if(Def.partnerlevelInfo && Def.partnerlevelInfo[levelId - 1]){
            return Def.partnerlevelInfo[levelId - 1].name;
        }
        return false;
    }



    static getUserRole(){
        return Def.checkPartnerPermission() > 0 ? 'partner' : 'user';
    }



    static formatArea(value) {
        return Math.floor(value);

    }

    static formatText(text, number = 20){
        let rs = text;
        if(text && text.length > number){
            rs = text.substring(0, number - 3) + '...';
        }
        return rs;
    }

    static ressetCart() {
        Def.cart_data = [];
        Def.currentCart = [];
        Def.order = null;
        AsyncStorage.setItem('cart_data', JSON.stringify(Def.cart_data));
        AsyncStorage.setItem('current_data', JSON.stringify(Def.currentCart));
    }

    static createPaymentUrl(orderId){
        console.log('UserInfo: ' + JSON.stringify(Def.user_info));
        $rsUrl = Def.URL_BASE + '/user/sign-in/login-by-access-token?token=' + Def.user_info['access_token']+'&redirectUrl=' + Def.URL_BASE + '/payment?id=' + orderId;
        console.log("Payment Url " + $rsUrl);
        return $rsUrl;
    }

    static formatOrderNumber(order_number){
        return order_number < 100 ? order_number : '99+';
    }

    static getPriceByRole(product, role = 'user'){
        switch (role){
            case 'partner':
                return product.store_price > 0 ? product.store_price : product.sale_price;
                break;
            case 'user':
                return product.sale_price;
                break;
            default:
                return product.sale_price
        }

    }

    static isIphoneXorAbove() {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        );
    }

}
