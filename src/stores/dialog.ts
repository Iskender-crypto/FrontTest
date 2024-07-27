import {defineStore} from "pinia";
import {ref} from "vue";
import {Item} from "../models/Item.ts";

export const useDialogStore = defineStore("dialog", () => {
    const dialogItem = ref<Item>(new Item({}));
    const visible = ref(false);
    const innerVisible = ref(false);
    const openDialog = (item: Item) => {
        dialogItem.value = item
        visible.value = true
    }
    const openInnerDialog = () => {
        innerVisible.value = true;
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