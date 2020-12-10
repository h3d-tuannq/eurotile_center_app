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
    slider: {
      justifyContent: 'center',
      paddingTop: 5,
      padding: 8,
      height: 100,
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
    titleText : {
        fontSize :Style.TITLE_SIZE,
        fontWeight:'bold'
    },
    nomarText: {
      color: '#b3b3b3',
      fontSize : 15,
    },

    groupMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : 5,
        paddingBottom:5,
        marginRight: 15,


    },
    menuBtn:{
        flexDirection : 'row',
        alignItems:'center'

    }
    ,
    menuText: {
        fontSize:15,
        marginHorizontal:5,
        color: '#b3b3b3'
    },
    content : {
        marginTop : 10,
        marginRight: 15,
    },
    webView : {
        height : height - Style.HEADER_HEIGHT - 60,
        backgroundColor: '#e6e6e6',
        marginRight: 15,
    },
    // listenView: {
    //     flexDirection: 'row',
    //     height : 45,
    //     marginRight : 10,
    // },
    listenButton :{
        // alignItems: 'center', flexDirection:'row' ,
        // paddingHorizontal: 10,
        // borderRadius: 5,
        // flex: 1,
        position : 'absolute',
        bottom :20,
        right : 30,
        zIndex : 3,
    },
    buttonText : {
        fontSize : 20,
        color: '#ffffff',
        paddingHorizontal: 5,
    },
    favoriteIcon : {
        width : 50,
        height : 50,
    },
    ads: {
       width : width,
       height : 70,
       justifyContent: "center",
       alignItems: "center",
    },



  });

export default NewsDetailScreen;
