import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.styles.scss';

import AuthPage from './pages/signInSignUp/signInSignUp.component'

class App extends React.Component {
  render(){
    return(
      <Router history={history}>
        <Switch>
          <Route path="/auth" exact component={AuthPage}/>
        </Switch>
      </Router>
    )
  }
}

export default App;