import React from 'react';
import { Provider } from 'react-redux'; // Import Provider từ thư viện Redux
import store from './redux/store'; // Import store của bạn
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';

import RouterApp from './routes/RouterApp';
import './App.css';

function App() {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  return (
    <Provider store={store}>
      <div className='App'>
        <CssBaseline />
        <RouterApp />
      </div>
    </Provider>
  );
}

export default App;
