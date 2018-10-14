import React from 'react';
import '../style/truthLieHostBoard.css';

export default class TruthLieHostBoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            truthText: "",
            lieText: "",
            board: {
                players: [],
                guestScore: 0,
                gameRunning: false,
                currentPlayerUID: undefined
            },
        };

        this.getBoardContent = this.getBoardContent.bind(this);
    }

    componentDidMount() {
        this.getBoardContent();
    }

    truthTextHandler = (event) => {
        this.setState({ truthText: event.target.value })
    }

    lieTextHandler = (event) => {
        this.setState({ lieText: event.target.value })
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
            <div className="truth-lie-board-container">
                <div id="truth-lie-board">
                    {this.state.board.players.length > 0 &&
                        <div ref="firstPlayer" className={this.getTurnClassName(0)}>
                            <span>{this.state.board.players[0].age}</span>
                            <span>{this.state.board.players[0].name}</span>
                            <img className="truth-lie-player-container-picture truth-lie-first-player"
                                alt="..." src={`http://localhost:3000/${this.state.board.players[0].imageURL}`} />
                        </div>
                    }
                    {this.state.board.players.length > 1 &&
                        <div ref="secondPlayer" className={this.getTurnClassName(1)}>
                            <span>{this.state.board.players[1].age}</span>
                            <span>{this.state.board.players[1].name}</span>
                            <img className="truth-lie-player-container-picture truth-lie-second-player"
                                alt="..." src={`http://localhost:3000/${this.state.board.players[1].imageURL}`} />
                        </div>
                    }
                </div>
                <div id="truth-lie-inputs">
                    <div>
                        <textarea className="truth-lie-textarea" onChange={this.truthTextHandler} value={this.state.truthText} placeholder={'Truth Text'} />
                    </div>
                    <div>
                        <textarea className="truth-lie-textarea" onChange={this.lieTextHandler} value={this.state.lieText} placeholder={'Lie Text'} />
                    </div>
                    <div className="truth-lie-button-container">
                        <button onClick={(e) => {
                            this.props.finishTurnHost(this.state.truthText, this.state.lieText)
                        }} className="btn btn-primary myBtn truth-lie-btn">Send
                        </button>

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


