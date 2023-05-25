<template>
  <div class="later-view" style="position: absolute; top: 38px; right: 200px;">

    <vue-draggable-resizable style=" z-index: 999; border:none;" :w="1" :h="1" :handles=[]> 
    <div class="dropdown dropstart" style="transform: translateY(-50%);"  >
      <button class="btn dropdown dropdownbtn" @click="toggleMenu" type="button" id="menu-toggle" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
        <svg height="50" width="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <g id="open-cubes">
            <g id="top-cubes">
              <rect x="12" y="19" width="2" height="2" />
              <rect x="12" y="21" width="2" height="2" />

              <rect x="14" y="19" width="2" height="2" />
              <rect x="14" y="21" width="2" height="2" />

              <rect x="16" y="19" width="2" height="2" />
              <rect x="16" y="21" width="2" height="2" />

              <rect x="18" y="19" width="2" height="2" />
              <rect x="18" y="21" width="2" height="2" />

              <rect x="20" y="19" width="2" height="2" />
              <rect x="20" y="21" width="2" height="2" />

              <rect x="22" y="19" width="2" height="2" />
              <rect x="22" y="21" width="2" height="2" />

              <rect x="24" y="19" width="2" height="2" />
              <rect x="24" y="21" width="2" height="2" />

              <rect x="26" y="19" width="2" height="2" />
              <rect x="26" y="21" width="2" height="2" />

              <rect x="28" y="19" width="2" height="2" />
              <rect x="28" y="21" width="2" height="2" />

              <rect x="30" y="19" width="2" height="2" />
              <rect x="30" y="21" width="2" height="2" />

              <rect x="32" y="19" width="2" height="2" />
              <rect x="32" y="21" width="2" height="2" />

              <rect x="34" y="19" width="2" height="2" />
              <rect x="34" y="21" width="2" height="2" />

              <rect x="36" y="19" width="2" height="2" />
              <rect x="36" y="21" width="2" height="2" />
            </g>

            <g id="bottom-cubes">
              <rect x="12" y="27" width="2" height="2" />
              <rect x="12" y="29" width="2" height="2" />

              <rect x="14" y="27" width="2" height="2" />
              <rect x="14" y="29" width="2" height="2" />

              <rect x="16" y="27" width="2" height="2" />
              <rect x="16" y="29" width="2" height="2" />

              <rect x="18" y="27" width="2" height="2" />
              <rect x="18" y="29" width="2" height="2" />

              <rect x="20" y="27" width="2" height="2" />
              <rect x="20" y="29" width="2" height="2" />

              <rect x="22" y="27" width="2" height="2" />
              <rect x="22" y="29" width="2" height="2" />

              <rect x="24" y="27" width="2" height="2" />
              <rect x="24" y="29" width="2" height="2" />

              <rect x="26" y="27" width="2" height="2" />
              <rect x="26" y="29" width="2" height="2" />

              <rect x="28" y="27" width="2" height="2" />
              <rect x="28" y="29" width="2" height="2" />

              <rect x="30" y="27" width="2" height="2" />
              <rect x="30" y="29" width="2" height="2" />

              <rect x="32" y="27" width="2" height="2" />
              <rect x="32" y="29" width="2" height="2" />

              <rect x="34" y="27" width="2" height="2" />
              <rect x="34" y="29" width="2" height="2" />

              <rect x="36" y="27" width="2" height="2" />
              <rect x="36" y="29" width="2" height="2" />
            </g>
          </g>

          <g id="close-cubes" transform="rotate(45, 25, 25)">
            <g id="vertical-cubes">
              <rect x="25" y="13" width="2" height="2" />
              <rect x="23" y="13" width="2" height="2" />

              <rect x="25" y="15" width="2" height="2" />
              <rect x="23" y="15" width="2" height="2" />

              <rect x="25" y="17" width="2" height="2" />
              <rect x="23" y="17" width="2" height="2" />

              <rect x="25" y="19" width="2" height="2" />
              <rect x="23" y="19" width="2" height="2" />

              <rect x="25" y="21" width="2" height="2" />
              <rect x="23" y="21" width="2" height="2" />

              <rect x="25" y="23" width="2" height="2" />
              <rect x="23" y="23" width="2" height="2" />

              <rect x="25" y="25" width="2" height="2" />
              <rect x="23" y="25" width="2" height="2" />

              <rect x="25" y="27" width="2" height="2" />
              <rect x="23" y="27" width="2" height="2" />

              <rect x="25" y="29" width="2" height="2" />
              <rect x="23" y="29" width="2" height="2" />

              <rect x="25" y="31" width="2" height="2" />
              <rect x="23" y="31" width="2" height="2" />

              <rect x="25" y="33" width="2" height="2" />
              <rect x="23" y="33" width="2" height="2" />

              <rect x="25" y="35" width="2" height="2" />
              <rect x="23" y="35" width="2" height="2" />
            </g>

            <g id="horizontal-cubes">
              <rect x="13" y="23" width="2" height="2" />
              <rect x="13" y="25" width="2" height="2" />

              <rect x="15" y="23" width="2" height="2" />
              <rect x="15" y="25" width="2" height="2" />

              <rect x="17" y="23" width="2" height="2" />
              <rect x="17" y="25" width="2" height="2" />

              <rect x="19" y="23" width="2" height="2" />
              <rect x="19" y="25" width="2" height="2" />

              <rect x="21" y="23" width="2" height="2" />
              <rect x="21" y="25" width="2" height="2" />

              <rect x="27" y="23" width="2" height="2" />
              <rect x="27" y="25" width="2" height="2" />

              <rect x="29" y="23" width="2" height="2" />
              <rect x="29" y="25" width="2" height="2" />

              <rect x="31" y="23" width="2" height="2" />
              <rect x="31" y="25" width="2" height="2" />

              <rect x="33" y="23" width="2" height="2" />
              <rect x="33" y="25" width="2" height="2" />

              <rect x="35" y="23" width="2" height="2" />
              <rect x="35" y="25" width="2" height="2" />
            </g>
          </g>
        </svg>
      </button>

      <ul class="dropdown-menu dropdown-menu-animation" aria-labelledby="dropdownMenuButton">
        <div style="color:white">
          <i class="fa-solid fa-thumbtack fa-sm"></i>
        </div>
        <li v-if="this.movies.length === 0">
          <span style="color:white">No movies available</span>
        </li>
        <li v-else v-for="movie in displayedMovies" :key="movie.id" class="movie-li" @click="navigateToDetailPage(movie.id)">
          <img :src="movie.poster_path" style="width:150px; height:150px;"  class="margin-auto" alt="...">
          <div style="font-size:16px; color:white;" class="text-center">{{movie.title}}</div>
        </li>

        <div style="display: flex; justify-content: space-around;">
          <span class="btn">
            <div class="movebtn" style="color:white; cursor: pointer;" @click="previousPage" v-if="currentPage &gt; 1">이전</div>
            <div class="disabled-link" v-else>이전</div>
          </span>
          <span class="btn">
            <div class="movebtn" style="color:white; cursor: pointer;" @click="nextPage" v-if="currentPage &lt; totalPages">다음</div>
            <div class="disabled-link" v-else>다음</div>
          </span>
        </div>
        <div>
            <span style="color:white">{{this.currentPage}} / {{this.totalPages}}</span>
        </div>
      </ul>

    </div>
    </vue-draggable-resizable>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name : "LaterView",
  data() {
    return {
      movies : [],
      itemsPerPage: 4, // 페이지당 출력할 영화 수
      currentPage: 1, // 현재 페이지 번호
    }
  },
  created() {
    this.getMoviesFromLaterView();
  },
  watch: {
    '$store.state.laterview': {
      handler() {
        this.movies = []
        this.getMoviesFromLaterView(); // laterview 변경 시 movies 갱신
      },
      deep: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage); // 전체 페이지 수 계산
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage; // 현재 페이지에서 시작하는 영화 인덱스
      const endIndex = startIndex + this.itemsPerPage; // 현재 페이지에서 끝나는 영화 인덱스
      return this.movies.slice(startIndex, endIndex); // 현재 페이지에 표시할 영화 목록 반환
    },
  },
  methods : {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // 이전 페이지로 이동
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // 다음 페이지로 이동
      }
    },
    navigateToDetailPage(movieId) {
      const url = `/movies/${movieId}`;
      window.location.href = url;
    },
    async getMoviesFromLaterView() {
      const laterview = this.$store.state.laterview;
      for (const movie_id of laterview) {
        const movie = await this.getMovie(movie_id);
        this.movies.push(movie);
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

    toggleMenu() {
      const button = document.getElementById("menu-toggle");
      const openCubes = Array.from(document.querySelectorAll("#open-cubes rect"));
      const closeCubes = Array.from(document.querySelectorAll("#close-cubes rect"));
      let locked = false;

      const openEffect = (cubes) => {
        cubes.forEach((element, index) => {
          setTimeout(() => {
            element.classList.remove("spin-in");
            element.classList.add("spin-out");
          }, index * 10);
        });
      };

      const closeEffect = (cubes) => {
        cubes.forEach((element, index) => {
          setTimeout(() => {
            element.classList.remove("spin-out");
            element.classList.add("spin-in");
          }, index * 10);
        });
      };

      if (!locked) {
        locked = true;
        button.classList.toggle("active");
        const length = openCubes.length;

        if (button.classList.contains("active")) {
          openEffect(openCubes);
          closeEffect(closeCubes);
        } else {
          closeEffect(openCubes);
          openEffect(closeCubes);
        }

        setTimeout(() => {
          locked = false;
        }, 1300 + length * 10);
      }
    },
  }
}
</script>

<style>
.vdr {
  border : none;
}

.disabled-link {
    color: gray; /* 비활성화된 링크의 색상을 지정합니다. */
    cursor: not-allowed; /* 비활성화된 링크에 마우스 커서를 지정합니다. */
  }

.movie-li {
  cursor: pointer;
}

.movie-li:hover{
  background: rgba(0, 0, 0, 0.8);
}
.btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dropdown-menu {
  animation-fill-mode: forwards;
  width: 300px;
  border : none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
  text-align: center;
}

.dropdown .dropdown-menu li {
  margin: 5px;
}

.dropdown-menu-animation.show {
  animation: fadeInDown 2s ease;
}


@keyframes fadeInDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.dropdownbtn {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* border: 2px black solid; */
  border-radius: 50px;
  cursor: pointer;
  height: 50px;
  outline: none;
  position: relative;
  width: 50px;
  background: rgba(255,255,255,0.4)
}
.dropdownbtn:hover{
  background-color: rgba(255, 255, 255, 0.5);
}
.dropdownbtn.active #open-cubes rect,
.dropdownbtn.active #close-cubes rect {
  fill: rgba(255, 0, 0, 0.8)
}
.dropdownbtn svg {
  position: absolute;
  left: 0;
  top: 0;
}
.dropdownbtn svg #open-cubes rect,
.dropdownbtn svg #close-cubes rect {
  fill: #ffffff;
  transition: fill 600ms ease;
}
.dropdownbtn svg #close-cubes rect {
  opacity: 0;
}

.spin-in {
  -webkit-animation: spin-in 1300ms ease 1 forwards 10ms;
          animation: spin-in 1300ms ease 1 forwards 10ms;
  transform-origin: center;
}

.spin-out {
  -webkit-animation: spin-out 1300ms ease 1 forwards 10ms;
          animation: spin-out 1300ms ease 1 forwards 10ms;
  transform-origin: center;
}

@-webkit-keyframes spin-in {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: rotate(720deg);
  }
}

@keyframes spin-in {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: rotate(720deg);
  }
}
@-webkit-keyframes spin-out {
  0% {
    opacity: 1;
    transform: rotate(720deg);
  }
  100% {
    opacity: 0;
    transform: rotate(0deg);
  }
}
@keyframes spin-out {
  0% {
    opacity: 1;
    transform: rotate(720deg);
  }
  100% {
    opacity: 0;
    transform: rotate(0deg);
  }
}

</style>