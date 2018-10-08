import React from "react";
import Modal from './Modal';
import ProfileListItem from './ProfileListItem'
import '../style/chat.css';




export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      partnerProfile: {
        isLike: false,
        imageMain: 'uploads/profile.png',
        age: undefined,
        gender: "",
        city: "",
        displayName: ""
      },
      messages: []
    }
    this.getPartnerProfile();
    this.getMessages();
  }

  componentWillUnmount() {
    if (this.timeoutId1) {
      clearTimeout(this.timeoutId1);
    }

    if (this.timeoutId2) {
      clearTimeout(this.timeoutId2);
    }

    this.isCancelled = true;
  }


  getPartnerProfile = () => {
    return fetch(`http://localhost:3000/chat/getPartnerProfile/${this.props.match.params.id}/${this.props.match.params.uid}`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId2 = setTimeout(this.getPartnerProfile, 200);
        return response.json();
      })
      .then(res => {
        if (!this.isCancelled) {
          this.setState(() => ({ partnerProfile: res }));
        }
      })
      .catch(err => { throw err });
  }
  
  getMessages = () => {
    return fetch(`http://localhost:3000/chat/getChatMessages/${this.props.match.params.id}`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId1 = setTimeout(this.getMessages, 200);
        return response.json();
      })
      .then(res => {
        if (!this.isCancelled) {
          this.setState(() => ({ messages: res.messages }));
        }
      })
      .catch(err => { throw err });
  }


  // UI

  renderTitle() {
    return <div className="panel panel-default">
      <div className="panel-heading chat-title-container">
        <h1 className="panel-title chat-title">Chat</h1>
      </div>
    </div>
  }

  leftSection() {
    return <div className="col-md-3 chat-list-item">
      <ProfileListItem data={this.state.partnerProfile} />
    </div>
  }

  rightSection() {
    return <div className="col-md-8 chat-right-section">
      <div className="chat-box-container">
        <ul ref={r => this.ul = r}>
          {this.state.messages && this.buildList()
          }
        </ul>
      </div>
      {this.renderForm()}
    </div>
  }

  buildList() {
    return this.state.messages.map((message, i) => {
      return this.renderListItems(message, i)
    })
  }

  renderListItems(message, i) {
    return <li key={i} className="li-element">
      <div className="date-name-container">
        <span>{message.name}</span>
        <span>{message.date}</span>
      </div>
      <div>
        <span className="my-message">{message.message}</span>
      </div>
    </li>
  }

  renderForm() {
    return <form>
      <input type="text" className="chat-input" ref={r => this.inputField = r} />
      <button type="submit" onClick={this.onClick} className="btn btn-primary chat-button">Send</button>
    </form>
  }

  // Functionally

  likeToggle() {
    // send data to server to update like status
    this.setState({ isLike: !this.state.isLike });
  }

  onClick(event) {
    event.preventDefault();
    if (this.inputField.value) {
      fetch(`http://localhost:3000/chat/appendMessage/${this.props.match.params.id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          name: `${this.state.partnerProfile.displayName}`,
          date: this.getCurrentTime(),
          message: `${this.inputField.value}`
        })
      })
        .then((response) => {
          if (response.status === 200) {
            this.inputField.value = '';
            this.inputField.focus();
          }
        })
    }
  }

  getCurrentTime() {
    let time = new Date();
    return time;
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  //render

  render() {
    return (
      <div className="chat-container">
        <div className="container chat-wrapper">
          {this.renderTitle()}
          <section className="row chat-section">
            {this.leftSection()}
            {this.rightSection()}
          </section>
        </div>
      </div>

    )
  }
}


