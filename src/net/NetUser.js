import Def from '../def/Def';
/*
  Phục vụ mục đích đăng nhập, đăng ký
*/
export default class Net{

    static signIn(callback,errCallback,firebaseJWT) {
        // postParams =  {'jwtToken':firebaseJWT};
        Net.sendRequest(callback,errCallback,Def.URL_LOGIN ,Def.POST_METHOD,postParams);
    }

    static setNotification(callback,errCallback) {
        postParams =  {
            'firebase_token':Def.notification_token,
            'email':Def.email,
            'os':Def.os
        };
        Net.sendRequest(callback,errCallback,Def.URL_NOTIFICATION ,Def.POST_METHOD,postParams);
    }


    static listNotification(callback,errCallback) {
        Net.sendRequest(callback,errCallback,Def.URL_LIST_NOTIFICATION ,Def.GET_METHOD);
    }

    static sendUpdatePartner(callback,errCallback,url,method,dataObject = null)
    {
        console.log(`SENDING: ${JSON.stringify(dataObject)}`);
        console.log(`TO: ${url}`);
        console.log(`METHOD: ${method}`);
        console.log(`{ 'Authorization': ${Def.login_token} }`)

        if(method == Def.GET_METHOD)
        {
            fetch(url, {
                method: method,
                headers: {
                    'Authorization': Def.login_token,
                    'content-type':'application/json; charset=utf-8'
                }
            })
                .then(response => response.text())
                .then(text => {

                    try {
                        let data = JSON.parse(text);
                        callback(data)
                    } catch(err) {
                        errCallback(err + ': ' + url);
                    }
                })
                .catch((error) => { errCallback(error);}) ;
        }
        else if(method == Def.POST_METHOD )
        {
            let formData = new FormData();
            if(dataObject){
                for (var property in dataObject) {
                    formData.append(property, dataObject[property]);
                }
            }

            let sendObj = {
                method: method,
                headers: {
                    'Authorization': Def.login_token
                }
            };

            if(dataObject){
                sendObj = {
                    method: method,
                    headers: {
                        'Authorization': Def.login_token
                    },
                    body : formData
                }
            }



            fetch(url, sendObj)
                .then(response => response.text())
                .then(text => {
                    try {
                        let data = JSON.parse(text);
                        callback(data)
                    } catch(err) {
                        errCallback(err + ': ' + url);
                    }
                })
                .catch((error) => { errCallback(error);}) ;
        }
        else if(method == Def.DELETE_METHOD )
        {
            fetch(url, {
                method: method,
                headers: {

                    'Authorization': Def.login_token
                }
            })
                .then(response => response.text())
                .then(text => {
                    try {
                        let data = JSON.parse(text);
                        callback(data)
                    } catch(err) {
                        errCallback(err + ': ' + url);
                    }
                })
                .catch((error) => { errCallback(error);}) ;
        }
    }

}

