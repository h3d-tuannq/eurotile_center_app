import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
} from 'react-native';
import DownIconSvg from '../../../assets/icon/icon-down-black.svg';
import Style from '../../../src/def/Style';
import {WebView} from "react-native-webview";
import Def from "../../def/Def";

const {width, height} = Dimensions.get('window');

class TermScreen extends React.Component {
    render() {
        return (
            <View style={{paddingTop : 5, paddingBottom : 5, paddingHorizontal: 10 , backgroundColor: '#fff'}}>
                <View style={styles.webView}>
                    <WebView
                        source={{ uri: Def.PRIVACY_URL }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    webView : {
        height : height - Style.HEADER_HEIGHT ,
        backgroundColor: '#fff',
    },
});

export default TermScreen;
