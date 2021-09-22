import React from 'react';
import { StyleSheet, Dimensions, View, Text , TouchableOpacity,TouchableHighlight, SafeAreaView, BackHandler, Platform, ScrollView } from 'react-native';

import Pdf from 'react-native-pdf';
import Def from "../../def/Def";
import Style from "../../def/Style";

import BackIconSvg from '../../../assets/icon/icon-back.svg'
import {TextInput} from "react-native-gesture-handler";
const {width, height} = Dimensions.get('window');
console.log('Width : ' + width);

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class PdfViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : this.props.item,
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: width,
            minScale: 1,
            maxScale: 3
        }
        this.goBack = this.goBack.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.prePage = this.prePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.switchHorizontal = this.switchHorizontal.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        console.log('Component Did Mount');
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    handleBackButtonClick() {
        console.log('Back Button Click');
        // this.props.navigation.goBack(null);
        // return true;
    }

    goBack = () =>  {
        console.log('Go Back');
        this.props.closeFunction();
    }

    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.pdf.setPage(prePage);
        console.log(`prePage: ${prePage}`);
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.pdf.setPage(nextPage);
        console.log(`nextPage: ${nextPage}`);
    };

    zoomOut = () => {
        let scale = this.state.scale > this.state.minScale ? this.state.scale / 1.2 : this.state.minScale;
        this.setState({scale: scale});
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > this.state.maxScale ? this.state.maxScale : scale;
        this.setState({scale: scale});
        console.log(`zoomIn scale: ${scale}`);
    };

    switchHorizontal = () => {
        this.setState({horizontal: !this.state.horizontal, page: this.state.page});
    };

    render() {
        const source = {uri:Def.URL_CONTENT_BASE + this.state.item.file_path,cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: Style.DEFAUT_BLUE_COLOR,
                    height: 47,
                     marginTop : Style.HEADER_HEIGHT -47,
                    width: width,
                    flexDirection : 'row',
                    alignItems: 'center',
                    // justifyContent: 'center'
                }} >
                    <TouchableOpacity style={{width : 50, height : Style.HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center'}}
                                      onPress={this.goBack}
                    >
                        <BackIconSvg width={Style.BACK_ICON_SIZE} height={Style.BACK_ICON_SIZE} />
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ textTransform: 'uppercase', color:'#fff', fontSize: Style.BIG_SIZE, fontWeight : '600', paddingLeft : 20}}>
                            {
                                this.state.item.name
                            }
                        </Text>
                    </View>
                </View>

                <View style={{
                        flexDirection: 'row', position : 'absolute', zIndex : 100, alignSelf : 'center', borderWidth: 0,
                        backgroundColor : 'rgba(48, 94, 117, 0.6)' , paddingHorizontal: 10, borderRadius : 5,
                        bottom : 3, height: 45, justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        {/*<Text style={styles.btnText}>{'-'}</Text>*/}
                        <Icon name="arrow-left" size={22} color={this.state.page === 1 ? Style.GREY_TEXT_COLOR : Style.DEFAUT_WHITE_COLOR } />
                    </TouchableHighlight>
                    {/*<View style={styles.btnText}><Text style={styles.btnText}>Page</Text></View>*/}
                    <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                                        style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                                        testID='NextPage'
                                        onPress={() => this.nextPage()}>
                        {/*<Text style={styles.btnText}>{'+'}</Text>*/}
                        <Icon name="arrow-right" size={22} color={this.state.page === this.state.numberOfPages ? Style.GREY_TEXT_COLOR : Style.DEFAUT_WHITE_COLOR } />
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.scale === this.state.minScale}
                                        style={this.state.scale === this.state.minScale ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomOut()}>
                        {/*<Text style={styles.btnText}>{'-'}</Text>*/}
                        <Icon name="search-minus" size={25} color={this.state.scale <= this.state.minScale ? Style.GREY_TEXT_COLOR : Style.DEFAUT_WHITE_COLOR } />


                    </TouchableHighlight>
                    {/*<View style={styles.btnText}><Text style={styles.btnText}>Scale</Text></View>*/}
                    <TouchableHighlight disabled={this.state.scale >= this.state.maxScale}
                                        style={this.state.scale >= this.state.maxScale ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomIn()}>
                        {/*<Text style={styles.btnText}>{'+'}</Text>*/}
                        <Icon name="search-plus" size={25} color={this.state.scale >= this.state.maxScale ?  Style.GREY_TEXT_COLOR : Style.DEFAUT_WHITE_COLOR} />
                    </TouchableHighlight>
                    {/*<View style={styles.btnText}><Text style={styles.btnText}>{'Horizontal:'}</Text></View>*/}
                    <TouchableHighlight style={styles.btn} onPress={() => this.switchHorizontal()}>
                        <Icon name="sync" size={22} color={Style.DEFAUT_WHITE_COLOR} />
                        {/*{!this.state.horizontal ? (<Text style={styles.btnText}>{'false'}</Text>) : (*/}
                        {/*    <Text style={styles.btnText}>{'true'}</Text>)}*/}
                    </TouchableHighlight>

                </View>
                <View
                    style={{
                        // paddingBottom : Style.HEADER_HEIGHT + 10
                    }}
                    onResponderMove={({ nativeEvent: PressEvent }) => {
                                        console.log('Response Event');
                                    }
                    }>
                    <Pdf
                        minScale={this.state.minScale}
                        maxScale={this.state.maxScale}
                        ref={(pdf) => { this.pdf = pdf; }}
                        scale={this.state.scale}
                        source={source}
                        horizontal={this.state.horizontal}
                        onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                            let newState = {numberOfPages: numberOfPages};
                            let scaleContent = Dimensions.get('window').width / width;
                            if(this.state.minScale > scaleContent){
                                newState['minScale'] = scaleContent;
                                if(Platform.OS == 'ios') {
                                    newState['scale'] = (Dimensions.get('window').width)/ width;;
                                }
                            }

                            this.setState(newState);
                            // console.log(`total page count: ${numberOfPages}`);
                            // console.log(tableContents);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            this.setState({
                                page: page
                            });
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPageSingleTap={(page) => {
                            console.log('Evvent Signlet Page Tab' + page);
                        }}

                        style={styles.pdf}/>

                </View>


                    <View style={{
                        flexDirection : 'row', position : 'absolute', zIndex : 100, alignSelf : 'center', borderWidth: 0,
                        backgroundColor : 'rgba(48, 94, 117, 0.6)', paddingVertical:0 , paddingHorizontal: 10, borderRadius : 0,
                        top: Style.HEADER_HEIGHT + 30,left : 0, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={{paddingHorizontal : 0, marginHorizontal:0 , color:'#fff'}}
                                   ref={(txtInput) => { this.txtInput = txtInput; }}
                                   onChangeText={text => {
                                       if(text.length > 0){
                                           text = parseInt(text);
                                           if(text < 1 ){
                                               text = 1;
                                           }
                                           if(text > this.state.numberOfPages){
                                               text = this.state.numberOfPages;
                                           }
                                           if(Number.isInteger(text)){
                                               this.pdf.setPage(text);
                                           }
                                       }
                                   }}
                                   returnKeyType={'go'}
                                   keyboardType={'numeric'}
                                   onPressOut={() => {
                                       console.log('Press Out');
                                   }}
                                   onBlur={() => {
                                       console.log('OnBlur');
                                   }}
                                   onEndEditing={() => {
                                       console.log('End Editing');
                                   }}
                        >
                            {this.state.page}
                        </TextInput>
                        {/*<TextInput style={{paddingHorizontal : 0, marginHorizontal:0 , backgroundColor : 'red'}}>*/}
                        {/*    {'/'}*/}
                        {/*</TextInput>*/}
                        <TextInput editable={false} style={{paddingHorizontal : 0, marginLeft: Platform.OS === 'android' ? -6 : 0 , marginHorizontal:0 , color:'#fff'}}>
                            { '/ ' + this.state.numberOfPages}
                        </TextInput>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
         flex:1,
        width:width,
        paddingHorizontal : 0,
        // backgroundColor : '#ff0000'
         height:Dimensions.get('window').height,

    },
    btn: {
        margin: 2,
        padding: 2,
        paddingHorizontal: 10,
        // backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        paddingHorizontal: 10,
        // backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    }
});
