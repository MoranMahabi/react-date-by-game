import React from 'react';
import TriviaCardComp from './TriviaCard';
import '../style/triviaBoard.css';

export default class TiviaBoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            answer: "",
            board: {
                gameRunning: false,
                players: [], 
                isCardClicked: undefined,
                currentPlayerUID: undefined,
                cards: []
            },
        };

        this.getBoardContent = this.getBoardContent.bind(this);
    }

    componentDidMount() {
        this.getBoardContent();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.isCancelled = true;
    }

    answerHandler = (event) => {
        this.setState({ answer: event.target.value })
    }

    renderCards() {
        return this.state.board.cards.map(
            (card, i) => <TriviaCardComp
                key={i}
                cardKey={i}
                card={card}
                currentPlayerUID={this.state.board.currentPlayerUID}
                isCardClicked={this.state.board.isCardClicked}
                cardClicked={this.props.cardClicked}
                uid={this.props.uid}
            />
        )
    }

    getTurnClassName(index) {
        if (this.state.board.currentPlayerUID === this.state.board.players[index].uid) {
            return 'player-container';
        }

        return 'player-container notCurrentTurn';
    }

    render() {
        let isSendDisable = this.state.board.currentPlayerUID === this.props.uid && this.state.board.isCardClicked ? false : true;
        return (
            <div className="trivia-board-container">
                <div id="board" className="board-flex-container">
                    {this.state.board.players.length > 0 &&
                        <div ref="firstPlayer" className={this.getTurnClassName(0)}>
                            <span>{this.state.board.players[0].age}</span>
                            <span>{this.state.board.players[0].name}</span>
                            <img className="player-container-picture first-player" alt="..." src={`http://localhost:3000/${this.state.board.players[0].imageURL}`} />
                        </div>
                    }
                    <div className="trivia-board-center">
                        <textarea cols="50" rows="6" id="myTextArea" placeholder="Answer Here..." onChange={this.answerHandler}
                            value={this.state.answer} />
                        <div className="myUploadBtnContainer">
                            <button onClick={(e) => {
                                this.props.finishTurn(this.state.answer)
                            }} className={"btn btn-primary myBtn"} disabled={isSendDisable}>Send
                            </button>
                        </div>
                    </div>
                    {this.state.board.players.length > 1 &&
                        <div ref="secondPlayer" className={this.getTurnClassName(1)}>
                            <span>{this.state.board.players[1].age}</span>
                            <span>{this.state.board.players[1].name}</span>
                            <img className="player-container-picture second-player" alt="..." src={`http://localhost:3000/${this.state.board.players[1].imageURL}`} />
                        </div>
                    }
                </div>
                <div id="cards">
                    {this.renderCards()}
                </div>
            </div>
        )
    }

    getBoardContent() {
        return fetch(`http://localhost:3000/triviaGame/boardInfo/${this.props.gameID}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getBoardContent, 200);
                return response.json();
            })
            .then(boardInfo => {
                if (!this.isCancelled) {
                    this.setState(() => ({ board: boardInfo }));
                }
            })
            .catch(err => { throw err });
    }
}










