<template>
  <div>
<!-- 배너 -->
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

              <button type="button" class="like-btn btn" @click="like_movie(movie.id); clickSound();">
                <span v-if="isLike">
                  <i class="fa-solid fa-heart fa-2xl" style="color: #b40000;"></i>
                </span>
                <span v-else>
                  <i class="fa-regular fa-heart fa-beat fa-2xl" style="color: #b40000;"></i>
                </span>
                <span class="like-animation" v-if="showHeartAnimation"><i class="fa-solid fa-heart fa-shake" style="color: #b40000; font-size:300px;" ></i></span>
                <span style="color:white; margin-left:15px;">{{ likeCount }}</span>
              </button>

              <button type="button" class="save-btn btn" @click="later_movie(movie.id); clickSound();">
                <span v-if="isLater">
                  <i class="fa-solid fa-bookmark fa-2xl" style="color: #005eff;"></i>
                  </span>
                <span v-else>
                  <i class="fa-regular fa-bookmark fa-2xl" style="color: #005eff;"></i>
                </span>
                <span class="check-animation" v-if="showCheckAnimation"><i class="fa-solid fa-check" style="color: #00ff1e;"></i></span>
              </button>

              <button>
                <a :href="this.youtubeUrl" target='_blank'><img src="@/assets/yt_logo_rgb_light.png" alt="" style="width:auto; height:30px;" class="ytb-btn"></a>
              </button>

            </div>
          </div>
      </div>
    </div>


    <div v-else style="background-color:black; margin-top:50x;" class="text-center">
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

<!-- 디테일 뷰 -->
    <div class="detail-view">

      <br>
      
      <div>
        <h1>Comments</h1>
        <h3>댓글</h3>
        <div class="input-container">
          <textarea type="text" class="form-control input-field" v-model="content" @keyup.enter="createComment(movie.id)" @click="clickSound();"></textarea>
          <button type="button" class="btn save-btn ms-2" style="color: white; height:40px" @click="createComment(movie.id); clickSound();">
            <i class="fa-solid fa-turn-down fa-rotate-90" style="color: #ffffff; font-size:20px"></i>
          </button>
        </div>

        <br>

        <ul>
          <li v-for="comment in comments" :key="comment.id" class="m-1">
            <!-- {{ comment.user.profile_image }} -->
            <!-- {{ this.$store.state.URL }} -->
            <img style="width: 35px; height: 35px;" :src="`http://localhost:8000${comment.user.profile_image}`" alt="프로필 이미지" class="profile-image">
            
            <router-link :to="{ name: 'profile', params:{ username:comment.user.username } }" style="text-decoration: underline; color: white;">
              {{ comment.user.username }}
            </router-link>
            
            <div v-if="comment.editing" class="d-flex">
              <textarea type="text" class="form-control input-field" v-model="comment.editcontent" @keyup.enter="modifyComment(comment);" @click="clickSound();"></textarea>
              <button type="button" class="btn save-btn ms-2" style="color: white; height:40px" @click="modifyComment(comment); clickSound();">
                <i class="fa-solid fa-turn-down fa-rotate-90" style="color: #ffffff; font-size:20px"></i>
              </button>
              <button type="button" class="save-btn btn ms-2" @click="cancelEdit(comment); clickSound();">
                <i class="fa-solid" style="color: #ffffff;">취소</i>
              </button>
            </div>
            <div v-else>
              {{ comment.content }}
              <button type="button" class="save-btn btn ms-5" @click="startEdit(comment); clickSound();">
                <i class="fa-solid" style="color: #ffffff;">수정</i>
              </button>
              <button type="button" class="save-btn btn ms-0" @click="deleteComment(comment.id); clickSound();">
                <i class="fa-solid fa-delete-left" style="color: #ffffff;"></i>
              </button>
            </div>

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
      bannerLoaded : false,
      banners : [],
      isLike: false,
      likeCount: 0,
      isLater : false,
      showHeartAnimation: false,
      showCheckAnimation: false,
      editcontent : "",
      editing : false,
      youtubeUrl : ""
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  created() {
    const id = this.$route.params.id; // id 파라미터 가져오기
    this.fetchLike(id);
    this.fetchisLater(id);
    this.fetchMovie(id);
    this.fetchComments(id);
    this.getYoutubeUrl(id);
  },
  async mounted(){
    const id = this.$route.params.id; // id 파라미터 가져오기
    await this.fetchLike(id);
    await this.fetchisLater(id);
    await this.getBannerUrl(id);
  },
  methods: {
    async getYoutubeUrl(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=ko-KR`
      try {
          const response = await fetch(videoUrl);
          const data = await response.json();

            if(data.results[9]) {
              const firstVideo = data.results[9];
              this.youtubeUrl = `https://www.youtube.com/watch?v=${firstVideo.key}`;
            } else if(data.results[1]){
              const secondVideo = data.results[1];
              this.youtubeUrl = `https://www.youtube.com/watch?v=${secondVideo.key}`;
            }
            console.log(this.youtubeUrl)
      } catch (error) {
        console.log(error);
        return null;
      }
    },
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
          const backdrops = response.data.backdrops.slice(1,6); //
          this.banners = backdrops;
          this.bannerLoaded = true;
        })
        .catch(error => {
          console.error(error);
          this.getBannerUrl(id);
        });
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
    deleteComment(comment_id) {
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
    startEdit(comment) {
      if (comment.user.username === this.$store.state.username) {
        this.$set(comment, 'editing', true);
        comment.editcontent = comment.content;
      } else {
        alert("로그인한 유저가 작성한 글이 아닙니다.")
      }      
    },
    // 댓글 수정 취소
    cancelEdit(comment) {
      comment.editing = false;
    },
    modifyComment(comment) {
      const updatedContent = comment.editcontent
      axios
        .put(
          `${this.$store.state.URL}/api/v1/comments/${comment.id}/${this.$store.state.username}/`,
          { content: comment.editcontent },
          { headers: { Authorization: `Token ${this.$store.state.token}` } }
        )
        .then(() => {
          comment.content = updatedContent
          comment.editing = false
          alert('댓글 수정이 완료되었습니다.')
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
            this.content = "";
          })
          .catch((error) => {
            console.log(error);
            if(error.response.status === 400) {
              alert("작성할 수 없습니다.")
            } else {
              alert("로그인 후 이용하세요.")
            }
          })
      } else {
        alert("작성할 댓글 내용을 입력하세요.")
      }
    },
    async fetchLike(movieId) {
      console.log(this.$store.state.username)
      if (this.$store.state.username == null) {
        try {
          const response = await axios.get(`${this.$store.state.URL}/api/v1/movies/${movieId}/likecount/`);
          this.likeCount = response.data.like_count;
          // 데이터를 받은 후 요청을 보내는 로직을 추가로 작성
          // 요청을 보내는 코드를 이곳에 작성
        } catch (error) {
          console.error('※좋아요 상태를 가져오고 있습니다!!!:', error);
          this.fetchLike(movieId);
        }
      } else {
        try {
          const response = await axios.get(`${this.$store.state.URL}/api/v1/movies/${movieId}/like/${this.$store.state.username}/`);
          if (response.data.islike === 'like') {
            this.isLike = false;
          } else {
            this.isLike = true;
          }
          this.likeCount = response.data.like_count;
          // 데이터를 받은 후 요청을 보내는 로직을 추가로 작성
          // 요청을 보내는 코드를 이곳에 작성
        } catch (error) {
          console.error('※좋아요 상태를 가져오고 있습니다!!!:', error);
          this.fetchLike(movieId);
        }
    }
    },
    async like_movie(movieId) {
      try { // 비동기처리(post이후 fetchLike 순차적 호출(에러 방지))
        await axios.post(`${this.$store.state.URL}/api/v1/movies/${movieId}/like/${this.$store.state.username}/`);
        await this.fetchLike(movieId);
        if (this.isLike === false) {
          this.showHeartAnimation = false
        } else {
          this.showHeartAnimation = true
        }
        
      } catch (error) {
        alert("로그인 후 이용하세요.")
      }
    },
    fetchisLater(movieId) {
      axios
        .get(`${this.$store.state.URL}/api/v1/movies/${movieId}/watchlater/${this.$store.state.username}/`)
        .then((response) => {
          this.isLater = response.data.islater; // true or false
        })
        .catch((error) => {
          if(error.response.status === 500) {
            console.error('※로그인이 필요한 기능입니다', error);
          } else {
            console.error('※나중에 볼 영화 상태를 가져오고 있습니다!!!', error);
            this.fetchisLater(movieId);
          }
        });
    },
    async later_movie(movieId) {
      try {
        await axios.post(`${this.$store.state.URL}/api/v1/movies/${movieId}/watchlater/${this.$store.state.username}/`);
        await this.$store.dispatch('fetchLaterview', this.$store.state.username);
        await this.fetchisLater(movieId);
        if (this.isLater === false) {
          this.showCheckAnimation = true;
        } else {
          this.showCheckAnimation = false;
        }
      } catch (error) {
        console.error('저장 처리 실패:', error);
      }
    },
  },
}
</script>

<style>
.input-field {
  width: 600px; /* 원하는 너비로 조정하세요 */
  height: auto; /* 원하는 높이로 조정하세요 */
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
.input-container {
  display: flex;
  align-items: center;
}
.input-field {
  width: 600px;
  height: 40px;
  resize: none;
}
.like-btn,
.save-btn{
  background: rgba(255,255,255,0.2);
  border-radius: 50px;
  margin-right: 10px;
}
.like-btn:hover {
  border-radius: 50px;
  background: rgba(255,255,255,0.4);
}
.save-btn:hover {
  border-radius: 50px;
  background: rgba(255,255,255,0.4);
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

.like-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  animation-name: likeAnimation;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes likeAnimation {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.save-btn {
  position: relative;
}

.check-animation {
  position: absolute;
  top: 10%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 999;
  animation-name: checkAnimation;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes checkAnimation {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
</style>