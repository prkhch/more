<template>
  <div class="detail">
    <h2>Movie Detail</h2>
    <img :src="getImageUrl(movie.poster_path)" class="card-img-top border" style="width:300px; height:300px;" alt="...">
    <div>{{ movie.title }}</div>
    <div>{{ movie.overview }}</div>
    
    <!-- 영화의 다른 정보들을 표시 -->
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'DetailView',
  data() {
    return {
      movie: {title : null, overview : null}
    }
  },
  mounted() {
    const id = this.$route.params.id; // id 파라미터 가져오기
    this.fetchMovie(id);
    this.getComments()
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
    getComments() {
      axios
      .get( // get(백엔드API, 토큰)
        // 라우트 매개변수 id를 사용하여 백엔드 API호출
        `${this.$store.state.URL}/api/v1/${this.$route.params.id}/`,
      )
      .then((response) => { // 응답
        console.log(response)
        // if(response.status === 200) { 
        //   this.movie = response.data; // 응답데이터=>게시글
        //   if(this.movie.user.username === this.$store.state.username) { // 게시글 작성자 === 현재 유저
        //     this.isUser = true; // 작성자 확인 true
        //   }
        // }
        if (response.status == 404) {
          console.log('ㅎㅎ')
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }
  },
}
</script>