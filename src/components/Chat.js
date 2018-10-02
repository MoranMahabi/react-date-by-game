import React from "react";
import Modal from './Modal';

import './Chat.css';

let dataFromProps = {
  name: 'Israel i',
  age: 25,
  isMale: true,
  city: 'tel aviv',
  isOnline: true,
  isLike: true,
  image: 'https://www.bme.cornell.edu/engineering/customcf/iws_ai_faculty_display/ai_images/caa238-profile.jpg'
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isLike: false,
      isModalOpen: false,
      messages: [{name: 'roi', date: '10:00:00', message: 'hi'}]

    }
  }

  componentDidMount() {
    if (dataFromProps.image) { // should be this.props.data.image
      this.image.style.backgroundImage = `url(${dataFromProps.image})`;
    }
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
    const name = dataFromProps.name ? dataFromProps.name : '';
    return <div className="col-md-3 chat-list-item">
      <div className="chat-list-item-picture" ref={r => this.image = r}/>
      <div className="chat-item-details">
        <h5 className="chat-list-item-name">
          <span className={`chat-profile-status ${dataFromProps.isOnline ? 'chat-online' : ''}`}/>
          {name}</h5>
      </div>
      <div className="chat-item-buttons-container">
        <button><i className={`fas fa-heart chat-my-icon ${this.state.isLike ? 'chat-like' : 'chat-not-like'}  `}
                   onClick={this.likeToggle}/>
        </button>
        <button onClick={this.openModal}><i className="fas fa-gamepad open-modal-icon"/></button>
      </div>
    </div>
  }

  rightSection() {
    return  <div className="col-md-8 chat-right-section">
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
      <input type="text" className="chat-input" ref={r => this.inputField = r}/>
      <button type="submit" onClick={this.onClick} className="btn btn-primary chat-button">Send</button>
    </form>
  }

  // Functionally

  likeToggle() {
    // send data to server to update like status
    this.setState({isLike: !this.state.isLike});
  }

  onClick(event) {
    event.preventDefault();
    if (this.inputField.value) {
      let newMessage = {
        name: `${dataFromProps.name}`,
        date: `${this.getCurrentTime()}`,
        message: `${this.inputField.value}`
      };
      let newMessages = [...this.state.messages];
      newMessages.push(newMessage);
      this.setState({messages: newMessages}, () => this.inputField.value = '', this.inputField.focus());
    }
  }

  getCurrentTime() {
    let time = new Date();
    return ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  //render

  render() {
    const name = dataFromProps.name ? dataFromProps.name : '';

    return (
      <div className="chat-container">
        {this.state.isModalOpen ? <Modal close={this.closeModal} name={name}/> : null}

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


