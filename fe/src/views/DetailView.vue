<template>
  <div>

    <div v-if="bannerLoaded">
      <div class="banner">
        <carousel :per-page="1" :autoplay="true" :autoplay-timeout="3000" :loop="true" :paginationEnabled="false" :mouseDrag="false" :speed="2000">
          <slide v-for="banner in banners" :key="banner.file_path">
            <div class="banner-container">
              <img :src="getImageUrl(banner.file_path)" class="banner-img d-block w-100" alt="Banner">
            </div>
          </slide>
        </carousel>
        <div class="banner-overlay">
        <div class="banner-title">
          {{ movie.title }}
          <div class="banner-overview">{{movie.overview}}</div>
        </div>
        </div>
      </div>
    </div>


    <div v-else>
      <i class="fa-solid fa-spinner fa-spin" style="color: #000000; font-size:100px;"></i>
    </div>

    <div class="detail-view">
      <!-- <h2>Movie Detail</h2>
      <img v-if="isMovieFetched" :src="getImageUrl(movie.poster_path)" class="card-img-top border" style="width:300px; height:300px;" alt="...">
      <div v-else><i class="fa-solid fa-spinner fa-spin" style="color: #000000; font-size:100px;"></i></div>
      <div>{{ movie.title }}</div>
      <div>{{ movie.overview }}</div> -->
      <br>
      <button type="button" class="btn btn-primary" @click="like_movie(movie.id)">좋아요</button>
      <br>
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
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'DetailView',
  components: {
  },
  data() {
    return {
      movie: { title: null, overview: null },
      comments: [],
      content: "",
      isMovieFetched: false, // 플래그 변수
      bannerLoaded : false,
      banners : []
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  created() {
    const id = this.$route.params.id; // id 파라미터 가져오기
    this.fetchMovie(id);
    this.fetchComments(id);
    this.getBannerUrl(id);
  },
  mounted(){
  },
  methods: {
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'original';
      return `${baseUrl}${size}${posterPath}`;
    },
    getBannerUrl(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`)
        .then(response => {
          const backdrops = response.data.backdrops.slice(1, 10); // backdrops에서 이미지 5개를 가져옵니다
          this.banners = backdrops;
          this.bannerLoaded = true;
        })
        .catch(error => {
          console.error(error);
        });
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
      // const currentUserId = this.$store.state.user_id;

      // // 찾고 있는 코멘트
      // const commentToDelete = this.comments.find(comment => comment.id === comment_id);
      // // 코멘트 작성자의 ID와 현재 사용자의 ID 비교
      // if (commentToDelete.user_id === currentUserId) {
      axios
        .delete(
          `${this.$store.state.URL}/api/v1/comments/${comment_id}/${this.$store.state.username}/`,
          { headers: { Authorization: `Token ${this.$store.state.token}` } }
        )
        .then(() => {
          const updatedComments = this.comments.filter(comment => comment.id !== comment_id);
          this.comments = updatedComments;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            if (this.$store.state.token === null) {
              alert("로그인 후 이용하세요.")
            } else {
              alert("로그인한 유저가 작성한 글이 아닙니다.")
            }
          }
        })
      // }
    },
    createComment(movieId) {
      if (this.content.length) {
        axios
          .post(
            `${this.$store.state.URL}/api/v1/movies/${movieId}/comment/${this.$store.state.username}/`,
            { content: this.content }
          )
          .then(() => {
            this.fetchComments(movieId)
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 404) {
              alert("로그인 후 이용하세요.")
            }
          })

        this.content = "";
      } else {
        alert("작성할 댓글 내용을 입력하세요.")
      }
    },
    like_movie(movieId) {
      axios
        .post(
          `${this.$store.state.URL}/api/v1/movies/${movieId}/like/${this.$store.state.username}/`
        )
        .then((response) => {
          if (response.data.islike === 'like') {
            console.log('좋아요')
          } else {
            console.log('이제 안 좋아요')
          }
        })
    }
  },
}
</script>

<style>
.banner-img {
  height: 800px;
}
.banner{
  position: relative;
}
.home-view {
  background: black
}
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%; /* 이미지 왼쪽 절반에 해당하는 너비 설정 */
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
  z-index: 0.5;
}
.banner-title {
  top:10%;
  position: absolute;
  z-index: 1;
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}

.banner-overview {
  position: relative;
  z-index: 1;
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  line-height: 2;
}


</style>
