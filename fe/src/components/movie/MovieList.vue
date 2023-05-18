<template>
  <div>

    <div class="slider m-5">
    <h1>인기 영화</h1>
      <div class="carousel" ref="popularCarousel">
        <div v-for="(movieGroup, index) in popularMovieGroups" :key="index" class="carousel-item">
          <div class="row justify-content-start">
            <div v-for="movie in movieGroup" :key="movie.id" class="col">
              <div class="card">
                <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" alt="...">
                <h5 class="card-title text-center" style="font-weight:bold">{{ movie.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    <div class="slider m-5">
    <h1>최신 영화</h1>
      <div class="carousel" ref="latestCarousel">
        <div v-for="(movieGroup, index) in latestMovieGroups" :key="index" class="carousel-item">
          <div class="row justify-content-start">
            <div v-for="movie in movieGroup" :key="movie.id" class="col">
              <div class="card">
                <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" alt="...">
                <h5 class="card-title text-center" style="font-weight:bold">{{ movie.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel'

export default {
  data() {
    return {
      popularMovieGroups: [],
      latestMovieGroups: []
    };
  },
  mounted() {
    this.fetchMovies();
  },
  updated() {
    this.$refs.popularCarousel.$el.slick('refresh'); // 인기 영화 캐러셀 업데이트
    this.$refs.latestCarousel.$el.slick('refresh'); // 최신 영화 캐러셀 업데이트
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${posterPath}`;
    },
    fetchMovies() {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const latestUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=1`
      const popularUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`
      axios.all([
        axios.get(popularUrl),
        axios.get(latestUrl)
      ])
      .then(axios.spread((popularResponse, latestResponse) => {
        this.popularMovieGroups = this.groupMovies(popularResponse.data.results, 6); // 인기 영화 그룹화
        this.latestMovieGroups = this.groupMovies(latestResponse.data.results, 6); // 최신 영화 그룹화

        this.$nextTick(() => {
          this.initializeCarousel(); // 캐러셀 초기화
        });
      }))
      .catch((error) => {
        console.log(error);
      })
    },

    groupMovies(movies, groupSize) {
      const movieGroups = [];
      let currentGroup = [];

      movies.forEach((movie, index) => {
        currentGroup.push(movie);

        if ((index + 1) % groupSize === 0) {
          movieGroups.push(currentGroup);
          currentGroup = [];
        }
      });

      if (currentGroup.length > 0) {
        movieGroups.push(currentGroup);
      }

      return movieGroups;
    },

    initializeCarousel() {
      $('.carousel').slick({
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 3000,
      });
    }
  },
}

</script>

<style scoped>
/* p {
  line-height:2em;
} */

.card {
  height: 300px;
  width: 200px;
}

.card-img-top {
  height: 90%;
}

.card-title {
  height: 10%;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel-item {
  display: flex; /* 아이템들을 가로로 나열하기 위해 flex로 설정 */
}

</style>
