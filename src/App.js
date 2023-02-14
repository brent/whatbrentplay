import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from 'react-router-dom';

import Admin from './Components/Admin';
import AdminIndex from './Components/AdminIndex';
import AdminReviewForm from './Components/AdminCreateReviewForm';
import Reviews from './Components/Reviews';
import ReviewDetail from './Components/ReviewDetail';

import './css/reset.css';
import './css/app.css';

const App = () => {
  const title = 'whatbrentplay';

  return (
    <Router>
      <div className="appWrapper">
        <h1 className="appLogoWrapper">
          <a className="appLogo" href="/">
            byte sized reviews
          </a>
        </h1>

        <Routes>
          <Route path="/admin/review/:slug" element={<AdminReviewForm />} />
          <Route path="/admin/review/new" element={<AdminReviewForm />} />
          <Route path="/admin/index" element={<AdminIndex />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:slug" element={<ReviewDetail />} />
          <Route path="/" element={<Reviews />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
