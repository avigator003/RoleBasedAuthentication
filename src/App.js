import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import Users from './components/Users'
import './scss/style.scss';
import UserForm from './components/UserForm'
import Login from './components/Login';
import { useEffect } from 'react';
import React from 'react'
function App() {
 
  const user=JSON.parse(localStorage.getItem("user"))
  return (
    <Router>   

        <Switch>
        <Route path="/login" name="Login" render={props => <Login {...props}/>} />
          <Route path="/users" name="Login" render={props => <Users {...props}/>} />
          <Route path="/user/create" name="UserForm" render={props => <UserForm {...props}/>} />
          <Route path="/user/update/:id" name="UserForm" render={props => <UserForm {...props}/>} />
      {
        user==null?
        
        <Redirect from='*' to='/login' />:  
           <Redirect from='*' to='/users' /> 
            }     
           </Switch>


    </Router>
);
  
}

export default App;
