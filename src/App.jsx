import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import SigninPage from './pages/SigninPage';
import RouterApp from './routes/RouterApp.js';
import './App.css'
function App() {
  return (
    <div className='App'>

      <RouterApp />
    </div>
  );
}

export default App;
