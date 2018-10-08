import React from 'react';
import ConcentrationCardComp from './ConcentrationCard';

export default class ConcentrationBoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            board: {
                gameRunning: false,
                players: [],  // two players with name and image and uid (uid for current player css), todo: dummy
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
                <div id="cards">
                    {this.state.board.cards.map(
                        (card, i) => <ConcentrationCardComp
                            key={i}
                            cardKey={i}
                            card={card}
                            currentPlayerUID={this.state.board.currentPlayerUID}
                            cardClicked={this.props.cardClicked}
                            uid={this.props.uid}
                        />
                    )}
                </div>
            </div>
        )
    }

    getBoardContent() {
        return fetch(`http://localhost:3000/concentrationGame/boardInfo/${this.props.gameID}`, { method: 'GET' })
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


