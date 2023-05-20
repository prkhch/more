<template>
  <div class="signup-view">
    <h1>회원가입</h1>
    <div class="form-floating">
      <input type="text" 
      class="form-control" 
      id="user-id"
      v-model="username"/>
      <label for="user-id">아이디를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input type="password" 
      class="form-control" 
      id="user-password1"
      v-model="password1"/>
      <label for="user-password1">비밀번호를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input type="password" 
      class="form-control" 
      id="user-password2"
      v-model="password2"
      @keyup.enter="signup"/>
      <label for="user-password2">비밀번호를 다시 입력하세요</label>
    </div>
    <button type="button" class="btn btn-primary" @click="signup">회원가입</button>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      username : "",
      password1 : "",
      password2 : "",
    }
  },
  methods: {
    signup() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {
        username, password1, password2
      }
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>