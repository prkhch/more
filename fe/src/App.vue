<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/search">검색</router-link> |
      <router-link v-if="hasToken" to="/later">나중에 볼 영화</router-link> |
      <router-link v-if="hasToken" to="/profile">{{ $store.state.username }}</router-link>
      <button v-if="hasToken" @click="logout">로그아웃</button>
      <router-link v-else to="/login">로그인</router-link> |
      <router-link to="/login">로그인</router-link> |
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

<script>
export default {
  computed: {
    hasToken() {
      return this.$store.state.token !== null;
    },
  },
  methods: {
  },
};
</script>