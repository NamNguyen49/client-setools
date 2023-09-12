import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import SigninPage from './pages/SigninPage';
import RouterApp from './routes/RouterApp.js';

function App() {
  return (
    <>
      {/* <CssBaseline />
      <SigninPage /> */}
      <RouterApp />
    </>
  );
}

export default App;
