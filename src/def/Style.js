import {PixelRatio, StyleSheet} from 'react-native'


export default class Style{
    static HEADER_HEIGHT = PixelRatio.get() < 2? 36 :37;
    static TITLE_SIZE = PixelRatio.get() < 2 ? 15 :17;
    static MIDLE_SIZE = PixelRatio.get() < 2 ? 13 :14;
    static NORMAL_SIZE = PixelRatio.get() < 2 ? 11 :12;
    static SMALL_SIZE = PixelRatio.get() < 2 ? 10:11;
    static BIG_SIZE = PixelRatio.get() < 2 ? 17 :19;
    static DEFAUT_RED_COLOR = '#AD2428';
    static DEFAUT_BLUE_COLOR = '#0A6BB5';

    static GREY_TEXT_COLOR = '#b3b3b3';
    static DEFAULT_BACKGROUN_COLOR = "#e6e6e6";


    static styles = StyleSheet.create({
        container: {
            flex : 1,
            paddingLeft: 15,
            // justifyContent: 'flex-start',
            // marginVertical : 5,
            // marginBottom : 5,
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

    });

    static text_styles = StyleSheet.create({
        tit: {
            flex : 1,
            paddingLeft: 15,
            // justifyContent: 'flex-start',
            // marginVertical : 5,
            // marginBottom : 5,
            backgroundColor: '#fff',
            paddingTop : 5
        },
        textTitle: {
            flex : 1,
            paddingLeft: 15,
            // justifyContent: 'flex-start',
            // marginVertical : 5,
            // marginBottom : 5,
            backgroundColor: '#fff',
            paddingTop : 5
        },


    });

}
