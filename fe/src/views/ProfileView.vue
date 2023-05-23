<template>
  <div class="profile-page">
    <div class="profile-container">
      <div v-if="loading" class="loading">로딩 중...</div>
      <div v-else-if="profile" class="profile-info d-flex col">
        <div class="profile-image-container col-5 my-auto">
          <img :src="`${this.$store.state.URL}${profile_image}`" alt="프로필 이미지" class="profile-image">
        </div>
        <div class="col-7">
          <br>
          <h2 class="username">{{ this.$route.params.username }}</h2>
          <p>NAME : {{ profile.first_name }} {{ profile.last_name }}</p>
          <p>EMAIL : {{ profile.email }}</p>
          <br>
          <div class="d-flex justify-content-between">
            <div>
              <div class="followers">
                <span class="pe-3">팔로워 : {{ followers.length }}</span>
                <span>팔로잉 : {{ followings.length }}</span>
              </div>
            </div>
            <div v-if="isyou">
              <button type="button" class="btn save-btn mx-3" @click="clickSound();">
                <i class="fa-solid">개인 정보 수정</i>
              </button>
            </div>
            <div v-else>
              <button type="button" class="save-btn btn mx-3" @click="follow(), clickSound();">
                <i class="fa-solid">팔로우</i>
              </button>
            </div>
          </div>
        </div>
        <!-- 필요한 프로필 정보를 추가로 표시 -->
      </div>
      <div v-else class="profile-not-found">
        <p>프로필을 찾을 수 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
// this.$route.params.username
export default {
  computed: {
    ...mapState(['username'])
  },
  data() {
    return {
      loading: true,
      profile: null,
      profile_image: null,
      isyou: false,
      followings: [],
      followers: [],
    };
  },
  mounted() {
    this.fetchProfile();
    this.ifYou();
    console.log(this.profile_image);
  },
  methods: {
    ifYou() {
      if (this.username === this.$route.params.username) {
        this.isyou = true
      } else {
        this.isyou = false
      }
    },
    clickSound() {
      var audio = new Audio(require('@/assets/click.mp3'));
      audio.play()
        .catch(error => {
          console.error('소리를 재생할 수 없습니다:', error);
        });
    },
    fetchProfile() {
      axios
        .get(`${this.$store.state.URL}/api/v1/accounts/profiles/${this.$route.params.username}/`)
        .then(response => {
          this.profile = response.data;
          this.loading = false;
          this.profile_image = response.data.profile_image;
          this.followers = response.data.followers;
          this.followings = response.data.followings;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    follow() {
      axios
        .post(`${this.$store.state.URL}/api/v1/profile/${this.$route.params.username}/${this.username}/`)
        .then(response => {
          this.followers = response.data.followers;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
/* body {
  background-color: #f5f5f5;
} */

.profile-page {
  background-color: black;
  padding: 20px;
  color: white;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  font-size: 24px;
  /* color: #333; */
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  /* color: #666; */
}

.profile-info {
  text-align: start;
  align-items: middle;
}

.username {
  font-size: 20px;
  /* color: #333; */
}

.profile-image-container {
  margin-top: 20px;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

.profile-not-found {
  text-align: center;
  /* color: #666; */
  margin-top: 20px;
}

.button-group {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.save-btn{
  background: rgba(255,255,255,0.2);
  margin-right: 10px;
  color: white;
}

.save-btn:hover {
  background: rgba(255,255,255,0.4);
  border-radius: 50px;
}

.save-btn {
  position: relative;
}
</style>
