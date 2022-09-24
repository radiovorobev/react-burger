import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {compose, legacy_createStore as createStore, applyMiddleware, ActionCreator, Action} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './services/reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {
    WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "./services/actions/webSocket";
import {RootState} from "./utils/types";
import {TBurgersActions} from "./services/actions/burgers";
const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
}

const wsActionsAuth = {
    wsInit: WS_AUTH_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_AUTH_CONNECTION_SUCCESS,
    onClose: WS_AUTH_CONNECTION_CLOSED,
    onError: WS_AUTH_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
}
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

//const enhancer = composeEnhancers(applyMiddleware(thunk));

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(wsUrl, wsActionsAuth)
));

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
