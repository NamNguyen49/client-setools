// import { createStore, combineReducers } from 'redux';
// import authReducer from './authActions';

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// const store = createStore(rootReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReduce';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Thêm các reducers khác nếu cần
    },
});

export default store;