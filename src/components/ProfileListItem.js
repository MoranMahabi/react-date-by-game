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
    }
  }

  componentDidMount() {
    this.setState({isLike: this.props.data.isLike})
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  likeToggle() {
    // send data to server to update like status
    this.setState({isLike: !this.state.isLike});
  }

  render() {
    let {data} = this.props;

    // console.log("uid")
    // console.log(this.props.uid) //uidHost
    // console.log(data.uid)       //uidGuest

    const age = data.age ? `${data.age} years old` : '';
    const name = data.displayName ? data.displayName : '';
    const gender = data.gender ? data.gender.toLowerCase() : '';
    const city = data.city ? `from ${data.city}` : '';
    return (
      <div className="profile-list-item">
        {this.state.isModalOpen ? <Modal close={this.closeModal} name={name} uidHost={this.props.uid} uidGuest={data.uid}/> : null}

         <img src={`http://localhost:3000/${data.imageMain}`} alt="..." className="profile-list-item-picture" />
      
        <div className="list-item-details">

          <h5 className="list-item-name">
            <span className={`profile-status ${data.isOnline ? 'online' : ''}`}/>
            {name}</h5>
          <p className="details">
            {age} {gender} {city}
          </p>
        </div>
        <div className="list-item-buttons-container">
          <button><i className={`fas fa-heart my-icon ${this.state.isLike ? 'like' : 'not-like'}`} onClick={this.likeToggle}/>
          </button>
          <button onClick={this.openModal}><i className="fas fa-gamepad open-modal-icon"/></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(ProfileListItem);





