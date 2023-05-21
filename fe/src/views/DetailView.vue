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
          <div class="button-group">
              <button type="button" class="like-btn btn" @click="like_movie(movie.id)">
                <span v-if="isLike"><i class="fa-regular fa-heart fa-beat fa-2xl" style="color: #b40000;"></i></span>
                <span v-else><i class="fa-solid fa-heart fa-2xl" style="color: #b40000;"></i></span>
                <span style="color:white; margin-left:15px;">좋아요 {{ likeCount }}</span>
              </button>
              <button type="button" class="save-btn btn">
                <i class="fa-regular fa-bookmark fa-2xl" style="color: #000000;"></i>
              </button>
            </div>
          </div>
      </div>
    </div>


    <div v-else>
      <i class="fa-solid fa-spinner fa-spin" style="color: #000000; font-size:100px;"></i>
    </div>

    <div class="detail-view">
      <br>
      <br>
      <div>
        <h1>Comments</h1>
        <h3>댓글</h3>
        <textarea type="text" class="form-control input-field" v-model="content" @keyup.enter="createComment(movie.id); clickSound();"/>
        <button type="button" class="btn save-btn" style="color: white; margin-top:15px" @click="createComment(movie.id); clickSound();">작성</button>
        <ul>
          <li v-for="comment in comments" :key="comment.id" class="m-1">
            {{ comment.id }}
            {{ comment.content }}
            <router-link :to="{ name: 'profile', params:{ username:comment.user.username } }" style="text-decoration: underline">
              {{ comment.user.username }}
            </router-link>
            <button type="button" class="save-btn btn" @click="deleteComment(comment.id); clickSound();">
              <i class="fa-solid fa-delete-left" style="color: #000000;"></i>
            </button>
            <hr>
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
      banners : [],
      isLike: false,
      likeCount: 0,
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  created() {
    const id = this.$route.params.id; // id 파라미터 가져오기
    this.getBannerUrl(id);
    this.fetchMovie(id);
    this.fetchComments(id);
    this.fetchLike(id);
  },
  mounted(){
  },
  methods: {
    clickSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
          console.error('소리를 재생할 수 없습니다:', error);
        });
    },
    getImageUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'original';
      return `${baseUrl}${size}${posterPath}`;
    },
    getBannerUrl(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`)
        .then(response => {
          const backdrops = response.data.backdrops.slice(1,10); //
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
    fetchLike(movieId) {
      axios
        .get(`${this.$store.state.URL}/api/v1/movies/${movieId}/like/${this.$store.state.username}/`)
        .then((response) => {
          this.isLike = response.data.islike === 'like';
          this.likeCount = response.data.like_count;
        })
        .catch((error) => {
          console.error('좋아요 상태 가져오기 실패:', error);
        });
    },
    async like_movie(movieId) {
      this.clickSound();
      try { // 비동기처리(post이후 fetchLike 순차적 호출(에러 방지))
        await axios.post(`${this.$store.state.URL}/api/v1/movies/${movieId}/like/${this.$store.state.username}/`);
        this.fetchLike(movieId);
      } catch (error) {
        console.error('좋아요 처리 실패:', error);
      }
    },
  },
}
</script>

<style>
.input-field {
  width: 600px; /* 원하는 너비로 조정하세요 */
  height: 80px; /* 원하는 높이로 조정하세요 */
  resize: none; /* 세로 크기 조정을 허용합니다 */
}
.button-group {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.like-btn,
.save-btn{
  background: rgba(255,255,255,0.3);
  margin-right: 10px;
}
.like-btn:hover,
.save-btn:hover {
  background: rgba(255,255,255,0.3);
  box-shadow: 0px 5px 30px 5px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}
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
  letter-spacing: 2px; /* 글자 간격 */
  line-height: 2; /* 원하는 문장 높이 간격 설정 */
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


</style>
