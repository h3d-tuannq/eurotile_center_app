import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
const {width,  height} = Dimensions.get('window');

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
            data : this.props.data.length > 0 ? this.props.data : initData,
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
                <View style={{height: height}}>
                        <Autocomplete data={filterData}
                                      defaultValue={this.state.query}
                                      onChangeText={text => this.setState({ query : text })}
                                      renderItem={({ item, i }) => (
                                          <TouchableOpacity style={styles.itemStyle} onPress={() => {
                                              this.item_click(item)

                                          }}>
                                              {

                                              }
                                              <Text>{item[this.props.filterAttr]}</Text>
                                          </TouchableOpacity>
                                      )}
                                      keyboardShouldPersistTaps='always'
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
    }

});

export default AutocompleteModal;
