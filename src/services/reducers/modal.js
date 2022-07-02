import { INGREDIENT_MODAL } from '../actions/actions';

const modalState = {
	currentIngredient: {},
}

export const modalReducer = (state = modalState, action) => {
	switch (action.type) {
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		default: {
			return state;
		}
	}
}