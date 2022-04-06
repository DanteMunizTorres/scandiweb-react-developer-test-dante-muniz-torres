import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import './App.css';


import Header from './components/header/Header'
import Main from './components/Main';



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
        <Main />
      </BrowserRouter>
    );

  }
}

export default App;
