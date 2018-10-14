// Pagination Reducer

const paginationReducerDefaultState = {
    current: 1,
    pageSize: 6,
    total: 6
};

export default (state = paginationReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_CURRENT':
            return {
                ...state,
                current: action.current
            };
        case 'SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.pageSize
            };
        case 'SET_TOTAL':
            return {
                ...state,
                total: action.total
            };
        default:
            return state;
    }
};