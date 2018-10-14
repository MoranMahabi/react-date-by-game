import React from 'react';
import ConcentrationCardComp from './ConcentrationCard';
import '../style/concentrationBoard.css';

export default class ConcentrationBoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            board: {
                gameRunning: false,
                players: [],  
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


    getTurnClassName(index) {
        if(this.state.board.currentPlayerUID === this.state.board.players[index].uid) {
            return 'concentration-player-container';
        }  

        return 'concentration-player-container concentration-notCurrentTurn';
    }

    renderCards() {
        return this.state.board.cards.map(
            (card, i) => <ConcentrationCardComp
                key={i}
                cardKey={i}
                card={card}
                currentPlayerUID={this.state.board.currentPlayerUID}
                cardClicked={this.props.cardClicked}
                uid={this.props.uid}
            />
        )

    }

    render() {
        return (
            <div>
                <div className="concentration-board-container">
                    <div id="concentration-board" className="board-flex-container">

                        {this.state.board.players.length > 0 &&

                            <div ref="firstPlayer" className={this.getTurnClassName(0)}>
                                <span>{this.state.board.players[0].age}</span>
                                <span>{this.state.board.players[0].name}</span>
                                <img className="concentration-player-container-picture concentration-first-player"
                                    alt="..." src={`http://localhost:3000/${this.state.board.players[0].imageURL}`} />
                            </div>
                        }

                        {this.state.board.players.length > 1 &&
                            <div ref="secondPlayer" className={this.getTurnClassName(1)}>
                                <span>{this.state.board.players[1].age}</span>
                                <span>{this.state.board.players[1].name}</span>
                                <img className="concentration-player-container-picture concentration-second-player"
                                   alt="..." src={`http://localhost:3000/${this.state.board.players[1].imageURL}`} />
                            </div>
                        }
                    </div>
                    <div id="concentration-cards">
                        {this.renderCards()}
                    </div>
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


