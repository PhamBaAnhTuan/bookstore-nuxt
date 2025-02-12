<script setup>
definePageMeta({
   layout: 'main'
})
import { dataStore } from '../stores/dataStore';

// books
const bookList = dataStore().bookList;
const isLoading = computed(() => dataStore().isLoading);
const addBookAction = dataStore().addBookAction;

// from ref
const form = ref({
   title: '',
   author: '',
   img: '',
   price: '',
   discount: '',
   free_ship: '',
   description: ''
});
const formRef = ref(null);

// rules
const rules = ref({
   title: [
      { required: true, message: 'Please input book title', trigger: 'blur' },
      { min: 10, max: 100, message: 'Book title should be over 10 characters', trigger: 'blur' },
   ],
   author: [
      { required: true, message: 'Please input author name', trigger: 'blur' },
      { min: 3, max: 20, message: 'Author name should be 3 to 20 characters', trigger: 'blur' },
   ],
   price: [
      { required: true, message: 'Please input price', trigger: 'blur' },
      // { min: 3, max: 20, message: 'Price should be 3 to 20 characters', trigger: 'blur' },
   ],
   discount: [
      { required: true, message: 'Please input % discount', trigger: 'blur' },
      // { min: 3, max: 20, message: 'Author name should be 3 to 20 characters', trigger: 'blur' },
   ],
   free_ship: [
      { required: true, message: 'Please input Free ship or Not', trigger: 'blur' },
      // { min: 3, max: 20, message: 'Author name should be 3 to 20 characters', trigger: 'blur' },
   ],
});

// method handle
const submitForm = () => {
   formRef.value.validate((valid) => {
      if (valid) {
         addBookAction(form.value)
      } else {
         console.log('error submit!!');
      }
   });
}

</script>

<template>
<el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      class="form-container"
      aria-invalid="grammar"
      label-position="top"
      label-width="auto"
   >

   <h1>Add Book</h1>

      <el-form-item
         label="Title"
         prop="title"
      >
         <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item
         label="Author"
         prop="author"
      >
         <el-input v-model="form.author"></el-input>
      </el-form-item>

      <el-form-item
         label="Image url"
         prop="img"
      >
         <el-input v-model="form.img"></el-input>
      </el-form-item>

      <el-form-item
         label="Price"
         prop="price"
      >
         <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item
         label="Discount"
         prop="discount"
      >
         <el-input v-model="form.discount"></el-input>
      </el-form-item>

      <el-form-item label="Free ship">
         <el-select
            v-model="form.free_ship"
            placeholder="Select"
            size="default"
         >
            <el-option
               label="Yes"
               value="true"
               style="background-color: lightgreen;"
            />
            <el-option
               label="No"
               value="false"
               style="background-color: lightsalmon;"
            />
         </el-select>
      </el-form-item>

      <el-button
         type="primary"
         size="large"
         style="width: 100%; margin-top: 10px"
         @click="submitForm"
         :loading="isLoading"
         class="signin-btn"
      >Add</el-button>

   </el-form>

</template>

<style scoped>
h1 {
   text-align: center;
}

.form-container {
   display: grid;
   padding: 40px;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   min-height: 70vh;
   min-width: 40vw;
   background-color: aliceblue;
   border-radius: 8px;
   margin-top: 10px;
}

.el-form-item {
   max-height: 57px;
   min-width: 27vw;
   color: black;
}

</style>