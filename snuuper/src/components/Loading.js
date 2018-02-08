import React, {Component} from 'react';
import {View, Text, Modal, Image} from 'react-native';

export default class Loading extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: props.modalVisible,
      loadingText: props.loadingText ? props.loadingText : "Cargando..."
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      loadingText: nextProps.loadingText ? nextProps.loadingText : "Cargando..."
    });
  }

  render() {
    const {modalTextStyle,modalCont, modalImageStyle} = css;
    const {modalVisible, loadingText} = this.state;
    return(
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => console.log("")}
      >
        <View style={modalCont}>
             <Image resizeMode={'contain'} style={modalImageStyle} source={require("../images/30.gif")}/>
             <Text style={modalTextStyle}>{loadingText}</Text>
        </View>
      </Modal>
    )
  }
}
const css = {
  viewStyle: {
    flex:1,
  },
  modalCont: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalImageStyle: {
  }
}
