import { baseUrl } from '../../utils/data';
import { checkResponse, getCookie } from '../../utils/utilities';

export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const RESET_PWD = 'RESET_PWD';
export const FORGOT_PWD = 'FORGOT_PWD';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ERROR_PWD = 'ERROR_PWD';
export const ERROR_LOGIN = 'ERROR_LOGIN';

export function signIn(data, url) {
	return function(dispatch) {
		fetch(`${baseUrl}/auth/${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

export function forgotPwd(data) {
	return function(dispatch) {
		fetch(`${baseUrl}/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

export function resetPwd(data) {
	return function(dispatch) {
		fetch(`${baseUrl}/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

function updateToken(token) {
	return function(dispatch) {
		fetch(`${baseUrl}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

export function getUser() {
	return function(dispatch) {
		dispatch({type: GET_USER});

		fetch(`${baseUrl}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: getCookie('token')
			},
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: GET_USER, user: res.user});
			})
			.catch(error => {
				if(error.message === 'jwt expired') {
					updateToken(localStorage.getItem('token'))
						.then(() => { dispatch(getUser()) })
				}
				console.log(error);
			})
	}
}

export function updateUser(data) {
	return function(dispatch) {
		dispatch({type: UPDATE_USER});

		fetch(`${baseUrl}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: getCookie('token')
			},
			body: JSON.stringify(data)
		})
			.then(checkResponse)
			.then(res => {
					dispatch({type: UPDATE_USER, user: res.user});
			})
			.catch(error => {
				if(error.message === 'jwt expired') {
					updateToken(localStorage.getItem('token'))
						.then(() => { dispatch(updateUser(data)) })
				}
				console.log(error);
			})
	}
}

export function signOut(token) {
	return function(dispatch) {
		dispatch({type: SIGNOUT})

		fetch(`${baseUrl}/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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
