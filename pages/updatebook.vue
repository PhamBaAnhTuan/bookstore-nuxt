<script setup>
definePageMeta({
   layout: 'main'
})
import { dataStore } from '../stores/dataStore';

// books
const bookList = dataStore().bookList;
const isLoading = dataStore().isLoading;
// route param query
const route = useRoute().query;
// Converts id to a number
const id = parseInt(route.id, 10);
const index = bookList.findIndex((book) => book.id === id);

//  from ref
const form = ref(bookList[index]);
const formRef = ref(null);

// rules
const rules = ref({
   title: [
      { required: true, message: 'Please input book title', trigger: 'blur' },
      { min: 3, max: 20, message: 'Book title should be 3 to 20 characters', trigger: 'blur' },
   ],
   author: [
      { required: true, message: 'Please input author name', trigger: 'blur' },
      { min: 3, max: 20, message: 'Author name should be 3 to 20 characters', trigger: 'blur' },
   ],
});

// method handle
const submitForm = () => {
   formRef.value.validate((valid) => {
      if (valid) {
         // data.signIn(signInForm.value);
         console.log('form: ', form.value);
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
      v-loading="isLoading"
      ref="formRef"
      class="form-container"
      aria-invalid="grammar"
      label-position="top"
      label-width="auto"
   >
      <h1>Update book</h1>

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

      <el-form-item
         label="Discount"
         prop="discount"
      >
         <el-input v-model="form.discount"></el-input>
      </el-form-item>

      <el-button
         type="primary"
         size="large"
         style="width: 100%; margin-top: 20px"
         @click="submitForm"
         class="signin-btn"
      >Update</el-button>

   </el-form>

</template>

<style scoped>
h1 {
   text-align: center;
   margin: 10px;
}

.form-container {
   display: grid;
   padding: 10px 50px;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   max-height: 90vh;
   min-width: 40vw;
   background-color: aliceblue;
   border-radius: 8px;
}

.el-form-item {
   min-height: 30px;
   min-width: 30vw;
   color: black;
}

</style>