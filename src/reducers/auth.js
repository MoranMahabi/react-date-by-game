// Auth Reducer

const authReducerDefaultState = {
  uid: null
};

export default (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

