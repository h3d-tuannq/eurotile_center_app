import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput} from 'react-native'
import NetCollection from '../../net/NetCollection'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import ProgramHozList from '../../../src/com/common/ProgramHozList';

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProgramVerList from "../../com/common/ProgramVerList";
import ProductItemRenderer from '../../../src/com/item-render/ProductItemrenderer'
import Icon from 'react-native-vector-icons/FontAwesome';

const PROGRAM_IMAGE_WIDTH = (width - 20) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 20) /2;
const carouselItems = [
    {
        id:1,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/24/1/main_img.jpg',
    },
    {
        id:2,
        image_path : Def.URL_BASE + '/data/eurotileData/collection/202009/30/2/main_img.jpg',
    }
];

const ITEM_HEIGHT = 38;
import AsyncStorage from "@react-native-community/async-storage";

class SelectTagProductScreen extends React.Component {
    criteria = {};
    constructor(props){
       super(props);
       this.gotoProductByTag = this.gotoProductByTag.bind(this);

    }

    selectTagClick = () => {
    }



    componentDidMount(){


    }

    componentWillUnmount() {
        if(this.focusListener && (typeof this.focusListener.remove === 'function')){
            this.focusListener.remove();
        }
    }

    forcusFunction = () => {
    };


    refresh()
    {
        //NetChannel.listChannel(this.onChannelSuccess,this.onChannelFailed);
        this.setState({ stateCount: Math.random() });
    }

    gotoProductByTag = (tag = 0) => {
        if(this.props.navigation){
            let item = {
              id:tag,
              title :  tag == 0 ? 'Mặt bằng' : (tag == 1 ? 'Kích thước' : 'Ứng dụng')
            };
            this.props.navigation.navigate('Product', {screen:'product-by-tag-screen', params: { item: item }});
        }
    }



    render() {
        return (
            <View style={{ backgroundColor:'#fff'}}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    this.gotoProductByTag(0);
                }}>
                    <Text style={styles.textLabelStyle}>
                        BỀ MẶT
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, {marginTop:5}]}
                                  onPress={() => {
                                      this.gotoProductByTag(1);
                                  }}
                >
                    <Text style={styles.textLabelStyle}>
                        KÍCH THƯỚC
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, {marginTop:5}]}
                                  onPress={() => {
                                      this.gotoProductByTag(2);
                                  }}
                >
                    <Text style={styles.textLabelStyle}>
                        ỨNG DỤNG
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle : {
        backgroundColor : Style.GREY_TEXT_COLOR,
        height : height/3 - 30,
        width : width,
        justifyContent : 'center',
        alignItems : 'center',
    },
    textLabelStyle : {
        color: '#fff',
        fontSize : Style.BIG_SIZE,
        fontWeight : 'bold'
    }
});

export default SelectTagProductScreen;
