<template>
  <div id="app">
    <nav>
      <AppNav/>
      <div class="page">
        <router-view/>
      </div>
    </nav>
  </div>
</template>

<script>
import AppNav from "@/components/common/AppNav.vue";

export default {
  components : {
    AppNav,
  },
};
</script>

<style>
#app {
  font-family: "Noto Sans KR", sans-serif;
}

ul {
padding-left: 0;
list-style: none;
}

.detail-view,
.home-view,
.profile-view,
.search-view,
.signup-view
{
  padding : 50px;
}
</style>
