import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Alert,
    Modal,
    RefreshControl,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Style from "../../../src/def/Style";
import CatalogueItemrenderer from "../../com/item-render/CatalogueItemrenderer";
import DesignDocumentController from "../../controller/DesignDocumentController";
import Def from "../../def/Def";
import PdfViewer from "../../com/common/PdfViewer";
import AsyncStorage from "@react-native-community/async-storage";
import NetNews from "../../net/NetNews";
import Icon from "react-native-vector-icons/FontAwesome";

const {width, height} = Dimensions.get('window');


const PROGRAM_IMAGE_WIDTH = (width - 30) /2;
const PROGRAM_IMAGE_HEIGHT = (width - 30) /2;


class EcatalogueScreen extends React.Component {
    criteria = {};
    constructor(props) {
        super(props);
        this.state = {
            data: Def.catalogue_data,
            displayPdf : false,
            playModel: null,
            isRefresh : false,
        };
        this.itemClick = this.itemClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.getDesignDocSuccess = this.getDesignDocSuccess.bind(this);
        this.getDesignDocFalse = this.getDesignDocFalse.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
        this.filterDataByCondition = this.filterDataByCondition.bind(this);
        this.filterFunc = this.filterFunc.bind(this);
    }

    searchButtonClick = () => {
        this.criteria['name'] = this.state.name;
        this.filterDataByCondition();
    }

    filterDataByCondition = () => {
        this.criteria['name'] = this.state.name;
        let dataFilter =  Def.catalogue_data.filter(this.filterFunc);
        this.setState({data:dataFilter});
    }

    filterFunc = (item) => {
        let rs = true;
        if(rs && this.criteria.name && this.criteria.name.length > 0){
            const regex = new RegExp(`${this.criteria.name.trim()}`, 'i');
            rs = item.name.search(regex) >= 0;
        }
        return rs;
    }

    resetCriteria = () => {
        this.setState({ name: ""});
        this.criteria = {};
    }

    onRefresh = () => {
        console.log('Refresh News');
        this.setState({isRefresh:true});
        DesignDocumentController.getDocumentByCondition(this.getDesignDocSuccess, this.getDesignDocFalse, Def.CATALOGUE_CODE);
    };



    onLoadFalse = () => {
        console.log('Onload datae false !');
        this.setState({isRefresh:false});
    }

    itemClick(item) {
        console.log(item.id);
        this.setState({playModel:item, displayPdf: true});
        // let screen = this.props.type == 'product' ? 'product-detail' : 'product-detail';
        // this.props.navigation.navigate(screen, {item: item});
    }

     getDesignDocSuccess = async (data) => {
        console.log('Get DesignDoc Success : ' + JSON.stringify(data));
        if(data['message'] == 'OK' ){
            console.log('Set State');
            Def.catalogue_data = data['data'];
            await AsyncStorage.setItem('catalogue_data', JSON.stringify(Def.catalogue_data));
            this.setState({data:data['data'], isRefresh:false});

        } else {
            Alert.alert(
                'Thông báo',
                data['message'],
            );
            this.setState({isRefresh:false});
        }
    }

    getDesignDocFalse = (data) => {
        console.log('Get DesignDoc False');
        this.setState({isRefresh:false});

    }

    async componentDidMount() {
        console.log('Ecatalogue Component Did mount');
        if( !Array.isArray(this.state.data) && !this.state.data) {
            if(!Def.catalogue_data) {
                let catalogueData = await AsyncStorage.getItem('catalogue_data');
                if(catalogueData) {
                    Def.catalogue_data = JSON.parse(catalogueData);
                    this.setState({data:Def.catalogue_data});
                } else {
                    DesignDocumentController.getDocumentByCondition(this.getDesignDocSuccess, this.getDesignDocFalse, Def.CATALOGUE_CODE);
                }
            } else {
                Def.catalogue_data = null;
                this.setState({data:Def.catalogue_data});
            }
        }
    }
    closeFunction = () => {
            this.setState({displayPdf: false});
    }

    render() {
        const {navigation} = this.props;
        const renderItem = ({item}) => (
            <CatalogueItemrenderer click={this.itemClick} type={'product'} item={item} favorite={true}
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
                                     // alignItems : 'center',
                                     // padding:10,
                                     // paddingLeft: 10,
                                 }}
            />
        );
        return (
            <View style={styles.container}>
                <View style={{ width : width -20, borderWidth : 0, height:Def.ITEM_HEIGHT + 10 ,borderBottomWidth:1 ,borderColor:Style.GREY_BACKGROUND_COLOR, flexDirection : 'row',alignItems : 'center', marginTop : 0, marginBottom : 5,}}>
                    <TextInput value={this.state.name} onChangeText={text => this.setState({ name : text })} placeholder={"Nhập tên"} style={[styles.textInput, {backgroundColor:'#fff',marginTop:5, width: width -70, paddingHorizontal:10}]}>
                    </TextInput>
                    <TouchableOpacity onPress={this.searchButtonClick} style={{paddingLeft:5,paddingRight:0, paddingVertical:5 ,  }} >
                        <Icon style={styles.searchIcon} name="search" size={27} color={Style.GREY_TEXT_COLOR}/>
                    </TouchableOpacity>
                </View>
                    {this.state.data && this.state.data.length > 0 ?
                    <View>
                        <FlatList
                            data={this.state.data}
                            refreshControl={
                                <RefreshControl refreshing={this.state.isRefresh} onRefresh={this.onRefresh}/>
                            }
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                        />
                    </View>
                    :
                        <View style={{alignItems : 'center', justifyContent:'center', flex: 1}}>
                            <Text>
                                {'Không có Catalogue'}
                            </Text>
                        </View>
                    }
                <Modal onRequestClose={() => {this.closeFunction(null)}} visible={this.state.displayPdf}  transparent={false} styles={{backgroundColor : 'green'}} >
                    {/*{this.state.choseAddress ?*/}
                    <PdfViewer
                        item={this.state.playModel}
                        data={this.state.filterData}
                        closeFunction={this.closeFunction}
                    />
                </Modal>
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

export default EcatalogueScreen;
