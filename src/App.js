import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Reviews from './Components/Reviews';
import Admin from './Components/Admin';

import './css/reset.css';
import './css/app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="appWrapper">
          <h1 className="appLogoWrapper">
            <a className="appLogo" href="/">
              byte sized reviews
            </a>
          </h1>

          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Reviews} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
