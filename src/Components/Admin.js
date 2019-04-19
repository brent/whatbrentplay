import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AdminLogInForm from './AdminLogInForm';
import AdminFeedbackBanner from './AdminFeedbackBanner';

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
    } else {
      alert("Credentials incorrect, try again");
    }
  }

  displayPostFeedback = (success) => {
    this.setState({
      submitResult: {
        success: success,
      },
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return(
      <div className="adminWrapper">
        {
          this.state.submitResult
            ? <AdminFeedbackBanner success={ this.state.submitResult.success } />
            : null
        }
        <h2 className="adminWrapper__heading">Admin</h2>
        {
          this.state.isLoggedIn 
            ? <Redirect to={{
                pathname:'/admin/index',
                state: { isLoggedIn: this.state.isLoggedIn },
              }}/>
            : <AdminLogInForm 
                onSubmit={ this.handleAdminLogInSubmit }
              /> 
        }
      </div>
    )
  }
}

export default Admin;
