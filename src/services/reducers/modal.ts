import { INGREDIENT_MODAL } from '../actions/burgers';
import { Ingredient } from '../../utils/types';

const modalState = {
	currentIngredient: {},
}

export const modalReducer = (state = modalState, action: { ingredient: Ingredient; type: string; }) => {
	switch (action.type) {
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		default: {
			return state;
		}
	}
}