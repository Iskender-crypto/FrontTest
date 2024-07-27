import {defineStore} from "pinia";
import {ref} from "vue";
import {Item} from "../models/Item.ts";
import {useLocalStorageStore} from "./localStorage.ts";
import {useDialogStore} from "./dialog.ts";

export const useListStore = defineStore("list", () => {
    const localStorageStore = useLocalStorageStore()
    const dialogStore = useDialogStore()
    const defaultItems = ref<Item[]>([
        {"id": 1, "color": "#7FAA65", "positionId": 1, "count": 1}, {
        "id": 2,
        "color": "#AA9765",
        "positionId": 2,
        "count": 3
    }, {"id": 3, "color": "#656CAA", "positionId": 3, "count": 2}, {
        "id": 4,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 5, "color": "", "positionId": 0, "count": 0}, {
        "id": 6,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 7, "color": "", "positionId": 0, "count": 0}, {
        "id": 8,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 9, "color": "", "positionId": 0, "count": 0}, {
        "id": 10,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 11, "color": "", "positionId": 0, "count": 0}, {
        "id": 12,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 13, "color": "", "positionId": 0, "count": 0}, {
        "id": 14,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 15, "color": "", "positionId": 0, "count": 0}, {
        "id": 16,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 17, "color": "", "positionId": 0, "count": 0}, {
        "id": 18,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 19, "color": "", "positionId": 0, "count": 0}, {
        "id": 20,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 21, "color": "", "positionId": 0, "count": 0}, {
        "id": 22,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 23, "color": "", "positionId": 0, "count": 0}, {
        "id": 24,
        "color": "",
        "positionId": 0,
        "count": 0
    }, {"id": 25, "color": "", "positionId": 0, "count": 0}])
    const items = ref<Item[]>([])
    const countRemovingItemRectangle = ref();

    const initItems = () => {
        localStorageStore.setItems(defaultItems.value)
    }
    const getItems = () => {
        items.value = localStorageStore.getItems()
    }
    const deleteItemOfCount = (item: Item) => {
        console.log(item)
        let index = items.value.findIndex(el => el.id == item.id)
        if (items.value[index].count - countRemovingItemRectangle.value > 0) {
            items.value[index].count -= countRemovingItemRectangle.value
        } else {
            items.value[index] = new Item({id:item.id})
        }
        dialogStore.visible = false;
        dialogStore.innerVisible = false;
        saveItems()
    }
    const saveItems = () => {
        localStorageStore.setItems(items.value)
    }
    return {
        items,
        defaultItems,
        getItems,
        saveItems,
        initItems,
        deleteItemOfCount,
        countRemovingItemRectangle
    }
})