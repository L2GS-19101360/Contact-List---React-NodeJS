import { useState, Component } from 'react'
import './App.css'
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';


class App extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <TableComponent />
      </div>
    );
  }

}

export default App
