import { RootState } from "../store";

export const cartSelector = ({ cart }: RootState) => cart;

export const cartItemSelector = (id: string) => ({ cart }: RootState) =>
    cart.items.find((obj: any) => obj.id === id);