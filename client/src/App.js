import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from './actions';
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
import Persistance from './components/Persistance';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import CreateProjectPage from './components/CreateProjectPage';
import AllProjectsContent from './components/AllProjectsContent';
function App(props) {

  let routes=" "
  if(props.isAuthUser){
    routes=<span>
        <Route path="/" exact component={PageList} />

<Persistance path="/login" type="guest">
      <LogIn />
</Persistance>
<Route path="/signup" component={SignUp} />
<Route path="/projects" component={ProjectPage} />
{/* <Route path="/allprojects" component={AllProjectsContent} /> */}
    </span>
  }else{
    routes=<span>
      <Route path="/" exact component={PageList} />

<Persistance path="/login" type="guest">
      <LogIn />
</Persistance>
<Route path="/signup" component={SignUp} />
    </span>
  }


  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={PageList} />
        <Persistance path="/login" type="guest">
          <LogIn />
        </Persistance>
        <Route path="/signup" component={SignUp} />
        <Route path="/projects" component={ProjectPage} />
        <Route path="/allprojects" component={AllProjectsContent} />
      </Switch>
      <Footer />
    </Router>
  );
}
//<Route path="/pages/:id" component={Page} />
//<Route path="/login" component={LogIn} />
//<Route path="/projects/create" component={CreateProjectPage} />
const mapStateToProps = state => ({
  isAuthUser: state.login.isAuthUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);