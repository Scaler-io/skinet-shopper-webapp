import { MetaData } from "./MetaData";

export interface IDeliveryMethod {
    id: number;
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
    metaData: MetaData
}

