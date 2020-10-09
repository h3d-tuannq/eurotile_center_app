import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from '../../def/Style';
import AsyncStorage from "@react-native-community/async-storage";

import ImagePicker  from 'react-native-image-picker'
const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;

class UpdatePartnerInfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this);

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
            birth_day : '',
            full_name : '',
            gender : 0,
            mobile:'',
            card_no : '',
            issue_on : '', // Ngày cấp
            issue_at : '', // Nơi cấp
            address : '',
        };
    }

    refresh()
    {
        this.setState({ stateCount: Math.random() });
    }





    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    handleChoosePhoto = () => {
        console.log('image picker');
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
            console.log(response);
            if (response.uri) {
                this.setState({ avatarSource: response })
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
            (!this.state.user) ?

                <View style={{justifyContent :'center',flex: 1, alignItems : 'center', width: width}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                            Vui lòng
                        </Text>
                        <TouchableOpacity onPress={this.signInBtnClick}>
                            <Text style={{fontSize:Style.TITLE_SIZE, marginLeft:5 , color:Style.DEFAUT_RED_COLOR}}>
                                đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:Style.TITLE_SIZE, color:'#b3b3b3'}}>
                        để sử dụng đầy đủ tính năng cá nhân
                    </Text>

                </View> :
            <ScrollView style={{flex:1, backgroundColor: Style.GREY_BACKGROUND_COLOR}}>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent:'space-between',paddingHorizontal:10 , paddingVertical: 5, backgroundColor : '#fff'}}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Image  style={styles.imageStyleInfo}  source={{uri:user['userProfile'] && user['userProfile']['avatar_path'] ? user['userProfile']['avatar_base_url'] + '/' + user['userProfile']['avatar_path'] : Def.URL_DEFAULT_AVATAR }}  />
                    <View style={{marginLeft: 10, justifyContent:'space-between'}}>
                        <Text style={Style.text_styles.middleText}>
                            {user['email']}
                        </Text>
                        <Text style={Style.text_styles.middleText}>
                            {user['userProfile'] && user['userProfile']['phone'] ? user['userProfile']['phone'] : (user['userProfile']['display_name'] ? user['userProfile']['display_name'] : "SDT không tồn tại")}
                        </Text>
                    </View>
                    </View>
                    <Icon name="angle-right" size={25} color={Style.GREY_TEXT_COLOR} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.avatarSource ?
                        <Image
                            source={{ uri: this.state.avatarSource.uri }}
                            style={{ width: 150, height: 150 , marginTop: 20 }}
                        /> : <View/>
                    }
                    <TouchableOpacity style={[styles.button, {backgroundColor:'#1976d2'}]}
                                      onPress={this.handleChoosePhoto} >
                        <Text style={styles.buttonText}>
                            Chọn ảnh
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    onFocus={() => this.setState({focus:1})}
                    onBlur={()=> this.setState({focus:0})}
                    style={this.state.focus == 1 ? styles.textInputHover : styles.textInputNormal}
                    value={this.state.full_name}
                    onChangeText={text => this.setState({full_name:text})}
                    placeholder='Nhập tên đầy đủ'
                    placeholderTextColor="#b3b3b3"
                    autoCapitalize = 'none'
                    // underlineColorAndroid = "transparent"
                />

                <View style={{flexDirection : 'row', alignItems : 'center' , justifyContent:'space-between', paddingHorizontal:10 , paddingVertical: 10, backgroundColor : '#fff', marginTop:20}}>
                    <Text style={[Style.text_styles.middleText,{}]}>
                        Dự án
                    </Text>


                </View>

                {/*<View>*/}
                    {/*<View style={Style.styles.carousel}>*/}
                        {/*<Carousel*/}
                            {/*ref={(c) => { this._carousel = c; }}*/}
                            {/*// keyExtractor={(item, index) => `${item.id}--${item.index}`}*/}
                            {/*data={this.state.project_slide_data}*/}
                            {/*renderItem={this.renderItem}*/}
                            {/*itemWidth={width}*/}
                            {/*sliderWidth={width}*/}
                            {/*inactiveSlideOpacity={1}*/}
                            {/*inactiveSlideScale={1}*/}
                            {/*activeSlideAlignment={'start'}*/}
                            {/*loop={true}*/}
                            {/*autoplay={true}*/}
                            {/*autoplayInterval={5000}*/}
                            {/*onSnapToItem={(index) => this.setState({ activeProSlide: index }) }*/}
                        {/*/>*/}
                        {/*{ this.pagination }*/}
                    {/*</View>*/}
                {/*</View>*/}



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
        flexDirection : 'row', alignItems: 'center',
    },
    textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : 18, borderRadius: 5, marginTop: 10, paddingHorizontal: 10  },
    textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : 18,borderRadius: 5, marginTop: 10, paddingHorizontal: 10 },

});

export default UpdatePartnerInfoScreen;
