// //import uuid from 'uuid';
// import database from '../firebase/firebase';

// // SET_MATCHES
// export const setMatches = (matches) => ({
//     type: 'SET_MATCHES',
//     matches
// });

// export const startSetMatches = () => {   //TODO: change logic (matches, like, dislike)
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
//             const expenses = [];

//             snapshot.forEach((childSnapshot) => {
//                 expenses.push({
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 });
//             });

//             dispatch(setMatches(expenses));
//         });
//     };
// };