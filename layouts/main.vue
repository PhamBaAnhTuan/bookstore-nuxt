<script setup lang="ts">
// state
import { dataStore } from '../stores/dataStore';
// icons
import { ArrowDown, Search } from '@element-plus/icons-vue';
// user state
const userData = computed(() => dataStore().user);
const signOut = dataStore().signOut;
const getUserList = dataStore().getUserList;
const getBookList = dataStore().getBookList;
const route = useRoute();

// state
const searchInput = ref('');
</script>

<template>
   <div>
      <el-header class='header'>
         <div>
            <nuxt-link
               class="nav-link"
               to="/"
            >Home</nuxt-link>

            <nuxt-link
               v-if="userData"
               class="nav-link"
               to="/profile"
            >Profile</nuxt-link>

            <nuxt-link
               v-if="userData"
               class="nav-link"
               to="/devmode"
            >Develop mode</nuxt-link>
         </div>

         <div>
            <el-input
               v-model="searchInput"
               style="width: 350px"
               size="large"
               placeholder="Please Input"
               :suffix-icon="Search"
            />

            <el-dropdown>
               <span class="nav-link">
                  {{ userData?.username || "Actions" }}
                  <el-icon class="el-icon--right">
                     <arrow-down style="height: 13px;" />
                  </el-icon>
               </span>
               <template #dropdown>
                  <el-dropdown-menu>

                     <el-dropdown-item v-if="userData">
                        <nuxt-link
                           style="text-decoration: none;"
                           to="/profile"
                        >Profile</nuxt-link>
                     </el-dropdown-item>
                     <el-dropdown-item v-if="userData">
                        <nuxt-link
                           style="text-decoration: none;"
                           to="/devmode"
                        >Develop mood</nuxt-link>
                     </el-dropdown-item>
                     
                     <el-dropdown-item @click="getBookList">
                        Get books
                     </el-dropdown-item>

                     <el-dropdown-item
                        v-if="userData"
                        @click="signOut"
                        style="color: red;"
                     >
                        Sign out
                     </el-dropdown-item>


                     <el-dropdown-item v-if="!userData">
                        <nuxt-link
                           style="text-decoration: none;"
                           to="/signin"
                        >Sign in</nuxt-link>
                     </el-dropdown-item>

                     <el-dropdown-item v-if="!userData">
                        <nuxt-link
                           style="text-decoration: none;"
                           to="/signup"
                        >Sign up</nuxt-link>
                     </el-dropdown-item>

                  </el-dropdown-menu>
               </template>
            </el-dropdown>
         </div>
      </el-header>
      <main class="main">
         <slot />
      </main>
   </div>
</template>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

.header {
   display: flex;
   height: 10vh;
   width: 100%;
   background-color: #09D1C7;
   align-items: center;
   justify-content: space-between;
   padding: 0 2rem;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling for Links */
.nav-link {
   color: white;
   text-decoration: none;
   font-size: 1.2rem;
   font-weight: 500;
   margin: 0 1rem;
   padding: 0.5rem 1rem;
   transition: all 0.5s ease-in-out;
   border-radius: 10px;
}

/* Hover and Active States */
.nav-link:hover {
   background-color: #15919B;
   color: white;
}

.nav-link:active {
   transform: scale(0.95);
}

main {
   display: flex;
   height: 90vh;
   width: 100%;
   flex-direction: column;
   align-items: center;
   /* justify-content: center; */
   background-color: #15919B;
}
</style>