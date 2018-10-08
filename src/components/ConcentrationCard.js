import React from 'react';
import ReactDOM from 'react-dom';
import coverCardImage from '../../../project/src/images/profile.png';


// key={i}
// cardKey={i}
// card={card}
// currentPlayerUID={this.state.board.currentPlayerUID}
// cardClicked={this.props.cardClicked}
// uid={this.props.uid}

const ConcentrationCardComp = (props) => {
    const getFileName = (number, color, action) => {
    }

    const onClick = (event) => {
        if (props.currentPlayerUID != props.uid)
            return;

        props.cardClicked(props.card, props.cardKey);
    };

    return (
        <div className="card-container">
            {
                props.card.isFacingUP == true ?
                    <div>
                        <img src={`http://localhost:3000/${props.card.imageURL}`} />
                    </div> :
                    <img src={coverCardImage} className="disabled-regular" style={(props.uid == props.currentPlayerUID) ? { cursor: "pointer" } : {}} onClick={(e) => onClick(e)} />
            }
        </div>
    )
};

export default ConcentrationCardComp;