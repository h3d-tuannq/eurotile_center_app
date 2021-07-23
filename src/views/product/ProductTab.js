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
                                     width: PROGRAM_IMAGE_WIDTH - 2,
                                     height: PROGRAM_IMAGE_HEIGHT - 5,
                                     marginRight: 6,
                                     marginBottom: 5
                                 }}/>
        );
        return (
            <View style={styles.container}>
                <View>
                    <Text style={[Style.text_styles.titleText, {textAlign: 'center', paddingVertical: 5}]}>
                        {this.props.displayTitle}
                    </Text>
                </View>
                <View style={{marginTop: 8, flex: 1}}>
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
        paddingTop: 5
    }
});

export default ProductTab;
