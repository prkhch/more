<template>
  <div>
    <input type="text" v-model="searchTerm" @input="searchMovies" placeholder="영화 검색" />

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
export default {
  data() {
    return {
      searchTerm: '',
      movies: []
    };
  },
  methods: {
    async searchMovies() {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchTerm}&language=ko-KR`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.movies = data.results;
      } catch (error) {
        console.error(error);
      }
    },
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${posterPath}`;
    },
  }
};
</script>
