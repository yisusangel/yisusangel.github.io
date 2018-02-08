import React, {Component} from 'react';
import {View, ScrollView, TouchableWithoutFeedback, Text, Modal, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export default class Select extends Component {
  constructor(props){
    super(props);
    this.state = {
      optionsArray: props.optionsArray ? props.optionsArray : [],
      selectedOption: props.value,
      selectedOptionLabel: props.selectedOptionLabel,
      modalVisible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      optionsArray: nextProps.optionsArray,
      selectedOption: nextProps.value,
      selectedOptionLabel: nextProps.selectedOptionLabel
    });
  }

  render() {
    const {viewStyle, closeSelectModal, selectButtonStyle, selectTextStyle, selectModalCont, selectModalTextStyle} = css;
    const {rut, pass, label, modalVisible, selectedOption, selectedOptionLabel, optionsArray} = this.state;
    return (
      <View style={viewStyle}>
        {label &&
          <Text>{label}</Text>
        }
        <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:true, selectOptionsToRender: "to"})}>
           <View style={selectButtonStyle}>
               <Text style={selectTextStyle}>{selectedOptionLabel} ▼</Text>
           </View>
        </TouchableWithoutFeedback>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => console.log("")}
          >
          <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
              <View style={closeSelectModal}>
                   <ScrollView>
                        <View style={selectModalCont}>
                            {optionsArray.map(option =>
                                <TouchableWithoutFeedback key={option.label} onPress={() => {
                                  this.setState({modalVisible: false, selectedOption: option.value, selectedOptionLabel: option.label})
                                  this.props.onChange(option.value)
                                }}>
                                   <View style={selectModalTextStyle}>
                                       <Text>{option.label}</Text>
                                   </View>
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                   </ScrollView>
              </View>
           </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }

}
const selectWidth = (width-40 > 400) ? 400 : width-40;
const css = {
    viewStyle: {
      flex:1,
    },
    closeSelectModal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    selectModalTextStyle: {
        padding: 20
    },
    selectButtonStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding:10,
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 5,
    },
    selectTextStyle: {
        color: 'black',
        textAlign: 'center',
    },
    selectModalCont: {
        width: selectWidth,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: ((width-selectWidth)/2 < 20) ? 20 : (width-selectWidth)/2,
        padding: 10,
        borderRadius: 3,
        backgroundColor: 'white'
    }

}
