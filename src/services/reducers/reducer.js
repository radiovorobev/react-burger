import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_IN_CONSTRUCTOR,
	INGREDIENT_MODAL,
	GET_ORDER_NUMBER,
	SET_TOTAL_PRICE, DELETE_INGREDIENT_FROM_CONSTRUCTOR, MOVE_INGREDIENT
} from '../actions/actions';

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
			return {...state, ingredientsInConstructor: action.ingredient}
		}
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		case GET_ORDER_NUMBER: {
			return { ...state, order: action.order }
		}
		case SET_TOTAL_PRICE: {
			return { ...state, totalPrice: action.totalPrice }
		}
		case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
				const array = [...state.ingredientsInConstructor];
				const ingredient = array.findIndex(item => item.id === action.id);
				array.splice(ingredient, 1);
			return { ...state, ingredientsInConstructor: array }
		}
		case MOVE_INGREDIENT: {
			const array = [...state.ingredientsInConstructor];
			const item = array[action.dragIndex]
			array[action.dragIndex] = array[action.hoverIndex];
			array[action.hoverIndex] = item;
			return { ...state, ingredientsInConstructor: array }
		}
		default: {
			return state;
		}
	}
}