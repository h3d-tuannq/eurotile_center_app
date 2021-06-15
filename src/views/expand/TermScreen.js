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
            <View style={{marginTop : 5, paddingBottom : 5 }}>
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
    header: {
        height: Style.HEADER_HEIGHT,
        flexDirection: 'row',
        paddingVertical: 10,
        width: width,
        // flex:1,
    },

    title: {
        fontSize: Style.TITLE_SIZE,
        color: Style.DEFAUT_RED_COLOR,
        fontWeight: 'bold',
        marginLeft: -20,
    },
    webView : {
        height : height - Style.HEADER_HEIGHT - 60,
        backgroundColor: '#e6e6e6',
        marginRight: 15,
    },
});

export default TermScreen;
