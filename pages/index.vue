<script setup>
import { dataStore } from '@/stores/dataStore';
import axios from 'axios';
// Icons
import { ElCard, ElButton } from 'element-plus';

definePageMeta({
   layout: 'main'
})

const bookList = computed(() => dataStore().bookList)

const getBookList = dataStore().getBookList;
</script>

<template>
   <div class="card-container">
      <el-card
         shadow="hover"
         class="card-item"
         v-if="bookList"
         v-for="(item, index) in bookList"
         :key="index"
      >
         <img
            :src="item.img || 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg'"
            alt="Card Image"
            class="card-image"
         />
         <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">
               {{ item.author || "Pham Ba Anh Tuan" }}
            </p>

         </div>

         <div class="price-container">
            <el-badge
               class="price"
               type="primary"
            >
               <el-button size="small">{{ item.price }}$</el-button>
            </el-badge>
            <el-badge
               class="freeship"
               type="success"
            >
               <el-button size="small">{{ item.discount }}%</el-button>
            </el-badge>
         </div>
      </el-card>

      <el-button
         v-else
         type="primary"
         size="large"
         style="width: 20%;"
         @click="getBookList"
         :loading="isLoading"
      >
         Get book
      </el-button>
   </div>
</template>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

.card-container {
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
   justify-content: center;
   padding: 20px;
}

.card-item {
   display: flex;
   height: 300px;
   width: 250px;
   padding: 5px;
   justify-content: center;
   /* margin: 10px; */
   border-radius: 10px;
   background: var(--el-color-primary-light-9);
   color: var(--el-color-primary);
}

.card-item:hover {
   background-color: #09e4C1;
   transform: scale(1.03);
   transition: color 0.5s ease-in-out;
}

.card-item:active {
   transform: scale(1);
   transition: color 0.5s ease-in-out;
}

.card-image {
   width: 100%;
   height: 150px;
   object-fit: cover;
   border-radius: 10px;
   /* padding: 5px; */
}

.card-content {
   /* padding: 15px; */
   /* text-align: center; */
}

.card-title {
   font-size: 19px;
   margin: 10px 0 0;
   color: black;
}

.card-description {
   font-size: 14px;
   color: #666;
   margin-bottom: 15px;
   text-align: justify;
}


.price-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.price {
   margin-top: 10px;
}

.freeship {
   margin-top: 10px;
}
</style>
