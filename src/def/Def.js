
export default class Def{
    static URL_BASE = "http://vovadmin.duchungtech.com/api";
    static URL_CONTENT_BASE = "http://vovadmin.duchungtech.com";

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

    static WEB_CLIENT_ID = '362818592929-d97hfbqln6qqc23qfvre2f1m4be6qimb.apps.googleusercontent.com';

    static TYPE_RADIO      = 1;
    static TYPE_MUSIC      = 2;
    static TYPE_PROGRAM    = 3;
    static TYPE_NEWS       = 4;
    static TYPE_DAILYCONTENT       = 5;

    static PLAYBACK_SUB_TYPE      = 1;

    static news_data = null;
    static collection_data = null;

    static config_collection_menu = null;



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


}
