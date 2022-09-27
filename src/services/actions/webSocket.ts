export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
}

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {
        orders: [];
        total: number
        totalToday: number;
    }
}


export interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
}

export interface IWsAuthConnectionStartAction {
    readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsAuthConnectionClosedAction {
    readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface IWsAuthConnectionSuccessAction {
    readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface IWsAuthConnectionErrorAction {
    readonly type: typeof WS_AUTH_CONNECTION_ERROR;
    readonly payload: string;
}

export type TWebSocketActions =
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction
    | IWsAuthConnectionStartAction
    | IWsAuthConnectionClosedAction
    | IWsAuthConnectionSuccessAction
    | IWsAuthConnectionErrorAction;


