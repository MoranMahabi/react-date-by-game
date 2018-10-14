import React from 'react';
import TriviaBoardComp from './TriviaBoard';
import TriviaModal from './TriviaModal';


export default class TriviaGame extends React.Component {
    constructor(props, match) {
        super(props);  

        this.state = {
            showEndModal: false,
            lastCardClicked: undefined,
            cards: [],
            players: []
        };

        this.cardClicked = this.cardClicked.bind(this);
        this.finishTurn = this.finishTurn.bind(this);
        this.hideEndModal = this.hideEndModal.bind(this);
        this.finishGame = this.finishGame.bind(this);
    }

    componentDidMount() {
        this.finishGame();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.isCancelled = true;
    }



    finishGame() {
        return fetch(`http://localhost:3000/triviaGame/finishGame/${this.props.match.params.id}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.finishGame, 200);
                return response.json();
            })
            .then(res => {
                if (res.finishGame === true && !this.isCancelled) {
                    clearTimeout(this.timeoutId);
                }
                return res;
            })
            .then(res => {
                if (res.finishGame === true && !this.isCancelled) {
                    this.setState(() => ({ showEndModal: true, players: res.players, cards: res.cards }));
                }
            })
            .catch(err => { throw err });
    }

    hideEndModal() {
        this.setState({ showEndModal: false });
    };


    finishTurn(answer) {
        fetch(`http://localhost:3000/triviaGame/finishTurn/${this.props.match.params.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:
                JSON.stringify({
                    answer: answer,
                    cardIndex: this.state.lastCardClicked
                })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState(this.state);  
                }
            })
    }

    cardClicked(card, cardKey) {
        fetch(`http://localhost:3000/triviaGame/cardClicked/${this.props.match.params.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ cardIndex: cardKey })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ lastCardClicked: cardKey });
                }
            })
    }

    render() {
        return (
            <div>
                {this.state.showEndModal && <TriviaModal closeModal={this.hideEndModal} cards={this.state.cards} players={this.state.players} gameID={this.props.match.params.id} />}
                <TriviaBoardComp uid={this.props.match.params.uid} gameID={this.props.match.params.id} cardClicked={this.cardClicked} finishTurn={this.finishTurn} />
            </div>
        )
    }
}