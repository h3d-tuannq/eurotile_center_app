import React, {useState} from 'react'
import {
    Text,
    View,
    Button,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    Modal,
} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import AutocompleteModal from '../../../src/com/common/AutocompleteModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 50;

import DateTimePickerModal from "react-native-modal-datetime-picker";



import UserController from "../../controller/UserController";
import Net from "../../net/Net";
import ImageResizer from 'react-native-image-resizer';

class UpdateProfileScreen extends React.Component {
    _container;
    _txt;
    _position = [];
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
        let projectImg = this.getProjectImage();
        this.state = {
            focus : 0,
            isUpdate: 0,
            user: Def.user_info,
            stateCount: 0.0,
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},
            birth_day :Def.user_info['userProfile']['date_of_birth'] ? new Date(Def.user_info['userProfile']['date_of_birth']) :new Date() , //Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['firstname'],
            mobile:Def.user_info['userProfile']['phone'],
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
            addressTitle: 'Tỉnh/Thành phố',
            isPartner: Def.checkPartnerPermission()>-1,
        };

        this.refresh = this.refresh.bind(this);
        Def.mainNavigate = this.props.navigation;
        Def.setLoader = this.refresh;
        this.scrollObjLayoutY = this.scrollObjLayoutY.bind(this);
        Def.updateProfileFunc = this.updatePartnerInfo;
    }

    scrollObjLayoutY = (y) => {
        console.log('Scroll to 1' );
        if(this._position && this._position[y]) {
            this._container.scrollTo({
                x: 0,
                y: this._position[y] - height /3 ,
                animated: true,
            });
        }
    }

    componentDidMount(){
        if(Def.user_info) {
            console.log('Exist User');
        }
        Net.sendRequest(this.onGetCites,this.onGetCitesFalse,Def.URL_BASE + '/api/user/city' , Def.POST_METHOD);
    }
    componentWillUnmount() {
    }
    onGetCites(res){
        this.setState({cities: res});
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
            this.getAdministrativeUnit(Def.URL_BASE + '/api/user/district', {city_code: this.state.city_item.city_code}, this.showAutocompleteModal);
        }else {
            this.setState({ filterData: this.state.district, filterAttr: 'district_name'});
            this.showAddressModal();
        }
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

            birth_day :Def.user_info['userProfile']['date_of_birth'] ? new Date(Def.user_info['userProfile']['date_of_birth']) :new Date() , //Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['firstname'],
            mobile:Def.user_info['userProfile']['phone'],
            address : Def.getDetailAddressFromUserInfo(),
            city_item: Def.getCityItemFromUserInfo(),
            district_item: Def.getDistrictItemFromUserInfo(),
            ward_item: Def.getWardItemFromUserInfo(),
            stateCount: Math.random(),
        });
    }

    getProjectImage(item){
        var partnerInfo = Def.user_info && Def.user_info['partnerInfo'];
        var result = [];
        if(partnerInfo && partnerInfo['project_img']){
            let projectImg = partnerInfo['project_img'].split(',');
            result = projectImg.map(x => {
                return {uri:Def.URL_CONTENT_BASE +'partnerInfo/'+ x}
            });
        }
        return result;
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
        }else if(!this.state.address){
            alert("Vui lòng nhập địa chỉ");
            return;
        }
        else {
        if(this.validateAddress()){
           return;
        }
        }
        let userInfo = {
            user_id : Def.user_info ? Def.user_info['id'] : 14,
            mobile: this.state.mobile,
            address: JSON.stringify(this.buildAddress()),
            full_name: this.state.full_name,
        };

        if(this.state.avatarSource && (this.state.avatarSource.fileName || this.state.avatarSource.name ) ) {
            userInfo.avatar =   {
                name: this.state.avatarSource.fileName ? this.state.avatarSource.fileName : this.state.avatarSource.name ,
                type: this.state.avatarSource.type,
                uri: Platform.OS === "android" ? this.state.avatarSource.uri : this.state.avatarSource.uri.replace("file://", "")
            };
        }
        UserController.updatePartnerInfo(userInfo, navigation);
        Def.setLoader = this.refresh.bind(this);
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
        const index = Def.REFESH_SCREEN.indexOf('update-profile');
        if (index > -1) {
            Def.REFESH_SCREEN.splice(index, 1);
            this.refresh();
        }

        return true;
    }

    checkTakePhotoImg = (uri) => {
        var n = uri.search("com.eurotile_center_app");
        return n != -1;
    }

    checkGallaryImg = (uri) => {
        var n = uri.search("com.eurotile_center_app");
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
                if (response.uri) {
                    let maxsize = response.width > response.height ? response.width : response.height;
                    console.log('sizeBefore: ' + '(' + response.width + ' , ' + response.height + ') : ' + JSON.stringify(response));
                    if (maxsize > Def.DEFAULT_MAX_SIZE) {
                        console.log('Resize');
                        let compressType = response.type == "image/jpeg" ? "JPEG" : "PNG";
                        let rotation = 360;
                        if ( response.originalRotation === 90 ) {
                            if(this.checkTakePhotoImg(response.uri)){
                                rotation = 90;
                            }

                        } else if ( response.originalRotation === 270 ) {
                            rotation = -90
                        }
                        console.log('Rotate : ' + rotation);
                        ImageResizer.createResizedImage(response.uri, Def.DEFAULT_MAX_SIZE, Def.DEFAULT_MAX_SIZE, compressType, 50, rotation, undefined, true)
                            .then(resizedImage => {
                                console.log('sizeAfter: ' + '(' + resizedImage.width + ' , ' + resizedImage.height + ') : ' + JSON.stringify(resizedImage));
                                console.log("Attr : " + attr);
                                resizedImage['originalRotation'] = response['originalRotation'];
                                resizedImage['isVertical'] = response['isVertical'];
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
                <ScrollView keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: '#fff', paddingHorizontal : 5}}
                            ref={(c) => { this._container = c; }}
                >
                    <View>
                            <TouchableOpacity onPress={() => this.handleChoosePhoto('avatarSource')}
                                              style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop:20}}>
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
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.titleTextNotBold, styles.label , {}]}>
                                    Họ & Tên
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() =>  this.setState({focus: 0})}
                                        placeholderTextColor = "#000"
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {borderBottomWidth:1, width: width - 80}]}
                                        value={this.state.full_name}
                                        onChangeText={text => this.setState({full_name: text})}
                                        placeholder={'Nhập họ tên'}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginTop:5,
                                paddingHorizontal: 40,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                            }}>
                                <Text style={[Style.text_styles.titleTextNotBold, styles.label , {}]}>
                                    Ngày sinh
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <TouchableOpacity style={{
                                        marginRight: 5,
                                        height: ITEM_HEIGHT,
                                        justifyContent: 'center',
                                        borderColor: Style.DEFAUT_BLACK_COLOR,
                                        borderBottomWidth:1, width:  width - 80,
                                    }} onPress={() => this.showDateTimePicker('birth_day')}>
                                        <Text style={[Style.text_styles.titleTextNotBold, {
                                            justifyContent: 'center',
                                            paddingLeft: 0,
                                            color: Style.DEFAUT_BLACK_COLOR,
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
                                        style={{width: 400, opacity: 0.5, height: 200}}
                                        datePickerModeAndroid='spinner'
                                        timePickerModeAndroid='spinner'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                                paddingVertical: 5,
                                backgroundColor: '#fff',
                                marginTop: 1
                            }}>
                                <Text style={[Style.text_styles.titleTextNotBold, styles.label , {}]}>
                                    Số điện thoại
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <TextInput
                                        onFocus={() => this.setState({focus: 1})}
                                        onBlur={() =>  this.setState({focus: 0})}
                                        placeholderTextColor = "#000"
                                        style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {borderBottomWidth:1, width: width - 80}]}
                                        value={this.state.mobile}
                                        onChangeText={text => this.setState({mobile: text})}
                                        placeholder={'Nhập số điện thoại'}
                                    />
                                </View>
                            </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent:'space-between',paddingHorizontal:40 , paddingVertical: 5,
                        backgroundColor : '#fff', marginTop:5
                        }}
                        onPress={this.choseCityClick}
                    >
                        <Text style={[Style.text_styles.middleText, styles.label ,{}]}>
                            Tỉnh/Thành phố
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center', borderBottomWidth:1, width:  width - 80 , height:ITEM_HEIGHT}}>

                            <Text style={[Style.text_styles.titleTextNotBold,{ marginRight : 5  }]}>
                                {this.state.city_item ? this.state.city_item.city_name : 'Chọn tỉnh/thành phố'}
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-between',paddingHorizontal:40 ,
                                        paddingVertical: 5,  backgroundColor : '#fff', marginTop:5}}
                                      onPress={this.choseDistrictClick}
                    >
                        <Text style={[Style.text_styles.middleText, styles.label ,{}]}>
                            Quận/Huyện
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center', borderBottomWidth:1, width:  width - 80 , height:ITEM_HEIGHT}}>

                            <Text style={[Style.text_styles.titleTextNotBold,{ marginRight : 5}]}>
                                {this.state.district_item ? this.state.district_item.district_name : 'Chọn quận/huyện'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-between',paddingHorizontal:40 ,
                        paddingVertical: 5,  backgroundColor : '#fff', marginTop:5}}
                                      onPress={this.choseWardClick}
                    >
                        <Text style={[Style.text_styles.middleText, styles.label ,{}]}>
                            Phường/Xã
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center' , borderBottomWidth:1, width:  width - 80 , height:ITEM_HEIGHT}}>

                            <Text style={[Style.text_styles.titleTextNotBold,{ marginRight : 5}]}>
                                {this.state.ward_item ? this.state.ward_item.ward_name : 'Chọn phường/xã'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-between',paddingHorizontal:40 ,paddingVertical: 5, paddingBottom : 10, backgroundColor : '#fff', marginTop:5}}
                                      onLayout={(event) => {
                                          const layout = event.nativeEvent.layout;
                                          console.log('Layout Y ' + layout.y);
                                          this._position[0] = layout.y;
                                      }}
                    >
                        <Text style={[Style.text_styles.middleText,styles.label,{ marginRight : 5}]}>
                            Địa chỉ cụ thể
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <TextInput
                                ref={(c) => { this._txt = c; }}
                                onFocus={
                                    (e) => {
                                        this.setState({focus:1});
                                        this.scrollObjLayoutY(0);

                                    }
                                }
                                placeholderTextColor = "#000"
                                onBlur={()=> this.setState({focus:0})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {borderBottomWidth:1, width: width - 80}]}
                                value={ typeof this.state.address ? this.state.address.toString() : ""}
                                onChangeText={text => {
                                    this.setState({address:text})
                                }}
                                blurOnSubmit={true}
                                placeholder={'Số nhà, tên đường'}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{height : height /3}}>

                    </View>

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
                {/*<TouchableOpacity style={[styles.button, {backgroundColor: Style.DEFAUT_RED_COLOR, justifyContent:'center', alignItems:'center', height:45}]}  onPress={this.updatePartnerInfo}>*/}

                {/*    <Text style={[styles.buttonText, {fontSize : 18}]}>*/}
                {/*        Cập nhật*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    textEditableNormal : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black',
        fontSize : Style.TITLE_SIZE , marginRight : 5, textAlign: 'left' , fontWeight: '600', paddingLeft:0, paddingBottom : 12},
    textEditableForcus : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black',
        fontSize : Style.TITLE_SIZE  , marginRight : 5, textAlign: 'left', fontWeight: '600',paddingLeft:0 , paddingBottom : 12},
    label: {color:Style.GREY_TEXT_COLOR, fontSize : Style.TITLE_SIZE -1},
});

export default UpdateProfileScreen;
