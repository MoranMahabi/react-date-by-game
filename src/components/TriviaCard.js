import React from 'react';
import coverCardImage from '../images/card.png';
import '../style/triviaCard.css';

const TriviaCardComp = (props) => {
    const onClick = (event) => {
        if (props.currentPlayerUID !== props.uid || props.isCardClicked === true)
            return;

        props.cardClicked(props.card, props.cardKey);
    };


    const renderQuestionAnswer = (card) => {
        return <div><span className="card-question"> <b>Question:</b> {card.question}</span><br /> <br />
            <span className="card-answer"><b>Answer:</b> {card.answer}</span></div>
    }

    return (
        <div className="card-container">
            {
                props.card.owner !== 1 ?
                    // reviled card
                    <div className={`card-wrapper ${props.card.owner === 2 ? 'owned-first-player' : 'owned-second-player'}`}>
                        {renderQuestionAnswer(props.card)}
                    </div>
                    :
                    // unreviled card
                    <img src={coverCardImage} alt="..." className="disabled-regular"
                        style={(props.uid === props.currentPlayerUID && props.isCardClicked === false) ? { cursor: "pointer" } : {}}
                        onClick={(e) => onClick(e)} />
            }
        </div>
    )
};

export default TriviaCardComp;