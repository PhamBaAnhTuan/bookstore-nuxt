<script setup>
definePageMeta({
   layout: 'main',
   // keepalive: true,
})
import { dataStore } from '../stores/dataStore.ts';

const user = dataStore().user;
const data = computed(() => dataStore().$state);

</script>

<template>
   <div class="profile-header">
      <img
         src="/img/Kendrick.jpg"
         alt="Profile"
         class="profile-pic"
      />
      <h1 v-if="data.isAuthenticated">You're signed in!</h1> <br>

      <h3>User name: {{ user?.username }}</h3>
   </div>
</template>

<style>
/* Profile Header */
.profile-header {
   display: flex;
   height: 30vh;
   width: 40%;
   margin-top: 50px;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
}

/* Profile Picture */
.profile-pic {
   width: 150px;
   height: 150px;
   border-radius: 50%;
   border: 2px solid #fff;
}

/* Profile Info */
.profile-info {
   /* flex-grow: 1; */
}

/* Username Section */
.profile-username {
   display: flex;
   align-items: center;
   gap: 10px;
}

.profile-username h2 {
   margin: 0;
   font-size: 24px;
}

.btn {
   background-color: #333;
   color: #fff;
   border: 1px solid #444;
   padding: 5px 10px;
   border-radius: 5px;
   cursor: pointer;
   font-size: 14px;
}

.btn:hover {
   background-color: #444;
}

/* Profile Stats */
.profile-stats {
   display: flex;
   gap: 15px;
   margin: 10px 0;
}

.profile-stats p {
   margin: 0;
   font-size: 14px;
   color: black;
}
</style>