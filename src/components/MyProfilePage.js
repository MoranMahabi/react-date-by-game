import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm';

export class MyProfilePage extends React.Component {
  onSubmit = (profile) => {
    fetch(`http://localhost:3000/users/updateProfile/${this.props.uid}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(profile)
    });
  };

  render() {
    return (
      <div>
        <ProfileForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(MyProfilePage);


