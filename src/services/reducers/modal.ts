import { INGREDIENT_MODAL } from '../actions/burgers';
import { TIngredient } from '../../utils/types';

const modalState = {
	currentIngredient: {},
}

export const modalReducer = (state = modalState, action: { ingredient: TIngredient; type: string; }) => {
	switch (action.type) {
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		default: {
			return state;
		}
	}
}