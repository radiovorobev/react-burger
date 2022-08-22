import {
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	GET_INGREDIENTS_IN_CONSTRUCTOR,
	GET_ORDER_NUMBER, MOVE_INGREDIENT,
	SET_TOTAL_PRICE,
	GET_CURRENT_ORDER
} from '../actions/burgers';

const constructorState = {
	ingredientsInConstructor: [],
	order: null,
	totalPrice: null,
	currentOrder: false,
}

export const constructorReducer = (state = constructorState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_IN_CONSTRUCTOR: {
			return {...state, ingredientsInConstructor: action.ingredient}
		}
		case SET_TOTAL_PRICE: {
			return { ...state, totalPrice: action.totalPrice }
		}
		case GET_ORDER_NUMBER: {
			return { ...state, order: action.order }
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
		case GET_CURRENT_ORDER: {
			return {...state, currentOrder: action.order}
		}
		default: {
			return state;
		}
	}
}
