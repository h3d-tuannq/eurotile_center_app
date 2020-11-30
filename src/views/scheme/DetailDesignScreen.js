import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import DesignCateHozList from '../../com/common/DesignCateHozList';



const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
class DetailDesignScreen extends React.Component {
    constructor(props){
        super(props);
        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);
        let design_list = [];
        let title = '';

        console.log("Detail Design Screen : " + this.props.route.params.item.id );


        if(this.props.route.params.item && Def.design_data){
            let item = this.props.route.params.item;
            design_list = Def.design_data[item['category_id']].data;
            title = Def.design_data[item['category_id']].name_vi;
        }

        this.state = {
            stateCount: 0.0,
            item:this.props.route.params.item,
            slide_data : this.getImageForCollection(this.props.route.params.item),
            activeSlide:0,
            design_list: design_list,
            title : title


        };
        Def.mainNavigate = this.props.navigation;
    }
    getImageForCollection(item){
        let images = [{image_path:Def.URL_CONTENT_BASE +item.image_path}];
        if(item.sub_images){
            let subImgs = item.sub_images.split(',');
            subImgs = subImgs.map(x => {
                return {image_path:Def.URL_CONTENT_BASE + x}
            });
            images = images.concat(subImgs);
        }

        console.log("Images : "+ JSON.stringify(images));

        return images;
    }

    refresh()
    {
        // this.setState({ stateCount: Math.random(),  });
        let design_list = [];
        let title = '';
        let item= null;
        if(this.props.route.params.item && Def.design_data){
            item = this.props.route.params.item;
            design_list = Def.design_data[item['category_id']].data;
            title = Def.design_data[item['category_id']].name_vi;
        }
        console.log("Scheme Name : " + item.name);
        this.setState({
            stateCount: 0.0,
            item:this.props.route.params.item,
            slide_data : this.getImageForCollection(this.props.route.params.item),
            activeSlide:0,
            design_list: design_list,
            title : title
        });
    }

    formatText(text){
        let rs = text;
        if(text && text.length > 10){
            rs = text.substring(0, 20) ;
        }
        return rs;
    }

    shouldComponentUpdate(){
        console.log("Detail Design Screen : " + this.props.route.params.item.id );
        if(this.props.route.params.item.id !== this.state.item.id){
            this.refresh();
        }
        return true;
    }


    get pagination () {
        const { slide_data, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={slide_data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position:'absolute',top : 5, right : slide_data.length  * 5, width : slide_data.length  * 5,  paddingVertical: 5  }}
                dotContainerStyle={{marginHorizontal : 6,}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    borderWidth : 1,
                    backgroundColor : 'rgba(179, 179, 179, 0.92)',
                }}
                inactiveDotStyle={{

                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
    renderItem = ({item, index}) => {

        return (
            <View key={index} style={[styles.cardStyle, {paddingHorizontal : 5 , backgroundColor:Style.GREY_BACKGROUND_COLOR}]}>
                <TouchableOpacity >
                    <Image  style = {[styles.cardImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                    {/*<View style = {{justifyContent:'center'}}>*/}

                        {/*<Text style={[{position: 'absolute',zIndex:3 , paddingHorizontal : 4 , paddingVertical:2,bottom:0, backgroundColor: Style.DEFAUT_RED_COLOR, textAlign: 'center'}, Style.text_styles.whiteTitleText]}>*/}
                            {/*{"face " + index}*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                </TouchableOpacity>
            </View>
        );

    }


    render() {
        const {navigation} = this.props;
        const {item} = this.state;
        return (
            <ScrollView style={{flex:1, backgroundColor: '#fff'}}>
                <View style={Style.styles.carousel}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                        data={this.state.slide_data}
                        renderItem={this.renderItem}
                        itemWidth={width}
                        sliderWidth={width}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        activeSlideAlignment={'start'}
                        // loop={true}
                        autoplay={true}
                        autoplayInterval={5000}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                    { this.pagination }
                </View>

                <View style={{flex:1, justifyContent: 'space-between', marginTop :10}}>
                <View style={styles.productInfo}>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {item.name_vi }
                    </Text>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Model " + item.model }
                    </Text>
                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Số phòng: "+ item.room_number}
                    </Text>


                    <Text style={[Style.text_styles.normalText, {paddingVertical:5}]}>
                        {"Diện tích: " + (item.area ? item.area + " m2" : "Không xác định") }
                    </Text>
                </View>

                <View style={[{ paddingLeft:15}]}>
                    <DesignCateHozList refresh={this.refresh} stack={'scheme'} type={'design'}
                                       screen={'detail-design'} favorite={true}
                                       navigation={this.props.navigation} name={this.state.title}
                                       data={this.state.design_list} title={this.state.title}/>
                </View>

                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        // paddingLeft: 15,
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
        width: width,
        height: width * 0.8,


    },
    programListStyle : {

    },
    productInfo : {
        paddingLeft : 15,
        paddingVertical:5,
    },

    cardImg: {
        width: width,
        paddingVertical :5,
        height: width * 0.8,
        borderRadius : 5,
        paddingHorizontal:2,
        borderWidth: 1,
        borderColor : Style.DEFAUT_BLUE_COLOR
    },

    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    bookingBtn : {
        backgroundColor: Style.DEFAUT_RED_COLOR,
        height: 60,
        justifyContent : 'center',
        alignItems: 'center',
    }

});

export default DetailDesignScreen;
