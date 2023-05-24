<template>
  <div class="search-view">
    <div class="search-container">
      <input type="text" v-model="searchTerm" @input="searchMovies" placeholder="영화 검색" class="search-input" />
    </div>
    

    <div class="" style="display: flex; justify-content: center; align-items: center;">
      <div class="cardgroup row row-cols-1 row-cols-md-5 g-5 mt-3">
        <div class="col" v-for="movie in movies" :key="movie.id">
          <div class="card">
            <router-link :to="{ name: 'detail', params: { id: movie.id } }">
              <div class="image-container">
                <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" alt="..." @click="playSound" @mouseover="handleHover(movie)" @mouseleave="handleHover(null)">
              </div>
            </router-link>
          </div>
          <div style="height:20px">
            <transition name="fade">
              <div class="movie-title" v-if="hoveredMovie === movie">{{ movie.title }}</div>
            </transition>
          </div>
        </div>
      </div>
    </div>

  <!-- 로딩 표시 -->
    <div class="text-center" v-if="loading">
      <i class="fa-solid fa-spinner fa-spin" style="color: #000000; font-size:100px;"></i>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      movies: [],
      hoveredMovie: null,
      loading: false,
    };
  },
  created() {
    this.searchMovies()
  },
  methods: {
    async searchMovies() {
      if (this.loading) return;

      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      let apiUrl = ''
      if (this.searchTerm === '') {
        const genre_Id = this.$store.state.genreId
        if (genre_Id == 0) {
          apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${this.page}&certification_country=KR&certification.lte=15`
        } else if (genre_Id !== 0) {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&sort_by=popularity.desc&page=${this.page}&with_genres=${genre_Id}&certification_country=KR&certification.lte=15`
        }
      } else {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchTerm}&language=ko-KR`;
      }
      try {
        console.log(1)
        console.log(apiUrl)
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.movies = data.results;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    getImageUrl(posterPath) {
        if (posterPath) {
        const baseUrl = 'https://image.tmdb.org/t/p/';
        const size = 'w500';
        return `${baseUrl}${size}${posterPath}`;
      } else {
        // 포스터 이미지가 없는 경우에 대한 처리
        return ''; // 빈 문자열 또는 기본 이미지 URL 등을 반환하도록 수정
      }
    },
    handleHover(movie) {
      this.hoveredMovie = movie;
    },
    playSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
          console.error('소리를 재생할 수 없습니다:', error);
        });
    },
  }
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 200px;
  height: 40px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 20px;
}

</style>