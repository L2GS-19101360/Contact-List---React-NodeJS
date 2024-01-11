import { useState, Component } from 'react'
import './App.css'
import NavbarComponent from '../components/NavbarComponent';

class App extends Component{

  constructor(){
    super();
  }

  componentDidMount(){

  }
  componentWillUnmount(){

  }

  render(){
    return(
      <div>
        <NavbarComponent/>
      </div>
    );
  }

}

export default App
