import React from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, Platform, RefreshControl} from 'react-native'
import NewsVerItemrenderer from '../../com/item-render/NewsVerItemrenderer'
import Style from "../../../src/def/Style";
import NetNews from "../../net/NetNews";

const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30-8) /4
const PROGRAM_IMAGE_HEIGHT = (width - 30-8) /4


class NewsTab extends React.Component {
    constructor(props){
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.onLoadFalse = this.onLoadFalse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
          isRefresh : false
        };
    }

    itemClick(item){
        console.log(item.id);
        this.props.navigation.navigate('news-detail', { item:item});

    }

    onRefresh = () => {
        console.log('Refresh News');
        this.setState({isRefresh:true});
        NetNews.listNews(this.onLoadSuccess, this.onLoadFalse);
    };

    onLoadSuccess = (data) => {
        console.log('Onload data sucess !');
        this.props.onLoadDataSuccess(data);
        this.setState({isRefresh:false});
    }

    onLoadFalse = () => {
        console.log('Onload datae false !');
        this.setState({isRefresh:false});
    }

    render() {
        const {navigation} = this.props;
        const renderItem = ({ item }) => (
            <NewsVerItemrenderer item={item} click={this.itemClick} favorite={true} styleImage={{width:PROGRAM_IMAGE_WIDTH-5, height:PROGRAM_IMAGE_HEIGHT-5 }} />
        );
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                    }
                    data={this.props.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id + ""}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={

                        (({ highlighted }) => (
                            <View
                                style={[
                                    {backgroundColor:Style.GREY_TEXT_COLOR, height:1, width:width -25, marginRight: 10},
                                    highlighted && { marginRight: 10 }
                                ]}
                            />
                        ))
                    }

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,

    }

});

export default NewsTab;
