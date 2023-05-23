<template>
  <div class="later-view">
    <div class="dropdown dropstart" style="position: fixed; right: 0%; top: 50%; transform: translateY(-50%); z-index: 999;">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
        
      </button>

      <ul class="dropdown-menu dropdown-menu-animation" aria-labelledby="dropdownMenuButton">
        <li v-for="movie in this.movies" :key="movie.id">
          <img :src="movie.poster_path" style="width:200px; height:200px;" class="margin-auto" alt="...">
          <div style="font-size:16px;" class="text-center">{{movie.title}}</div>
        </li>
      </ul>

    </div>

  </div>


</template>

<script>
import axios from "axios"

export default {
  name : "LaterView",
  data() {
    return {
      movies : [],
    }
  },
  created() {
    this.getMoviesFromLaterView();
  },
  watch: {
    '$store.state.laterview': {
      handler() {
        this.movies = []
        this.getMoviesFromLaterView(); // laterview 변경 시 movies 갱신
      },
      deep: true,
    },
  },
   computed: {

  },
  methods : {
    async getMoviesFromLaterView() {
      const laterview = this.$store.state.laterview;
      for (const movie_id of laterview) {
        const movie = await this.getMovie(movie_id);
        this.movies.push(movie);
      }
    },
    async getMovie(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      try {
        const response = await axios.get(url);
        const movieData = response.data;
        
        const movieId = movieData.id;
        const movieTitle = movieData.title;
        const baseUrl = 'https://image.tmdb.org/t/p/w500/';
        const moviePosterPath = movieData.poster_path;
        const posterUrl = baseUrl + moviePosterPath;

        const movieDetails = {
          id: movieId,
          title: movieTitle,
          poster_path: posterUrl,
        };

        return movieDetails;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  }
}
</script>

<style>
.dropdown-menu {
  height: 100vh; /* 드롭다운의 최대 높이를 브라우저의 높이로 설정 */
  animation-fill-mode: forwards;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.dropdown .dropdown-menu li {
  margin: 5px;
}

.dropdown-menu-animation.show {
  animation: fadeInDown 1s ease;
}

.btn-primary{
  color: rgba(255, 255, 255, 0.5);
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>