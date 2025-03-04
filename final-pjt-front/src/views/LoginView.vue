<template>
  <div class="login-view">
    <h1>로그인</h1>
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="user-id"
        v-model="username"
        @keyup.enter="login"
      />
      <label for="user-id" style="color: black">아이디를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="user-password"
        v-model="password"
        @keyup.enter="login"
      />
      <label for="user-password" style="color: black"
        >비밀번호를 입력하세요</label
      >
    </div>
    <button type="button" class="btn btn-primary btn-block" @click="login">
      로그인
    </button>

    <router-link :to="{ name: 'signup' }">
      <button type="button" class="btn btn-link btn-block">회원가입</button>
    </router-link>
  </div>
</template>

<style>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-bottom: 50vh;
}

.form-floating {
  width: 300px;
  margin-bottom: 20px;
}

.form-floating input {
  height: 40px;
}

.form-floating label {
  color: #fff;
}

.btn-primary {
  background-color: #e50914;
  border-color: #e50914;
}

.btn-primary:hover {
  background-color: #b2070f;
  border-color: #b2070f;
}

.btn-link {
  color: #fff;
}

.btn-link:hover {
  color: #f5f5f5;
}
</style>

<script>
// import axios from "axios"

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;
      const payload = {
        username,
        password,
      };
      this.$store.dispatch("login", payload);
    },
  },
};
</script>
