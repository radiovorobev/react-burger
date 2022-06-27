import {  GET_INGREDIENTS,
					GET_INGREDIENTS_IN_CONSTRUCTOR,
					INGREDIENT_MODAL,
					INGREDIENT_MODAL_CLOSE,
					GET_ORDER_NUMBER,
					UPDATE_ORDER_NUMBER,
					SET_TOTAL_PRICE } from '../actions/actions';

const initialState = {
	ingredients: [],
	ingredientsInConstructor: [],
	currentIngredient: {},
	isIngredientModal: false,
	order: null,
	totalPrice: null,
}

export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return { ...state, ingredients: action.ingredients }
		}
		case GET_INGREDIENTS_IN_CONSTRUCTOR: {
			return console.log ('2');
		}
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		case INGREDIENT_MODAL_CLOSE: {
			return console.log ('4');
		}
		case GET_ORDER_NUMBER: {
			return { ...state, order: action.order }
		}
		case UPDATE_ORDER_NUMBER: {
			return console.log ('6');
		}
		case SET_TOTAL_PRICE: {
			return { ...state, totalPrice: action.totalPrice }
		}
		default: {
			return state;
		}
	}
}