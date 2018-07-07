import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Reviews from './Components/Reviews';
import Admin from './Components/Admin';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>byte sized reviews</h1>

          <Switch>
            <Route 
              path="/admin" 
              component={Admin}
            />

            <Route 
              path="/" 
              component={Reviews}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
