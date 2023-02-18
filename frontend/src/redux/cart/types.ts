export interface CartState {
    totalPrice: number
    items: TCartItem[]
}

export type TCartItem = {
    count: number;
    id: string;
    imageUrl: string;
    price: number;
    title: string;
    type: string;
}