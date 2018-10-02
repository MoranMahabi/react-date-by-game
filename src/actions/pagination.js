// SET_CURRENT
export const setCurrent = (current = 1) => ({
    type: 'SET_CURRENT',
    current
});

// SET_PAGE_SIZE
export const setPageSize = (pageSize = 9) => ({
    type: 'SET_PAGE_SIZE',
    pageSize
});

// SET_TOTAL
export const setTotal = (total = 9) => ({
    type: 'SET_TOTAL',
    total
});