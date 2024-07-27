<script setup lang="ts">
import {useDialogStore} from "../stores/dialog.ts";
import {useListStore} from "../stores/list.ts";

const dialogSrore = useDialogStore()
const listStore = useListStore()
</script>

<template>
  <div
      class="dialog hidden sm:block w-15rem h-full right-0 p-3"
      :class="{'translate-x-0': dialogSrore.visible, 'translate-x-100': !dialogSrore.visible}"
      style="backdrop-filter: blur(15px)"
  >
    <div class="flex justify-content-end w-full">
      <Button icon="pi pi-times text-white" text rounded aria-label="Filter" @click="dialogSrore.closeDialog"/>
    </div>
    <div class="dialog-block">
      <div class="dialog-block__rectangle" :style="`background-color: ${dialogSrore.dialogItem.color};`"></div>
      <div class="dialog-block__rectangle--glass" ></div>
    </div>
    <div class="flex flex-column align-items-center mt-auto">
      <Divider />
      <Skeleton  class="mb-4 h-2rem w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Divider class="mt-auto"/>
      <Button label="Удалить предмет" severity="danger" class="w-full " @click="dialogSrore.openInnerDialog()"/>
    </div>
  </div>
  <div class="dialog hidden sm:block inner-dialog my-inner-dialoag w-15rem w-full right-0 bottom-0 p-2"
       :class="{'translate-y-0': dialogSrore.innerVisible, 'translate-y-100': !dialogSrore.innerVisible}"
       style="backdrop-filter: blur(15px)"
  >
    <div class="flex">
      <InputNumber v-model="listStore.countRemovingItemRectangle"   class="mb-2 w-full" placeholder="Введите количество"/>
    </div>
    <div class="flex align-items-center column-gap-2">
      <Button label="Отмена" severity="secondary" class="w-5" @click="dialogSrore.closeInnerDialog"/>
      <Button label="Подтвердить" severity="danger" class="w-7" @click="listStore.deleteItemOfCount(dialogSrore.dialogItem)"/>
    </div>
  </div>
  <Dialog
      v-model:visible="dialogSrore.visible"
      position="right"
      :draggable="false"
      class="dialog block sm:hidden w-9 sm:w-15rem"
  >
    <div class="flex justify-content-end w-full">
      <Button icon="pi pi-times text-white" text rounded aria-label="Filter" @click="dialogSrore.closeDialog"/>
    </div>
    <div class="dialog-block">
      <div class="dialog-block__rectangle" :style="`background-color: ${dialogSrore.dialogItem.color};`"></div>
      <div class="dialog-block__rectangle--glass" ></div>
    </div>
    <div class="flex flex-column align-items-center mt-auto">
      <Divider />
      <Skeleton  class="mb-4 h-2rem w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Skeleton  class="mb-3  w-full"></Skeleton>
      <Divider class="mt-auto"/>
      <Button label="Удалить предмет" severity="danger" class="w-full " @click="dialogSrore.openInnerDialog"/>
    </div>
  </Dialog>
  <Dialog
      v-model:visible="dialogSrore.innerVisible"
      position="bottom"
      :draggable="false"
      class="dialog block sm:hidden inner-dialog w-9 sm:w-15rem"
  >
    <div class="flex">
      <InputNumber v-model="listStore.countRemovingItemRectangle"  class="mb-2 w-full" placeholder="Введите количество"/>
    </div>
    <div class="flex align-items-center column-gap-2">
      <Button label="Отмена" severity="secondary" class="w-5" @click="dialogSrore.closeInnerDialog"/>
      <Button label="Подтвердить" severity="danger" class="w-7" @click="listStore.deleteItemOfCount(dialogSrore.dialogItem)"/>
    </div>
  </Dialog>
</template>

<style scoped>

</style>