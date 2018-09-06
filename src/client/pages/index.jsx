import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AuthRoute from '$lib/authRoute';

import Main from './main';
import Login from './login';

import '$res';


export default (

  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <AuthRoute path="/" component={Main} />
    </Switch>
  </Router>

);
