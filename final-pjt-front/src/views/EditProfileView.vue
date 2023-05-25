<template>
  <div class="profile-edit-page">
    <h1 style="color: white;">프로필 수정</h1>
    <form @submit.prevent="updateProfile" class="profile-edit-form">
      <div class="form-group">
        <label for="first_name">이름</label>
        <input type="text" id="first_name" v-model="profile.first_name">
      </div>
      <div class="form-group">
        <label for="last_name">성</label>
        <input type="text" id="last_name" v-model="profile.last_name">
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="profile.email">
      </div>
      <div class="form-group">
        <label for="profile_image">프로필 이미지</label>
        <input type="file" id="profile_image" @change="handleProfileImageChange">
        <img style="width:30%;" v-if="!profile.profile_image" :src="`${this.$store.state.URL}${defaultProfileImage}`" alt="프로필 이미지">
        <img style="width:30%;" v-else :src="`${this.$store.state.URL}${defaultProfileImage}`" alt="프로필 이미지">
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn save-btn mx-3" @click="clickSound();">
          <i class="fa-solid">저장</i>
        </button>
        <router-link :to="{ name: 'changepassword', params: { username: this.$store.state.username } }">
          <button type="button" class="btn save-btn mx-3" @click="clickSound();">
            <i class="fa-solid">비밀번호 변경</i>
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: {
        first_name: '',
        last_name: '',
        email: '',
        profile_image: null,
      },
      defaultProfileImage: '',
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    clickSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
          console.error('소리를 재생할 수 없습니다:', error);
        });
    },
    fetchProfile() {
      axios.get(`${this.$store.state.URL}/api/v1/accounts/profiles/${this.$store.state.username}/`)
        .then(response => {
          this.profile = response.data;
          if (this.profile.profile_image) {
            this.defaultProfileImage = this.profile.profile_image;
            this.profile.profile_image = null;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleProfileImageChange(event) {
      const file = event.target.files[0];
      this.profile.profile_image = file;
    },
    updateProfile() {
      const formData = new FormData();
      if (this.profile.first_name !== '') {
        formData.append('first_name', this.profile.first_name);
      } else {
        formData.append('first_name', '')
      }
      if (this.profile.last_name !== '') {
        formData.append('last_name', this.profile.last_name);
      } else {
        formData.append('last_name', '')
      }
      if (this.profile.email !== '') {
        formData.append('email', this.profile.email);
      }
      if (this.profile.profile_image !== null) {
        formData.append('profile_image', this.profile.profile_image);
      }
      axios.put(`${this.$store.state.URL}/api/v1/accounts/profiles/${this.$store.state.username}/`, formData)
        .then(() => {
          // 수정 성공 후의 처리 로직
          alert('성공')
          this.$router.push({ name: 'profile', params: { username: this.$store.state.username } });
        })
        .catch(() => {
          // 수정 실패 후의 처리 로직
          alert('실패')
        });
    },
  },
};
</script>
  
<style>
.profile-edit-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-edit-form {
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

input[type="text"],
input[type="email"] {
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