import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App'

import './index.css'
import './assets/styles/Confetti.scss'
import './assets/styles/CountDownTimer.scss'
import './assets/styles/LuckyNumberInput.scss'

import { Provider } from 'react-redux'
import { StateContextProvider } from './context';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

{/* <Provider store={store}>
</Provider> */}
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider>
    <StateContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </StateContextProvider>
  </ThirdwebProvider>

)



