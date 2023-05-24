<template>
  <div class="change-password-page">
    <h1 style="color: white;">비밀번호 변경</h1>
    <form @submit.prevent="changePassword" class="change-password-form">
      <div class="form-group">
        <label for="old_password">기존 비밀번호</label>
        <input type="password" id="old_password" v-model="oldPassword">
      </div>
      <div class="form-group">
        <label for="new_password">새 비밀번호</label>
        <input type="password" id="new_password" v-model="newPassword">
      </div>
      <div class="form-group">
        <label for="confirm_password">비밀번호 확인</label>
        <input type="password" id="confirm_password" v-model="confirmPassword">
      </div>
      <button type="submit">비밀번호 변경</button>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';
import router from "@/router"

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const requestData = {
        old_password: this.oldPassword,
        password: this.newPassword,
        password2: this.confirmPassword,
      };
      axios.put(`${this.$store.state.URL}/api/v1/accounts/profiles/${this.$store.state.username}/change-password/`, requestData, {
        headers: {
          Authorization: `Token ${this.$store.state.token}`, // 헤더에 토큰 추가
        },
      })
        .then(() => {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          router.push({ name: 'profile', params: { username: this.$store.state.username } });
          // 비밀번호 변경 성공 후의 처리 로직
        })
        .catch((error) => {
          console.error(error);
          alert("비밀번호 변경에 실패했습니다.");
          // 비밀번호 변경 실패 후의 처리 로직
        });
    },
    
  },
};
</script>

<style>
.change-password-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.change-password-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
  