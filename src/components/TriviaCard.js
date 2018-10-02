import React from 'react';
import ReactDOM from 'react-dom';
import coverCardImage from '../../../project/src/images/profile.png';


// key={i}
// cardKey={i}
// card={card}
// currentPlayerUID={this.state.board.currentPlayerUID}
// isCardClicked={this.stata.board.isCardClicked}
// cardClicked={this.props.cardClicked}
// uid={this.props.uid}

const TriviaCardComp = (props) => {
    const getFileName = (number, color, action) => {
    }

    const onClick = (event) => {
        if (props.currentPlayerUID != props.uid || props.isCardClicked == true)
            return;

        props.cardClicked(props.card, props.cardKey);
    };

    return (
        <div className="card-container">
            {
                props.card.owner != 1 ?
                    <div>
                        <div> Question: {props.card.question}</div>
                        <div> Answer: {props.card.answer}</div>
                        {props.card.owner == 2 && <div> Color: red </div>}
                        {props.card.owner == 3 && <div> Color: yellow </div>}
                    </div> :
                    <img src={coverCardImage} className="disabled-regular" style={(props.uid == props.currentPlayerUID && props.isCardClicked == false) ? { cursor: "pointer" } : {}} onClick={(e) => onClick(e)} />
            }
        </div>
    )
};

export default TriviaCardComp;