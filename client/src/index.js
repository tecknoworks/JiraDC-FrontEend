import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

// Style
import './index.css';
import * as serviceWorker from './serviceWorker';

// Material Imports
import { ConfirmProvider } from 'material-ui-confirm';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

// App Component
import App from './App';

// Main reducer
import rootReducer from './reducers';

// Redux Store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Matrial UI theme
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(249, 104, 84)',
    },
    secondary: {
      main: '#34a8eb',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <App />
        </ConfirmProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();