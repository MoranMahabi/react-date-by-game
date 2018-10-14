import React from "react";
import '../style/truthLieModal.css';

export default class TruthLieModal extends React.Component {
  constructor() {
    super();
    this.continueToChat = this.continueToChat.bind(this);
    this.notContinueToChat = this.notContinueToChat.bind(this);
  }

  continueToChat() {
    fetch(`http://localhost:3000/truthLieGame/addApprovedChat/${this.props.gameID}`, {
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
    this.props.closeModal();
  }

  renderPlayers() {
    return this.props.players.map((player, i) => {
      return (
        <div key={player.name + i + '__'} className="trivia-player-modal-container">
          <div id="truth-lie-player-modal-wrapper">
            <img className="truth-lie-modal-player-container-picture" alt="..." src={`http://localhost:3000/${player.imageURL}`}  />
            <span className="truth-lie-modal-player-text">{player.name}</span>
            <span className="truth-lie-modal-player-text">{player.age}</span>
          </div>
        </div>)
    })
  }

  render() {
    return (
      <div className="truth-lie-modal-container">
        <div className="truth-lie-modal-wrapper-profile-item" />
        <div className="truth-lie-modal-content-profile-item">
          <div className="truth-lie-players-modal-container">

            {this.renderPlayers()}
          </div>
          <h1>Score: {this.props.score} , Would you like to chat ?</h1>
          <div className="truth-lie-buttons-modal-container">
            <button className="btn truth-lie-game-button" onClick={this.continueToChat}>Yes</button>
            <button className="btn truth-lie-game-button" onClick={this.notContinueToChat}>No</button>
          </div>
        </div>
      </div>)
  }
}

