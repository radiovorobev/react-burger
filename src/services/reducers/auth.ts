import { FORGOT_PWD,
		GET_USER,
		RESET_PWD,
		SIGNIN,
		SIGNOUT,
		UPDATE_USER,
		ERROR_PWD,
		ERROR_LOGIN } from '../actions/auth';
import { TUser } from '../../utils/types';

const authState = {
	user: {},
	auth: false,
	forgotPassword: false,
	resetPassword: false,
	signIn: false,
	signOut: false,
	errorPwd: '',
	errorLogin: '',
}


export const authReducer = (state = authState, action: {
	type: string;
	user: TUser;
	token: string;
	auth: boolean;
	forgotPassword: boolean;
	resetPassword: boolean;
	error: string;
	errorPwd: string;
	errorLogin: string;
		}) => {
	switch(action.type) {
		case SIGNIN: {
			return {...state,
				user: action.user,
				auth: true,
				resetPassword: false,
				errorLogin: '' }
		}

		case SIGNOUT: {
			return {...state,
				user: {},
				token: '',
				auth: false }
		}

		case RESET_PWD: {
			return {...state,
				forgotPassword: false,
				resetPassword: true,
				errorPwd: ''
				}
		}
		case FORGOT_PWD: {
			return {...state,
				forgotPassword: true }
		}

		case GET_USER || UPDATE_USER: {
			return {...state,
				user: action.user,
				auth: true }
		}

		case ERROR_PWD: {
			return {...state,
			errorPwd: action.error }
		}

		case ERROR_LOGIN: {
			return {...state,
				errorLogin: action.error }
		}

		default: {
			return state;
		}
	}
}
