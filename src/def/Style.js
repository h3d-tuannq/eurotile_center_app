import {PixelRatio, StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class Style{
    static HEADER_HEIGHT = PixelRatio.get() < 2? 46 :47;
    static TITLE_SIZE = PixelRatio.get() < 2 ? 15 :17;
    static MIDLE_SIZE = PixelRatio.get() < 2 ? 13 :14;
    static NORMAL_SIZE = PixelRatio.get() < 2 ? 11 :12;
    static SMALL_SIZE = PixelRatio.get() < 2 ? 10:11;
    static BIG_SIZE = PixelRatio.get() < 2 ? 17 :19;
    static DEFAUT_RED_COLOR = '#AD2428';
    static DEFAUT_BLUE_COLOR = '#305E74';

    static PANEL_HEIGHT = PixelRatio.get() < 2? 35 :37;

    static GREY_TEXT_COLOR = '#b3b3b3';
    static GREY_BACKGROUND_COLOR = "#e6e6e6";


    static DRAWER_MENU_SIZE = PixelRatio.get() < 2? 36 :38;

    static DRAWER_MENU_ICON_SIZE = PixelRatio.get() < 2 ? 25 :27;

    static CART_ICON_SIZE = PixelRatio.get() < 2 ? 25 :27;

    static LOGO_WIDTH = PixelRatio.get() < 2 ? 118 :120;

    static LOGO_HEIGHT = PixelRatio.get() < 2 ? 30 :31;

    static BACK_ICON_SIZE = PixelRatio.get() < 2? 22 :24;


    static styles = StyleSheet.create({
        container: {
            flex : 1,
            paddingLeft: 15,
            backgroundColor: '#fff',
            paddingTop : 5
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
            width: width,
            height: width/2,

        },


        programListStyle : {

        },
        carousel: {
            // paddingVertical: 2,
            // maxHeight : width*0.95,
            borderRadius: 5,
            // marginHorizontal : 10,
            justifyContent:'center',

        },

        cardImg: {
            width: width,
            paddingVertical :5,
            height: width * 0.5,
            borderRadius : 5,
        },
        schemeSlideImg: {
            width: width,
            paddingVertical :5,
            height: width ,
            borderRadius : 5,
        },
        schemeCardStyle:{
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: width,
        },



    });

    static text_styles = StyleSheet.create({
        bigText:{
          fontSize : Style.BIG_SIZE
        },
        titleText: {
            marginLeft: 5,
            fontSize : Style.TITLE_SIZE,
            fontWeight: 'bold',
        },
        titleTextNotBold: {
            fontSize : Style.TITLE_SIZE,
        },

        middleText: {
            fontSize : Style.MIDLE_SIZE,
        },
        priceText : {
            fontSize : Style.NORMAL_SIZE,
            color: Style.DEFAUT_RED_COLOR,
            fontWeight: 'bold'
        },

        redTitleText: {
            fontSize : Style.TITLE_SIZE,
            fontWeight: 'bold',
            color: Style.DEFAUT_RED_COLOR,
        },
        whiteTitleText: {
            fontSize : Style.TITLE_SIZE,
            // fontWeight: 'bold',
            color: '#fff',
        },

        infoText: {
            fontSize : Style.SMALL_SIZE,
            color: Style.GREY_TEXT_COLOR,
        },
        normalText: {
            fontSize : Style.NORMAL_SIZE,
        },
        redText:{

        },
    });

    static login_style = StyleSheet.create({
        wraper : {flex:1, alignItems: 'center' , backgroundColor: '#fff', justifyContent : 'center'},
        loginform : { width : width * 0.9, marginTop: height / 20,},
        textInputNormal : {height: 45, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 1 ,color:'black', fontSize : Style.TITLE_SIZE, borderRadius: 5, marginTop: 10, paddingHorizontal: 10  },
        textInputHover : {height: 45, backgroundColor : '#fff', borderColor: "#48a5ea", borderWidth : 1 , color:'black', fontSize : Style.TITLE_SIZE,borderRadius: 5, marginTop: 10, paddingHorizontal: 10 },
        loginButton : { backgroundColor : '#ff3c29' ,borderRadius : 5, paddingLeft: 20, paddingRight : 10 },
        button : {
            paddingVertical : 5,backgroundColor : '#ff3c29' ,borderRadius : 5, paddingLeft: 20, marginTop : 20, borderWidth : 1, borderColor:'#b3b3b3',
            flexDirection : 'row', alignItems: 'center',
        },
        icon : {
            width :25,
            height : 25
        },

        loginText : { color:'#fff', fontSize : Style.TITLE_SIZE, textAlign : 'center', paddingVertical: 8},
        buttonText : { color:'#fff', fontSize : Style.TITLE_SIZE, paddingVertical: 8, marginLeft: 15},
        labelInputNormal : { color:'#9e9e9e', fontSize : Style.NORMAL_SIZE, marginTop : 20 },
        labelInputHover : { color:'#48a5ea', fontSize : Style.NORMAL_SIZE, marginTop : 20 },
        logoContainer : {alignItems : 'center', width :  width * 0.8, justifyContent: 'center', paddingBottom : 10 , marginTop: height / 10 },
        logoStyle : {width : width /5 , height : width /5 }
    });



}
