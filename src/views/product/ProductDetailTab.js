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
    TouchableOpacity, Image
} from 'react-native'
import CollectionItemrenderer from '../../com/item-render/CollectionItemrenderer'
import Style from "../../../src/def/Style";
import ProductItemrenderer from "../../com/item-render/ProductItemrenderer";
import Carousel from "react-native-snap-carousel";
import Def from "../../def/Def";
import NetCollection from "../../net/NetCollection";

const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30) /2;


class ProductDetailTab extends React.Component {
    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.getImageForCollection = this.getImageForCollection.bind(this);
        this.getProductByCollectionSuccess = this.getProductByCollectionSuccess.bind(this);
        this.getFalse = this.getFalse.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.state = {
            relationPro : []
        };
    }

    itemClick(item) {
        console.log(item.id);
        let screen = this.props.type == 'product' ? 'product-detail' : 'product-detail';
        this.props.navigation.navigate(screen, {item: item});
    }

    getImageForCollection(item){
        let collectionImages = [{image_path:item.image_path}];
        if(item.sub_images){
            let subImgs = item.sub_images.split(',');
            subImgs = subImgs.map(x => {
                return {image_path:Def.URL_CONTENT_BASE + x}
            });
            collectionImages = collectionImages.concat(subImgs);
        }
        return collectionImages;
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
    renderProItem = ({item}) => (
        <ProductItemrenderer click={this.itemClick} type={'product'} item={item} favorite={true}
                             styleImage={{
                                 width: PROGRAM_IMAGE_WIDTH - 20,
                                 height: PROGRAM_IMAGE_HEIGHT - 20,
                             }}
                             styleItem={{
                                 width: PROGRAM_IMAGE_WIDTH ,
                                 height: PROGRAM_IMAGE_HEIGHT,
                                 justifyContent:'center',
                                 padding:10,
                                 marginRight : 10,
                                 paddingLeft: 5,
                             }}/>
    );

    getProductByCollectionSuccess = (data) => {
        console.log('Log Product Data : ' + JSON.stringify(data));
        if(data['message'] == 'OK'){
            const {product} = this.props.data;
            let productItem = {...product};
            productItem['products'] = data['data'];
            Def.collection_tree_data[product.collectionInfo.id] = productItem;
            this.setProduct();
        }
    }

    getFalse = (data) => {
        console.log('False Data : ' + JSON.stringify(data));
    }

    setProduct = () => {
        const {product} = this.props.data;
        let products = [ ... Def.collection_tree_data[product.collectionInfo.id]['products']];
        let index = products.findIndex(element => element.id == product.id);
        if(index >= 0){
            products.slice(index, 1);
        }
        this.setState({relationPro:products});
    }


    componentDidMount() {
        if(this.props.tabLabel === 'Tương tự') {
            const {product} = this.props.data;
            if(Def.collection_tree_data[product.collectionInfo.id]){
                this.setProduct();
            } else {
                NetCollection.getProductByCollection(this.getProductByCollectionSuccess, this.getFalse, product.id);
            }
        }

    }


    render() {

        const {navigation} = this.props;
        const {product} = this.props.data;
        return (
            <View style={styles.container}>
                <View style={{marginTop :0, flex:1}}>
                    {
                        this.props.tabLabel === 'Thông tin' ?
                            <View style={{flex:1}}>
                                <View style={styles.tabStyle}>
                                    <View style={styles.infoItemStyle}>
                                        <Text style={[styles.labelStyle, {paddingVertical:5}]}>
                                            {"Bộ sưu tập"}
                                        </Text>
                                        <Text>
                                            {product.collectionInfo ? product.collectionInfo.name : 'Không có' }
                                        </Text>
                                    </View>

                                    <View style={styles.infoItemStyle}>
                                        <Text style={[styles.labelStyle, {paddingVertical:5}]}>
                                            {"Dòng sản phẩm"}
                                        </Text>
                                        <Text>
                                            {product.category}
                                        </Text>
                                    </View>

                                    <View style={styles.infoItemStyle}>
                                        <Text style={[styles.labelStyle, {paddingVertical:5}]}>
                                            {"Kích thước"}
                                        </Text>
                                        <Text>
                                            {product.brickBoxInfo ? product.brickBoxInfo.width + "x" + product.brickBoxInfo.height : "" }
                                        </Text>
                                    </View>



                                    <View style={styles.infoItemStyle}>
                                        <Text style={[styles.labelStyle, {paddingVertical:5}]}>
                                            {"Quy cách đóng gói"}
                                        </Text>
                                        <Text>
                                            {product.brickBoxInfo ? product.brickBoxInfo.brick_number + " viên / hộp" : ""}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            :
                            this.props.tabLabel === 'Ứng dụng' ?
                            <View style={{flex:1}}>
                                <View style={Style.styles.carousel}>
                                    <Carousel
                                        ref={(c) => { this._carousel = c; }}
                                        // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                                        data={this.getImageForCollection(product.collectionInfo)}
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
                            </View>
                                :
                            <View style={{flex:1}}>
                                <View style={styles.tabStyle}>
                                    <FlatList
                                        data={this.state.relationPro}
                                        renderItem={this.renderProItem}
                                        keyExtractor={item => item.id}
                                        showsHorizontalScrollIndicator={false}
                                        numColumns={2}
                                        style={{marginBottom : Style.HEADER_HEIGHT}}
                                    />
                                </View>
                            </View>
                    }
                </View>



            </View>
        )
    }
}

    const styles = StyleSheet.create({
    container: {
        height : height/2,
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
    tabStyle : {
        marginLeft : 10,
    },
    labelStyle : {
        fontWeight: 'bold',

    },
    valueStyle : {
        color : Style.GREY_TEXT_COLOR
    },
    itemImage: {
        width: PROGRAM_IMAGE_WIDTH -5,
        height : PROGRAM_IMAGE_HEIGHT -5,
        borderRadius: 5,
    },
    infoItemStyle : {
        marginTop:5,
    }

});

export default ProductDetailTab;
