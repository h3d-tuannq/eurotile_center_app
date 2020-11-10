
export default class Def {
    static URL_BASE = "https://eurotiledev.house3d.net";
    static URL_CONTENT_BASE = "https://eurotiledev.house3d.net/data/eurotileData/";
    static URL_DEFAULT_AVATAR = "https://cdn-content1.house3d.com/uploads/2019/07/02/5d1aa12048236.jpg";
    static URL_DEFAULT_VR = "https://vr.house3d.com/web/panorama-player/H00238469";
    static URL_DEFAULT_3D = "";


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
        '../../../assets/data/8064.jpg': require('../../assets/data/8064.jpg'),
        '../../../assets/data/8065.jpg': require('../../assets/data/8065.jpg'),
        '../../../assets/data/8066.jpg': require('../../assets/data/8066.jpg'),
        '../../../assets/data/8070.jpg': require('../../assets/data/8070.jpg'),
        '../../../assets/data/8071.jpg': require('../../assets/data/8071.jpg'),
        '../../../assets/data/8071.jpg': require('../../assets/data/8071.jpg'),
    };

    static showScanQrCode = null;
    static closeQrCode = null;

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
                    "sub_images": "",
                    "description": "Gạch Ốp Lát 6071",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    'price' : 1000000

                },
                {
                    "id": 2,
                    "name": "6073",
                    "model": "6073",
                    "status": 1,
                    "image_path": "../../../assets/data/6073.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 6073",
                    "version": null,
                    "sort": 2,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 3,
                    "name": "8063",
                    "model": "8063",
                    "status": 1,
                    "image_path": "../../../assets/data/8063.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8063",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 4,
                    "name": "8064",
                    "model": "8064",
                    "status": 1,
                    "image_path": "../../../assets/data/8064.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr': this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8064",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 5,
                    "name": "8065",
                    "model": "8065",
                    "status": 1,
                    "image_path": "../../../assets/data/8065.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr': this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8065",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 6,
                    "name": "8066",
                    "model": "8066",
                    "status": 1,
                    "image_path": "../../../assets/data/8066.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr': this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8066",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 7,
                    "name": "8070",
                    "model": "8070",
                    "status": 1,
                    "image_path": "../../../assets/data/8070.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr': this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8070",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
                {
                    "id": 8,
                    "name": "8071",
                    "model": "8071",
                    "status": 1,
                    "image_path": "../../../assets/data/8071.jpg",
                    "sub_images": "",
                    'url_3d':this.URL_DEFAULT_3D,
                    'url_vr': this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Gạch Ốp Lát 8071",
                    "version": null,
                    "sort": 1,
                    "category": "Gạch Ốp Lát",
                    'price' : 1000000

                },
            ]
        },
        'tbvs' : {
            "name_vi" : "TBVS",
            "data" : [
                {
                    "id": 11,
                    "name": "Hansgrohe – 31730000",
                    "model": "31730000",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/41l15b3hbql.jpg?v=1544164933070",
                    "sub_images": "",
                    'url_3d':"https://3dplayer.house3d.net/model-viewer/voi/",
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Vòi chậu nóng, lạnh Focus Hansgrohe – 31730000",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",
                    'price' : 2000000

                },
                {
                    "id": 12,
                    "name": "3229B-WT",
                    "model": "3229B-WT",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/acacia-evolution-back-to-wall-toilet-image-600x600.jpg?v=1545707591767",
                    "sub_images": "",
                    'url_3d': "https://3dplayer.house3d.net/model-viewer/3229B-WT/",
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Acacia Evolution - Bộ cầu đăt sàn Acacia E ko nắp",
                    "version": null,
                    "sort": 2,
                    "category": "TBVS",
                    'price' : 2000000

                },
                {
                    "id": 13,
                    "name": "WP-2025",
                    "model": "WP-2025",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/wp-2025.jpg?v=1561347431797",
                    "sub_images": "",
                    'url_3d':"https://3dplayer.house3d.net/model-viewer/WP-2025/",
                    'url_vr':this.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "BÀN CẦU AMERICAN STANDARD WP-2025",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",
                    'price' : 2000000

                },
                {
                    "id": 14,
                    "name": "WF-4955",
                    "model": "WF-4955",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/soh-product-easyset-exposed-rain-shower-kit.jpg?v=1566353709613",
                    "sub_images": "",
                    'url_3d':"https://3dplayer.house3d.net/model-viewer/WF-4955/",
                    'url_vr':Def.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "SEN CÂY AMERICAN STANDARD WF-4955",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",
                    'price' : 2000000

                },
                {
                    "id": 15,
                    "name": "WP-F525.1H",
                    "model": "WP-F525.1H",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/1-3.jpg?v=1561348745447",
                    "sub_images": "",
                    'url_3d':"https://3dplayer.house3d.net/model-viewer/WP-F525.1H/",
                    'url_vr':Def.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Thiết bị VS",
                    "version": null,
                    "sort": 1,
                    "category": "TBVS",
                    'price' : 2000000

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
                    "sub_images": "",
                    'url_3d':Def.URL_DEFAULT_3D,
                    'url_vr':Def.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Bộ trộn sen tắm nóng lạnh Talis Hansgrohe – 71403000",
                    "version": null,
                    "sort": 1,
                    "category": "Grohe",
                    'price' : 10000000

                },
                {
                    "id": 21,
                    "name": "Rainfinity - 26844000",
                    "model": "26844000",
                    "status": 1,
                    "image_path": "https://bizweb.dktcdn.net/thumb/1024x1024/100/125/230/products/37-hpr01954-tif.jpg?v=1590825422163",
                    "sub_images": "",
                    'url_3d':Def.URL_DEFAULT_3D,
                    'url_vr':Def.URL_DEFAULT_VR,
                    'url_ar':this.URL_DEFAULT_3D,
                    "description": "Bộ trộn Rainfinity - 26844000",
                    "version": null,
                    "sort": 2,
                    "category": "TBVS",
                    'price' : 10000000

                },

            ]
        }
    };


    static collection_detail_data = null;
    static collection_detail_menu = null;

    static refreshDashBoard = null;

    static getProductById(id){
        var rs = null;
        if(Def.demoData){
            Object.entries(Def.demoData).map((cate, key) => {
                // console.log(JSON.stringify(cate[1].data));
                Object.entries(cate[1].data).map((product, index) => {
                    console.log(product[1].id + " " + id );
                    if(rs === null && product && product[1].id == id){
                        console.log('Bằng');
                        rs =  product[1];
                    }
                })
            });
        }
        if (rs) {
            return rs;
        }
        console.log(id);
        return {
            "id": 11,
            "name": "Vòi chậu 01",
            "model": "voichau_01",
            "status": 1,
            "image_path": "https://eurotiledev.house3d.net/data/eurotileData/collection/202010/03/19/main_img.jpg",
            "sub_images": "",
            'url_3d':this.URL_DEFAULT_3D,
            'url_vr':'https://caominhgroup.vn/wp-f525-1h',
            "description": "Vòi chậu 01",
            "version": null,
            "sort": 1,
            "category": "TBVS",
            'price' : 2000000

        };
    }



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
