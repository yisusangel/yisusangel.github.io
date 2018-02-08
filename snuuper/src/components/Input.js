import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';

export default class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
      label: props.label,
      placeholder: props.placeholder,
      pass: props.pass ? true : false
    }
  }

  render() {
    const {contStyle, inputStyle} = css;
    const {value, label, pass, placeholder} = this.state;
    return(
      <View style={contStyle}>
        {label &&
          <Text>{label}</Text>
        }
        <TextInput
          style={inputStyle}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          secureTextEntry={pass}
          value={value}
          placeholder={placeholder}
          onChangeText={value => {
            this.setState({value})
            this.props.onChange(value)
          }}
        />
      </View>
    )
  }
}

const css = {
  contStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    padding: 3,
    color: "#000",
    borderWidth: 1,
    borderColor: '#1ab394'
  },

}
