import React from 'react'
import {
    Text,
    View,
    Button,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    Platform,
    TouchableOpacity, Image,
} from 'react-native';
import Style from "../../../src/def/Style";
import { WebView } from 'react-native-webview';
import Def from '../../def/Def';
import Carousel from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel/src/pagination/Pagination';


const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30) /2;

const carouselItems = [
    {
        id:1,
        image_path : 'https://bizweb.dktcdn.net/100/125/230/themes/698647/assets/slider_3.png?1603763113314',
    },
    {
        id:2,
        image_path : 'https://bizweb.dktcdn.net/100/125/230/themes/698647/assets/slider_2.png?1603763113314',
    }
];

class CollectionDetailTabScreen extends React.Component {
    constructor(props){
        super(props);
        // this.itemClick = this.itemClick.bind(this);
        this.state = {
            // collection_data: null,
            slide_data : this.props.tabLabel === '2D' ? this.props.data : carouselItems,
            activeSlide : 0,
        };
    }

    // itemClick(item){
    //     console.log(item.id);
    //     let screen = this.props.type == 'product' ? 'product-detail' : 'collection-detail-screen' ;
    //     this.props.navigation.navigate(screen, { item:item});
    //
    // }

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
        console.log('Slide Item : ' + JSON.stringify(item));
        return (
            <View key={index} style={[Style.styles.cardStyle, {height: height/3}]}>
                <TouchableOpacity >
                    <Image  style = {[Style.styles.cardImg, {resizeMode : 'stretch', height: height/3}]} source={Def.allData[item.image_path]} />
                </TouchableOpacity>
            </View>
        );

    }

    render() {
        const {navigation} = this.props;
        console.log("Props Data" + JSON.stringify(this.props.data));
        return (
            <View style={styles.container}>
                {/*<View>*/}
                    {/*<Text style={[Style.text_styles.titleText, {textAlign:'center', paddingVertical:5}]}>*/}
                        {/*{this.props.displayTitle}*/}
                    {/*</Text>*/}
                {/*</View>*/}
                <View style={{marginTop :0, flex:1}}>
                    {
                        this.props.tabLabel === '3D' ?
                                <View style={{flex:1}}>
                                    <WebView
                                        source={{ uri: this.props.data }}
                                    />
                                    <TouchableOpacity style={{}}>

                                    </TouchableOpacity>
                                </View>
                            :
                        this.props.tabLabel === 'VR' ?
                                <WebView
                                    source={{ uri: this.props.data }}
                                />
                            :
                                 <View style={Style.styles.carousel}>
                                     <Carousel
                                         ref={(c) => { this._carousel = c; }}
                                         // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                                         data={this.props.data}
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
                    }
                </View>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height : height/3,
        // paddingLeft: 15,
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

export default CollectionDetailTabScreen;
