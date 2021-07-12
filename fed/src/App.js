import './App.css';
import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddItem from './components/AddItem';
import AllItems from './components/AllItems';
import PrimaryNav from './components/PrimaryNav';
import IsAuthenticated from './auth-context';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';

function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Our button can take an href or a clickEvent attribute
  const opts = {};
  //opts['href'] = '/testit';
  opts['clickEvent'] = () => { console.log('clicked') };

  // const isAuthenticated = React.createContext(false);
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route {...rest} render={props => {
        return Cookies.get('Token')
          ? <Component {...props} />
          : <Redirect to='/signin' />
      }} />
    )
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <PrimaryNav></PrimaryNav>
          <Switch>
            <Route exact path="/" render={props => (
              <>
                TEST
              </>
            )} />
            <PrivateRoute exact component={AddItem} path="/add-item" render={props => (
              <>
                <AddItem></AddItem>
              </>
            )} />
            <PrivateRoute exact component={AllItems} path="/all-items" render={props => (
              <AllItems></AllItems>
            )} />
            <Route exact path="/signin" render={() => (
              <>
                <SignIn></SignIn>
              </>
            )} />
            <Route exact path="/signup" render={() => (
              <>
                <SignUp></SignUp>
              </>
            )} />
            <Route exact path="/sneakers" render={props => (
              <>

              </>
            )} />
            <Route exact path="/lightning" render={props => (
              <>

              </>
            )} />
          </Switch>
        </header>
      </div>
    </Router >
  );
}

export default App;
