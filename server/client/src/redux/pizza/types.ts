import { PizzaItem } from "../pizzas/types";

export interface PizzaItemState {
    item: PizzaItem,
    status: 'loading' | 'success' | 'error',
}