export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaState {
    items: PizzaItem[],
    status: Status,
}

export type SearchPizzaParams = {
    category: string,
    sortBy: string,
    order: string,
    search: string,
    currentPage: string
}

export type PizzaItem = {
    id: string;
    imageUrl: string;
    price: number;
    title: string;
    types: number[];
    rating: number;
    sizes: number[];
}