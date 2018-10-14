import React from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import '../style/fontAwesome/css/all.css';
import '../style/profileListItem.css';

class ProfileListItem extends React.Component {
  constructor() {
    super();
    this.likeToggle = this.likeToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: false,
      isLike: false,
      profile: {
        isLike: false,
        imageMain: 'uploads/profile.png',
        age: undefined,
        gender: "",
        seeking: "",
        city: "",
        displayName: ""
      }
    }
  }

  componentWillMount() {
    this.getPartnerProfile();
  }

  getPartnerProfile = () => {
    return fetch(`http://localhost:3000/users/profileDetails/${this.props.profileUID}`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId = setTimeout(this.getPartnerProfile, 200);
        return response.json();
      })
      .then(res => {
        if (!this.isCancelled && res.isProfileExist) {
          this.setState(() => ({ profile: res }));
        }
      })
      .catch(err => { throw err });
  }


  componentDidMount() {
    this.setState({ isLike: this.state.profile.isLike })
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  likeToggle() {
    this.setState({ isLike: !this.state.isLike });
  }

  render() {
    let  data  = this.state.profile;
    const age = data.age ? `${data.age} years old` : '';
    const name = data.displayName ? data.displayName : '';
    const gender = data.gender ? data.gender.toLowerCase() : '';
    const city = data.city ? `from ${data.city}` : '';
    const seeking = data.seeking ? `seeking ${data.seeking}` : '';

    return (
      <div className="profile-list-item">
        {this.state.isModalOpen ? <Modal close={this.closeModal} name={name} uidHost={this.props.uid} uidGuest={data.uid} /> : null}

        <img src={`http://localhost:3000/${data.imageMain}`} alt="..." className="profile-list-item-picture" />

        <div className="list-item-details">

          <h5 className="list-item-name">
            <span className={`profile-status ${data.isOnline ? 'online' : ''}`} />
            {name}</h5>
          <p className="
          ">
            {age} {gender} {city} {seeking}
          </p>
        </div>
        <div className="list-item-buttons-container">
          <button><i className={`fas fa-heart my-icon ${this.state.isLike ? 'like' : 'not-like'}`} onClick={this.likeToggle} />
          </button>
          <button onClick={this.openModal}><i className="fas fa-gamepad open-modal-icon" /></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(ProfileListItem);





