import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import Store from './pages/Store';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <AmplifySignOut/>
      <Switch>
        <Route exact path="/checkout">
            <Checkout/>
        </Route>
        <Route path="/store">
            <Store/>
        </Route>
        <Route path="*">
            <Store/>
        </Route>
      </Switch>
    </Router>
  )
}

export default withAuthenticator(App)
