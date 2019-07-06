import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Landing from './components/landing';
import SignIn from './components/signIn';
import SignUp from './components/signUp'
import ShopList from './components/shopping';
import Items from './components/items';
import ShopListEdit from './components/shopListEdit';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {



    render() {
      return (

        <div>
        <header>
        <Nav/>

        </header>
        <main>
        <Route exact path="/" component={Landing}  />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/ShopList" component={ShopList} />
        <Route exact path="/ShopList/:id" component={Items} />
        <Route exact path="/ShopList/:id/edit" component={ShopListEdit} />

        </main>
        </div>


      );
    }
  }

  export default App;
