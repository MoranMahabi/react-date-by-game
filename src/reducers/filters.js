// Filters Reducer

const filtersReducerDefaultState = {
    city: undefined,
    from: undefined,
    to: undefined,
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                city: action.city,
                from: action.from,
                to: action.to
            };
        default:
            return state;
    }
};
