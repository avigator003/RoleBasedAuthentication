import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Users from './components/Users'
import './scss/style.scss';
import UserForm from './components/UserForm'
function App() {
  return (
    <Router>    
        <Switch>
         <Route  exact path="/login" component="Login"/>
         <Route exact path="/users">
           <Users/>
           </Route>
           <Route exact path="/user/create">
           <UserForm/>
           </Route>

           <Route exact path="/user/update/:id">
           <UserForm/>
           </Route>
      
        </Switch>
    </Router>
);
  
}

export default App;
