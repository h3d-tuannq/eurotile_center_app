import React, {PureComponent} from 'react'
import {Text, View, Button, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import Def from '../../def/Def'
import Style from "../../def/Style";
const {width, height} = Dimensions.get('window');


class NewsDetailScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {'item':this.props.route.params.item};
    }

    render() {
        const {navigation} = this.props;
        const model = this.props.route.params.item;

        console.log(model);

        return (
            <View style={styles.container}>
                <View style={{marginTop : 5, paddingBottom : 5 }}>
                    <View style={styles.webView}>
                        <WebView
                            source={{ uri: Def.getLinkOfNews(this.state.item) }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex : 1,
      paddingLeft: 15,
      // justifyContent: 'flex-start',
       paddingVertical : 5,
      // marginBottom : 60,
        backgroundColor : '#fff'

    },
    webView : {
        height : height - Style.HEADER_HEIGHT - 60,
        backgroundColor: '#e6e6e6',
        marginRight: 15,
    },
  });

export default NewsDetailScreen;
