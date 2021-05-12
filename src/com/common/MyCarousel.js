import React from 'react'
import Def from '../../def/Def'
import Style from "../../def/Style";
import {View, Text} from 'react-native'

import Carousel from 'react-native-snap-carousel';
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";

import {Dimensions} from "react-native";
import NetNews from "../../net/NetNews";
import AsyncStorage from "@react-native-community/async-storage";
const {width, height} = Dimensions.get('window');

class MyCarousel extends React.Component{
    constructor(props){
        super(props);
        console.log('contructor MyCarousel : ' + Def.popularNews.length);
        if(!Def.popularNews || Def.popularNews.length == 0){

            this.getPopularNews();
        }

        this.state = {
            slide_data: Def.popularNews
        }
        this.getPopularNews = this.getPopularNews.bind(this);
        this.getPopularNewsSuccess = this.getPopularNewsSuccess.bind(this);
        this.getPopularNewsFalse = this.getPopularNewsFalse.bind(this);

    }

    getPopularNews = () => {
        NetNews.getPopularArticle(this.getPopularNewsSuccess, this.getPopularNewsFalse);
    };

    getPopularNewsSuccess = (data) => {

        if(data['result'] == 1){
            this.setState({slide_data : data['data']});
            Def.popularNews = data['data'];
            AsyncStorage.setItem('popularNews', JSON.stringify(Def.popularNews))
        } else {
            console.log("GetPopularMessage : " + data['message']);
        }
    };
    getPopularNewsFalse = (data) => {
        console.log('GetPopularNewsFalse Err ' + JSON.stringify(data));
    };

    componentDidMount(){
        if(!Def.popularNews || Def.popularNews.length == 0) {
            // this.getPopularNews();
        }
    }


    render(){
        return (
            <View style={[{ height:0.6*width}]} >
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    // keyExtractor={(item, index) => `${item.id}--${item.index}`}
                    data={this.state.slide_data}
                    renderItem={this.props.renderItem}
                    itemWidth={width -20}
                    sliderWidth={width -20}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    activeSlideAlignment={'start'}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                    onSnapToItem= {(index) => {
                            this.props.onSnap(index);
                        }
                    }
                />
            </View>)
    }

}

export default MyCarousel;