import {GET_INGREDIENTS} from "../actions/actions";

const ingredientsState = {
	ingredients: [],
}

export const ingredientsReducer = (state = ingredientsState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return { ...state, ingredients: action.ingredients }
		}
		default: {
			return state;
		}
	}
}