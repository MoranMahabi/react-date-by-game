import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import AppRouter, { history } from './routers/AppRouter';
//import configureStore from './store/configureStore';
//import { startSetMatches } from './actions/matches';
//import { login, logout, startSetCompleteProfile } from './actions/auth';
//import 'normalize.css/normalize.css';
//import './styles/styles.scss';
//import 'react-dates/lib/css/_datepicker.css';
//import { firebase } from './firebase/firebase';

// const store = configureStore();
// const jsx = (
//   <Provider store={store}>
//     <AppRouter />
//   </Provider>
// );
// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('app'));
//     hasRendered = true;
//   }
// };

// export const App = () => {
//   return () => {
//     ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


//     fetch('http://localhost:3000/moran', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ moran: 'mahabi' }),
//       credentials: 'include'
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log(response.json());
//         }
//       }).then((res) => {
//         console.log(res.message)
//       });
//   };
// };

// ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


// fetch('http://localhost:3000/moran', {
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ moran: 'mahabi' }),
//   credentials: 'include'
// })
//   .then((response) => {
//     if (response.status === 200) {
//       console.log(response.json());
//     }
//   }).then((res) => {
//     console.log(res.message)
//   });

// export default App;


// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetCompleteProfile(user.uid)).then(() => {
//       renderApp();
//       if (history.location.pathname === '/') {
//         history.push('/matches');
//       }
//     });
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
