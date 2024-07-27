import {defineStore} from "pinia";
import {Item} from "../models/Item.ts";

export const useLocalStorageStore = defineStore("localStorage", () => {
    const getItems= () =>  {
        return JSON.parse(localStorage.items)

    }
    const setItems = (items: Item[])=>{
        localStorage.setItem('items', JSON.stringify(items));
    }
    return{
        getItems,
        setItems
    }
})