import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {Autocomplete} from 'react-native-autocomplete-input'

class AutocompleteModal extends React.Component {
    constructor(props){
        super(props);
        this.setState({
            data : this.props.data,
            query : this.props.query
        });


    }

    filterData = (query) => {
        const { data } = this.state;
        if (query === '') {
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
                <View>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete data={filterData}
                                      defaultValue={this.state.query}
                                      onChangeText={text => this.setState({ query : text })}
                                      renderItem={({ item, i }) => (
                                          <TouchableOpacity style={styles.itemStyle} onPress={this.item_click(item)}>
                                              <Text>{item[this.props.filterAttr]}</Text>
                                          </TouchableOpacity>
                                      )}
                                      keyboardShouldPersistTaps='always'
                        />
                    </View>
                    <View>
                        <Text>Some content</Text>
                    </View>
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