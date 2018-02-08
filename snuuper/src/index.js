import React, { Component } from 'react';
import {render} from 'react-dom';
import Productos from './views/Productos';
import Canasta from './views/Canasta';
import './css/App.css';
import './css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tipo: "electronics",
      cart: []
    };
  }

  render() {
    const {cart,tipo} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://snuuper.com/img/logo-default.png" className="App-logo" alt="logo" />
        </header>
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand">SnuupStore</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={() => this.setState({tipo:"electronics"})}>ARTICULOS ELECTRÓNICOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => this.setState({tipo:"movies"})}>PELICULAS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => this.setState({tipo:"videogames"})}>VIDEOJUEGOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => this.setState({tipo:"canasta"})}>IR A CANASTA</a>
            </li>
          </ul>
        </nav>
        {tipo !== "canasta" &&
          <Productos cart={cart} tipo={tipo}/>
        }
        {tipo === "canasta" &&
          <Canasta cart={cart}/>
        }
      </div>
    );
  }
};

render(<App/>, document.getElementById('root'));
