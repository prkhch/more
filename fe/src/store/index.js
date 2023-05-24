import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '@/router'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedstate(),
  ],
  state: {
    username: null,
    token: null,
    URL: "http://localhost:8000", // 백엔드
    laterview : [],
    genreId: 0,
    genrename: '인기',
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      console.log(token)
      router.push({name:'home'})
    },
    SAVE_USERNAME(state, newUsername) { // 이름변경
      state.username = newUsername;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.username = null;
      state.laterview = [];
      router.push({ name: 'login' }); // 로그인 페이지로 이동
    },
    SET_LATERVIEW(state, laterview) {
      state.laterview = laterview;
    },
    SWITCH_GENRE(state, genreid) {
      state.genreId = genreid
    },
    SWITCH_GENRE_NAME(state, genrename) {
      state.genrename = genrename
    },
  },
  actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      axios({
        method: 'post',
        url: `http://localhost:8000/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then((response) => {
        console.log(response.data)
        context.commit('SAVE_TOKEN', response.data.key)
        context.commit("SAVE_USERNAME", username);
      })
      .catch((error) => {
        console.log(error)
        if(error.response.status === 400) {
          alert("잘못된 입력입니다!")
        }
      })
    },
    async login(context, payload) {
      try {
        const username = payload.username
        const password = payload.password
        const response = await axios.post("http://localhost:8000/accounts/login/", {
          username : username,
          password : password,
        });
        if (response.data) {
          context.commit('SAVE_TOKEN', response.data.key)
          await context.commit("SAVE_USERNAME", username);
          await context.dispatch('fetchLaterview', username);
        } 
      } catch (error) {
        console.log(error);
        if(error.response.status === 400) {
          alert("잘못된 입력입니다!")
        }
      }
    },
    async logout(context) {
      
      try {
        const response = await axios.post("http://localhost:8000/accounts/logout/")
        if(response.data) {
          context.commit('CLEAR_AUTH');
        }
      } catch(error) {
        console.log(error)
      }
    },
    async fetchLaterview(context, username) {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/movies/watchlater/${username}`); // 예시 API 엔드포인트
        const laterview = response.data.result; // 예시 API 응답에서 laterview 데이터 추출
        context.commit('SET_LATERVIEW', laterview); //
      } catch (error) {
        console.log(error);
      }
    },
    switchGenre(context, genreid) {
      context.commit('SWITCH_GENRE', genreid)
    },
    switchGenreName(context, genrename) {
      context.commit('SWITCH_GENRE_NAME', genrename)
    },

  },
  modules: {
  },
})
