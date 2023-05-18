<template>
  <div class="home">
    <h1>HOME</h1>

    <div class="cardgroup row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="movie in movies" :key="movie.id">
        <div class="card">
          <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" alt="...">
          <div class="card-body border">
            <router-link :to="{ name: 'detail', params: { id: movie.id } }">{{ movie.title }}</router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      movies : [],
    }
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${posterPath}`;
    },
    fetchMovies() {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=1`
      axios.get(url)
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
}
</script>
