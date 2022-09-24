import { baseUrl } from '../../utils/data';
import { checkResponse, getCookie } from '../../utils/utilities';
import { AppDispatch, AppThunk, TUser} from '../../utils/types';


export const SIGNIN: 'SIGNIN' = 'SIGNIN';
export const SIGNOUT: 'SIGNOUT' = 'SIGNOUT';
export const RESET_PWD: 'RESET_PWD' = 'RESET_PWD';
export const FORGOT_PWD: 'FORGOT_PWD' = 'FORGOT_PWD';
export const GET_USER: 'GET_USER' = 'GET_USER';
export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';
export const ERROR_PWD: 'ERROR_PWD' = 'ERROR_PWD';
export const ERROR_LOGIN: 'ERROR_LOGIN' = 'ERROR_LOGIN';

export interface ISignInAction {
	readonly type: typeof SIGNIN;
	readonly user: TUser;
}

export interface ISignOutAction {
	readonly type: typeof SIGNOUT;
}

export interface IResetPwdAction {
	readonly type: typeof RESET_PWD;
}

export interface IForgotPwdAction {
	readonly type: typeof FORGOT_PWD;
}

export interface IGetUserAction {
	readonly type: typeof GET_USER;
	readonly user: TUser;
}

export interface IUpdateUserAction {
	readonly type: typeof UPDATE_USER;
	readonly user: TUser;
}

export interface IErrorPwdAction {
	readonly type: typeof ERROR_PWD;
	readonly error: string;
}

export interface IErrorLoginAction {
	readonly type: typeof ERROR_LOGIN;
	readonly error: string;
}

export type TAuthActions =
	| ISignInAction
	| ISignOutAction
	| IResetPwdAction
	| IForgotPwdAction
	| IGetUserAction
	| IUpdateUserAction
	| IErrorPwdAction
	| IErrorLoginAction;

export const signIn: AppThunk = (data, url) => {
	return function(dispatch: AppDispatch) {
		fetch(`${baseUrl}/auth/${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			} as HeadersInit,
			body: JSON.stringify(data)
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: SIGNIN, user: res.user});
					localStorage.setItem('token', res.refreshToken);
					document.cookie = `token=${res.accessToken}`;

			})
			.catch(error => {
				dispatch({type: ERROR_LOGIN, error: error});
				console.log(error);
			})
	}
}

export const forgotPwd: AppThunk = (data) => {
	return function(dispatch: AppDispatch) {
		fetch(`${baseUrl}/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			} as HeadersInit,
			body: JSON.stringify(data)
		})
			.then(checkResponse)
			.then(res => {
				dispatch({type: FORGOT_PWD});
			})
			.catch(error => {
				console.log(error);
			})
	}
}

export const resetPwd: AppThunk = (data) => {
	return function(dispatch: AppDispatch) {
		fetch(`${baseUrl}/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			} as HeadersInit,
			body: JSON.stringify(data)
		})
			.then(checkResponse)
			.then(res => {
				dispatch({type: RESET_PWD});
			})
			.catch(error => {
				dispatch({type: ERROR_PWD, error: error});
			})
	}
}

const updateToken: AppThunk = (token) => {
	return function(dispatch: AppDispatch) {
		fetch(`${baseUrl}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			} as HeadersInit,
			body: JSON.stringify({token})
		})
			.then(checkResponse)
			.then(res => {
				if (res && res.success) {
					localStorage.setItem('token', res.refreshToken);
					document.cookie = `token=${res.accessToken}`;
				}
			})
			.catch(error => {
				console.log(error);
			})
	}
}

export const getUser: AppThunk = () => {
	return function(dispatch: AppDispatch) {
		//dispatch({type: GET_USER});

		fetch(`${baseUrl}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: getCookie('token')
			} as HeadersInit,
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: GET_USER, user: res.user});
			})
			.catch(error => {
				if(error.message === 'jwt expired') {
					updateToken(localStorage.getItem('token'))
						//.then(() => { dispatch(getUser()) })
				}
				console.log(error);
			})
	}
}

export const updateUser: AppThunk = (data) => {
	return function(dispatch: AppDispatch) {

		fetch(`${baseUrl}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: getCookie('token')
			} as HeadersInit,
			body: JSON.stringify(data)
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: UPDATE_USER, user: res.user});
			})
			.catch(error => {
				if(error.message === 'jwt expired') {
					updateToken(localStorage.getItem('token'))
						//.then(() => { dispatch(updateUser(data)) })
				}
				console.log(error);
			})
	}
}

export const signOut: AppThunk = (token) => {
	return function(dispatch: AppDispatch) {

		fetch(`${baseUrl}/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			} as HeadersInit,
			body: JSON.stringify({token})
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: SIGNOUT});
					localStorage.removeItem('token');
					document.cookie = `token=; max-age=-1`;
			})
			.catch(error => {
				console.log(error);
			})
	}
}
