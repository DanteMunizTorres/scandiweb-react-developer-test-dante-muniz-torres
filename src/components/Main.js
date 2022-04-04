import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

class Main extends Component {

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
      <main>

      </main>
    );

  }
}

export default Main;



      <Routes>
      <Route path='/login' exact={true} element={ <LoginForm />}/>
      <Route path='/register' exact={true} element={ <RegisterForm />}/>
    </Routes>