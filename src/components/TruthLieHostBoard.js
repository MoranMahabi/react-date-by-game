import React from 'react';

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

    render() {
        return (
            <div>
                <div id="board" className="board-flex-container">
                    {this.state.board.players.length > 0 &&
                        <div>
                            {this.state.board.players[0].name}
                            <img src={`http://localhost:3000/${this.state.board.players[0].imageURL}`} />
                        </div>
                    }
                    {this.state.board.players.length > 1 &&
                        <div>
                            {this.state.board.players[1].name}
                            <img src={`http://localhost:3000/${this.state.board.players[1].imageURL}`} />
                        </div>
                    }
                </div>
                <div>
                    {this.state.board.players.length > 1 &&
                        <div>
                            {this.state.board.players[1].name} Score: {this.state.board.guestScore}
                        </div>
                    }
                </div>
                <div className="tdWrapper">
                    Truth Text:
                    <input type="text" onChange={this.truthTextHandler} value={this.state.truthText} />
                </div>
                <div className="tdWrapper">
                    Lie Text:
                    <input type="text" onChange={this.lieTextHandler} value={this.state.lieText} />
                </div>
                <div className="myUploadBtnContainer">
                    <button onClick={(e) => { this.props.finishTurnHost(this.state.truthText, this.state.lieText) }} className="btn btn-primary myBtn">Send</button>
                </div>
            </div>
        )
    }

    

    getBoardContent() {
        return fetch(`http://localhost:3000/truthLieGame/boardHostInfo/${this.props.gameID}`, { method: 'GET' })
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


