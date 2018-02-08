import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';

export default class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      onClick: props.onClick,
      value: props.value,
      btnType: props.btnType,
      disabled: props.disabled ? props.disabled : false,
      btnStyle: {},
      btnTextStyle: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onClick: nextProps.onClick,
      value: nextProps.value,
      btnType: nextProps.btnType,
      disabled: nextProps.disabled
    });
  }

  componentWillMount() {
    switch(this.state.btnType){
      case "btn-success":
        this.setState({
          btnStyle: {
            backgroundColor: "#1ab394"
          },
          btnTextStyle: {
            color:"#fff"
          }
        })
        break;
      case "btn-primary":
          this.setState({
            btnStyle: {
              backgroundColor: "#1c84c6"
            },
            btnTextStyle: {
              color:"#fff"
            }
          })
          break;
      default:
        this.setState({
          btnStyle: {
            backgroundColor: "#dddddd"
          },
          btnTextStyle: {
            color:"#000"
          }
        })
    }
  }

  render() {
    const {onClick, value, btnStyle, btnTextStyle, disabled} = this.state;
    const {basicBtnStyle, basicBtnTextStyle} = css;
    return(
    <TouchableWithoutFeedback disabled={disabled} onPress={onClick}>
      <View style={[btnStyle,basicBtnStyle]}>
          <Text style={[btnTextStyle,basicBtnTextStyle]}>{value}</Text>
      </View>
    </TouchableWithoutFeedback>
    )
  }
}

const css = {
    basicBtnStyle: {
      marginTop: 5,
      marginBottom: 5,
      padding: 10,
      borderRadius: 3
    },
    basicBtnTextStyle: {
      textAlign: "center",
      fontWeight: "bold"
    }

}
