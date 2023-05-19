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
      page: 1,
      movies: [],
      loading: false,
    };
  },
  created() {
    this.loadMoreMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
    async loadMoreMovies() {
      if (this.loading) return;
      this.loading = true;

      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${this.page}&language=ko-KR`;

      try {
        const response = await axios.get(apiUrl);
        const newMovies = response.data.results;
        this.movies = [...this.movies, ...newMovies];
        this.page++;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      if (scrollPosition >= documentHeight) {
        this.loadMoreMovies();
      }
    },
  },
}
</script>