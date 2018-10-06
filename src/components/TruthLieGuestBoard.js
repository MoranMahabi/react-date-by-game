import React from 'react';

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

                <div className="myUploadBtnContainer">
                    {this.state.board.texts.length == 2 &&
                        <div>
                            <button onClick={(e) => { this.props.finishTurnGuest(this.state.board.texts[0].isTruth) }} className="btn btn-primary myBtn"> {this.state.board.texts[0].text}</button>
                            <button onClick={(e) => { this.props.finishTurnGuest(this.state.board.texts[1].isTruth) }} className="btn btn-primary myBtn"> {this.state.board.texts[1].text}</button>
                        </div>
                    }
                </div>
            </div>
        )
    }



    getBoardContent() {
        return fetch(`http://localhost:3000/truthLieGame/boardGuestInfo/${this.props.gameID}`, { method: 'GET' })
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


