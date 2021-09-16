import React from 'react';
import { StyleSheet, Dimensions, View, Text , TouchableOpacity, SafeAreaView } from 'react-native';

import Pdf from 'react-native-pdf';
import Def from "../../def/Def";
import Style from "../../def/Style";

import BackIconSvg from '../../../assets/icon/icon-back.svg'
const {width, height} = Dimensions.get('window');
console.log('Width : ' + width);

export default class PdfViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : this.props.item,
            scale : 1,
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack = () =>  {
        console.log('Go Back');
        this.props.closeFunction();
    }

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
                <Pdf
                     minScale={0.1}
                    // maxScale={1}
                    fitPolicy={0}
                     ref={(pdf) => { this.pdf = pdf; }}
                     scale={this.state.scale}



                    source={source}
                    fitWidth={true}
                    onLoadComplete={(numberOfPages,filePath, {width, height})=>{
                        console.log(`width ${width}`);
                        let scale = (Dimensions.get('window').width  ) / width;
                        console.log('Scale : ' + scale);
                        this.setState({scale:scale});
                        // this.pdf.setPageWidth(width);
                        // this.pdf.setPageHeight(height);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
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
    }
});
