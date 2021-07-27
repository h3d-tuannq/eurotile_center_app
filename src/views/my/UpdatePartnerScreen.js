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
} from 'react-native';
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

const ITEM_HEIGHT = 40;

import DateTimePickerModal from "react-native-modal-datetime-picker";

import UserController from "../../controller/UserController";
import Net from "../../net/Net";
import ImageResizer from 'react-native-image-resizer';

class UpdatePartnerScreen extends React.Component {
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

        this.showAutocompleteModal = this.showAutocompleteModal.bind(this);
        this.parseDataToView = this.parseDataToView.bind(this);
        this.setDate = this.setDate.bind(this);
        let projectImg = this.getProjectImage();
        this.state = {
            focus : 0,
            isUpdate: 0,
            user: Def.user_info,
            stateCount: 0.0,
            infront_cmt_img: Def.getInfrontOfImg() ? {uri:Def.getInfrontOfImg()} : null,
            behind_cmt_img: Def.getBehindImg() ? {uri:Def.getBehindImg()} : null,
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'] ? new Date(Def.user_info['userProfile']['issued_on']) :new Date() , // Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
            isDateTimePickerVisible :false,
            isDateTimePickerVisibleIssueOn:false,
            selectedDate : new Date(),
            query : '',
            isPartner: Def.checkPartnerPermission()>-1,


        };

        this.refresh = this.refresh.bind(this);
        Def.mainNavigate = this.props.navigation;
        Def.setLoader = this.refresh;
        this.scrollObjLayoutY = this.scrollObjLayoutY.bind(this);
        Def.updatePartnerInfo = this.updatePartnerInfo;
        // this.parseDataToView();
    }

    scrollObjLayoutY = (y) => {
        if(this._position && this._position[y]) {
            this._container.scrollTo({
                x: 0,
                y: this._position[y] - height/3,
                animated: true,
            });
        }
    }

    componentDidMount(){
        console.log('Partner Info : ' + JSON.stringify(Def.user_info.partnerInfo));
    }



    componentWillUnmount() {
    }
    showAutocompleteModal(res){
    }


    parseDataToView(){
        let projectImg = this.getProjectImage();
        this.setState({
            user: Def.user_info,
            infront_cmt_img: Def.getInfrontOfImg() ? {uri:Def.getInfrontOfImg()} : null,
            behind_cmt_img: Def.getBehindImg() ? {uri:Def.getBehindImg()} : null,
            project_img1 : projectImg && projectImg.length > 0 ? projectImg[0]: null ,
            project_img2 : projectImg && projectImg.length > 1 ? projectImg[1]: null,
            project_img3 : projectImg && projectImg.length > 2 ? projectImg[2]: null,
            card_no : Def.user_info['userProfile']['card_number'],
            issue_on : Def.user_info['userProfile']['issued_on'] ? new Date(Def.user_info['userProfile']['issued_on']) :new Date() , // Def.user_info['userProfile']['issued_on'], // Ngày cấp
            issue_at : Def.user_info['userProfile']['issued_at'], // Nơi cấp
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

    updatePartnerInfo() {
        const {navigation} = this.props;
        console.log('Update user info');
        if(!this.state.card_no){
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
        }

        let userInfo = {
            user_id : Def.user_info ? Def.user_info['id'] : 14,
            card_no: this.state.card_no,
            issue_on: this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd") : "",
            issue_at: this.state.issue_at,
        };
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
        const index = Def.REFESH_SCREEN.indexOf('update-partner');
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
                <ScrollView keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR, paddingHorizontal : 5}}
                            ref={(c) => { this._container = c; }}
                >
                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:5}}
                                      onLayout={(event) => {
                                          const layout = event.nativeEvent.layout;
                                          this._position[0] = layout.y;
                                      }}
                    >
                        <Text style={[Style.text_styles.middleText,{}]}>
                            CMND
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <TextInput
                                onFocus={() => {
                                    this.setState({focus:1});
                                    this.scrollObjLayoutY(0);
                                }}
                                onBlur={()=> this.setState({focus:0})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                value={this.state.card_no}
                                onChangeText={text => this.setState({card_no:text})}
                                placeholder={'Nhập CMND'}
                                blurOnSubmit={true}
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
                                    {this.state.issue_on ? Def.getDateString(this.state.issue_on , "yyyy-MM-dd")  : "Chọn ngày cấp"}
                                </Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={this.state.isDateTimePickerVisibleIssueOn}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                date={this.state.issue_on}
                                mode={'date'}
                                display='spinner'
                                // style={{width: 400, opacity: 1, height: 100, marginTop: 540}}
                                datePickerModeAndroid='spinner'
                                timePickerModeAndroid='spinner'
                            />
                            <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff', marginTop:1}}
                                      onLayout={(event) => {
                                          const layout = event.nativeEvent.layout;
                                          this._position[1] = layout.y;
                                      }}
                    >
                        <Text style={[Style.text_styles.middleText,{}]}>
                            Nơi cấp
                        </Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>

                            <TextInput
                                onFocus={() =>  {
                                    this.setState({focus:1});
                                    this.scrollObjLayoutY(1);
                                }}
                                onBlur={()=> this.setState({focus:0})}
                                style={[this.state.focus == 1 ? styles.textEditableForcus : styles.textEditableNormal, {}]}
                                value={this.state.issue_at}
                                onChangeText={text => this.setState({issue_at:text})}
                                placeholder={'Nhập nơi cấp CMND'}
                                blurOnSubmit={true}
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

            </View>

        )
    }
}

const styles = StyleSheet.create({
    textEditableNormal : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE , marginRight : 5, textAlign: 'right'},
    textEditableForcus : {height: ITEM_HEIGHT, backgroundColor : '#fff' ,color:'black', fontSize : Style.MIDLE_SIZE  , marginRight : 5, textAlign: 'right'},
});

export default UpdatePartnerScreen;
