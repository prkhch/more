<template>
  <div class="detail">

    <h2>Movie Detail</h2>
    <img v-if="isMovieFetched" :src="getImageUrl(movie.poster_path)" class="card-img-top border" style="width:300px; height:300px;" alt="...">
    <div v-else><i class="fa-solid fa-spinner fa-spin" style="color: #000000; font-size:100px;"></i></div>
    <div>{{ movie.title }}</div>
    <div>{{ movie.overview }}</div>
    <div>
      <h1>DetailComments</h1>
      <h3>댓글 작성</h3>
      <input type="text" class="form-control" v-model="content" @keyup.enter="createComment(movie.id)"/>
      <button type="button" class="btn btn-primary" @click="createComment(movie.id)">댓글 추가</button>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.id }}
          {{ comment.content }}
          {{ comment.user.username}}
          <input type="submit" value="삭제" @click="deleteComment(comment.id)">
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
      content: "",
      isMovieFetched: false, // 플래그 변수
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
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
          this.isMovieFetched = true;
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
    deleteComment(comment_id) {
      const currentUserId = this.$store.state.user_id;

      // 찾고 있는 코멘트
      const commentToDelete = this.comments.find(comment => comment.id === comment_id);

      // 코멘트 작성자의 ID와 현재 사용자의 ID 비교
      if (commentToDelete.user_id === currentUserId) {
        axios
          .delete(
            `${this.$store.state.URL}/api/v1/comments/${comment_id}/`,
            {headers : {Authorization: `Token ${this.$store.state.token}`}}
          )
          .then(() => {
              const updatedComments = this.comments.filter(comment => comment.id !== comment_id);
              this.comments = updatedComments;
          })
          .catch((error) => {
            console.log(error);
            if(error.response.status === 401) {
              alert("로그인 후 이용하세요.")
            }
          })
      }
    },
    createComment(movieId) {
      if(this.content.length) {
        axios
          .post(
            `${this.$store.state.URL}/api/v1/movies/${movieId}/comment`,
            {content: this.content, movie_id: movieId, user_id: 1}
          )
          .catch((error) => {
            console.log(error);
            if(error.response.status === 404) {
              alert("로그인 후 이용하세요.")
            }
          })
          
        this.content = "";
      } else {
        alert("작성할 댓글 내용을 입력하세요.")
      }
    },
  },
}
</script>