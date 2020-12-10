import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import NetScheme from '../../net/NetScheme'
import Def from '../../def/Def'
const {width, height} = Dimensions.get('window');

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import Style from '../../def/Style';
import ProgramHozList from '../../com/common/ProgramHozList';
import DesignCateHozList from '../../com/common/DesignCateHozList';

import ProgramVerList from '../../com/common/ProgramVerList';



const PROGRAM_IMAGE_WIDTH = (width - 30-8) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /2;
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

class SchemeScreen extends React.Component {
    constructor(props){
        super(props);
        this.onGetDesignSuccess     = this.onGetDesignSuccess.bind(this);
        this.onGetDesignFalse     = this.onGetDesignFalse.bind(this);


        this.onGetPopularDesignSuccess     = this.onGetPopularDesignSuccess.bind(this);
        this.onGetPopularDesignFalse     = this.onGetPopularDesignFalse.bind(this);

        this.onDesignCateSuccess = this.onDesignCateSuccess.bind(this);
        this.onDesignCateFalse = this.onDesignCateFalse.bind(this);

        this.formatText    = this.formatText.bind(this);
        this.refresh     = this.refresh.bind(this);

        Def.mainNavigate = this.props.navigation;

        if(!Def.design_data) {
            NetScheme.getAllDesign(this.onGetDesignSuccess, this.onGetDesignFalse);
        } else {
            Def.config_design_menu = this.createConfigData(Def.design_data);
        }

        if(!Def.popular_design) {
            NetScheme.getPopularDesign(this.onGetPopularDesignSuccess, this.onPopularGetDesignFalse);
        }

        if(!Def.design_cate) {
            NetScheme.getDesignCategory(this.onDesignCateSuccess, this.onGetDesignFalse);
        }



        this.state = {
            design_data: Def.design_data ? Def.design_data: null,
            popular_design: Def.popular_design ? Def.popular_design: null,
            design_cate:  Def.design_cate ? Def.design_cate: null,
            stateCount: 0.0,
            configMenu: Def.config_design_menu,
            slide_data : carouselItems,
            activeSlide : 0
        };

        this.categoryClick_handle = this.categoryClick_handle.bind(this);
    }

    refresh()
    {
        this.setState({ stateCount: Math.random() });
    }


    categoryClick_handle = (item) => {
        this.props.navigation.navigate('sheme', {screen:'design-list', params : {item:item}});

    };

    onGetDesignSuccess(data){
        Object.entries(data["data"]).map((prop, key) => {
        });
        this.setState({ design_data: data["data"] });
        Def.design_data = data["data"];
        Def.config_design_menu = this.createConfigData(data["data"]) ;
        this.setState({ configMenu: Def.config_design_menu});
    }

    onGetPopularDesignSuccess(data){
        this.setState({ popular_design: data["data"] });
        Def.design_data = data["data"];
    }

    onGetPopularDesignFalse(data){
        console.log("false data : " + data);
    }


    createConfigData(data){
        if(data){
            let configData =  Object.entries(data).map((prop, key) => {
                // console.log("Props : " + JSON.stringify(prop));
                return {key: prop[0],name_vi:prop[1]["name_vi"], hidden:0, data:prop[1]["data"]};
            });
            return configData;
        }
    }


    onGetDesignFalse(data){
        console.log("false data : " + data);
    }

    formatText(text){
        let rs = text;
        if(text && text.length > 10){
            rs = text.substring(0, 20) ;
        }
        return rs;
    }

    onDesignCateSuccess(data){
        console.log("Design Cate : " + JSON.stringify(data["data"]));

        this.setState({ design_cate: data["data"] });
        Def.design_cate = data['data'];
    }

    onDesignCateFalse(data){
        console.log('Get Design Cate False');
    }

    shouldComponentUpdate(){
        // this.setState({ configMenu: Def.config_news_menu});
        // console.log('SortData ddd:' + JSON.stringify(this.props.route));
        return true;
    }

    getNewDataByConfigKey(key){

    }

    get pagination () {
        const { slide_data, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={slide_data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position:'absolute',top : 5, right : slide_data.length  * 5 , width : slide_data.length  * 5,  paddingVertical: 5  }}
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
            <View key={index} style={Style.styles.schemeCardStyle}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.schemeSlideImg, {resizeMode : 'stretch'}]} source={{ uri: item.image_path}} />
                </TouchableOpacity>
            </View>
        );

    }


    render() {
        const {navigation} = this.props;
        const configMenu = Def.config_design_menu;
        Def.order_number = 20;

        const ListHeader = () => (
            <View>
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
                        loop={true}
                        autoplay={true}
                        autoplayInterval={5000}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                    { this.pagination }
                </View>
                <View style={[styles.programListStyle, {marginTop: 5, marginLeft:15}]}>
                    <DesignCateHozList refresh={this.refresh} stack={'scheme'} type={'cate'}
                                    screen={'design-list'} favorite={true}
                                    navigation={this.props.navigation} name={'Danh mục'}
                                    style={styles.programListStyle} data={this.state.design_cate} title={"Danh mục"}/>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'flex-start'}}
                >

                    <View style={{marginLeft:15, paddingBottom:8}}>
                        <Text style={styles.titleStyle}>{"Nổi bật"}</Text>
                    </View>
                </View>
            </View>
        );


        return (
            <View style={{flex:1}}>
                <ProgramVerList
                    data={this.state.popular_design}
                    navigation={this.props.navigation}
                    header={ListHeader}
                    type={'design'}
                    stack={'scheme'}
                />
            </View>
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
    titleStyle : {
        fontSize : Style.BIG_SIZE,
        color: Style.GREY_TEXT_COLOR,
    }
});

export default SchemeScreen;
