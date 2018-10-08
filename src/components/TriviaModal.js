import React from "react";
import '../style/triviaModal.css';

export default class TriviaModal extends React.Component {
  constructor() {
    super();
    this.continueToChat = this.continueToChat.bind(this);
    this.notContinueToChat = this.notContinueToChat.bind(this);
  }


  renderCards(cards) {
    return cards.map((card, i) => {
      return (
        <div key={card.answer + i} className="question-answer-modal-container">
          <span><b>Q:</b> {card.question}</span>
          <span><b>A:</b> {card.answer}</span>
        </div>
      )
    })
  }

  continueToChat() {
    // do something here
  }
  notContinueToChat() {
    // do something here
  }

  renderPlayers() {
    let firstPlayerCards = this.props.cards.filter(c => c.owner === 2);
    let secondPlayerCards = this.props.cards.filter(c => c.owner === 3);
    return this.props.players.map((player, i) => {
      return (
        <div key={player.name + i + '__'} className="trivia-player-modal-container">
          <div id="trivia-player-modal-wrapper">
            <img className="modal-player-container-picture" src={player.imageURL}/>
            <span className="modal-player-text">{player.name}</span>
            <span className="modal-player-text">{player.age}</span>
          </div>
          {i === 0 ? this.renderCards(firstPlayerCards) : this.renderCards(secondPlayerCards)}
        </div>)
    })
  }

  render() {
    return (
      <div className="trivia-modal-container">
        <div className="trivia-modal-wrapper-profile-item"/>
        <div className="trivia-modal-content-profile-item">
          <div className="trivia-players-modal-container">

            {this.renderPlayers()}
          </div>
          <h1>Would you like to chat ?</h1>
          <div className="buttons-modal-container">
            <button className="btn trivia-game-button" onClick={this.continueToChat}>Yes</button>
            <button className="btn trivia-game-button" onClick={this.notContinueToChat}>No</button>
          </div>
        </div>
      </div>)
  }
}

