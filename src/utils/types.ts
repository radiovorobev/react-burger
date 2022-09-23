import { store } from '../index';

export type RootState = ReturnType<typeof store.getState>;


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
}

export type TWebSocket = {
    type: string;
    error: undefined | string;
    wsConnectedAuth: boolean;
    wsConnected: boolean;
    orders: Array<TIngredient>;
    total: number;
    totalToday: number;
}

export type TUser = {
    name: string;
    email: string;
}