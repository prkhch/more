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
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload);
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

</style>

