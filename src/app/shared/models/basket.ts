import {v4 as uuid } from 'uuid';

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: IBasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
}

export class Basket implements IBasket{
    id: string = uuid();
    items: IBasketItem[] = [];
}

export interface IBasketTotal {
    shipping: number;
    subTotal: number;
    total: number;
}