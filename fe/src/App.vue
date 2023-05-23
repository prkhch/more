<template>
  <div id="app">
  <LaterView/>
  <nav>
    <div class="left-links">
      <div @click="playSound">
        <router-link to="/"><img src="@/assets/logo.png" alt="logo" style="width:20px;"></router-link>
      </div>
      
      <div @click="playSound">
        <router-link to="/search">
        <i class="fa-solid fa-magnifying-glass" style="color: #FFFFFF;"></i>
        </router-link>
      </div>
      
    </div>

    <div class="right-links">
      <div v-if="hasToken" @click="playSound">
        <router-link :to="{ name: 'profile', params:{username:$store.state.username} }" style="text-decoration: underline">{{ $store.state.username }}</router-link>
      </div>
      <div v-if="hasToken" @click="playSound">
        <router-link :to="{ name: 'later', params:{username:$store.state.username} }">나중에 볼 영화</router-link>
      </div>
      <div v-if="hasToken" @click="playSound">
        <button @click="logout">로그아웃</button>
      </div>
      <div v-else @click="playSound">
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </div>
  
    </div>
  </nav>

    <!-- router-view -->
    <div class="page">
      <router-view/> 
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import LaterView from '@/views/LaterView.vue'

Vue.use(VueCarousel);

export default {
  components : {
    LaterView
  },
  data() {
    return {
      showSearch: false,
    };
  },
  computed: {
    hasToken() {
      return this.$store.state.token !== null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    playSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
            // 오류 처리 로직 추가
            console.error('소리를 재생할 수 없습니다:', error);
          });
    },
  },
};
</script>

<style>
#app {
  font-family: "Noto Sans KR", sans-serif;
}
body{
  background-color: black;
}

ul {
  padding-left : 0;
  list-style : none;
}
.detail-view,
.home-view,
.search-view,
.login-view,
.profile-view,
.signup-view,
.later-view {
  padding-left: 3rem;
  padding-right: 3rem;
  background-color : black;
  color : white;
}


/* navbar Style */
nav {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,1);
}

.left-links {
  display: flex;
  align-items: center;
}
.right-links {
  display: flex;
  align-items: center;
}
.left-links a,
.right-links a,
.right-links button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: box-shadow 0.3s;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);

}
.left-links a:hover,
.right-links a:hover,
.right-links button:hover {
  box-shadow: 0px 2px 5px 2px rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #090707;
}

.dank-ass-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dank-ass-loader .row {
  display: flex;
}

.arrow {
  width: 0;
  height: 0;
  margin: 0 -6px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 21.6px solid #ffffff;
  -webkit-animation: blink 1s infinite;
          animation: blink 1s infinite;
  filter: drop-shadow(0 0 18px #ffffff);
}
.arrow.down {
  transform: rotate(180deg);
}
.arrow.outer-1 {
  -webkit-animation-delay: -0.0555555556s;
          animation-delay: -0.0555555556s;
}
.arrow.outer-2 {
  -webkit-animation-delay: -0.1111111111s;
          animation-delay: -0.1111111111s;
}
.arrow.outer-3 {
  -webkit-animation-delay: -0.1666666667s;
          animation-delay: -0.1666666667s;
}
.arrow.outer-4 {
  -webkit-animation-delay: -0.2222222222s;
          animation-delay: -0.2222222222s;
}
.arrow.outer-5 {
  -webkit-animation-delay: -0.2777777778s;
          animation-delay: -0.2777777778s;
}
.arrow.outer-6 {
  -webkit-animation-delay: -0.3333333333s;
          animation-delay: -0.3333333333s;
}
.arrow.outer-7 {
  -webkit-animation-delay: -0.3888888889s;
          animation-delay: -0.3888888889s;
}
.arrow.outer-8 {
  -webkit-animation-delay: -0.4444444444s;
          animation-delay: -0.4444444444s;
}
.arrow.outer-9 {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s;
}
.arrow.outer-10 {
  -webkit-animation-delay: -0.5555555556s;
          animation-delay: -0.5555555556s;
}
.arrow.outer-11 {
  -webkit-animation-delay: -0.6111111111s;
          animation-delay: -0.6111111111s;
}
.arrow.outer-12 {
  -webkit-animation-delay: -0.6666666667s;
          animation-delay: -0.6666666667s;
}
.arrow.outer-13 {
  -webkit-animation-delay: -0.7222222222s;
          animation-delay: -0.7222222222s;
}
.arrow.outer-14 {
  -webkit-animation-delay: -0.7777777778s;
          animation-delay: -0.7777777778s;
}
.arrow.outer-15 {
  -webkit-animation-delay: -0.8333333333s;
          animation-delay: -0.8333333333s;
}
.arrow.outer-16 {
  -webkit-animation-delay: -0.8888888889s;
          animation-delay: -0.8888888889s;
}
.arrow.outer-17 {
  -webkit-animation-delay: -0.9444444444s;
          animation-delay: -0.9444444444s;
}
.arrow.outer-18 {
  -webkit-animation-delay: -1s;
          animation-delay: -1s;
}
.arrow.inner-1 {
  -webkit-animation-delay: -0.1666666667s;
          animation-delay: -0.1666666667s;
}
.arrow.inner-2 {
  -webkit-animation-delay: -0.3333333333s;
          animation-delay: -0.3333333333s;
}
.arrow.inner-3 {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s;
}
.arrow.inner-4 {
  -webkit-animation-delay: -0.6666666667s;
          animation-delay: -0.6666666667s;
}
.arrow.inner-5 {
  -webkit-animation-delay: -0.8333333333s;
          animation-delay: -0.8333333333s;
}
.arrow.inner-6 {
  -webkit-animation-delay: -1s;
          animation-delay: -1s;
}

@-webkit-keyframes blink {
  0% {
    opacity: 0.1;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

@keyframes blink {
  0% {
    opacity: 0.1;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

</style>

