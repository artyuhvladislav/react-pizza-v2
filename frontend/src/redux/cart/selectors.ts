import { RootState } from "../store";
import { TCartItem } from "./types";

export const cartSelector = ({ cart }: RootState) => cart;

export const cartItemSelector = (id: string) => ({ cart }: RootState) =>
    cart.items.find((obj: TCartItem) => obj.id === id);