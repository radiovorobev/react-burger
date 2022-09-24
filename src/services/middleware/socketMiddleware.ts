import { Middleware } from 'redux';
import {
	WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_ERROR,
	WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_SUCCESS,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
	WS_SEND_MESSAGE
} from '../actions/webSocket';

export type TWebSocketActions = {
	wsInit: typeof WS_CONNECTION_START,
	wsSendMessage: typeof WS_SEND_MESSAGE,
	onOpen: typeof WS_CONNECTION_SUCCESS,
	onClose: typeof WS_CONNECTION_CLOSED,
	onError: typeof WS_CONNECTION_ERROR,
	onMessage: typeof WS_GET_MESSAGE
}

export type TWebSocketAuthActions = {
	wsInit: typeof WS_AUTH_CONNECTION_START,
	wsSendMessage: typeof WS_SEND_MESSAGE,
	onOpen: typeof WS_AUTH_CONNECTION_SUCCESS,
	onClose: typeof WS_AUTH_CONNECTION_CLOSED,
	onError: typeof WS_AUTH_CONNECTION_ERROR,
	onMessage: typeof WS_GET_MESSAGE
}

export const socketMiddleware = (wsUrl: string, wsActions: TWebSocketActions | TWebSocketAuthActions): Middleware => {
	return store => {
		let socket: null | WebSocket = null;

		return next => action => {
			const { dispatch, getState } = store;
			const { type, payload } = action;

			if (type === wsActions.wsInit) {
				socket = new WebSocket(`${wsUrl}${payload}`);
			}
			if (socket) {

				socket.onopen = event => {
					dispatch({ type: wsActions.onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: wsActions.onError, payload: event });
				};

				socket.onmessage = event => {
					const data = JSON.parse(event.data);
					dispatch({ type: wsActions.onMessage, payload: data });
				};

				socket.onclose = event => {
					dispatch({ type: wsActions.onClose, payload: event });
				};

				if (type === wsActions.wsSendMessage) {
					const message = payload;
					socket.send(JSON.stringify(message));
				}

				if (type === wsActions.onClose) {
					socket.close();
				}
			}

			next(action);
		};
	};
};