import {defineStore} from "pinia";
import {ref} from "vue";
import {Item} from "../models/Item.ts";
import {useListStore} from "./list.ts";

export const useDialogStore = defineStore("dialog", () => {
    const dialogItem = ref<Item>(new Item({}));
    const visible = ref(false);
    const innerVisible = ref(false);
    const listStore = useListStore()
    const openDialog = (item: Item) => {
        dialogItem.value = item
        visible.value = true
    }
    const openInnerDialog = () => {
        innerVisible.value = true;
        listStore.countRemovingItemRectangle = null
    }
    const closeDialog = ()=>{
        if (!innerVisible.value){
            visible.value = false;
        }
    }
    const closeInnerDialog = ()=>{
        innerVisible.value = false;
    }
    return{
        visible,
        innerVisible,
        dialogItem,
        openDialog,
        openInnerDialog,
        closeDialog,
        closeInnerDialog
    }
})