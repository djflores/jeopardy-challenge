import React, { useContext, useEffect } from 'react';
import AppContext from '../context/appContext';
import axios from 'axios';
import Box from '../components/Box';

const Board = (props) => {
    const { state, dispatch } = useContext(AppContext);
    const { categories, clues, dailyDouble, isLoading, offset, usedCategories } = state;
    const { categoryCount, clueCount } = props.location.state;
    let count = 0;

    useEffect(() => {
        if (state.categories.length <= 0 && state.clues.length <= 0) {
            fetchData();
        }
    });

    const fetchData = async () => {
        try {
            axios(`http://jservice.io/api/categories?count=${offset}`)
                .then(async (response) => {
                    response.data.map((item) => {
                        const { clues_count, id } = item;

                        if (clues_count >= clueCount && count <= categoryCount) {
                            if (usedCategories.includes(id)) {
                                return null;
                            }

                            dispatch({
                                type: 'setCategories',
                                payload: item,
                            });

                            dispatch({
                                type: 'usedCategories',
                                payload: id,
                            });

                            axios(`http://jservice.io/api/clues?category=${id}`).then((response) => {
                                dispatch({
                                    type: 'setClues',
                                    payload: response.data,
                                });

                                dispatch({
                                    type: 'dailyDouble',
                                    payload: Math.floor(Math.random() * clueCount),
                                });
                            });
                            count = count + 1;
                        }
                    });
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    dispatch({
                        type: 'isLoading',
                        payload: false,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    const resetBoard = () => {
        let reset = window.confirm('Are you sure you want to restart?');
        if (reset) {
            dispatch({ type: 'reset' });
            props.history.push({ pathname: '/' });
        }
    };

    return (
        <div className="Board">
            {isLoading ? (
                <h2>Creating...</h2>
            ) : (
                <React.Fragment>
                    <button onClick={resetBoard} className="reset-btn">
                        reset
                    </button>
                    <div className="board-container">
                        {categories.map((item, index) => {
                            const { id: categoryId } = item;
                            const clueArray = clues[index];

                            if (index < categoryCount && clueArray !== undefined) {
                                return (
                                    <ul key={`list-${index}`} className="list">
                                        {clueArray.map((key, index) => {
                                            const { value, question, answer, category, id } = key;
                                            const { title } = category;
                                            const selected = state.answeredClues.includes(id);
                                            const isDD = dailyDouble.id === categoryId && dailyDouble.index === index ? true : false;
                                            if (index === 0) {
                                                return (
                                                    <>
                                                        <Box category={title} className="category" isCategory={true} key={`category-${index}`} />
                                                        <Box id={id} value={value} question={question} answer={answer} title={title} selected={selected} dailyDouble={isDD} key={`clue-${index}`} />
                                                    </>
                                                );
                                            }

                                            if (index < props.location.state.clueCount) {
                                                return <Box id={id} value={value} question={question} answer={answer} title={title} selected={selected} dailyDouble={isDD} key={`clue-${index}`} />;
                                            }
                                        })}
                                    </ul>
                                );
                            } else {
                                return '';
                            }
                        })}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Board;
