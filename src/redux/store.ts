import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizzas from './pizzas/slice';
import pizzaItem from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
    pizzaItem,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 