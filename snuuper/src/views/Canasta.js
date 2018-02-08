import React, { Component } from 'react';
import axios from 'axios';

export default class Canasta extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      cantidadesEdit: []
    };
  }

  componentWillMount(){
    var cantidadesEdit = [];
    for (var i = 0; i < this.state.cart.length; i++) {
      cantidadesEdit[this.state.cart[i].id] = this.state.cart[i].cantidad;
    }
    this.setState({cantidadesEdit});
  }

  obtenerTotal(total,val){
    return total+val.total;
  }

  finalizarPago(){
    var cart = this.state.cart;
    /*axios.post(`https://apitester.com/`,{
      compra: cart
    })
    .then((response) => {*/
      console.log(JSON.stringify(cart));
    //})
    alert(JSON.stringify(cart));
    this.setState({cart: []});
  }

  cambiarCantidad(cant,id){
    var arreglo = this.state.cantidadesEdit;
    arreglo[id] = cant;
    this.setState({cantidadesEdit:arreglo});
  }

  eliminarProducto(id){
    var cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      if(cart[i].id === id){
        cart.splice(i,1);
        this.setState({cart});
        break;
      }
    }
  }

  guardarCantidades(){
    var cart = this.state.cart;
    var cantidades = this.state.cantidadesEdit;
    for (var i = 0; i < cart.length; i++) {
        cart[i].cantidad = cantidades[cart[i].id];
        cart[i].total = cart[i].producto.price*cantidades[cart[i].id];
    }
    this.setState({cart});
  }

  render() {
    const {cart} = this.state;
    return (
      <div>
        <h1>Canasta</h1>
        <table id="tabla-productos">
          <tbody>
        {cart.map((prod) => (
          <tr key={prod.producto.id}>
             <td><b>{prod.producto.name}</b></td>
             <td><span>Precio unitario: {prod.producto.price}$</span></td>
             <td><input min="1" defaultValue={prod.cantidad} onChange={cant => this.cambiarCantidad(cant.target.value,prod.id)} type="number" className="form-control"/></td>
             <td><span>TOTAL: {prod.total}$</span></td>
             <td><button className="btn btn-danger" onClick={() => this.eliminarProducto(prod.id)}>Borrar</button></td>
          </tr>
        ))}
        </tbody>
        </table>
        <button className="btn btn-success" onClick={() => this.guardarCantidades()}>Guardar Cantidades</button>
        <h3>Total a pagar: <b>{cart.reduce(this.obtenerTotal,0)}$</b></h3>
        <button id="btn-pagar" className="btn btn-primary" onClick={() => this.finalizarPago()}>Pagar</button>
      </div>
    );
  }
};
