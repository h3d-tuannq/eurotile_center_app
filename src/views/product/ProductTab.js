import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, Platform} from 'react-native'
import CollectionItemrenderer from '../../com/item-render/CollectionItemrenderer'
import Style from "../../../src/def/Style";
import ProductItemrenderer from "../../com/item-render/ProductItemrenderer";

const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30) /2;


class ProductTab extends React.Component {
    constructor(props) {
        super(props);
        this.itemClick = this.itemClick.bind(this);
    }

    itemClick(item) {
        console.log(item.id);
        let screen = this.props.type == 'product' ? 'product-detail' : 'product-detail';
        this.props.navigation.navigate(screen, {item: item});
    }

    render() {
        const {navigation} = this.props;
        const renderItem = ({item}) => (
            <ProductItemrenderer click={this.itemClick} type={'product'} item={item} favorite={true}
                                 styleImage={{
                                     width: PROGRAM_IMAGE_WIDTH - 20,
                                     height: PROGRAM_IMAGE_HEIGHT - 20,
                                     backgroundColor: 'red',
                                 }}
                                 styleItem={{
                                     width: PROGRAM_IMAGE_WIDTH ,
                                     height: PROGRAM_IMAGE_HEIGHT,
                                     justifyContent:'center',
                                     padding:10,
                                     marginRight : 10,
                                     paddingLeft: 5,
                                     // alignItems : 'center',
                                     // padding:10,
                                     // paddingLeft: 10,
                                 }}
            />
        );
        return (
            <View style={styles.container}>
                <View style={{marginTop: 0, flex: 1}}>
                    <FlatList
                        data={this.props.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                    />
                </View>
            </View>
        )
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        backgroundColor: '#fff',
        paddingTop: 0
    }
});

export default ProductTab;
