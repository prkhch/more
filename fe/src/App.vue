<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/">Detail</router-link> |
      <router-link to="/">Signup</router-link> |
      <router-link to="/">Login</router-link> |
      <router-link to="/">Search</router-link> |
      <router-link to="/">Profile</router-link> |
      <router-link to="/">Later</router-link> |
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Noto Sans KR", sans-serif;
}
ul {
  padding-left : 0;
  list-style : none;
}
.page {
  padding-top:3rem;
}
</style>
