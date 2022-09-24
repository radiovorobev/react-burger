import { checkResponse, getCookie } from '../../utils/utilities';
import { baseUrl } from '../../utils/data';
import { Dispatch } from 'redux';
import { AppDispatch, AppThunk, TIngredient } from '../../utils/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_IN_CONSTRUCTOR: 'GET_INGREDIENTS_IN_CONSTRUCTOR' = 'GET_INGREDIENTS_IN_CONSTRUCTOR';
export const INGREDIENT_MODAL: 'INGREDIENT_MODAL' = 'INGREDIENT_MODAL';
export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = 'GET_ORDER_NUMBER';
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR' = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const GET_CURRENT_ORDER: 'GET_CURRENT_ORDER' = 'GET_CURRENT_ORDER';
export const SET_ORDER_NUMBER: 'SET_ORDER_NUMBER' = 'SET_ORDER_NUMBER';

export interface IGetIngredientsAction {
	readonly type: typeof GET_INGREDIENTS;
	readonly ingredients: Array<TIngredient>;
}

export interface IGetIngredientsInConstructorAction {
	readonly type: typeof GET_INGREDIENTS_IN_CONSTRUCTOR;
	readonly ingredient: Array<TIngredient>;
}

export interface IIngredientModalAction {
	readonly type: typeof INGREDIENT_MODAL;
	readonly ingredient: TIngredient;
}

export interface IGetOrderNumberAction {
	readonly type: typeof GET_ORDER_NUMBER;
	readonly order: number;
}

export interface ISetTotalPriceAction {
	readonly type: typeof SET_TOTAL_PRICE;
	readonly totalPrice: number;
}

export interface IDelIngredientFromConstAction {
	readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
	readonly id: string;
}

export interface IMoveIngredientAction {
	readonly type: typeof MOVE_INGREDIENT;
	readonly dragIndex: number;
	readonly hoverIndex: number;
}

export interface IGetCurrentOrderAction {
	readonly type: typeof GET_CURRENT_ORDER;
	readonly order: number;
}

export interface ISetCurrentNumberAction {
	readonly type: typeof SET_ORDER_NUMBER;
	readonly order: number;
}

export type TBurgersActions =
	| IGetIngredientsAction
	| IGetIngredientsInConstructorAction
	| IIngredientModalAction
	| IGetOrderNumberAction
	| ISetTotalPriceAction
	| IDelIngredientFromConstAction
	| IMoveIngredientAction
	| IGetCurrentOrderAction
	| ISetCurrentNumberAction;

export const getIngredients: AppThunk = () => {
	return function (dispatch: AppDispatch) {
		fetch(`${baseUrl}/ingredients`)
			.then(checkResponse)
			.then(res => {
				dispatch({ type: GET_INGREDIENTS, ingredients: res.data});
			})
			.catch(error =>
				console.log(error.message))
	}
}

export const getOrder: AppThunk = (items: Array<TIngredient>) => {
	return function (dispatch: AppDispatch) {
	fetch(`${baseUrl}/orders`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			authorization: getCookie('token')
		} as HeadersInit,
		body: JSON.stringify({
			'ingredients': items
		})

	})
		.then(checkResponse)
		.then(res => {
			if (res) {
				dispatch({type: GET_ORDER_NUMBER, order: res.order.number});
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}
}

export function getCurrentOrder(number: number) {
	return function(dispatch: Dispatch) {
		fetch(`${baseUrl}/orders/${number}`)
			.then(checkResponse)
			.then(res => {
				if(res && res.success) {
					dispatch({type: GET_CURRENT_ORDER, order: res.orders[0]});
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}

