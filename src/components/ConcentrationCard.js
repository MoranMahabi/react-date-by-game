import React from 'react';
import coverCardImage from '../images/card.png';
import '../style/concentrationCard.css';


const ConcentrationCardComp = (props) => {
    const onClick = (event) => {
        if (props.currentPlayerUID !== props.uid)
            return;

        props.cardClicked(props.card, props.cardKey);
    };

    return (
        <div className="concentration-card-container">
            {
                props.card.isFacingUP === true ?
                    <div>
                        <img src={`http://localhost:3000/${props.card.imageURL}`} alt="..." />
                    </div> :
                    <img src={coverCardImage} alt="..." className="disabled-regular"
                        style={(props.uid === props.currentPlayerUID) ? { cursor: "pointer" } : {}} onClick={(e) => onClick(e)} />
            }
        </div>
    )
};

export default ConcentrationCardComp;