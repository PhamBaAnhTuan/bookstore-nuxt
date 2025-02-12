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
const bookList = computed(() => dataStore().bookList)
// actions
const deleteBookAction = dataStore().deleteBook;
// column
const data:any = ref(bookList);
const columns:any = [
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
      cellRenderer: ({ rowData }) => <ElTag>{rowData.price}$</ElTag>,
   },
   {
      key: 'discount',
      dataKey: 'discount',
      title: 'Discount',
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
      cellRenderer: ({ rowData }) => <ElTag>{rowData.free_ship ? "Free ship" : "No"}</ElTag>,
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
            <ElButton onClick={() => deleteBook(rowData)}
               size="small"
               type="danger">
               Delete
            </ElButton>
         </>
      ),
   },
]
// update book
const bookDetail = (book: any) => {
   navigateTo({
      path: '/updatebook',
      query: { id: book.id }
   });
};
// add book
const addBook = () => {
   navigateTo({
      path: '/addbook'
   });
};
// delete book method
const deleteBook = async (book: any) => {
   try {
      // Show confirmation dialog
      await ElMessageBox.confirm(
         `Are you sure you want to delete "${book.title}"?`,
         'Confirm Delete',
         {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
         }
      );

      // If user confirms, delete the book
      await deleteBookAction(book.id);

      // Show success message
      ElMessage({
         type: 'success',
         message: 'Book deleted successfully!',
      });
   } catch (error) {
      // Handle when user cancels
      ElMessage({
         type: 'info',
         message: 'Delete canceled',
      });
   }
};
</script>


<template>
   <h1 class="title">BOOK LIST</h1>
   <div class="container">
      <el-table-v2
         :columns="columns"
         :data="data"
         :height="450"
         :width="1100"
         row-key="id"
         fixed
         class="table"
      />
   </div>
   <el-button
      type="success"
      size="large"
      class="add-btn"
      @click="addBook"
   >Add book</el-button>
</template>


<style>
.container {
   display: flex;
   align-items: center;
}

.table {
   color: black;
}

.title {
   text-align: center;
   margin: 20px 0;
   color: 'white';
}

.add-btn {
   position: absolute;
   bottom: 50px;
   right: 220px;
}
</style>