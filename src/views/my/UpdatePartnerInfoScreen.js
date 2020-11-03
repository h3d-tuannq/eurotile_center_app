import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, Platform} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

import DatePicker from 'react-native-datepicker'

import DateTimePicker from "react-native-modal-datetime-picker";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {Picker} from '@react-native-community/picker';
import UserController from "../../controller/UserController";

class UpdatePartnerInfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind();
        this.handleDatePicked = this.handleDatePicked.bind();
        this.hideDateTimePicker = this.hideDateTimePicker.bind();
        this.updatePartnerInfo = this.updatePartnerInfo.bind(this);
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
            address : Def.user_info['userProfile']['gender'],
            isDateTimePickerVisible :false,
            selectedDate : new Date(),
            dateAttribute : 'birth_day',
        };

        console.log("Front-end" + Def.getInfrontOfImg());
        this.refresh = this.refresh.bind(this);
        Def.setLoader = this.refresh;
         // this.parseDataToView();
    }

    parseDataToView(){
        let projectImg = this.getProjectImage();
        let userInfo = {
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},
            infront_cmt_img: Def.getInfrontOfImg(),
            behind_cmt_img: Def.getBehindImg(),
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            birth_day : Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['first_name'],
            gender : Def.user_info['userProfile']['gender'],
            mobile:Def.user_info['userProfile']['phone'],
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
            address : Def.user_info['userProfile']['gender'],
            isDateTimePickerVisible :false,
            selectedDate : new Date(),
            dateAttribute : 'birth_day',
        }
        this.setState({
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},
            infront_cmt_img: Def.getInfrontOfImg(),
            behind_cmt_img: Def.getBehindImg(),
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            birth_day : Def.user_info['userProfile']['birth_day'] ? new Date(Def.user_info['userProfile']['birth_day']) :null , //Def.user_info['userProfile']['birth_day'],
            full_name : Def.user_info['userProfile']['first_name'],
            gender : Def.user_info['userProfile']['gender'],
            mobile:Def.user_info['userProfile']['phone'],
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'] ? new Date(Def.user_info['userProfile']['issued_on']) : null , // Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
            address : Def.user_info['userProfile']['gender'],
            isDateTimePickerVisible :false,
            selectedDate : new Date(),
            dateAttribute : 'birth_day',
        });
    }r

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

    updatePartnerInfo() {
        const {navigation} = this.props;

        // if(!this.state.avatarSource){
        //     alert("Vui lòng cập nhật ảnh Avatar");
        // }else if(!this.state.mobile){
        //     alert("Vui lòng điền số điện thoại");
        // }else if(!this.state.birth_day){
        //     alert("Vui lòng nhập thông tin ngày sinh");
        // }else if(!this.state.gender){
        //     alert("Vui lòng nhập thông tin giới tính");
        // }else if(!this.state.address){
        //     alert("Vui lòng nhập địa chỉ");
        // }else if(!this.state.card_no){
        //     alert("Vui lòng nhập số CMND");
        // } else if(!this.state.issue_on){
        //     alert("Vui lòng nhập ngày cấp");
        // }else if(!this.state.issue_at){
        //     alert("Vui lòng nhập nơi cấp");
        // }else if(!this.state.infront_cmt_img){
        //     alert("Vui lòng chụp ảnh mặt trước CMND");
        // }else if(!this.state.behind_cmt_img){
        //     alert("Vui lòng chụp ảnh mặt sau CMND");
        // }else if(!this.state.project_img1){
        //     alert("Vui lòng tải lên ảnh dự án");
        // }else if(!this.state.project_img2){
        //     alert("Vui lòng tải lên ảnh dự án");
        // }
        // else if(!this.state.project_img3){
        //     alert("Vui lòng tải lên ảnh dự án");
        // } else {
        let userInfo = {
            user_id : Def.user_info ? Def.user_info['id'] : 14,
            card_no: this.state.card_no,
            birth_day: this.state.birth_day ?  Def.getDateString(this.state.birth_day , "yyyy-MM-dd") : "",
            mobile: this.state.mobile,
            // address: this.state.address,
            issue_on: this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd") : "",
            issue_at: this.state.issue_at,
            gender: this.state.gender ? 1 :0,
            full_name: this.state.full_name,
        };

        if(this.state.avatarSource && this.state.avatarSource.fileName ) {
            userInfo.avatar =   {
                name: this.state.avatarSource.fileName,
                type: this.state.avatarSource.type,
                uri: Platform.OS === "android" ? this.state.avatarSource.uri : this.state.avatarSource.uri.replace("file://", "")
            };
        }

        if(this.state.infront_cmt_img && this.state.infront_cmt_img.fileName ) {
            userInfo.infront_cmt_img =   {
                name: this.state.infront_cmt_img.fileName,
                type: this.state.infront_cmt_img.type,
                uri: Platform.OS === "android" ? this.state.infront_cmt_img.uri : this.state.infront_cmt_img.uri.replace("file://", "")
            };
        }

        if(this.state.behind_cmt_img && this.state.behind_cmt_img.fileName ) {
            userInfo.behind_cmt_img =   {
                name: this.state.behind_cmt_img.fileName,
                type: this.state.behind_cmt_img.type,
                uri: Platform.OS === "android" ? this.state.behind_cmt_img.uri : this.state.behind_cmt_img.uri.replace("file://", "")
            };
        }

        if(this.state.project_img1 && this.state.project_img1.fileName ) {
            userInfo.project_img1 =   {
                name: this.state.project_img1.fileName,
                type: this.state.project_img1.type,
                uri: Platform.OS === "android" ? this.state.project_img1.uri : this.state.project_img1.uri.replace("file://", "")
            };
        }

        if(this.state.project_img2 && this.state.project_img1.fileName ) {
            userInfo.project_img2 =   {
                name: this.state.project_img2.fileName,
                type: this.state.project_img2.type,
                uri: Platform.OS === "android" ? this.state.project_img2.uri : this.state.project_img2.uri.replace("file://", "")
            };
        }

        if(this.state.project_img3 && this.state.project_img3.fileName ) {
            userInfo.project_img3 =   {
                name: this.state.project_img3.fileName,
                type: this.state.project_img3.type,
                uri: Platform.OS === "android" ? this.state.project_img3.uri : this.state.project_img3.uri.replace("file://", "")
            };
        }
        UserController.updatePartnerInfo(userInfo, navigation);
        Def.setLoader = this.refresh.bind(this);
    // }
    }




    showDateTimePicker = (attr = null) => {
        this.setState({ isDateTimePickerVisible: true , selectedDate : this.state[attr] ? this.state[attr] : new Date() , dateAttribute : attr });
    };

    hideDateTimePicker = () => {
        console.log('hide date picker');
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let dateAttr = this.state.dateAttribute;
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
        this.setState({  selectedDate : date, [dateAttr] : date })

    };

    refresh()
    {
        // this.parseDataToView();
        this.setState({ stateCount: Math.random() });
    }

    shouldComponentUpdate(){
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
            console.log(response);
            if (response.uri) {
                this.setState({ [attr]: response })
            }
        })
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


    render() {
        const {navigation} = this.props;
        const {user} = this.state;
        return (
            <View style={{flex:1}}>
            <ScrollView style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR, paddingHorizontal : 5}}>
                <TouchableOpacity onPress={() => this.handleChoosePhoto('avatarSource')} style={{ alignItems: 'center', justifyContent: 'center' , marginBottom: 5 }}>
                    {this.state.avatarSource ?
                        <Image
                            source={{ uri: this.state.avatarSource.uri }}
                            style={{ width: width/3, height: width/3 , marginTop: 20 , borderRadius : width / 6 }}
                        /> :
                        <View style={{ width: width/3, height: width/3 , marginTop: 20 , borderRadius : width / 6, borderWidth: 2 , borderColor:Style.DEFAUT_RED_COLOR,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Icon size={30} name="camera" color={Style.DEFAUT_RED_COLOR}/>
                            <Text style={Style.text_styles.normalText}>
                                Ảnh đại diện
                            </Text>
                        </View>
                    }
                </TouchableOpacity>

                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {}]}
                        value={this.state.full_name}
                        onChangeText={text => this.setState({full_name:text})}
                        placeholder='Họ và tên'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />

                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {}]}
                        value={this.state.mobile}
                        onChangeText={text => this.setState({mobile:text})}
                        placeholder='Điện thoại'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />

                <View style={{flexDirection : 'row', alignItems:'center', backgroundColor: '#fff'}}>
                    <TouchableOpacity style={{flex: 1.5, marginRight: 5, height :45, borderRadius:5, justifyContent : 'center', borderWidth :1, borderColor:Style.GREY_TEXT_COLOR}} onPress={() => this.showDateTimePicker('birth_day')} >
                        <Text style={[Style.text_styles.titleTextNotBold, {justifyContent : 'center', paddingLeft: 5, color:Style.GREY_TEXT_COLOR} ]}>
                            {this.state.birth_day ? Def.getDateString(this.state.birth_day , "yyyy-MM-dd")  : "Ngày sinh"}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        date={this.state.selectedDate}
                        mode={'date'}
                        display='spinner'
                        style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                        datePickerModeAndroid='spinner'
                        timePickerModeAndroid='spinner'
                    />
                    <View style={{ height: 45, flex:1, borderWidth:1,borderColor:Style.GREY_TEXT_COLOR, backgroundColor:'#fff', borderRadius:5 }}>
                        <Picker
                            selectedValue={this.state.gender}
                            style={{height: 45 }}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({gender: itemValue})
                            }>
                            <Picker.Item label="Nam" value="0" />
                            <Picker.Item label="Nữ" value="1" />
                        </Picker>
                    </View>
                </View>

                {/*<TextInput*/}
                    {/*onFocus={() => this.setState({focus:1})}*/}
                    {/*onBlur={()=> this.setState({focus:0})}*/}
                    {/*style={this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal}*/}
                    {/*value={this.state.address}*/}
                    {/*onChangeText={text => this.setState({address:text})}*/}
                    {/*placeholder='Địa chỉ'*/}
                    {/*placeholderTextColor="#b3b3b3"*/}
                    {/*autoCapitalize = 'none'*/}
                    {/*// underlineColorAndroid = "transparent"*/}
                {/*/>*/}



                <View style={{flexDirection : 'row' , alignItems:'center' , backgroundColor:'#fff'}}>
                    <TextInput
                        onFocus={() => this.setState({focus:1})}
                        onBlur={()=> this.setState({focus:0})}
                        style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {flex:1.5, marginRight:5}]}
                        value={this.state.card_no}
                        onChangeText={text => this.setState({card_no:text})}
                        placeholder='CMND'
                        placeholderTextColor="#b3b3b3"
                        autoCapitalize = 'none'
                        // underlineColorAndroid = "transparent"
                    />
                    <TouchableOpacity style={{flex: 1.5, marginRight: 5, height :45, borderRadius:5, justifyContent : 'center', borderWidth :1, borderColor:Style.GREY_TEXT_COLOR}} onPress={() => this.showDateTimePicker('issue_on')} >
                        <Text style={[Style.text_styles.titleTextNotBold, {justifyContent : 'center', paddingLeft: 5, color:Style.GREY_TEXT_COLOR} ]}>
                            {this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd")  : "Ngày cấp"}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        date={this.state.selectedDate}
                        mode={'date'}
                        display='spinner'
                        style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                        datePickerModeAndroid='spinner'
                        timePickerModeAndroid='spinner'
                    />

                </View>

                <TextInput
                    onFocus={() => this.setState({focus:1})}
                    onBlur={()=> this.setState({focus:0})}
                    style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {flex:1.5}]}
                    value={this.state.issue_at}
                    onChangeText={text => this.setState({issue_at:text})}
                    placeholder='Nơi cấp'
                    placeholderTextColor="#b3b3b3"
                    autoCapitalize = 'none'
                    // underlineColorAndroid = "transparent"
                />

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:5 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                    <Text style={[Style.text_styles.titleTextNotBold,{}]}>
                        Ảnh chụp chứng minh thư
                    </Text>
                </View>


                <TouchableOpacity onPress={() => this.handleChoosePhoto('infront_cmt_img')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
                    <View style={{flex:1, width : width -10, height:Style.HEADER_HEIGHT}}>
                        <Text style={[Style.text_styles.titleTextNotBold, {marginLeft:5}]}>
                            CMND (Mặt trước)
                        </Text>
                    </View>

                    {this.state.infront_cmt_img ?
                        <Image
                            source={{ uri: this.state.infront_cmt_img.uri }}
                            style={{ width: width, height:150, maxHeight: 200 , marginTop: 5 }}
                        /> :
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

                    {this.state.behind_cmt_img ?
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

                    {this.state.project_img1 ?
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

                    {this.state.project_img2 ?
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

                    {this.state.project_img3 ?
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
    container: {
        flex : 1,
        paddingLeft: 15,
        // justifyContent: 'flex-start',
        // marginVertical : 5,
        marginBottom : 125,
        backgroundColor: '#fff'
    },
    slider: {
        justifyContent: 'center',
        paddingTop: 5,
        padding: 8,
        height: 120,
        borderRadius: 5,
        backgroundColor: "#e6e6e6",
        marginRight : 15
    },
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width-20,
        height: width/2,

    },
    programListStyle : {

    },
    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    imageStyle : {
        width : width /3,
        height : width / 3,

        borderRadius: width / 6,
    },
    imageStyleInfo : {
        width : width /8,
        height : width / 8,

        borderRadius: width / 16,
    },

    button : {
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 5, marginTop : 5, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center', paddingHorizontal : 5
    },
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginVertical:3, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginVertical:3, paddingHorizontal: 10 },

    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 2},

});

export default UpdatePartnerInfoScreen;
