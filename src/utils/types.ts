import { store } from '../index';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgersActions } from '../services/actions/burgers';
import { TWebSocketActions } from '../services/actions/webSocket';
import { TAuthActions } from '../services/actions/auth';
import {
    TypedUseSelectorHook, useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;

export type TAppActions = TBurgersActions | TWebSocketActions | TAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TAppActions>
    >;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    id: string;
    count: number;
}

export type TUser = {
    name: string;
    email: string;
}

export type TOrder = {
    _id: string;
    ingredients: string[];
    name: string;
    number: number;
    owner: string;
    status: string;
    updateAt: string;
    __v: number;
    createdAt: string;
}

export interface IIngredientInConstructor {
    item: TIngredient;
    id: string;
}

export interface IIngredientsInConstructor extends Array<IIngredientInConstructor>{}

