import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Router>    
        <Switch>
         <Route path="/login" component="Login"/>
         <Route path="/users" component="Users"/>
        </Switch>
    </Router>
);
  
}

export default App;
