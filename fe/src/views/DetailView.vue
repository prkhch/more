<template>
  <div class="detail">
    <h2>Movie Detail</h2>
    <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" style="width:300px; height:300px;" alt="...">
    <div>{{ movie.title }}</div>
    <div>{{ movie.overview }}</div>
    <div>
      <h1>DetailComments</h1>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.id }}
          {{ comment.content }}
        </li>
      </ul>
    </div>
    
    <!-- 영화의 다른 정보들을 표시 -->
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'DetailView',
  components : {
  },
  data() {
    return {
      movie: {title : null, overview : null},
      comments: [],
    }
  },
  created() {
    const id = this.$route.params.id; // id 파라미터 가져오기
    this.fetchMovie(id);
    this.fetchComments(id);
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w500';
      return `${baseUrl}${size}${posterPath}`;
    },
    fetchMovie(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`
      axios
        .get(url)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    fetchComments(id) {
      axios
        .get(`${this.$store.state.URL}/api/v1/movies/${id}/`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
}
</script>