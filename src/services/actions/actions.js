import { checkResponse } from '../../utils/utilities';
import { baseUrl } from '../../utils/data';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_IN_CONSTRUCTOR = 'GET_INGREDIENTS_IN_CONSTRUCTOR';
export const INGREDIENT_MODAL = 'INGREDIENT_MODAL';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT = 'MOVE INGREDIENT';

export function getIngredients() {
	return function(dispatch) {
		fetch(`${baseUrl}/ingredients`)
			.then(checkResponse)
			.then(res => {
				dispatch({ type: GET_INGREDIENTS, ingredients: res.data});
			})
			.catch(error =>
				 console.log(error.message))
	}
}

export function getOrder(items) {
	return function (dispatch) {
	fetch(`${baseUrl}/orders`, {
		method: "POST",
		body: JSON.stringify({
			ingredients: items,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(checkResponse)
		.then(res => {
			if (res) {
				dispatch({type: GET_ORDER_NUMBER, order: res.order.number});
				console.log(res.order.number);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}
}