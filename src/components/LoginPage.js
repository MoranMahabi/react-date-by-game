import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';
import '../style/loginPage.css';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="myContainer">
        <div className="login-page-container">
          <h1 className="login-page-title">Date By Game</h1>
          <img src="https://www.alux.com/wp-content/uploads/2014/07/10-Unique-First-Date-Ideas-Games.jpg" alt="..."/>
          <div onClick={this.props.startLogin}
               className="login-page-image">
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans"/>

            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img className="google-icon"
                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="..."/>
              </div>
              <p className="btn-text"><b>Sign in with google</b></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startLogin: startLogin(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);