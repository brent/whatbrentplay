import React, { Component } from 'react';

import Review from '../Models/Review';

import AdminLogInForm from './AdminLogInForm';
import AdminCreateReviewForm from './AdminCreateReviewForm';

import '../css/admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
  }

  handleAdminLogInSubmit = (e) => {
    e.preventDefault();

    if ((process.env.REACT_APP_ADMIN_USER === e.target.username.value) &&
      (process.env.REACT_APP_ADMIN_PASSWORD === e.target.password.value)) {
      this.setState({
        isLoggedIn: true,
      });

      e.target.reset();
    } else {
      alert("Credentials incorrect, try again");
    }
  }

  handleAdminCreateReviewFormSubmit = (e) => {
    e.preventDefault();

    let review = Review.build(e.target);

    Review.create(review)
      .then((doc) => {
        console.log('saved doc: ', doc);
      }).catch((err) => {
        console.log(err);
      });

    // this should be in the above .then() block
    // figure out why it wasn't working there
    e.target.reset();
  }

  handleGameNameBlur = (e) => {
    const gameTitle = e.target.value;
    const regex = /([a-zA-z0-9?']*)[\s\W]{1,2}/gi;
    const parts = gameTitle.split(regex);

    let sanitizedParts = [];
    parts.forEach((part) => {
      if (part.length != 0) {
        part = part.replace('\'', '');
        sanitizedParts.push(part.toLowerCase());
      }
    });

    const slug = sanitizedParts.join("-");

    this.setState({
      slug: slug,
    });
  }

  render = () => {
    return(
      <div className="adminWrapper">
        <h2 className="adminWrapper__heading">Admin</h2>
        {
          this.state.isLoggedIn 
            ? <AdminCreateReviewForm 
                onSubmit={ this.handleAdminCreateReviewFormSubmit } 
                onBlur={ this.handleGameNameBlur }
                slug={ this.state.slug }
              />
            : <AdminLogInForm 
                onSubmit={this.handleAdminLogInSubmit}
              /> 
        }
      </div>
    )
  }
}

export default Admin;
