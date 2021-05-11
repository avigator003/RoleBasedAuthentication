import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Users from './components/Users'
import './scss/style.scss';

function App() {
  return (
    <Router>    
        <Switch>
         <Route  exact path="/login" component="Login"/>
         <Route exact path="/users">
           <Users/>
           </Route>
        </Switch>
    </Router>
);
  
}

export default App;
