import { useState, Component } from 'react'
import './App.css'
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import CreateContactModal from '../components/CreateContactModal';

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
        <CreateContactModal/>
        <TableComponent/>
      </div>
    );
  }

}

export default App
