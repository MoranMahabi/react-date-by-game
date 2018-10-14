import React from 'react';
import ConcentrationBoardComp from './ConcentrationBoard';
import ConcentrationBoardModal from './ConcentrationModal';


export default class ConcentrationGame extends React.Component {
    constructor(props, match) {
        super(props);  

        this.state = {
            showEndModal: false,
            players: []
        };

        this.cardClicked = this.cardClicked.bind(this);
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
        return fetch(`http://localhost:3000/concentrationGame/finishGame/${this.props.match.params.id}`, { method: 'GET' })
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
                    this.setState(() => ({ showEndModal: true, players: res.players }));
                }
            })
            .catch(err => { throw err });
    }

    hideEndModal() {
        this.setState({ showEndModal: false });
    };


    cardClicked(card, cardKey) {
        fetch(`http://localhost:3000/concentrationGame/cardClicked/${this.props.match.params.id}`, {
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
                {this.state.showEndModal && <ConcentrationBoardModal closeModal={this.hideEndModal} gameID={this.props.match.params.id} players={this.state.players} />}
                <ConcentrationBoardComp uid={this.props.match.params.uid} gameID={this.props.match.params.id} cardClicked={this.cardClicked} />
            </div>
        )
    }
}