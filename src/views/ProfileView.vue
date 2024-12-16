/* Profil */
<template>
  <main>
    
  </main>
</template>


<script>

</script>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const get_user_email = JSON.parse(getCookie('user')).email;

const get_fullUser = route.query.full_user ? JSON.parse(route.query.full_user) : null;

console.log(get_fullUser);



var profileImage = "";

function getCookie(name){
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
} 

</script>

<style>

</style>