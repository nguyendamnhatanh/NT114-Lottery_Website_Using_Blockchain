// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import {App, App2} from './components/index'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/'>
//             <Route index element={<App></App>}></Route> 
//             <Route path='app2' element={<App2></App2>}></Route> {/* App2 in different route can use App Data without nesting App2 in App1*/}
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App'

import './index.css'
import './assets/styles/Confetti.scss'
import './assets/styles/CountDownTimer.scss'


import { store } from './redux/store'
import { Provider } from 'react-redux'
import { StateContextProvider } from './context';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <StateContextProvider>
            <Provider store={store}>
              <CssBaseline />
              <App />
            </Provider>
          </StateContextProvider>
        </ThemeProvider>
      </React.StrictMode>

    </BrowserRouter>
  </ThirdwebProvider>

)



