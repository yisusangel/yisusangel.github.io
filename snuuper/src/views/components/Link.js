import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Link extends Component {
  constructor(props){
    super(props);
    this.state = {
      href: props.href,
      value: props.value,
    }
  }

  buttonAction() {
    var href = this.state.href;
    if(href.charAt(0) == "/"){
      Actions[href.substr(1)].call();
    }else{
      Linking.openURL(href);
    }
  }

  render() {
    const {value, href} = this.state;
    const {basicBtnTextStyle} = css;
    return(
        <Text style={basicBtnTextStyle} onPress={() => this.buttonAction()}>{value}</Text>
    )
  }
}

const css = {
    basicBtnTextStyle: {
      color: "#00f"
    }

}
