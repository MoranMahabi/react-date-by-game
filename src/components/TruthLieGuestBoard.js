import React from 'react';
import '../style/truthLieGuestBoard.css';

export default class TruthLieGuestBoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            board: {
                players: [],
                guestScore: 0,
                gameRunning: false,
                currentPlayerUID: undefined,
                texts: [],
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


    getTurnClassName(index) {
        if (this.state.board.currentPlayerUID === this.state.board.players[index].uid) {
            return 'truth-lie-player-container';
        }

        return 'truth-lie-player-container truth-lie-notCurrentTurn';
    }


    render() {
        return (
            <div className="truth-lie-guest-board-container">
                <div id="truth-lie-guest-board">
                    {this.state.board.players.length > 0 &&
                        <div ref="firstPlayer" className={this.getTurnClassName(0)}>
                            <span>{this.state.board.players[0].age}</span>
                            <span>{this.state.board.players[0].name}</span>
                            <img className="truth-lie-guest-player-container-picture truth-lie-guest-first-player"
                               alt="..." src={`http://localhost:3000/${this.state.board.players[0].imageURL}`} />
                        </div>
                    }
                    {this.state.board.players.length > 1 &&
                        <div ref="secondPlayer" className={this.getTurnClassName(1)}>
                            <span>{this.state.board.players[1].age}</span>
                            <span>{this.state.board.players[1].name}</span>
                            <img className="truth-lie-guest-player-container-picture truth-lie-guest-second-player"
                               alt="..." src={`http://localhost:3000/${this.state.board.players[1].imageURL}`} />
                        </div>
                    }
                </div>
                <div>
                </div>
                <div id="truth-lie-guest-answers">
                    {this.state.board.texts.length === 2 &&
                        <div>
                            <button onClick={(e) => {
                                this.props.finishTurnGuest(this.state.board.texts[0].isTruth)
                            }} className="btn btn-primary myBtn truth-lie-guest-answer">{this.state.board.texts[0].text}</button>

                            <button onClick={(e) => {
                                this.props.finishTurnGuest(this.state.board.texts[1].isTruth)
                            }} className="btn btn-primary myBtn truth-lie-guest-answer"> {this.state.board.texts[1].text}</button>
                        </div>
                    }
                    {this.state.board.players.length > 1 &&
                        <div>
                            <div>
                                <span> Score: </span> <span>{this.state.board.guestScore}</span>
                            </div>
                            <div>
                                <span> Turn: </span> <span>{this.state.board.numberOfTurn}\{this.state.board.numberQuestions}</span>
                            </div>
                        </div>

                    }
                </div>
            </div>
        )
    }

    getBoardContent() {
        return fetch(`http://localhost:3000/truthLieGame/boardInfo/${this.props.gameID}`, { method: 'GET' })
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


