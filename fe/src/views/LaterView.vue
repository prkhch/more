<template>
  <div class="later-view">
    <div class="dropdown dropstart" style="position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 999;">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="id in result" :key="id">{{id}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name : "LaterView",
  data() {
    return {
      result : [],

    }
  },
  created() {
    const username = this.$route.params.username;
    console.log(this.$route.params.username)
    this.fetchLater(username);
  },
  methods : {
    fetchLater(username) {
      axios
        .get(`${this.$store.state.URL}/api/v1/movies/watchlater/${username}/`)
        .then((response) => {
          this.result = response.data.result;
          console.log(this.result)
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
}
</script>