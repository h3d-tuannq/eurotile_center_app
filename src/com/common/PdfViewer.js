import React from 'react';
import { StyleSheet, Dimensions, View, Text , TouchableOpacity,TouchableHighlight, SafeAreaView, BackHandler } from 'react-native';

import Pdf from 'react-native-pdf';
import Def from "../../def/Def";
import Style from "../../def/Style";

import BackIconSvg from '../../../assets/icon/icon-back.svg'
import {TextInput} from "react-native-gesture-handler";
const {width, height} = Dimensions.get('window');
console.log('Width : ' + width);

export default class PdfViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : this.props.item,
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: width
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
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({scale: scale});
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
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

                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Page</Text></View>
                    <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                                        style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                                        testID='NextPage'
                                        onPress={() => this.nextPage()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.scale === 1}
                                        style={this.state.scale === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomOut()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Scale</Text></View>
                    <TouchableHighlight disabled={this.state.scale >= 3}
                                        style={this.state.scale >= 3 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomIn()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>{'Horizontal:'}</Text></View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.switchHorizontal()}>
                        {!this.state.horizontal ? (<Text style={styles.btnText}>{'false'}</Text>) : (
                            <Text style={styles.btnText}>{'true'}</Text>)}
                    </TouchableHighlight>

                </View>

                <Pdf
                    minScale={0.5}
                    maxScale={3}
                    ref={(pdf) => { this.pdf = pdf; }}
                    scale={this.state.scale}
                    source={source}
                    horizontal={this.state.horizontal}
                    onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                        this.setState({
                            numberOfPages: numberOfPages
                        });
                        console.log(`total page count: ${numberOfPages}`);
                        console.log(tableContents);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        this.setState({
                            page: page
                        });
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}

                    style={styles.pdf}/>

                    <View style={{
                        flexDirection : 'row', position : 'absolute', zIndex : 100, alignSelf : 'center', borderWidth: 0,
                        backgroundColor : 'rgba(48, 94, 117, 0.9)' , paddingHorizontal: 10, borderRadius : 5,
                        bottom : 5, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput style={{paddingHorizontal : 0, marginHorizontal:0 }}
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
                        <TextInput editable={false} style={{paddingHorizontal : 0, marginLeft: -6 , marginHorizontal:0 , color:'#000'}}>
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
        backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    }
});
