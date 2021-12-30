import { IBasketItem } from "../models/basket";
import { Product } from "../models/product";

export class ProductToBasketItemMapper  {
    public static map(item: Product, quantity: number): IBasketItem {
        return {
            id: item.id,
            productName: item.name,
            pictureUrl: item.pictureUrl,
            price: item.price,
            quantity,
            brand: item.productBrand,
            type: item.productType
        }
    }
}