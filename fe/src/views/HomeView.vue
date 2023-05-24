<template>
  <div class="home-view">
    <h1 class="text-center text-light">{{ genrename }} 영화</h1>

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
      <div class="dank-ass-loader">
        <div class="row">
          <div class="arrow up outer outer-18"></div>
          <div class="arrow down outer outer-17"></div>
          <div class="arrow up outer outer-16"></div>
          <div class="arrow down outer outer-15"></div>
          <div class="arrow up outer outer-14"></div>
        </div>
        <div class="row">
          <div class="arrow up outer outer-1"></div>
          <div class="arrow down outer outer-2"></div>
          <div class="arrow up inner inner-6"></div>
          <div class="arrow down inner inner-5"></div>
          <div class="arrow up inner inner-4"></div>
          <div class="arrow down outer outer-13"></div>
          <div class="arrow up outer outer-12"></div>
        </div>
        <div class="row">
          <div class="arrow down outer outer-3"></div>
          <div class="arrow up outer outer-4"></div>
          <div class="arrow down inner inner-1"></div>
          <div class="arrow up inner inner-2"></div>
          <div class="arrow down inner inner-3"></div>
          <div class="arrow up outer outer-11"></div>
          <div class="arrow down outer outer-10"></div>
        </div>
        <div class="row">
          <div class="arrow down outer outer-5"></div>
          <div class="arrow up outer outer-6"></div>
          <div class="arrow down outer outer-7"></div>
          <div class="arrow up outer outer-8"></div>
          <div class="arrow down outer outer-9"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      movies: [],
      hoveredMovie: null,
      page: 1,
      loading: false,
    };
  },
  computed: {
    genrename() {
      return this.$store.state.genrename;
    }
  },
  watch: {
    '$store.state.genreId': {
      handler() {
        console.log('watch')
        // genreId가 변경될 때마다 실행되는 로직
        this.page = 1; // 페이지 초기화
        this.movies = []; // 영화 목록 초기화
        this.fetchMovies(); // 새로운 영화 로딩
      },
    },
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${posterPath}`;
    },
    
    async fetchMovies() {
      if (this.loading) return;
      this.loading = true;
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      let apiUrl = ''
      this.genre_Id = this.$store.state.genreId
      if (this.genre_Id == 0) {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${this.page}&certification_country=KR&certification.lte=15`
      } else if (this.genre_Id !== 0) {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&sort_by=popularity.desc&page=${this.page}&with_genres=${this.genre_Id}&certification_country=KR&certification.lte=15`
      }
      console.log(apiUrl)
      try {
        const response = await axios.get(apiUrl);
        const newMovies = response.data.results;
        this.movies = [...this.movies, ...newMovies];
        this.page++;
        this.loading = false;
        console.log(this.movies)
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      const body = document.body;
      body.style.backgroundColor = '#FFFFFF';
      if (scrollPosition >= documentHeight-1) {
        this.fetchMovies();
        
      }     
    },

    // 스타일
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
  },
}
</script>

<style>
.movie-title {
  color: white;
  font-size : 20px;
}

.cardgroup {
  width: 90%
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 150%;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.card{
  transition: box-shadow 1s;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
}
.card:hover{
  box-shadow: 0px 5px 30px 5px rgba(255, 255, 255, 1);
  border-radius: 5px;
}
</style>
