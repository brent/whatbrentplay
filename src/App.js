import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Admin from './Components/Admin';
import AdminCreateReviewForm from './Components/AdminCreateReviewForm';
import Reviews from './Components/Reviews';
import ReviewDetail from './Components/ReviewDetail';

import './css/reset.css';
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    document.title = "byte sized reviews";
  }

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
            <Route path="/admin/review/:slug" component={AdminCreateReviewForm} />
            <Route path="/admin/review/new" component={AdminCreateReviewForm} />
            <Route path="/admin" component={Admin} />
            <Route path="/:slug" component={ReviewDetail} />
            <Route path="/" component={Reviews} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
