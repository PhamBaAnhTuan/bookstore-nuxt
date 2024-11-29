<script setup lang="tsx">
definePageMeta({
   layout: 'main',
});
// store
import { dataStore } from '../stores/dataStore';
import {
   ElButton,
   ElIcon,
   ElTag,
   ElTooltip,
   TableV2FixedDir,
} from 'element-plus';
// data
const bookList = dataStore().bookList;
// column
const data = ref(bookList);
const columns = [
   {
      key: 'id',
      dataKey: 'id',
      title: 'ID',
      width: 50,
      fixed: 'left',
      align: 'center',
      cellRenderer: ({ rowData }) => <ElTag>{rowData.id}</ElTag>,
   },
   {
      key: 'author',
      dataKey: 'author',
      title: 'Author',
      width: 200,
      cellRenderer: ({ rowData }) => <ElTag>{rowData.author}</ElTag>,
   },
   {
      key: 'title',
      dataKey: 'title',
      title: 'Book title',
      width: 200,
      cellRenderer: ({ rowData }) => <ElTag>{rowData.title}</ElTag>,
   },
   {
      key: 'price',
      dataKey: 'price',
      title: 'Price',
      width: 50,
      cellRenderer: ({ rowData }) => <ElTag>{rowData.price}</ElTag>,
   },
   {
      key: 'discount',
      dataKey: 'discount',
      title: '% Discount',
      width: 100,
      align: 'center',
      cellRenderer: ({ rowData }) => <ElTag>{rowData.discount}%</ElTag>,
   },
   {
      key: 'free_ship',
      dataKey: 'free_ship',
      title: 'Free ship',
      width: 150,
      align: 'center',
      cellRenderer: ({ rowData }) => <ElTag>{rowData.free_ship}</ElTag>,
   },
   {
      key: 'operations',
      title: 'Operations',
      width: 150,
      align: 'center',
      fixed: 'right',
      cellRenderer: ({ rowData }) => (
         <>
            <ElButton onClick={() => bookDetail(rowData)}
               size="small">
               Edit
            </ElButton>
            <ElButton size="small" type="danger">
               Delete
            </ElButton>
         </>
      ),
   },
]

const bookDetail = (book: any) => {
   navigateTo({
      path: '/updatebook',
      query: {id: book.id}
   });
};
</script>


<template>
   <div class="container">
      <el-table-v2
         :columns="columns"
         :data="data"
         :width="1000"
         :height="400"
         row-key="id"
         fixed
         class="table"
      />
   </div>
</template>


<style>
.container {
   display: flex;
   align-items: center;
}

.table {
   color: black;
}
</style>