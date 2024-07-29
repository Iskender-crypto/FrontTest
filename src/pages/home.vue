<script setup lang="ts">
import { useListStore } from "../stores/list.ts";
import {onMounted, ref} from "vue";
import { Item } from "../models/Item.ts";
import {useDialogStore} from "../stores/dialog.ts";
import Dialogs from '../components/dialog.vue'

const listStore = useListStore();
const dialogStore = useDialogStore()

const grid = ref();
const dragElement = ref();
const dragElementValue = ref<Item>(new Item({}));

const elementsParent = ref();
const dragEndElement = ref<Item>(new Item({}));
const dragStart = (item: Item, e: any) => {
  if (item.positionId == 0) {
    e.preventDefault();
  } else {
    let index = listStore.items.findIndex((el) => el.id == item.id);
    dragElement.value.style.opacity = '1';
    dragElement.value.style.height = `${e.target.offsetHeight}px`;
    dragElement.value.style.width = `${e.target.offsetWidth}px`;
    dragElement.value.children[0].style.backgroundColor = `${item.color}`;
    dragElementValue.value = { ...item };
    listStore.items[index] = new Item({ id: item.id })
  }
};
const dragOver = (item: Item, e: any) => {
  if (window.innerWidth < 769){
    dragElement.value.style.top = `${e.clientY - grid.value.getBoundingClientRect().top}px`;
    dragElement.value.style.left = `${e.clientX}px`;
  }else{
    dragElement.value.style.top = `${e.clientY}px`;
    dragElement.value.style.left = `${e.clientX}px`;
  }
  dragEndElement.value = item;

  for (let i = 0; i < elementsParent.value.children.length; i++) {
    if (item.id-1 == i) {
      elementsParent.value.children[i].children[0].style.backgroundColor = '#4D4D4D'
    } else {
      elementsParent.value.children[i].children[0].style.backgroundColor = 'transparent'
    }
  }

};
const dragEnd = () => {
  let index = listStore.items.findIndex((el) => el.id == dragEndElement.value.id);
  if (dragEndElement.value.positionId==0){
    listStore.items[index] = { ...dragElementValue.value, id: dragEndElement.value.id, positionId: dragEndElement.value.id };
  }else{
    let changeElement = listStore.items[index]
    listStore.items[listStore.items.findIndex((el) => el.id == dragElementValue.value.id)] = { ...dragElementValue.value };
    listStore.items[index] = { ...dragElementValue.value };
    listStore.items[listStore.items.findIndex((el) => el.id == dragElementValue.value.id)] = changeElement
  }
  for (let i = 0; i < elementsParent.value.children.length; i++) {
    elementsParent.value.children[i].children[0].style.backgroundColor = 'transparent'
  }
  dragElement.value.style.opacity = "0";
  dragElement.value.style.top = "-1500px";
  dragElement.value.style.left = "-1500px";
  dragElementValue.value = new Item({});
  dragEndElement.value = new Item({});
  listStore.saveItems()


};
onMounted(()=>{
  let status = false;
  for (let i = 0; i < listStore.defaultItems.length; i++) {
    if(listStore.defaultItems[i].color!==''){
      status = true;
      break;
    }else{
      status = false;
    }
  }
  if (status){
    listStore.initItems();
  }
  listStore.getItems()
})

</script>

<template>
  <div class="app h-full md:h-screen">
    <div ref="dragElement" class="drag-element" >
      <div class="drag-element__rectangle"></div>
      <div class="drag-element__rectangle--glass"></div>
    </div>
    <div class="grid align-items-stretch h-full" ref="grid" >
      <div class="col-12 md:col-3" style="height: calc(100% - 87.45px)">
        <div class="card h-full overflow-hidden">
          <img src="/img/image.png" class="w-full mb-3 card__image" alt="">
          <div class="flex flex-column align-items-center">
            <Skeleton height="2rem"  class="mb-3"></Skeleton>
            <Skeleton  class="mb-3 w-9"></Skeleton>
            <Skeleton class="mb-3 w-11"></Skeleton>
            <Skeleton  class="mb-3 w-10"></Skeleton>
            <Skeleton  class="mb-3 w-9"></Skeleton>
            <Skeleton  class="w-5"></Skeleton>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-9">
        <div class="board h-18rem sm:h-30rem md:h-full w-full">

          <div class="line vertical-line vertical-line-1"></div>
          <div class="line vertical-line vertical-line-2"></div>
          <div class="line vertical-line vertical-line-3"></div>
          <div class="line vertical-line vertical-line-4"></div>

          <div class="line horizontal-line horizontal-line-1"></div>
          <div class="line horizontal-line horizontal-line-2"></div>
          <div class="line horizontal-line horizontal-line-3"></div>
          <div class="line horizontal-line horizontal-line-4"></div>


          <div class="card card--hidden h-full relative top-0 p-0 flex flex-wrap" ref="elementsParent">
            <div class="card__col" v-for="item in listStore.items">
              <div class="card__block"
                   @dragstart="dragStart(item, $event)"
                   @dragover="dragOver(item,$event)"
                   @dragend="dragEnd"
                   draggable="true"
                   :key="item.id"
              >
                <div class="card__rectangle" v-if="item.positionId!=0" :style="`background-color: ${item.color}`"
                     @click="dialogStore.openDialog(item)" ></div>
                <div class="card__rectangle--glass" v-if="item.positionId!=0"
                     @click="dialogStore.openDialog(item)"></div>
                <p class="card__rectangle-count" v-if="item.positionId!=0 && item.count>0">{{item.count}}</p>
              </div>
            </div>

            <Dialogs/>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card flex justify-content-between h-fit">
          <Skeleton height="3rem" ></Skeleton>
          <i class="pi pi-times text-white ml-4 cursor-pointer"></i>
        </div>
      </div>
    </div>
  </div>
</template>