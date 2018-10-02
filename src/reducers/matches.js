// Matches Reducer

const matchesReducerDefaultState = [];

export default (state = matchesReducerDefaultState, action) => {
  switch (action.type) { 
    case 'SET_MATCHES':
      return action.matches;
    default:
      return state;
  }
};
