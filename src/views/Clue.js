import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Clue = (props) => {
    const history = useHistory();
    const { question, clue, dailyDouble } = props.location.state;
    const [toggleClue, setToggleClue] = useState(false);

    const toggleButton = () => {
        setToggleClue(!toggleClue);
    };

    const handleClick = () => {
        history.goBack();
    };

    return (
        <div>
            {dailyDouble ? <h2>Daily Double!</h2> : ''}
            {toggleClue ? <p>{clue}</p> : <p>{question}</p>}
            {toggleClue ? <button onClick={toggleButton}>Show Question</button> : <button onClick={toggleButton}>Show Clue</button>}
            <button onClick={handleClick}>Done</button>
        </div>
    );
};

export default Clue;
