import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});


export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};


export const startLogutProfile = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ uid: uid })
    }).then(() => {
      dispatch(startLogout());
    }).catch((e) => {
      console.log(e)
    });
  };
};


export const startAddProfile = (displayName) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ uid: uid, displayName: displayName })
    }).catch((e) => {
      console.log(e)
    });
  };
};

