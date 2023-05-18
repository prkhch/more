<template>
  <div class="home-view">
    <AppLoading v-if="isLoading"/>
    <div v-else>
      <MovieList/>
    </div>

  </div>
</template>

<script>
import AppLoading from "@/components/common/AppLoading.vue"
import MovieList from "@/components/movie/MovieList.vue"


export default {
  name: 'HomeView',
  components: {
    AppLoading, MovieList
  }
}
</script>
