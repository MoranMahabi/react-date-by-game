import React from 'react';
import ReactDOM from 'react-dom';
import TriviaBoardComp from './TriviaBoard';


export default class TriviaGame extends React.Component {
    constructor(props, match) {
        super(props);  //prps: user uid, match game id

        // user id - uid - this.props.match.params.uid
        // game id - id  - this.props.match.params.id

        this.state = {
            showEndModal: false,
            lastCardClicked: undefined
        };

        this.cardClicked = this.cardClicked.bind(this);
        this.finishTurn = this.finishTurn.bind(this);
        this.hideEndModal = this.hideEndModal.bind(this);
        this.finishGame = this.finishGame.bind(this);
        //this.withdraw = this.withdraw.bind(this);
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
                if (res.finishGame == true && !this.isCancelled) {
                    this.setState(() => ({ showEndModal: true }));
                }
            })
            .catch(err => { throw err });
    }

    hideEndModal() {
        this.setState({
            showEndModal: false
        }, () => {
            this.props.userWithdraw();
        });
    };

    // withdraw() {
    // 	if (this.timeoutId1) {
    // 		clearTimeout(this.timeoutId1);
    // 	}

    // 	if (this.timeoutId2) {
    // 		clearTimeout(this.timeoutId2);
    // 	}

    // 	this.props.userWithdraw();
    // }

    finishTurn(answer) {
        console.log("4yy4ye")
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
                    this.setState(this.state);  //???????
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
                <TriviaBoardComp uid={this.props.match.params.uid} gameID={this.props.match.params.id} cardClicked={this.cardClicked} finishTurn={this.finishTurn} />
            </div>
        )
    }
}