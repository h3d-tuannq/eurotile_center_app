import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import Style from "../../def/Style";
const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

import LocationIcon from '../../../assets/icons/Location.svg';
import BackIcon from '../../../assets/icon/icon-back-black.svg';
import DownBackButton from  '../../../assets/icon/icon-down-black.svg';
import BackIconSvg from '../../../assets/icon/icon-back.svg';
import MyAutoCompleteInput from './MyAutocompleteInput';
import MyAutocompleteInput from './MyAutocompleteInput';

const FlatStatusData = [
    // {'id': 0 , 'name': "Chưa kích hoạt"},
    // {'id': 1 , 'name' :"Hoạt động"},
    {'id': 2 , 'name': "Hoàn thành nghĩa vụ tài chính"},
    {'id': 3 , 'name': "Đủ điều kiện bàn giao"},
    {'id': 4 , 'name': "Đang bàn giao"},
    {'id': 5 , 'name':"Đã ký nhận bàn giao"} ,
    {'id': 6 , 'name':"Sữa chữa sau bàn giao"},
    {'id': 8 , 'name':"Đã hoàn thiện hồ sơ"},
    {'id': 7 , 'name':"Đã hoàn thành"}
];

const initData = [
    {"id":1,"city_code":1,"city_name":"Tiền Giang"},
    {"id":2,"city_code":2,"city_name":"Hưng Yên"},
    {"id":3,"city_code":3,"city_name":"Hà Nội"},
    {"id":4,"city_code":4,"city_name":"TP Hồ Chí Minh"},
    {"id":61,"city_code":61,"city_name":"Yên Bái"},{"id":62,"city_code":62,"city_name":"Điện Biên"},{"id":63,"city_code":63,"city_name":"Hà Giang"},{"id":64,"city_code":64,"city_name":"Chưa rõ"}];

class AutocompleteModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // data : this.props.data.length > 0 ? this.props.data : [],
            data : this.props.data.length > 0 ? this.props.data : [],
            query : ""
        };
    }

    filterData = (query) => {
        const { data } = this.state;
        if (query === '' || query === null) {
            return data;
        }

        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(item => item[this.props.filterAttr].search(regex) >= 0);
    }

    item_click = (item) => {
        this.props.closeFunction(item);
    }


    render() {
        const filterData = this.filterData(this.state.query);



        return (
                <View style={{height: height, paddingBottom :50, marginTop: 25}}>

                        <View
                            style={{
                                position: 'absolute',zIndex:50 ,right: 5,
                                top: 50,
                                backgroundColor: '#fff',}}>
                            <TouchableOpacity style={{
                                 paddingLeft:0, paddingRight:10, flexDirection:'row', justifyContent : 'center', paddingVertical:10,

                            }}
                                              onPress={()=> {
                                                  console.log('Close Autocomple click');
                                                  this.props.closeFunction();
                                              }}
                            >
                                <DownBackButton width={Style.BACK_ICON_SIZE -2} height={Style.BACK_ICON_SIZE -5}/>
                                {/*<Text>*/}
                                {/*    Back*/}
                                {/*</Text>*/}
                            </TouchableOpacity>

                        </View>


                        <View style={{justifyContent: 'center', alignItems : 'center', paddingVertical: 10}}>
                            <Text style={Style.text_styles.titleTextNotBold}>
                                {this.props.addressTitle}
                            </Text>
                        </View>
                        {/*<Autocomplete*/}
                        {/*    data={filterData}*/}
                        {/*      defaultValue={this.state.query}*/}
                        {/*      onChangeText={text => this.setState({ query : text })}*/}
                        {/*      keyExtractor={(item,index) => "hoz" + index}*/}
                        {/*      renderItem={({ item, i }) => (*/}
                        {/*          <TouchableOpacity style={styles.itemStyle} onPress={() => {*/}
                        {/*              this.item_click(item)*/}
                        {/*          }}>*/}
                        {/*              <LocationIcon width={25} height={25} style={{padding:5}}/>*/}
                        {/*              <Text style={{paddingHorizontal:10}} >{item[this.props.filterAttr] + ""}</Text>*/}
                        {/*          </TouchableOpacity>*/}
                        {/*      )}*/}
                        {/*      renderTextInput={()=> (*/}
                        {/*          <View style={{borderWidth : 0,borderBottomWidth:1 ,borderColor:Style.GREY_TEXT_COLOR, flexDirection : 'row',alignItems : 'center', marginHorizontal : 10, marginBottom : 10}}>*/}
                        {/*              <Icon style={styles.searchIcon} name="search" size={24} color={Style.GREY_TEXT_COLOR}/>*/}
                        {/*              <TextInput onChangeText={text => this.setState({ query : text })} placeholder={"Nhập " + this.props.addressTitle} style={[styles.textInput, {marginTop:10}]}>*/}
                        {/*              </TextInput>*/}
                        {/*          </View>*/}
                        {/*        )*/}
                        {/*      }*/}

                        {/*    flatListProps = {{*/}
                        {/*  maxHeight: height ,*/}

                        {/*    }}*/}
                        {/*      keyboardShouldPersistTaps='always'*/}
                        {/*      inputContainerStyle={{borderWidth:0}}*/}
                        {/*    listStyle={{borderWidth:0}}*/}
                        {/*/>*/}

                    <MyAutocompleteInput
                        data={filterData}
                        keyExtractor={(item,index) => "hoz" + index}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity style={styles.itemStyle} onPress={() => {
                                this.item_click(item)
                            }}>
                                <LocationIcon width={25} height={25} style={{padding:5}}/>
                                <Text style={{paddingHorizontal:10}} >{item[this.props.filterAttr] + ""}</Text>
                            </TouchableOpacity>
                        )}
                        renderTextInput={()=> (
                                <View style={{
                                    borderWidth : 0,borderBottomWidth:1 ,borderColor:Style.GREY_TEXT_COLOR,

                                    flexDirection : 'row',alignItems : 'center', marginHorizontal : 10, marginBottom : 10,
                                    marginLeft : 15,
                                }}>
                                    <Icon style={styles.searchIcon} name="search" size={20} color={Style.GREY_TEXT_COLOR}/>

                                    <TextInput onChangeText={text => this.setState({ query : text })}
                                               placeholder={"Nhập " + this.props.addressTitle}
                                               style={[styles.textInput, {marginTop:10}]}>

                                    </TextInput>

                                </View>
                            )
                        }

                        style={{alignItems: 'center'}}

                        listStyle={{borderWidth:0, paddingLeft: 15}}

                    />


                </View>
        );
    }

}

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemStyle :{
        height : 40,
        flexDirection:'row',
        alignItems : 'center',

    },
    searchIcon : {
        // padding:5,
        marginTop :10,
        // backgroundColor: 'red',
    },

    textInput : {height: 40, backgroundColor : '#fff', borderColor: "#9e9e9e", borderWidth : 0,
        borderBottomWidth:0 ,color:'black', fontSize : Style.MIDLE_SIZE, borderRadius: 5, paddingHorizontal: 10 ,
        width : width - 50
    },

});

export default AutocompleteModal;
