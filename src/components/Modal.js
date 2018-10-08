import React from "react";
import '../style/modal.css';

export default class Modal extends React.Component {
  constructor() {
    super();

  }

  handleInviteTrivaGame = (event) => {
    fetch('http://localhost:3000/triviaGame/createGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:
        JSON.stringify({
          uidHost: this.props.uidHost,
          uidGuest: this.props.uidGuest
        })
    }).then(res => { this.props.close(); })
      .catch(err => {
        throw err;
      });;
  }

  handleInviteConcentrationGame = (event) => {
    fetch('http://localhost:3000/concentrationGame/createGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:
        JSON.stringify({
          uidHost: this.props.uidHost,
          uidGuest: this.props.uidGuest
        })
    }).then(res => { this.props.close(); })
      .catch(err => {
        throw err;
      });;
  }

  playGame(event) {

    console.log('do something', event.target);
  }
  render() {
    return (
      <div className="modal-container">
        <div className="modal-wrapper-profile-item" onClick={() => this.close()} />
        <div>
          <div className="modal-content-profile-item">
            <h1>{this.props.name ? `${this.props.name} wants to play` : ''}</h1>
            <div>
              <button className="btn game-button" onClick={this.handleInviteTrivaGame}>Trivia Game</button>
              <button className="btn game-button" onClick={this.handleInviteConcentrationGame}>Concentration Game</button>
              <button className="btn game-button" onClick={this.playGame}>Game 3</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

