import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
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

class UpdatePartnerInfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
        this.showDateTimePicker = this.showDateTimePicker.bind();
        this.handleDatePicked = this.handleDatePicked.bind();
        this.hideDateTimePicker = this.hideDateTimePicker.bind();

        this.state = {
            focus : 0,
            user: Def.user_info,
            stateCount: 0.0,
            avatarSource : {uri:Def.getAvatarUrlFromUserInfo() ? Def.getAvatarUrlFromUserInfo() :Def.URL_DEFAULT_AVATAR},

            infront_cmt_img: null,
            behind_cmt_img: null,
            project_img1 : null,
            project_img2 : null,
            project_img3 : null,
            birth_day : "",
            full_name : '',
            gender : null,
            mobile:'',
            card_no : '',
            issue_on : '', // Ngày cấp
            issue_at : '', // Nơi cấp
            address : '',
            isDateTimePickerVisible :false,
            selectedDate : new Date(),
            dateAttribute : 'birth_day',
        };
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
            <ScrollView style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR, paddingHorizontal : 5}}>

                {/*<View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff'}}>*/}
                    {/*<View style={{flexDirection : 'row', alignItems : 'center'}}>*/}
                    {/*<Image  style={styles.imageStyleInfo}  source={{uri:user['userProfile'] && user['userProfile']['avatar_path'] ? user['userProfile']['avatar_base_url'] + '/' + user['userProfile']['avatar_path'] : Def.URL_DEFAULT_AVATAR }}  />*/}
                    {/*<View style={{marginLeft: 10, justifyContent:'space-between'}}>*/}
                        {/*<Text style={Style.text_styles.middleText}>*/}
                            {/*{user['email']}*/}
                        {/*</Text>*/}
                        {/*<Text style={Style.text_styles.middleText}>*/}
                            {/*{user['userProfile'] && user['userProfile']['phone'] ? user['userProfile']['phone'] : (user['userProfile']['display_name'] ? user['userProfile']['display_name'] : "SDT không tồn tại")}*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    {/*<Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />*/}
                {/*</View>*/}

                <TouchableOpacity onPress={() => this.handleChoosePhoto('avatarSource')} style={{ alignItems: 'center', justifyContent: 'center' , marginBottom: 5 }}>
                    {!this.state.avatarSource ?
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
                    {/*<TextInput*/}
                        {/*onFocus={() => this.setState({focus:1})}*/}
                        {/*onBlur={()=> this.setState({focus:0})}*/}
                        {/*style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {flex : 1.5, marginRight: 5}]}*/}
                        {/*value={this.state.birth_day}*/}
                        {/*onChangeText={text => this.setState({birth_day:text})}*/}
                        {/*placeholder='Ngày sinh'*/}
                        {/*placeholderTextColor="#b3b3b3"*/}
                        {/*autoCapitalize = 'none'*/}
                        {/*// underlineColorAndroid = "transparent"*/}
                    {/*/>*/}

                    <TouchableOpacity style={{flex: 1.5, marginRight: 5, height :45, borderRadius:5, justifyContent : 'center', borderWidth :2}} onPress={() => this.showDateTimePicker('birth_day')} >
                        <Text style={[Style.text_styles.titleTextNotBold, {justifyContent : 'center', paddingLeft: 5, color:Style.GREY_TEXT_COLOR} ]}>
                            {this.state.birth_day ? Def.getDateString(this.state.birth_day , "dd-MM-yyyy")  : "Ngày sinh"}
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



                    {/*<View style={{ height: 45, flex:1.5, borderWidth:1,borderColor:Style.DEFAUT_RED_COLOR, borderRadius:5 }}>*/}

                    {/*<DateTimePicker*/}
                        {/*testID="dateTimePicker"*/}
                        {/*value={new Date()}*/}
                        {/*is24Hour={true}*/}
                        {/*mode='default'*/}
                        {/*display='default'*/}
                        {/*onChange={(selectedDate) => {*/}
                            {/*this.setState({birth_day:selectedDate});*/}
                        {/*}}*/}
                    {/*/>*/}

                    {/*</View>*/}

                    <View style={{ height: 45, flex:1, borderWidth:1,borderColor:Style.DEFAUT_RED_COLOR, backgroundColor:'#fff', borderRadius:5 }}>
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

                    {/*<TextInput*/}
                        {/*onFocus={() => this.setState({focus:1})}*/}
                        {/*onBlur={()=> this.setState({focus:0})}*/}
                        {/*style={[this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal, {flex : 1}]}*/}
                        {/*value={this.state.gender}*/}
                        {/*onChangeText={text => this.setState({gender:text})}*/}
                        {/*placeholder='Giới tính'*/}
                        {/*placeholderTextColor="#b3b3b3"*/}
                        {/*autoCapitalize = 'none'*/}
                        {/*// underlineColorAndroid = "transparent"*/}
                    {/*/>*/}
                </View>

                <TextInput
                    onFocus={() => this.setState({focus:1})}
                    onBlur={()=> this.setState({focus:0})}
                    style={this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal}
                    value={this.state.address}
                    onChangeText={text => this.setState({address:text})}
                    placeholder='Địa chỉ'
                    placeholderTextColor="#b3b3b3"
                    autoCapitalize = 'none'
                    // underlineColorAndroid = "transparent"
                />



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
                    <TouchableOpacity style={{flex: 1.5, marginRight: 5, height :45, borderRadius:5, justifyContent : 'center', borderWidth :2}} onPress={() => this.showDateTimePicker('issue_on')} >
                        <Text style={[Style.text_styles.titleTextNotBold, {justifyContent : 'center', paddingLeft: 5, color:Style.GREY_TEXT_COLOR} ]}>
                            {this.state.issue_on ? Def.getDateString(this.state.issue_on , "dd-MM-yyyy")  : "Ngày cấp"}
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

                <TouchableOpacity onPress={() => this.handleChoosePhoto('project_img3')} style={{ alignItems: 'center', justifyContent: 'center', flex:1, marginTop:2, backgroundColor: '#fff', paddingVertical:5}}>
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
        paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 5,  marginTop : 20, borderWidth : 1, borderColor:'#b3b3b3',
        flexDirection : 'row', alignItems: 'center', paddingHorizontal : 5
    },
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginVertical:3, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginVertical:3, paddingHorizontal: 10 },

    buttonText : { color:'#fff', fontSize : 18, paddingVertical: 2},

});

export default UpdatePartnerInfoScreen;
