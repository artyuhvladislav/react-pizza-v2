import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params: SearchPizzaParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const url = `https://62b2b48920cad3685c9214cd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`;
    const { data } = await axios.get<PizzaItem[]>(url);
    return data as PizzaItem[];
});