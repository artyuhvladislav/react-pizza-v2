import { TCartItem } from '../redux/cart/types';

export const getCartItemsFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    totalPrice,
    items,
  };
};

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
