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
      })
      .catch((error) => {
        console.log(error)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `http://localhost:8000/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((response) => {
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  modules: {
  }
})
