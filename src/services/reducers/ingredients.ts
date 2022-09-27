import {GET_INGREDIENTS, TBurgersActions} from '../actions/burgers';
import { TIngredient } from '../../utils/types';


type TIngredientsState = {
	ingredients: Array<TIngredient>;
}
const ingredientsState: TIngredientsState = {
	ingredients: [],
}

export const ingredientsReducer = (state = ingredientsState, action: TBurgersActions): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return { ...state, ingredients: action.ingredients }
		}
		default: {
			return state;
		}
	}
}