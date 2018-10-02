// //import uuid from 'uuid';
// import database from '../firebase/firebase';

// // ADD_PROFILE
// export const addProfile = (profile) => ({
//     type: 'ADD_PROFILE',
//     profile
// });

// export const startAddProfile = (profileData = {}) => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         const {
//             firstName = '',
//             lastName = '',
//             city = 0
//         } = profileData;
//         const profile = { firstName, lastName, city };

//         return database.ref(`profiles/${uid}`).push(profile).then((ref) => {
//             dispatch(addProfile({
//                 id: ref.key,
//                 ...profile
//             }));
//         });
//     };
// };



// // EDIT_PROFILE
// export const editProfile = (uid, updates) => ({
//     type: 'EDIT_PROFILE',
//     uid,
//     updates
// });

// export const startEditProfile = (updates) => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         return database.ref(`profile/${uid}`).update(updates).then(() => {
//             dispatch(editProfile(uid, updates));
//         });
//     };
// };

// // SET_EXPENSES
// export const setExpenses = (expenses) => ({
//     type: 'SET_EXPENSES',
//     expenses
// });

// export const startSetProfiles = () => {
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

//             dispatch(setExpenses(expenses));
//         });
//     };
// };
