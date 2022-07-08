import { FORGOT_PWD, GET_USER, RESET_PWD, SIGNIN, SIGNOUT, UPDATE_USER } from '../actions/auth';

const authState = {
	user: {},
	auth: false,
	forgotPassword: false,
	resetPassword: false,
	signIn: false,
	signOut: false,
}

export const authReducer = (state = authState, action) => {
	switch(action.type) {
		case SIGNIN: {
			return {...state,
				user: action.user,
				auth: true,
				resetPassword: false }
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
				resetPassword: true }
		}
		case FORGOT_PWD: {
			return {...state,
				forgotPassword: true }
		}

		case GET_USER || UPDATE_USER: {
			return {...state,
				user: action.user,
				auth: true}
		}

		default: {
			return state;
		}
	}
}
