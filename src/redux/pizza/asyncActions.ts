import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem } from "../pizzas/types";

export const fetchPizzaItem = createAsyncThunk('pizzaItem/fetchPizzaItem', async (id: string) => {
    const url = `https://62b2b48920cad3685c9214cd.mockapi.io/items/${id}`;
    const { data } = await axios.get<PizzaItem>(url);

    return data as PizzaItem;
});