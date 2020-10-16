import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/appContext';
import { useHistory, withRouter } from 'react-router-dom';

const Box = (props) => {
    const history = useHistory();
    const { state, dispatch } = useContext(AppContext);
    const { question, id, answer, title } = props;
    const [clue, setClue] = useState({
        question: '',
        answer: '',
        title: '',
        id: '',
    });
    const { isCategory, category, value, dailyDouble } = props;

    useEffect(() => {
        setClue({
            question: question,
            answer: answer,
            title: title,
            id: id,
            dailyDouble: dailyDouble,
        });
    }, [question, answer, title, id, dailyDouble]);

    const handleClick = (e) => {
        const { question, id, title, dailyDouble } = clue;
        dispatch({ type: 'answeredClues', payload: id });
        history.push({
            pathname: `/clue/${id}`,
            state: { question: question, clue: title, dailyDouble: dailyDouble },
        });
    };

    if (isCategory) {
        return <li className="category">{category}</li>;
    } else {
        return (
            <li onClick={handleClick} className={`clue ${state.answeredClues.includes(id) ? 'selected' : ''}`}>
                {value}
            </li>
        );
    }
};

export default withRouter(Box);
