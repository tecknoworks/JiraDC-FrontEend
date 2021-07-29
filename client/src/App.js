import React from 'react';

// Style
import './App.scss';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import PageList from './components/PageList';
import NavBar from './components/NavBar';
import AddPage from './components/AddPage';
import Page from './components/Page';
import { GlobalErrors } from './components/GlobalErrors';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
function App() {
  return (
    <Router>
      <NavBar />

      <GlobalErrors />
      
      <Switch>
        <Route path="/" exact component={PageList} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}
//<Route path="/pages/:id" component={Page} />
export default App;
