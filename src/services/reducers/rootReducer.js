import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';
import { authReducer } from './auth';
import {wsReducer} from "./webSocket";

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	modals: modalReducer,
	inConstructor: constructorReducer,
	auth: authReducer,
	socket: wsReducer,
})