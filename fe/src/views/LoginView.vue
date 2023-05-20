<template>
  <div class="login-view">
    <h1>LoginView</h1>
    <!-- form-floating : 부트스트랩 -->
    <div class="form-floating">
      <!-- id와 for연결 -->
      <input type="text" 
      class="form-control" 
      id="user-id" 
      v-model="username"
      @keyup.enter="login"/>
      <label for="user-id">아이디를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input type="password"
      class="form-control"
      id="user-password"
      v-model="password"
      @keyup.enter="login"/>
      <label for="user-passwrod">비밀번호를 입력하세요</label>
    </div>
    <button type="button" class="btn btn-info" @click="login" >로그인</button>

    <router-link :to="{name:'signup'}">
      <button type="button" class="btn btn-primary">회원가입</button>
    </router-link>
  </div>
</template>

<script>
// import axios from "axios"

export default {
  data() {
    return {
      username : "",
      password : "",
    };
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password
      const payload = {
        username, password
      }
      this.$store.dispatch('login', payload)
    },
    
  }
}
</script>