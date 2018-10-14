import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../style/bootstrap.min.css'
import '../style/myProfile.css';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.gender = ['Male', 'Female'];

    this.state = {
      displayName: '',
      gender: '',
      seeking: '',
      age: '',
      city: '',
      imageMain: '',
      imageList: [],
      error: '',
      message: ''
    };

    this.getProfileDetails()
  }

  getProfileDetails() {
    this.fetchProfileDetails()
      .then(profileDetails => { this.setState({ ...this.state, ...profileDetails, error: '', message: '' }) })
      .catch(err => { throw err; });
  }

  fetchProfileDetails() {
    return fetch(`http://localhost:3000/users/profileDetails/${this.props.uid}`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  }

  // Handlers

  fileSelectedProfilePictureHandler = (event) => {
    const f = event.target.files[0];
    if (f === undefined)
      return;
    const fd = new FormData();
    const uid = this.props.uid;
    fd.append('image', f, f.name);
    fd.append('uid', uid);
    axios.post('http://localhost:3000/upload/changeProfileImage', fd)
      .then(res => { this.getProfileDetails(); })
      .catch((e) => { console.log(e) })
  }

  addPhotoHandler = (event) => {
    console.log("aaaaaaaaaaaaaaaaa")
    const f = event.target.files[0];
    if (f === undefined)  {
      console.log("undefined photo")
      return;
    } 

    const fd = new FormData();
    const uid = this.props.uid;
    fd.append('image', f, f.name);
    fd.append('uid', uid);
    console.log(f.name)
    axios.post('http://localhost:3000/upload/add', fd)
      .then(res => { this.getProfileDetails(); })
      .catch((e) => { console.log(e) })
  }

  changeGenderHandler = (event) => {
    this.setState({ gender: event.target.value, error: '', message: '' })
  }

  changeSeekHandler = (event) => {
    this.setState({ seeking: event.target.value, error: '', message: '' })
  }

  changeAgeHandler = (event) => {
    this.setState({ age: event.target.value, error: '', message: '' })
  }

  changeCityHandler = (event) => {
    console.log("change city  " + event.target.value)
    this.setState({ city: event.target.value, error: '', message: '' })
  }

  displayNameHandler = (event) => {
    this.setState({ displayName: event.target.value, error: '', message: '' })
  }

  cityHandler = (event) => {
    this.setState({ city: event.target.value, error: '', message: '' })
  }

  saveChanges = (e) => {

    e.preventDefault();

    if (!this.state.displayName || this.state.displayName === 'Display Name') {
      this.setState(() => ({ error: 'Please provide display name.', message: '' }));
    } else {
      this.setState(() => ({ error: '', message: 'save!' }));
      this.props.onSubmit({
        displayName: this.state.displayName,
        gender: this.state.gender,
        seeking: this.state.seeking,
        age: this.state.age,
        city: this.state.city
      });
    }
  }
 
  deleteImage = (event) => {
    fetch('http://localhost:3000/upload/remove', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:
        JSON.stringify({
          uid: this.props.uid,
          image: event.target.getAttribute('urltodelete')
        })
    }).then(res => { this.getProfileDetails(); })
      .catch(err => {
        throw err;
      });;
  }

  // renders
  printTable() {
    return <table className="profile-fields">
      <tbody>
        <tr>
          <th>Display Name</th>
          <td>
            <div className="tdWrapper">
              <input type="text" onChange={this.displayNameHandler} value={this.state.displayName} />
            </div>
          </td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>
            <div className="tdWrapperDropdown">
              <span> {this.state.gender === '' ? 'Gender' : this.state.gender}  </span>
              <select defaultValue="" onChange={this.changeGenderHandler}>
                <option value="" key="Gender">Gender</option>
                {this.renderGender()}
              </select></div>
          </td>
        </tr>
        <tr>
          <th>Seeking</th>
          <td>
            <div className="tdWrapperDropdown">
              <span>{this.state.seeking === '' ? 'Seeking' : this.state.seeking}</span>
              <select defaultValue="" onChange={this.changeSeekHandler}>
                <option value="" key="Seeking">Seeking</option>
                {this.renderGender()}
              </select></div>
          </td>
        </tr>
        <tr>
          <th>Age</th>
          <td>
            <div className="tdWrapperDropdown">
              <span>{this.state.age === '' || this.state.age == null ? 'Age' : this.state.age}</span>
              <select defaultValue="" onChange={this.changeAgeHandler}>
                <option value="" key="Age">Age</option>
                {this.ageOptionsBuilder()}
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>City</th>
          <td>
            <div className="tdWrapperDropdown">
              <span>{this.state.city === '' || this.state.city == null ? 'Living Area' : this.state.city}</span>
              <select defaultValue="" onChange={this.changeCityHandler}>
                <option value="" key="Living Area">Living Area</option>
                {this.cityOptionsBuilder()}
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  }


  cityOptionsBuilder() {
    let arr = [ 'Jerusalem', 'Northern', 'Haifa',  'Central', 'Tel Aviv',  'Southern', 'Judea and Samaria Area'];
   
    return arr.map((city, i) => {
      return <option key={city} value={`${city}`}>{city}</option>
    })
  }

  ageOptionsBuilder() {
    let arr = [];
    for (let i = 18; i < 100; i++) {
      arr.push(i);
    }
    return arr.map((age, i) => {
      return <option key={age + i} value={`${age}`}>{age}</option>
    })
  }

  renderTitle() {
    return <div className="panel panel-default">
      <div className="panel-heading myTitleContainer">
        <h1 className="panel-title myTitle">Profile</h1>
      </div>
    </div>
  }

  renderGender() {
    return this.gender.map((gender, i) => {
      return <option value={`${gender}`} key={gender + i}>{gender}</option>
    })
  }

  rightSection() {

    return <div className="col-md-4 rightSection">
      <div className="photos">
        <h4>Photos
          <input type="file" style={{ display: 'none' }} onChange={this.addPhotoHandler}
            ref={addPhoto => this.addPhoto = addPhoto} />
          <button onClick={() =>{ console.log("button click");this.addPhoto.click()}}>+</button>
        </h4>
        <div className="photos-content">

          {this.printImages()}

        </div>
      </div>
    </div>
  }

  printImages() {
    return this.state.imageList.length ? this.state.imageList.map((image, i) => {
      return <div className="photo-item" key={image + i}>
        <img src={`http://localhost:3000/${image}`} alt="..." />
        <div className="row photo-item-buttons">
          <div className="xSign">
            <button urltodelete={`${image}`} onClick={this.deleteImage}>X</button>
          </div>
        </div>
      </div>
    }) : null
  }

  formDetails() {
    return <div className="formDetails col-md-4">
      <div className="section-title">

        <h2>My Profile</h2>
      </div>
      {this.printTable()}
      <div className="myUploadBtnContainer">
        <button onClick={this.saveChanges} className="btn btn-primary myBtn">Save Changes</button>
      </div>
      {this.state.error && <p>{this.state.error}</p>}
      {this.state.message && <p>{this.state.message}</p>}
    </div>
  }

  leftSection() {
    return <div className="col-md-3 leftSection">

      <div className="myBox">
        <img src={`http://localhost:3000/${this.state.imageMain}`}
          alt="..." className="profile-picture" />
        <div className="caption myUploadBtnContainer">

          <input type="file" onChange={this.fileSelectedProfilePictureHandler}
            ref={changePP => this.changeProfilePicBtn = changePP} style={{ display: 'none' }} />
          <button className="btn btn-primary myBtn" onClick={() => this.changeProfilePicBtn.click()}>
            <span>Change Photo</span>
          </button>
        </div>
      </div>


      <div style={{ display: 'none' }} className="listOfAccountLinksContainer">
        <ul>
          <li>
            <a href="#My Profile">My Profile</a>
          </li>
          <li>
            <a href="My Membership">My Membership</a>
          </li>
          <li>
            <a href="My Settings">My Settings</a>
          </li>
          <li>
            <a href="https://demo.themex.co/lovestory/messages/4">My Messages</a>
          </li>
        </ul>
      </div>

    </div>
  }

  render() {
    return (
      <div className="myContainer">
        <div className="container containerr">

          {this.renderTitle()}
          <section className="row mySection">

            {this.leftSection()}


            {this.formDetails()}


            {this.rightSection()}

          </section>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(ProfileForm);