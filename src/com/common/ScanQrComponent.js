import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Linking} from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Def from  '../../def/Def'

const {width,  height} = Dimensions.get('window');


class ScanQrComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          item:null,
          labelInfo: null,
        };
        this.onSuccess = this.onSuccess.bind(this);
        this.gotoDetailProduct = this.gotoDetailProduct.bind(this);
    }
    onSuccess = e => {
        console.log('Scan Data' + JSON.stringify(e));
        if(e.data) {
            let item = Def.getProductById(e.data);
            let labelInfo = 'Sản phẩm ' + (item ? item.model : "");
            this.setState({item:item, labelInfo:labelInfo});

            // Def.mainNavigate.navigate('Product', {
            //     screen: 'collection-detail-screen',
            //     params: {item: item, data: null}
            // });
            // Linking.openURL(e.data).catch(err =>
            //     console.error('An error occured', err)
            // );
        }
    };

    gotoDetailProduct(){
        Def.mainNavigate.navigate('Product', {
            screen: 'collection-detail-screen',
            params: {item: this.state.item, data: this.state.item}
        });
        Def.closeQrCode();
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text style={styles.centerText}>

                        <Text style={styles.textBold}>Chức năng quét mã QR hiển thị thông tin sản phẩm</Text>
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} disabled={this.state.item === null} onPress={this.gotoDetailProduct}>
                        <Text style={styles.textBold}>{this.state.labelInfo}</Text>
                        <Text style={styles.buttonText}>Xem chi tiết!</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export default ScanQrComponent;
