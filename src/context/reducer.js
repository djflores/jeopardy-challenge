const reducer = (state, action) => {
    switch (action.type) {
        case 'reset':
            const initialState = {
                categories: [],
                clues: [],
                clueCount: 0,
                usedCategories: state.usedCategories,
                validBoard: false,
                dailyDouble: {
                    id: 0,
                    index: 0,
                },
                offset: state.offset,
                answeredClues: [],
                isLoading: true,
            };
            state = initialState;
            return { ...state, offset: state.offset + 100 };
        case 'setCategories':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case 'usedCategories':
            return {
                ...state,
                usedCategories: [...state.usedCategories, action.payload],
            };
        case 'setClues':
            return {
                ...state,
                clues: [...state.clues, action.payload],
            };
        case 'answeredClues':
            return {
                ...state,
                answeredClues: [...state.answeredClues, action.payload],
            };
        case 'clueCount':
            return { ...state, clueCount: action.payload };
        case 'isLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'dailyDouble':
            const { id } = state.categories[Math.floor(Math.random() * state.categories.length)];
            return {
                ...state,
                dailyDouble: {
                    id: id,
                    index: Math.floor(Math.random() * state.clueCount),
                },
            };
        default:
            return state;
    }
};

export default reducer;
