import React, {useState} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform, Modal, Keyboard} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 40;

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {Picker} from '@react-native-community/picker';
import UserController from "../../controller/UserController";
import Net from "../../net/Net";
import ImageResizer from 'react-native-image-resizer';

class UpdatePartnerScreen extends React.Component {
    constructor(props){
        super(props);
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind();
        this.handleDatePicked = this.handleDatePicked.bind();
        this.hideDateTimePicker = this.hideDateTimePicker.bind();
        this.updatePartnerInfo = this.updatePartnerInfo.bind(this);
        this.onGetCites = this.onGetCites.bind(this);
        this.onGetCitesFalse = this.onGetCitesFalse.bind(this);
        this.onGetAddress = this.onGetAddress.bind(this);
        this.onGetAddressFalse = this.onGetAddressFalse.bind(this);

        this.choseCityClick = this.choseCityClick.bind(this);
        this.choseDistrictClick = this.choseDistrictClick.bind(this);
        this.choseWardClick = this.choseWardClick.bind(this);
        this.showAutocompleteModal = this.showAutocompleteModal.bind(this);
        this.parseDataToView = this.parseDataToView.bind(this);
        this.setDate = this.setDate.bind(this);
        this.showAddressModal = this.showAddressModal.bind(this);

        console.log("Constructor recall");

        let projectImg = this.getProjectImage();
        this.state = {
            focus : 0,
            isUpdate: 0,
            user: Def.user_info,
            stateCount: 0.0,
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},
            infront_cmt_img: Def.getInfrontOfImg() ? {uri:Def.getInfrontOfImg()} : null,
            behind_cmt_img: Def.getBehindImg() ? {uri:Def.getBehindImg()} : null,
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            birth_day :Def.user_info['userProfile']['date_of_birth'] ? new Date(Def.user_info['userProfile']['date_of_birth']) :new Date() , //Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['firstname'],
            gender : Def.user_info['userProfile']['gender'],
            mobile:Def.user_info['userProfile']['phone'],
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'] ? new Date(Def.user_info['userProfile']['issued_on']) :new Date() , // Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
            address : Def.getAddressFromUserInfo() ? Def.getAddressFromUserInfo()['address_detail'] : '',
            isDateTimePickerVisible :false,
            isDateTimePickerVisibleIssueOn:false,
            selectedDate : new Date(),
            dateAttribute : 'birth_day',
            cities : [],
            district : [],
            ward:[],
            city_item: Def.getCityItemFromUserInfo(),
            district_item: Def.getDistrictItemFromUserInfo(),
            ward_item: Def.getWardItemFromUserInfo(),
            query : '',
            choseAddress : false,
            currentAddress : 1, // 1 select city, 2 select district, 3 select ward
            nextAddress : 1, // 1 select city, 2 select district, 3 select ward
            filterAttr: 'city_name',
            filterData: [],
            showKeyboard : 0,
            addressTitle: 'Tỉnh/Thành phố',
            isPartner: Def.checkPartnerPermission()>-1,


        };

        this.refresh = this.refresh.bind(this);
        Def.mainNavigate = this.props.navigation;
        Def.setLoader = this.refresh;
        // this.parseDataToView();
    }

    componentDidMount(){
        console.log('component did mount recall');
        Net.sendRequest(this.onGetCites,this.onGetCitesFalse,Def.URL_BASE + '/api/user/city' , Def.POST_METHOD);
    }



    onGetCites(res){
        console.log('Load Cities Return');
        this.setState({cities: res});
        console.log('After Error' +
            '');
    }

    getAdministrativeUnit(url, params = null, callBack = null){
        Net.sendRequest(callBack !== null ? callBack : this.onGetAddress,this.onGetCitesFalse,url , Def.POST_METHOD, params);
    }



    onGetAddress(res){
        let unit = this.state.nextAddress == 1 ? 'cities' : this.state.nextAddress == 2 ? 'district' : 'ward';
        this.setState({[unit]: res});
    }

    onGetAddressFalse(err){
        console.log('onGetAddressFalse' + JSON.stringify(err));
    }


    onGetCitesFalse(res){

    }

    showAutocompleteModal(res){
        let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
        if(this.state.currentAddress == 1){
            this.setState({ filterData: res, cites: res, filterAttr: 'city_name'});
        }

        if(this.state.currentAddress == 2){
            this.setState({filterData: res, district: res, filterAttr: 'district_name'});
        }
        if(this.state.currentAddress == 3){
            this.setState({filterData: res, ward: res, filterAttr: 'ward_name'});
        }
        this.showAddressModal();
        // setTimeout(this.showAddressModal, 5);
    }


    choseCityClick(){
        this.setState({currentAddress:1});
        if(!this.state.cities || this.state.cities.length == 0 ){
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/city', null, this.showAutocompleteModal);
        } else {
            this.setState({filterData: this.state.cities, filterAttr: 'city_name'});
            this.showAddressModal();
        }

        // setTimeout(this.showAddressModal, 500);

    }

    showAddressModal(){
        let title = this.state.currentAddress == 1 ? "Tỉnh/Thành phố" : this.state.currentAddress == 2 ? "Quận/huyện" : "Phường/Thị trấn";

        this.setState({choseAddress: true, addressTitle : title});
    }

    choseDistrictClick(){
        if(!this.state.city_item){
            this.choseCityClick();
            return;
        }


        this.setState({currentAddress:2});
        if(!this.state.district || this.state.district.length == 0){
            console.log('Chưa tồn tại District : ');
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: this.state.city_item.city_code}, this.showAutocompleteModal);
        }else {
            console.log('Isset District: ' + JSON.stringify(this.state.district));
            this.setState({ filterData: this.state.district, filterAttr: 'district_name'});
            this.showAddressModal();
        }

        // setTimeout(this.showAddressModal, 500);
    }

    choseWardClick(){
        if(!this.state.city_item){
            this.choseCityClick();
            return;
        }

        if(!this.state.district_item){
            this.choseDistrictClick();
            return;
        }

        this.setState({currentAddress:3});
        if(!this.state.ward || this.state.ward.length == 0){
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: this.state.district_item.district_code}, this.showAutocompleteModal);
        }else {
            this.setState({filterData: this.state.ward, filterAttr: 'ward_name'});
            this.showAddressModal();
        }
        // setTimeout(this.showAddressModal, 500);
    }

    closeFunction = (item) => {
        if (item) {
            if(this.state.currentAddress == 1){
               if (!this.state.city_item || (this.state.city_item.city_code !== item.city_code)){
                   this.setState({nextAddress:2, district_item : null, ward_item : null });
                   this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: item.city_code});
               }
            }

            if(this.state.currentAddress == 2){
                if (!this.state.district_item || this.state.district_item.district_code !== item.district_code){
                    this.setState({nextAddress:3 , ward_item : null});
                    this.getAdministrativeUnit(Def.URL_BASE + '/api/user/ward', {district_code: item.district_code});
                }
            }

            let unit = this.state.currentAddress == 1 ? 'city_item' : this.state.currentAddress == 2 ? 'district_item' : 'ward_item';
            this.setState({[unit]: item, choseAddress: false});

        } else {
            this.setState({choseAddress: false})
        }
    }
    parseDataToView(){
        let projectImg = this.getProjectImage();
        this.setState({
            user: Def.user_info,
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},
            infront_cmt_img: Def.getInfrontOfImg() ? {uri:Def.getInfrontOfImg()} : null,
            behind_cmt_img: Def.getBehindImg() ? {uri:Def.getBehindImg()} : null,
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            birth_day :Def.user_info['userProfile']['date_of_birth'] ? new Date(Def.user_info['userProfile']['date_of_birth']) :new Date() , //Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['firstname'],
            gender : Def.user_info['userProfile']['gender'],
            mobile:Def.user_info['userProfile']['phone'],
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'] ? new Date(Def.user_info['userProfile']['issued_on']) :new Date() , // Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
            address : Def.getDetailAddressFromUserInfo(),
            city_item: Def.getCityItemFromUserInfo(),
            district_item: Def.getDistrictItemFromUserInfo(),
            ward_item: Def.getWardItemFromUserInfo(),
            stateCount: Math.random(),
        });
    }

    getProjectImage(item){
        var partnerInfo = Def.user_info['partnerInfo'];
        var result = [];
        if(partnerInfo && partnerInfo['project_img']){
            let projectImg = partnerInfo['project_img'].split(',');
            result = projectImg.map(x => {
                return {uri:Def.URL_CONTENT_BASE +'partnerInfo/'+ x}
            });


        }
        return result;
    }

    validate(is_create = true){
        if (is_create){
            if(!this.state.avatarSource){
                alert("Vui lòng cập nhật ảnh Avatar");
            }else if(!this.state.mobile){
                alert("Vui lòng điền số điện thoại");
            }else if(!this.state.birth_day){
                alert("Vui lòng nhập thông tin ngày sinh");
            }else if(!this.state.gender){
                alert("Vui lòng nhập thông tin giới tính");
            }else if(!this.state.address){
                alert("Vui lòng nhập địa chỉ");
            }else if(!this.state.card_no){
                alert("Vui lòng nhập số CMND");
            } else if(!this.state.issue_on){
                alert("Vui lòng nhập ngày cấp");
            }else if(!this.state.issue_at){
                alert("Vui lòng nhập nơi cấp");
            }else if(!this.state.infront_cmt_img){
                alert("Vui lòng chụp ảnh mặt trước CMND");
            }else if(!this.state.behind_cmt_img){
                alert("Vui lòng chụp ảnh mặt sau CMND");
            }else if(!this.state.project_img1){
                alert("Vui lòng tải lên ảnh dự án");
            }else if(!this.state.project_img2){
                alert("Vui lòng tải lên ảnh dự án");
            }
            else if(!this.state.project_img3){
                alert("Vui lòng tải lên ảnh dự án");
            }
        }
    }

    validateAddress(){
        let err = 0;
        if(!this.state.city_item){
            alert("Vui cập nhật dữ liệu tỉnh/thành phố");
            err = 1;
        }

        if(!this.state.district_item){
            alert("Vui cập nhật dữ liệu quận/huyện");
            err = 2;
        }

        if(!this.state.ward_item){
            alert("Vui cập nhật dữ liệu phường/xã");
            err = 3;
        }

        if(!this.state.address){
            alert("Vui lòng cập nhật địa chỉ cụ thể");
            err = 3;
        }

        return err;
    }


    buildAddress(){
        let address = Def.getAddressFromUserInfo();
        let submitAddress = {};
            submitAddress.id = address ? address['id'] : null;
            submitAddress.address_detail = this.state.address;
            submitAddress.city_code = this.state.city_item.city_code;
            submitAddress.district_code = this.state.district_item.district_code;
            submitAddress.ward_code = this.state.ward_item.ward_code;
        return submitAddress;
    }


    updatePartnerInfo() {
        const {navigation} = this.props;
        console.log('Update user info');
        if(!this.state.avatarSource){
            alert("Vui lòng cập nhật ảnh Avatar");
            return;
        }else if(!this.state.mobile){
            alert("Vui lòng điền số điện thoại");
            return;
        }else if(!this.state.birth_day){
            alert("Vui lòng nhập thông tin ngày sinh");
            return;
        }else if(!this.state.address){
            alert("Vui lòng nhập địa chỉ");
            return;
        }else if(!this.state.card_no){
            alert("Vui lòng nhập số CMND");
            return;
        } else if(!this.state.issue_on){
            alert("Vui lòng nhập ngày cấp");
            return;
        }else if(!this.state.issue_at){
            alert("Vui lòng nhập nơi cấp");
            return;
        }else if(!this.state.infront_cmt_img){
            alert("Vui lòng chụp ảnh mặt trước CMND");
            return;
        }else if(!this.state.behind_cmt_img){
            alert("Vui lòng chụp ảnh mặt sau CMND");
            return;
        }else if(!this.state.project_img1){
            alert("Vui lòng tải lên ảnh dự án");
            return;
        }else if(!this.state.project_img2){
            alert("Vui lòng tải lên ảnh dự án");
            return;
        }
        else if(!this.state.project_img3){
            alert("Vui lòng tải lên ảnh dự án");
            return;
        } else {
        if(this.validateAddress()){
           return;
        }
        }
        let userInfo = {
            user_id : Def.user_info ? Def.user_info['id'] : 14,
            card_no: this.state.card_no,
            birth_day: this.state.birth_day ?  Def.getDateString(this.state.birth_day , "yyyy-MM-dd") : "",
            mobile: this.state.mobile,
            address: JSON.stringify(this.buildAddress()),
            issue_on: this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd") : "",
            issue_at: this.state.issue_at,
            gender: this.state.gender == "1" ? 1 :0,
            full_name: this.state.full_name,
        };

        if(this.state.avatarSource && (this.state.avatarSource.fileName || this.state.avatarSource.name ) ) {
            userInfo.avatar =   {
                name: this.state.avatarSource.fileName ? this.state.avatarSource.fileName : this.state.avatarSource.name ,
                type: this.state.avatarSource.type,
                uri: Platform.OS === "android" ? this.state.avatarSource.uri : this.state.avatarSource.uri.replace("file://", "")
            };
        }

        console.log("In front cmt : " + JSON.stringify(this.state.infront_cmt_img));

        if(this.state.infront_cmt_img && (this.state.infront_cmt_img.fileName || this.state.infront_cmt_img.name ) ) {


            userInfo.infront_cmt_img =   {
                name: this.state.infront_cmt_img.fileName ? this.state.infront_cmt_img.fileName : this.state.infront_cmt_img.name,
                type: this.state.infront_cmt_img.type,
                uri: Platform.OS === "android" ? this.state.infront_cmt_img.uri : this.state.infront_cmt_img.uri.replace("file://", "")
            };
        }

        if(this.state.behind_cmt_img && (this.state.behind_cmt_img.fileName || this.state.behind_cmt_img.name)) {
            userInfo.behind_cmt_img =   {
                name: this.state.behind_cmt_img.fileName ? this.state.behind_cmt_img.fileName : this.state.behind_cmt_img.name ,
                type: this.state.behind_cmt_img.type,
                uri: Platform.OS === "android" ? this.state.behind_cmt_img.uri : this.state.behind_cmt_img.uri.replace("file://", "")
            };
        }

        if(this.state.project_img1 && (this.state.project_img1.fileName || this.state.project_img1.name) ) {
            userInfo.project_img1 =   {
                name: this.state.project_img1.fileName ? this.state.project_img1.fileName : this.state.project_img1.name ,
                type: this.state.project_img1.type,
                uri: Platform.OS === "android" ? this.state.project_img1.uri : this.state.project_img1.uri.replace("file://", "")
            };
        }

        if(this.state.project_img2 && (this.state.project_img2.fileName || this.state.project_img2.name) ) {
            userInfo.project_img2 =   {
                name: this.state.project_img2.fileName ? this.state.project_img2.fileName :  this.state.project_img2.name,
                type: this.state.project_img2.type,
                uri: Platform.OS === "android" ? this.state.project_img2.uri : this.state.project_img2.uri.replace("file://", "")
            };
        }

        if(this.state.project_img3 && (this.state.project_img3.fileName || this.state.project_img3.name) ) {
            userInfo.project_img3 =   {
                name: this.state.project_img3.fileName ? this.state.project_img3.fileName : this.state.project_img3.name,
                type: this.state.project_img3.type,
                uri: Platform.OS === "android" ? this.state.project_img3.uri : this.state.project_img3.uri.replace("file://", "")
            };
        }
        console.log('UserInfo: ' + JSON.stringify(userInfo));
        UserController.updatePartnerInfo(userInfo, navigation);
        Def.setLoader = this.refresh.bind(this);
        // }
    }




    showDateTimePicker = (attr = null) => {
        let showDateVisible =     attr == 'birth_day' ? 'isDateTimePickerVisible' : 'isDateTimePickerVisibleIssueOn';

        this.setState({ [showDateVisible]: true , selectedDate : this.state[attr] ? this.state[attr] : new Date() , dateAttribute : attr });
    };

    hideDateTimePicker = () => {
        let showDateVisible =     this.state.dateAttribute == 'birth_day' ? 'isDateTimePickerVisible' : 'isDateTimePickerVisibleIssueOn';
        this.setState({  [showDateVisible] : false });
    };

    setDate(){
        let dateAttr = this.state.dateAttribute;
        this.setState({  selectedDate : this.state[dateAttr], isDateTimePickerVisible: false})
    }


    handleDatePicked = date => {
        let dateAttr = this.state.dateAttribute;
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
        this.setState({  [dateAttr] : date });
    };

    refresh()
    {
        this.parseDataToView();
        // this.setState({ stateCount: Math.random() });
    }

    shouldComponentUpdate(){
        console.log('should update');
        console.log('Refresh Update Partner');
        const index = Def.REFESH_SCREEN.indexOf('update-partner-screen');
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.refresh();
        }

        return true;
    }

    handleChoosePhoto = (attr = null) => {
        const options = {
            title: 'Chọn ảnh đại diện',
            // customButtons: [{ name: 'Eurotile', title: 'Chọn ảnh đại diện' }],
            takePhotoButtonTitle : "Chụp ảnh",
            chooseFromLibraryButtonTitle : "Chọn từ thư viện",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            noData :true,
        };



        ImagePicker.showImagePicker(options, response => {
                console.log('Attr res' + attr);
                if (response.uri) {
                    let maxsize = response.width > response.height ? response.width : response.height;

                    if (maxsize > Def.DEFAULT_MAX_SIZE) {

                        let compressType = response.type == "image/jpeg" ? "JPEG" : "PNG";
                        ImageResizer.createResizedImage(response.uri, Def.DEFAULT_MAX_SIZE, Def.DEFAULT_MAX_SIZE, compressType, 50, 0, undefined, false)
                            .then(resizedImage => {
                                console.log("Attr : " + attr);
                                resizedImage['type'] = response.type;
                                this.setState({[attr]: resizedImage});
                            })
                            .catch(err => {
                                console.log(err);
                                return Alert.alert(
                                    'Unable to resize the photo',
                                    'Check the console for full the error message',
                                );
                            });
                    } else {
                        this.setState({[attr]: response})
                    }
                }
            }
        )
    }


    renderItem = ({item, index}) => {

        return (
            <View key={index} style={Style.styles.cardStyle}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.cardImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                </TouchableOpacity>
            </View>
        );

    }

    filterData = (query) => {
        const { cities } = this.state;
        if (query === '') {
            return cities;
        }

        const regex = new RegExp(`${query.trim()}`, 'i');
        return cities.filter(cities => cities.city_name.search(regex) >= 0);
    }


    render() {
        const {navigation} = this.props;
        const {user} = this.state;
        // const data = this.filterData(this.state.query);
        return (
            <View style={{flex:1}}>
                <ScrollView keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR, paddingHorizontal : 5}}>
                    {this.state.showKeyboard == 0 ?
                        <View>
                            <TouchableOpacity onPress={() => this.handleChoosePhoto('avatarSource')}
                                              style={{alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                                {this.state.avatarSource && this.state.avatarSource.uri ?
                                    <Image
                                        source={{uri: this.state.avatarSource.uri}}
                                        style={{
                                            width: width / 3,
                                            height: width / 3,
                                            marginTop: 5,
                                            borderRadius: width / 6
                                        }}
                                    /> :
                                    <View style={{
                                        width: width / 3,
                                        height: width / 3,
                                        marginTop: 5,
                                        borderRadius: width / 6,
                                        borderWidth: 2,
                                        borderColor: Style.DEFAUT_RED_COLOR,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={30} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                                        <Text style={Style.text_styles.normalText}>
                                            Ảnh đại diện
                                        </Text>
                                    </View>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Họ & Tên
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() =>  this.setState({focus: 0})}
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                        value={this.state.full_name}
                                        onChangeText={text => this.setState({full_name: text})}
                                        placeholder={'Nhập họ tên'}
                                    />
                                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Điện thoại
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() => this.setState({focus: 0})}
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                        value={this.state.mobile}
                                        onChangeText={text => this.setState({mobile: text})}
                                        placeholder={'Nhập số điện thoại'}
                                    />
                                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Ngày sinh
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity style={{
                                        marginRight: 5,
                                        height: ITEM_HEIGHT,
                                        justifyContent: 'center',
                                        borderColor: Style.GREY_TEXT_COLOR
                                    }} onPress={() => this.showDateTimePicker('birth_day')}>
                                        <Text style={[Style.text_styles.titleTextNotBold, {
                                            justifyContent: 'center',
                                            paddingLeft: 5,
                                            color: Style.GREY_TEXT_COLOR
                                        }]}>
                                            {this.state.birth_day ? Def.getDateString(this.state.birth_day, "yyyy-MM-dd") : "Chọn ngày sinh"}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={(date) => {
                                            this.handleDatePicked(date);
                                            // this.hideDateTimePicker();
                                        }}
                                        onCancel={this.hideDateTimePicker}
                                        date={this.state.birth_day}
                                        mode={'date'}
                                        display='spinner'
                                        style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                                        datePickerModeAndroid='spinner'
                                        timePickerModeAndroid='spinner'
                                    />
                                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.middleText, {}]}>
                                    Giới Tính
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                    <View style={{
                                        marginRight: -5,
                                        height: ITEM_HEIGHT,
                                        backgroundColor: '#fff',
                                        borderRadius: 5
                                    }}>
                                        <Picker
                                            selectedValue={this.state.gender + ''}
                                            style={{height: ITEM_HEIGHT, width: width / 3.5}}
                                            mode="dropdown"
                                            onValueChange={(itemValue, itemIndex) => {
                                                console.log("Gender change: " + itemValue);
                                                this.setState({gender: itemValue})
                                            }
                                            }>
                                            <Picker.Item label="Nam" value="0"/>
                                            <Picker.Item label="Nữ" value="1"/>
                                        </Picker>
                                    </View>
                                    {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                                </View>
                            </TouchableOpacity>
                        </View> : <View/>
                    }
                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:5}}
                        onPress={this.choseCityClick}
                    >
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Tỉnh/Thành phố
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>

                            <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                                {this.state.city_item ? this.state.city_item.city_name : 'Chọn tỉnh/thành phố'}
                            </Text>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}
                                      onPress={this.choseDistrictClick}
                    >
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Quận/Huyện
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>

                            <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                                {this.state.district_item ? this.state.district_item.district_name : 'Chọn quận/huyện'}
                            </Text>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:1}}
                                      onPress={this.choseWardClick}
                    >
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Phường/Xã
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>

                            <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                                {this.state.ward_item ? this.state.ward_item.ward_name : 'Chọn phường/xã'}
                            </Text>
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{ marginRight : 5}]}>
                            Địa chỉ cụ thể
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <TextInput
                                onFocus={() => this.setState({focus:1, showKeyboard: true})}
                                onBlur={()=> this.setState({focus:0, showKeyboard: false})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                value={this.state.address.toString()}
                                onChangeText={text => {
                                    this.setState({address:text})
                                }}

                                onSubmitEditing={Keyboard.dismiss}

                                placeholder={'Số nhà, tên đường'}
                            />
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:5}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            CMND
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <TextInput
                                onFocus={() => this.setState({focus:1, showKeyboard: true})}
                                onBlur={()=> this.setState({focus:0, showKeyboard: false})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                value={this.state.card_no}
                                onChangeText={text => this.setState({card_no:text})}
                            />
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Ngày cấp
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <TouchableOpacity style={{ marginRight: 5, height :ITEM_HEIGHT, justifyContent : 'center', borderColor:Style.GREY_TEXT_COLOR}} onPress={() => this.showDateTimePicker('issue_on')} >
                                <Text style={[Style.text_styles.titleTextNotBold, {justifyContent : 'center', paddingLeft: 5, color:Style.GREY_TEXT_COLOR} ]}>
                                    {this.state.birth_day ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd")  : "chọn ngày cấp"}
                                </Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={this.state.isDateTimePickerVisibleIssueOn}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                date={this.state.issue_on}
                                mode={'date'}
                                display='spinner'
                                style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                                datePickerModeAndroid='spinner'
                                timePickerModeAndroid='spinner'
                            />
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:1}}>
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Nơi cấp
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>

                            <TextInput
                                onFocus={() => this.setState({focus:1, showKeyboard: true})}
                                onBlur={()=> this.setState({focus:0, showKeyboard: false})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                value={this.state.issue_at}
                                onChangeText={text => this.setState({issue_at:text})}
                            />
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleChoosePhoto('infront_cmt_img')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
                        <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                            <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                                CMND (Mặt trước)
                            </Text>
                        </View>

                        {this.state.infront_cmt_img && this.state.infront_cmt_img.uri?
                            <View>
                                <Image
                                    source={{ uri: this.state.infront_cmt_img.uri }}
                                    style={{ width: width, height:150, maxHeight: 200 , marginTop: 5 }}
                                />
                            </View>
                            :
                            <View style={{ width: width * 0.8, height: 150 , marginTop: 5 , borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={40} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            </View>
                        }
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.handleChoosePhoto('behind_cmt_img')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
                        <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                            <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                                CMND (Mặt sau)
                            </Text>
                        </View>

                        {this.state.behind_cmt_img && this.state.behind_cmt_img.uri ?
                            <Image
                                source={{ uri: this.state.behind_cmt_img.uri }}
                                style={{ width: width, height: 200 , marginTop: 5 }}
                            /> :
                            <View style={{ width: width * 0.8, height: 150 , marginTop: 5 , borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={40} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            </View>
                        }
                    </TouchableOpacity>



                    <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:5 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                        <Text style={[Style.text_styles.titleTextNotBold,{}]}>
                            Dự án đã thực hiện
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.handleChoosePhoto('project_img1')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
                        <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                            <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                                Dự án 1
                            </Text>
                        </View>

                        {this.state.project_img1 && this.state.project_img1.uri ?
                            <Image
                                source={{ uri: this.state.project_img1.uri }}
                                style={{ width: width, height: 200 , marginTop: 5 }}
                            /> :
                            <View style={{ width: width * 0.8, height: 150 , marginTop: 5 , borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={40} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            </View>
                        }
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.handleChoosePhoto('project_img2')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
                        <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                            <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                                Dự án 2
                            </Text>
                        </View>

                        {this.state.project_img2 && this.state.project_img2.uri ?
                            <Image
                                source={{ uri: this.state.project_img2.uri }}
                                style={{ width: width, height: 200 , marginTop: 5 }}
                            /> :
                            <View style={{ width: width * 0.8, height: 150 , marginTop: 5 , borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={40} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleChoosePhoto('project_img3')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingTop:5}}>
                        <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                            <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                                Dự án 3
                            </Text>
                        </View>

                        {this.state.project_img3 && this.state.project_img3.uri?
                            <Image
                                source={{ uri: this.state.project_img3.uri }}
                                style={{ width: width, height: 200 , marginTop: 5 }}
                            /> :
                            <View style={{ width: width * 0.8, height: 150 , marginTop: 5 , borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={40} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            </View>
                        }
                    </TouchableOpacity>
                </ScrollView>
                <Modal onRequestClose={() => {this.closeFunction(null)}} visible={this.state.choseAddress}  transparent={false} styles={{backgroundColor : 'green'}} >
                    {/*{this.state.choseAddress ?*/}
                    <AutocompleteModal
                        data={this.state.filterData}
                        filterAttr={this.state.filterAttr}
                        closeFunction={this.closeFunction}
                        addressTitle={this.state.addressTitle}

                    />
                </Modal>
                <TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}  onPress={this.updatePartnerInfo}>

                    <Text style={styles.buttonText}>
                        Cập nhật
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    textEditableNormal : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE , marginRight : 5, textAlign: 'right'},
    textEditableForcus : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE  , marginRight : 5, textAlign: 'right'},
});

export default UpdatePartnerScreen;
