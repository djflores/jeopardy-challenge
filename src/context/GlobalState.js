import React, { useReducer } from 'react';
import AppContext from './appContext';
import reducer from './reducer';

const AppState = (props) => {
    const initialState = {
        categories: [],
        clues: [],
        clueCount: 0,
        usedCategories: [],
        validBoard: false,
        dailyDouble: {
            id: 0,
            index: 0,
        },
        offset: 100,
        answeredClues: [],
        isLoading: true,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
};

export default AppState;
