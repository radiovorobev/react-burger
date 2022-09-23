import { GET_INGREDIENTS } from '../actions/burgers';
import { TIngredient } from '../../utils/types';


type TIngredientState = {
	ingredients: Array<TIngredient>;
}
const ingredientsState: TIngredientState = {
	ingredients: [],
}

export const ingredientsReducer = (state = ingredientsState, action: { type: string; ingredients: Array<TIngredient> }) => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return { ...state, ingredients: action.ingredients }
		}
		default: {
			return state;
		}
	}
}