<template>
  <div>
    <router-link class="nav-link text-light" :to="{ name : 'profile', params :({id:user.id})}">{{username}}</router-link>
    <h1>{{username}}</h1>
  </div>
</template>

<script>
export default {
  
};
</script>