import React from "react";
import '../style/concentrationModal.css';

export default class TriviaModal extends React.Component {
  constructor() {
    super();
    this.continueToChat = this.continueToChat.bind(this);
    this.notContinueToChat = this.notContinueToChat.bind(this);
  }

  continueToChat() {
    fetch(`http://localhost:3000/concentrationGame/addApprovedChat/${this.props.gameID}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.closeModal();
        }
      })
  }

  notContinueToChat() {

  }

  renderPlayers() {
    return this.props.players.map((player, i) => {
      return (
        <div key={player.name + i + '__'} className="trivia-player-modal-container">
          <div id="trivia-player-modal-wrapper">
            <img className="modal-player-container-picture" src={`http://localhost:3000/${player.imageURL}`} />
            <span className="concentration-modal-player-text">{player.name}</span>
            <span className="concentration-modal-player-text">{player.age}</span>
          </div>
        </div>)
    })
  }

  render() {
    return (
      <div className="concentration-modal-container">
        <div className="concentration-modal-wrapper-profile-item" />
        <div className="concentration-modal-content-profile-item">
          <div className="concentration-players-modal-container">

            {this.renderPlayers()}
          </div>
          <h1>Would you like to chat ?</h1>
          <div className="concentration-buttons-modal-container">
            <button className="btn concentration-game-button" onClick={this.continueToChat}>Yes</button>
            <button className="btn concentration-game-button" onClick={this.notContinueToChat}>No</button>
          </div>
        </div>
      </div>)
  }
}

