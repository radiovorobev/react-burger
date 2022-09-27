import { INGREDIENT_MODAL, TBurgersActions } from '../actions/burgers';
import { TIngredient } from '../../utils/types';

type TModalState = {
	currentIngredient: {} | TIngredient;
}
const modalState: TModalState = {
	currentIngredient: {},
}

export const modalReducer = (state = modalState, action: TBurgersActions):TModalState => {
	switch (action.type) {
		case INGREDIENT_MODAL: {
			return { ...state, currentIngredient: action.ingredient }
		}
		default: {
			return state;
		}
	}
}