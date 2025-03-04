<template>
  <div class="home-view">
    <!-- <h1 class="text-center text-light">{{ genrename }} 영화</h1> -->
    <div class="dropdown d-flex justify-content-center fs-1">
      <button
        class="custom-btn btn-3"
        @click="toggleDropdown"
        style="width: 290px"
      >
        <span>{{ genrename }} 영화</span>
      </button>
      <ul
        class="dropdown-menu dropdown-genre p-0"
        v-if="isDropdownOpen"
        v-click-outside="closeDropdown"
      >
        <li
          class="dropdown-item dropdown-genre mx-0 mt-0"
          @click="switchGenre('0'), switchGenreName('인기'), closeDropdown()"
        >
          인기
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('28'), switchGenreName('액션'), closeDropdown()"
        >
          액션
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="
            switchGenre('16'), switchGenreName('애니메이션'), closeDropdown()
          "
        >
          애니메이션
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('35'), switchGenreName('코미디'), closeDropdown()"
        >
          코미디
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('80'), switchGenreName('범죄'), closeDropdown()"
        >
          범죄
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('27'), switchGenreName('공포'), closeDropdown()"
        >
          공포
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="
            switchGenre('10749'), switchGenreName('로맨스'), closeDropdown()
          "
        >
          로맨스
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('878'), switchGenreName('SF'), closeDropdown()"
        >
          SF
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0"
          @click="switchGenre('53'), switchGenreName('스릴러'), closeDropdown()"
        >
          스릴러
        </li>
        <li
          class="dropdown-item dropdown-genre mx-0 mb-0"
          @click="switchGenre('14'), switchGenreName('판타지'), closeDropdown()"
        >
          판타지
        </li>
      </ul>
    </div>

    <div
      class=""
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="cardgroup row row-cols-1 row-cols-md-5 g-5 mt-3">
        <div class="col" v-for="movie in movies" :key="movie.id">
          <div class="card">
            <router-link :to="{ name: 'detail', params: { id: movie.id } }">
              <div class="image-container">
                <img
                  :src="getImageUrl(movie.poster_path)"
                  class="card-img-top border"
                  alt="..."
                  @click="playSound"
                  @mouseover="handleHover(movie)"
                  @mouseleave="handleHover(null)"
                />
              </div>
            </router-link>
          </div>
          <div style="height: 20px">
            <transition name="fade">
              <div class="movie-title" v-if="hoveredMovie === movie">
                {{ movie.title }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="top-button" v-show="showTopButton">
      <button style="background: none; border: none" @click="scrollToTop">
        <i class="fa-solid fa-angles-up fa-xl" style="color: #ffffff"></i>
      </button>
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
import axios from "axios";
import vClickOutside from "v-click-outside";

export default {
  name: "HomeView",
  directives: {
    ClickOutside: vClickOutside.directive,
  },
  components: {},
  data() {
    return {
      movies: [],
      hoveredMovie: null,
      page: 1,
      loading: false,
      isDropdownOpen: false,
      showTopButton: false,
    };
  },
  computed: {
    genrename() {
      return this.$store.state.genrename;
    },
  },
  watch: {
    "$store.state.genreId": {
      handler() {
        // genreId가 변경될 때마다 실행되는 로직
        this.page = 1; // 페이지 초기화
        this.movies = []; // 영화 목록 초기화
        this.fetchMovies(); // 새로운 영화 로딩
      },
    },
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    switchGenre(genreid) {
      this.$store.dispatch("switchGenre", genreid);
    },
    switchGenreName(genrename) {
      this.$store.dispatch("switchGenreName", genrename);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    getImageUrl(posterPath) {
      const baseUrl = "https://image.tmdb.org/t/p/";
      const size = "w500";
      return `${baseUrl}${size}${posterPath}`;
    },

    async fetchMovies() {
      if (this.loading) return;
      this.loading = true;
      const apiKey = "8b1a427d0c951e52a5869304bde7a649";
      let apiUrl = "";
      this.genre_Id = this.$store.state.genreId;
      if (this.genre_Id == 0) {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${this.page}&certification_country=KR&certification.lte=15`;
      } else if (this.genre_Id !== 0) {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&sort_by=popularity.desc&page=${this.page}&with_genres=${this.genre_Id}&certification_country=KR&certification.lte=15`;
      }
      try {
        const response = await axios.get(apiUrl);
        const newMovies = response.data.results;
        this.movies = [...this.movies, ...newMovies];
        this.page++;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollPosition2 = +window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      const body = document.body;
      body.style.backgroundColor = "#FFFFFF";
      if (scrollPosition2 > 1) {
        // 일정 스크롤 밑으로 가면 top버튼
        this.showTopButton = true;
      } else {
        this.showTopButton = false;
      }
      if (scrollPosition >= documentHeight - 1) {
        this.fetchMovies();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    // 스타일
    handleHover(movie) {
      this.hoveredMovie = movie;
    },
    playSound() {
      var audio = new Audio(require("@/assets/click.mp3"));
      audio.play().catch((error) => {
        console.error("소리를 재생할 수 없습니다:", error);
      });
    },
  },
};
</script>

<style>
.top-button {
  position: fixed;
  bottom: 60px;
  right: 60px;
  z-index: 999;
}

.top-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}

.top-button.show {
  display: block;
}

.movie-title {
  color: white;
  font-size: 20px;
}

.cardgroup {
  width: 90%;
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

.card {
  transition: box-shadow 1s;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
}
.card:hover {
  box-shadow: 0px 5px 30px 5px rgba(255, 255, 255, 1);
  border-radius: 5px;
}

.dropdown-toggle.dropdown-genre {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  width: 100px;
  color: white;
}

.dropdown-toggle.dropdown-genre::after {
  display: none;
}

.dropdown-menu.dropdown-genre {
  position: absolute;
  top: 100%;
  left: 50%; /* 가운데 정렬을 위해 50%로 설정 */
  transform: translateX(-50%); /* 가운데 정렬을 위해 X 축으로 -50%만큼 이동 */
  width: 290px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  list-style: none;
  display: block;
}

.dropdown-item.dropdown-genre {
  padding: 5px 10px;
  color: #ffffff;
  cursor: pointer;
}

.dropdown-item.dropdown-genre:hover {
  background-color: rgba(128, 128, 128, 1);
}
</style>
