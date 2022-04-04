import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/Header/Header'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    //llamado a api 
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {


    return (
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  }
}

export default App;
