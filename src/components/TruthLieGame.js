import React from 'react';
import TruthLieHostBoardComp from './TruthLieHostBoard';
import TruthLieGuestBoardComp from './TruthLieGuestBoard';
import TruthLieModal from './TruthLieModal';

export default class TruthLieGame extends React.Component {
    constructor(props, match) {
        super(props);  

        this.state = {
            showEndModal: false,
            uidHost: undefined,
            uidGuest: undefined,
            players: [],
            score: 0
        };

        this.finishTurnHost = this.finishTurnHost.bind(this);
        this.finishTurnGuest = this.finishTurnGuest.bind(this);
        this.hideEndModal = this.hideEndModal.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.getPlayersUID = this.getPlayersUID.bind(this);
    }

    componentDidMount() {
        this.finishGame();
        this.getPlayersUID();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.isCancelled = true;
    }

    getPlayersUID() {
        return fetch(`http://localhost:3000/truthLieGame/getPlayersUID/${this.props.match.params.id}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(playersUID => {
                if (!this.isCancelled) {
                    this.setState(() => ({ uidHost: playersUID.uidHost, uidGuest: playersUID.uidGuest }));
                }
            })
            .catch(err => { throw err });
    }

    finishGame() {
        return fetch(`http://localhost:3000/truthLieGame/finishGame/${this.props.match.params.id}`, { method: 'GET' })
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
                    this.setState(() => ({ showEndModal: true, players: res.players, score: res.score }));
                }
            })
            .catch(err => { throw err });
    }

    hideEndModal() {
        this.setState({ showEndModal: false });
    };

    finishTurnHost(truthText, lieText) {
        fetch(`http://localhost:3000/truthLieGame/finishTurnHost/${this.props.match.params.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:
                JSON.stringify({
                    truthText: truthText,
                    lieText: lieText
                })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState(this.state);
                }
            })
    }

    finishTurnGuest(isTruth) {
        fetch(`http://localhost:3000/truthLieGame/finishTurnGuest/${this.props.match.params.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:
                JSON.stringify({
                    isTruth: isTruth
                })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState(this.state);
                }
            })
    }

    render() {
        return (
            <div>
                {this.state.showEndModal && <TruthLieModal gameID={this.props.match.params.id} closeModal={this.hideEndModal} players={this.state.players} score={this.state.score} />}
                {this.props.match.params.uid === this.state.uidHost &&
                    <div>
                        <TruthLieHostBoardComp uid={this.props.match.params.uid} gameID={this.props.match.params.id} finishTurnHost={this.finishTurnHost} />
                    </div>
                }
                {this.props.match.params.uid === this.state.uidGuest &&
                    <div>
                        <TruthLieGuestBoardComp uid={this.props.match.params.uid} gameID={this.props.match.params.id} finishTurnGuest={this.finishTurnGuest} />
                    </div>
                }
            </div>
        )
    }
}