
export default class Def {
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

    static TYPE_RADIO = 1;
    static TYPE_MUSIC = 2;
    static TYPE_PROGRAM = 3;
    static TYPE_NEWS = 4;
    static TYPE_DAILYCONTENT = 5;

    static PLAYBACK_SUB_TYPE = 1;

    static news_data = null;
    static collection_data = null;

    static config_collection_menu = null;
    static allData = {
        '../../../assets/data/6071.jpg': require('../../assets/data/6071.jpg'),
        '../../../assets/data/6073.jpg': require('../../assets/data/6073.jpg'),
        '../../../assets/data/8063.jpg': require('../../assets/data/8063.jpg'),
        '../../../assets/data/8064.jpg': require('../../assets/data/8064.jpg')
    };

    static demoData = {
        'gach-op-lat' : {
            "name_vi" : "Gạch Ốp Lát",
            "data" : [
                {
                    "id": 1,
                    "name": "6071",
                    "model": "6071",
                    "status": 1,
                    "image_path": "../../../assets/data/6071.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Gạch Ốp Lát 6071",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",

                },
                {
                    "id": 2,
                    "name": "6073",
                    "model": "6073",
                    "status": 1,
                    "image_path": "../../../assets/data/6073.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Gạch Ốp Lát 6073",
                    "version": null,
                    "sort": 2,
                    "category": "Gạch Ốp Lát",

                },
                {
                    "id": 3,
                    "name": "8063",
                    "model": "8063",
                    "status": 1,
                    "image_path": "../../../assets/data/8063.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Gạch Ốp Lát 8063",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",

                },
                {
                    "id": 4,
                    "name": "8064",
                    "model": "8064",
                    "status": 1,
                    "image_path": "../../../assets/data/8064.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Gạch Ốp Lát 8064",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",

                },
            ]
        },
        'tbvs' : {
            "name_vi" : "TBVS",
            "data" : [
                {
                    "id": 11,
                    "name": "Vòi chậu 01",
                    "model": "voichau_01",
                    "status": 1,
                    "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Vòi chậu 01",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",

                },
                {
                    "id": 12,
                    "name": "3229B-WT",
                    "model": "3229B-WT",
                    "status": 1,
                    "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Thiết bị vệ sinh",
                    "version": null,
                    "sort": 2,
                    "category": "TBVS",

                },
                {
                    "id": 13,
                    "name": "WP-2025",
                    "model": "WP-2025",
                    "status": 1,
                    "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Thiết bị VS",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",

                },
                {
                    "id": 4,
                    "name": "WP-F525.1H",
                    "model": "WP-F525.1H",
                    "status": 1,
                    "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Thiết bị VS",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",

                },
            ]
        },
        'Grohe' : {
            "name_vi" : "Grohe",
            "data" : [
                {
                    "id": 20,
                    "name": "Talis Hansgrohe – 71403000",
                    "model": "71403000",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/71403000-p.jpg?v=1558672167797",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Bộ trộn sen tắm nóng lạnh Talis Hansgrohe – 71403000",
                    "version": null,
                    "sort": 1,
                    "category": "Grohe",

                },
                {
                    "id": 21,
                    "name": "Rainfinity - 26844000",
                    "model": "26844000",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/37-hpr01954-tif.jpg?v=1590825422163",
                    "sub_images": "collection/202010/03/19/collection0.jpg",
                    "description": "Bộ trộn Rainfinity - 26844000",
                    "version": null,
                    "sort": 2,
                    "category": "TBVS",

                },

            ]
        }
    };


    static collection_detail_data = null;
    static collection_detail_menu = null;

    static refreshDashBoard = null;



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

        console.log('rs : ' +rsUrl);
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



}
