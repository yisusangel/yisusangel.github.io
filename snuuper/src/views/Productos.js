import React, { Component } from 'react';
import axios from 'axios';

export default class Productos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      cantidades: [],
      cart: this.props.cart,
      tipo: this.props.tipo
    };
  }

  componentWillMount(){
    axios.get('ajax/'+this.state.tipo+'.json')
    .then((response) => {
      this.setState({productos:response.data.items});
    })
  }

  componentWillReceiveProps(nextProps){
    axios.get(`ajax/${nextProps.tipo}.json`)
    .then((response) => {
      console.log(response.data.items);
      this.setState({productos:response.data.items,tipo:nextProps.tipo,cart:nextProps.cart});
    })
  }

  agregarProducto(producto,cantidad){
    var cantidad = cantidad ? cantidad : 1;
    var cart = this.state.cart;
    var existe = 0;
      for (var i = 0; i < cart.length; i++) {
        if(cart[i].id == producto.id){
          existe = 1;
        }
      }
      if(!existe){
        cart.push({
          id: producto.id,
          producto,
          cantidad,
          total: producto.price*cantidad
        });
      }
      console.log(cart);
      this.setState({cart});
  }

  cambiarCantidad(cant,id){
    var arreglo = this.state.cantidades;
    arreglo[id] = cant;
    this.setState({cantidades:arreglo});
  }

  render() {
    const {productos,cantidades,tipo} = this.state;
    return (
      <div>
      {tipo == "electronics" &&
        <h1>Articulos Electrónicos</h1>
      }
      {tipo == "movies" &&
        <h1>Peliculas</h1>
      }
      {tipo == "videogames" &&
        <h1>Videojuegos</h1>
      }

        {productos.map((producto) => (
          <div key={producto.id} className={"producto"}>
           <h3>{producto.name}</h3>
           <img className="imagenes-productos" src={producto.url}/><br/>
           <h5>Precio: {producto.price}$</h5>
           <input min="1" onChange={cant => this.cambiarCantidad(cant.target.value,producto.id)} type="number" className="form-control cantidades-productos"/>
           <button className="btn btn-primary btn-productos" onClick={() => this.agregarProducto(producto,cantidades[producto.id])}>Agregar</button>
          </div>
        ))}
      </div>
    );
  }
};
