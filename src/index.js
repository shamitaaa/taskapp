import React from 'react';
import {createRoot} from 'react-dom'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './store/Reducers';
import App from './App';
import ReactDOM from 'react-dom/client';

// const store = configureStore({
//   reducer: taskReducer,
// });

// // createRoot(document.getElementById('root')).render(
// //   <Provider store={store}>
// //     <App />
// //   </Provider>
// // );

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <> {/**React Fragments just like div */}
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </>
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <App />

);