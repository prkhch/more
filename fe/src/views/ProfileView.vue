<template>
  <div class="profile-page">
    <div class="profile-container">
      <div v-if="loading" class="loading">로딩 중...</div>
      <div v-else-if="profile" class="profile-info d-flex col">
        <div class="profile-image-container col-5 my-auto">
          <img :src="`${this.$store.state.URL}${profile_image}`" alt="프로필 이미지" class="profile-image">
        </div>
        <div class="col-7">
          <br>
          <h2 class="username">{{ this.$route.params.username }}</h2>
          <p>NAME : {{ profile.first_name }} {{ profile.last_name }}</p>
          <p>EMAIL : {{ profile.email }}</p>
          <br>
          <div class="d-flex justify-content-between">
            <div>
              <div class="followers">
                <span class="pe-3">팔로워 : {{ followers.length }}</span>
                <span>팔로잉 : {{ followings.length }}</span>
              </div>
            </div>
            <div v-if="isyou">
              <router-link :to="{ name: 'editprofile', params: { username: this.$store.state.username } }">
                <button type="button" class="btn save-btn mx-3" @click="clickSound();">
                  <i class="fa-solid">개인 정보 수정</i>
                </button>
              </router-link>
            </div>
            <div v-else>
              <div v-if="is_follow">
                <button type="button" class="save-btn btn mx-3" @click="follow(), clickSound();">
                  <i class="fa-solid">언팔로우</i>
                </button>
              </div>
              <div v-else>
                <button type="button" class="save-btn btn mx-3" @click="follow(), clickSound();">
                  <i class="fa-solid">팔로우</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 필요한 프로필 정보를 추가로 표시 -->
      </div>
      <div v-else class="profile-not-found">
        <p>프로필을 찾을 수 없습니다.</p>
      </div>
    </div>

    <div>
      <h1>나중에 볼 영화</h1>
      <!-- 영화 저장 리스트 -->
      <div class="later-movies"> 
        <li v-for="movie in this.latermovies" :key="movie.id" class="movie-li">
            <router-link :to="{ name: 'detail', params: { id: movie.id } }">
            <img :src="movie.poster_path" style="width:150px; height:150px;"  class="margin-auto" alt="...">
            </router-link>
            <span style="font-size:16px; color:white;" class="text-center">{{movie.title}}</span>
          </li>
      </div>

      <h1>영화 추천 리스트</h1>
      <p style="font-style:italic; font-size:12px;">나중에 볼 영화를 기반으로 추천합니다.</p>
      <!-- 영화 추천 리스트 -->
      <!-- 1. for 영화 in 영화 저장 리스트 
                for keyword in movie_keywords(영화)
            영화 id에 있는 모든 키워드를 키워드 딕셔너리에 저장(mounted(비동기 처리해야함)) 
            getKeyword()-->
      <!-- 2. 딕셔너리 중 max 키워드 코드 출력 
            getmaxKeyword();-->
      <!-- 3. 해당 키워드 코드와 일치하는 영화 저장(추천 영화 리스트)  -->
      <div class="rcm-movies"> 
        <li v-for="movie in this.rcmMovies" :key="movie.id" class="movie-li">
          <router-link :to="{ name: 'detail', params: { id: movie.id } }">
            <div>
            <img :src="movie.poster_path" style="width:150px; height:150px;"  class="margin-auto" alt="...">
            </div>
          </router-link>
            <span style="font-size:16px; color:white;" class="text-center">{{movie.title}}</span>
          </li>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
// this.$route.params.username
export default {
  computed: {
    ...mapState(['username'])
  },
  
  data() {
    return {
      loading: true,
      profile: null,
      profile_image: null,
      isyou: false,
      is_follow: false,
      followings: [],
      followers: [],

      latermovies : [],
      keywordDict : {

      },
      maxKeywordList : [],
      maxKeyword : null,
      rcmMovieIds : [],
      rcmMovies : []
    };
  },
  created() {

  },
  async mounted() {
    this.fetchProfile();
    this.ifYou();
    this.fetchFollow();
    await this.getMoviesFromLaterView();
    await this.getKeyword();
    await this.getmaxKeyword(); // 최대 키워드 갖기 | 최대 키워드가 여러 개일 경우 다 같이 저장 (+ 최대 키워드 오차 인정: 2)
    await this.getRcmMovies(); // 추천 영화 아이디들을 받기
    await this.fetchRcmMovies(); // 해당 영화 아이디들을 통해 영화 정보 받기

  },
  watch: {
    '$store.state.laterview': {
      handler() {
        this.latermovies = []
        this.getMoviesFromLaterView(); // laterview 변경 시 movies 갱신
      },
      deep: true,
    },
  },
  methods: {
    async fetchRcmMovies(){ // 5. 추천받은 영화id정보를 통해 영화 객체 저장
      const rcmMovieIds = this.rcmMovieIds
      for (const movie_id of rcmMovieIds) { // ★★ 이미 저장된 영화는 추천하지 않음
        const foundMovie = this.latermovies.find(movie => movie.id === movie_id);
        if (foundMovie) {
          continue; // latermovies에 이미 해당 영화 객체가 있으면 다음 반복으로 넘어감
        }
        const movie = await this.getMovie(movie_id);
        if(movie.poster_path=="https://image.tmdb.org/t/p/w500/null") {
          continue;
        }
        console.log(movie)
        this.rcmMovies.push(movie);
      }
      this.rcmMovies.sort(() => Math.random() - 0.5); // 한번 더 섞기

    },
    async getRcmMovies() { // 4. 뽑아낸 키워드 리스트중 하나를 랜덤으로 선택
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      if (this.maxKeywordList.length > 1) {
        const randomIndex = Math.floor(Math.random() * this.maxKeywordList.length);
        this.maxKeyword = this.maxKeywordList[randomIndex];
      } else if (this.maxKeywordList.length === 1) {
        this.maxKeyword = this.maxKeywordList[0];
      }
      const keywordurl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_keywords=${this.maxKeyword}&language=ko-KRcertification_country=KR&certification.lte=15&sort_by=popularity.desc`
      try {
        const response = await fetch(keywordurl);
        const data = await response.json();
        // 받아온 영화 데이터에서 영화 ID 추출하여 this.rcmMovieIds에 저장
        this.rcmMovieIds = data.results.map(movie => movie.id); 
      } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    },
    async getKeyword() { // 2. 해당 영화의 키워드 가져오기 (키워드 딕셔너리 만들기)
      try {
        for (const movie of this.latermovies) {
          const apiKey = '8b1a427d0c951e52a5869304bde7a649';
          const keywordurl = `https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=${apiKey}&language=ko-KR`;
          const response = await fetch(keywordurl);
          const data = await response.json();
          const keywords = data.keywords;

          // ★★한 영화당 저장영화의 수만큼의 키워드 저장(적은 영화에 확률을 높이기 위함)
          // 더 많은 영화를 저장할 수록 추천받을 확률 UP
          for (let i=0; i<this.latermovies.length; i++) { 
            const keywordId = keywords[i].id;

            if (!(keywordId in this.keywordDict)) { // 새로운 키워드는 추가
              this.keywordDict[keywordId] = 1;
            } else {
              this.keywordDict[keywordId] += 1; // 이미 있는 키인 경우, 값에 1 더하기
            }
          }
        }
      } catch (error) {
        console.error('영화 키워드를 가져오는 중 오류가 발생했습니다:', error);
      }
    },
    getmaxKeyword() { // 3. 빈도가 높은 키워드 저장
      let maxCnt = -Infinity;
      for(const keyword in this.keywordDict) {
        if ((maxCnt-1) <= this.keywordDict[keyword] <= maxCnt) {  // 오차범위(1) 안이면 넣기.
          this.maxKeywordList.push(keyword);
          } else if(this.keywordDict[keyword] > maxCnt + 1) { // 오차범위 쳐준 것보다도 더 많은 키워드라면
          maxCnt = this.keywordDict[keyword]; // 최댓값 갱신
          this.maxKeywordList = [keyword]; // 키워드리스트 초기화한 후 키워드 넣기
        }
      }
    },
    async getMoviesFromLaterView() { // 1. 저장한 영화 가져오기
      const laterview = this.$store.state.laterview;
      for (const movie_id of laterview) {
        const movie = await this.getMovie(movie_id);
        this.latermovies.push(movie);
      }
    },
    async getMovie(id) {
      const apiKey = '8b1a427d0c951e52a5869304bde7a649';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      try {
        const response = await axios.get(url);
        const movieData = response.data;
        
        const movieId = movieData.id;
        const movieTitle = movieData.title;
        const baseUrl = 'https://image.tmdb.org/t/p/w500/';
        const moviePosterPath = movieData.poster_path;
        const posterUrl = baseUrl + moviePosterPath;

        const movieDetails = {
          id: movieId,
          title: movieTitle,
          poster_path: posterUrl,
        };

        return movieDetails;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    ifYou() {
      if (this.username === this.$route.params.username) {
        this.isyou = true
      } else {
        this.isyou = false
      }
    },
    clickSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
          console.error('소리를 재생할 수 없습니다:', error);
        });
    },
    fetchProfile() {
      axios
        .get(`${this.$store.state.URL}/api/v1/accounts/profiles/${this.$route.params.username}/`)
        .then(response => {
          this.profile = response.data;
          this.loading = false;
          this.profile_image = response.data.profile_image;
          this.followers = response.data.followers;
          this.followings = response.data.followings;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    async fetchFollow() {
      const response = await axios.get(`${this.$store.state.URL}/api/v1/profile/${this.$route.params.username}/${this.username}/`)
      if (response.data.is_following) {
        this.is_follow = true
      } else {
        this.is_follow = false
      }
    },
    follow() {
      axios
        .post(`${this.$store.state.URL}/api/v1/profile/${this.$route.params.username}/${this.username}/`)
        .then(response => {
          this.fetchFollow()
          this.followers = response.data.followers;
        })
        .catch(error => {
          console.error(error);
        });
    },
  }
};
</script>

<style>
/* body {
  background-color: #f5f5f5;
} */

.profile-page {
  background-color: black;
  padding: 20px;
  color: white;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  font-size: 24px;
  /* color: #333; */
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  /* color: #666; */
}

.profile-info {
  text-align: start;
  align-items: middle;
}

.username {
  font-size: 20px;
  /* color: #333; */
}

.profile-image-container {
  margin-top: 20px;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

.profile-not-found {
  text-align: center;
  /* color: #666; */
  margin-top: 20px;
}

.button-group {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.save-btn{
  background: rgba(255,255,255,0.2);
  margin-right: 10px;
  color: white;
}

.save-btn:hover {
  background: rgba(255,255,255,0.4);
  border-radius: 50px;
}

.save-btn {
  position: relative;
}
</style>
