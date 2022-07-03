import { combineReducers } from 'redux';
import {ingredientsReducer} from "./ingredients";
import {modalReducer} from "./modal";
import {constructorReducer} from "./constructor";

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	modal: modalReducer,
	inConstructor: constructorReducer
})