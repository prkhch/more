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
      router.push({ name: 'login' }); // 로그인 페이지로 이동
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
        console.log(response)
        if (response.data) {
          console.log(response.data);
          context.commit('SAVE_TOKEN', response.data.key)
          context.commit("SAVE_USERNAME", username);
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
          console.log(response.data)
          context.commit('CLEAR_AUTH');
        }
      } catch(error) {
        console.log(error)
      }
    },

  },
  modules: {
  },
})
