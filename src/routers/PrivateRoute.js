import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import MyProfilePage from '../components/MyProfilePage';

export const PrivateRoute = ({
  isAuthenticated,
  isCompleteProfile,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Component {...props} />
          {
             isCompleteProfile ? "true" : "false"
          }
          {
            isCompleteProfile ? (
              <div>
              </div>
            ) : (
                <div>
                  <MyProfilePage />
                </div>
              )
          }
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  isCompleteProfile: state.auth.isCompleteProfile
});

export default connect(mapStateToProps)(PrivateRoute);
