import { Dessert } from "./desserts.model";

export interface CartItem {
    product : Dessert;
    quantity : number;
}