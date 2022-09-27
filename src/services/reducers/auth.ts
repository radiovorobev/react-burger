import {
	FORGOT_PWD,
	GET_USER,
	RESET_PWD,
	SIGNIN,
	SIGNOUT,
	UPDATE_USER,
	ERROR_PWD,
	ERROR_LOGIN, TAuthActions
} from '../actions/auth';
import { TUser } from '../../utils/types';

type TAuthState = {
	user: TUser;
	auth: boolean;
	forgotPassword: boolean;
	resetPassword: boolean;
	signIn: boolean;
	signOut: boolean;
	errorPwd: string;
	errorLogin: string;
	token: string;
}

const authState: TAuthState = {
	user: { name: '', email: '' },
	auth: false,
	forgotPassword: false,
	resetPassword: false,
	signIn: false,
	signOut: false,
	errorPwd: '',
	errorLogin: '',
	token: '',
}


export const authReducer = (state = authState, action: TAuthActions):TAuthState => {
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
				user: { name: '', email:'' },
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
